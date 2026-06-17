"use client";

import { Info, Pencil, CheckCircle, FileText } from "lucide-react";
import { ApplicationPreferences } from "./ApplicationPreferences";
import { UniversityChoices } from "./UniversityChoices";
import { DocumentsChecklist } from "./DocumentsChecklist";
import { LanguageProficiencies } from "./LanguageProficiencies";
import { EndorsementDetails } from "./EndorsementDetails";
import { EventsAttended } from "./EventsAttended";
import { useState, useEffect } from "react";
import { apiFetch } from "@/lib/api-client";
import { mutate } from "swr";
import { useRouter } from "next/navigation";

export function ApplicationForm({ data }: { data: any }) {
  const router = useRouter();
  const hasApplication = !!data?.application_id;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [applicationData, setApplicationData] = useState(data || {});
  const [autoSaveStatus, setAutoSaveStatus] = useState<"Saved" | "Saving..." | "Error" | "">("");

  // Debounced Auto-Save
  useEffect(() => {
    if (!hasApplication) return;
    
    setAutoSaveStatus("Saving...");
    const timeout = setTimeout(async () => {
      try {
        const payload = {
          semester_preference: applicationData.semester_preference,
          duration_preference: applicationData.duration_preference,
          program_advisor: applicationData.program_advisor,
          department_chair: applicationData.department_chair,
          college_secretary: applicationData.college_secretary,
          dean_name: applicationData.dean_name,
          choices: (applicationData.university_choices || []).map((c: any) => ({
            rank: c.university_choice_rank,
            name: c.university_name,
          })),
        };
        await apiFetch("/api/v1/applications/me", {
          method: "PATCH",
          body: JSON.stringify(payload)
        });
        mutate("/api/v1/applications/me");
        setAutoSaveStatus("Saved");
        setTimeout(() => setAutoSaveStatus(""), 2000);
      } catch (e) {
        console.error("Auto-save failed", e);
        setAutoSaveStatus("Error");
      }
    }, 1000);

    return () => clearTimeout(timeout);
  }, [
    applicationData.semester_preference,
    applicationData.duration_preference,
    applicationData.program_advisor,
    applicationData.department_chair,
    applicationData.college_secretary,
    applicationData.dean_name,
    JSON.stringify(applicationData.university_choices),
    hasApplication
  ]);

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      
      const payload = {
        semester_preference: applicationData.semester_preference,
        duration_preference: applicationData.duration_preference,
        program_advisor: applicationData.program_advisor,
        department_chair: applicationData.department_chair,
        college_secretary: applicationData.college_secretary,
        dean_name: applicationData.dean_name,
        choices: (applicationData.university_choices || []).map((c: any) => ({
          rank: c.university_choice_rank,
          name: c.university_name,
        })),
        has_application_form: applicationData.has_application_form ? 1 : 0,
        has_cv: applicationData.has_cv ? 1 : 0,
        has_tcg: applicationData.has_tcg ? 1 : 0,
        has_recommendation_letter: applicationData.has_recommendation_letter ? 1 : 0,
        has_essay: applicationData.has_essay ? 1 : 0,
        has_form_5: applicationData.has_form_5 ? 1 : 0,
        has_valid_passport: applicationData.has_valid_passport ? 1 : 0,
        has_online_application_form: applicationData.has_online_application_form ? 1 : 0,
      };

      if (!payload.semester_preference || !payload.duration_preference || payload.choices.length === 0) {
        alert("Please fill out preferences and at least one university choice.");
        setIsSubmitting(false);
        return;
      }
      
      await apiFetch("/api/v1/applications/me", {
        method: "POST",
        body: JSON.stringify(payload)
      });
      
      // Check and add default languages if the student has none
      try {
        const langRes = await apiFetch("/api/v1/students/me/languages");
        if (langRes.data && langRes.data.length === 0) {
          await apiFetch("/api/v1/students/me/languages", {
            method: "POST",
            body: JSON.stringify({ name: "English", level: "C2" })
          });
          await apiFetch("/api/v1/students/me/languages", {
            method: "POST",
            body: JSON.stringify({ name: "Filipino", level: "Native" })
          });
          mutate("/api/v1/students/me/languages");
        }
      } catch (e) {
        console.error("Failed to add default languages", e);
      }

      mutate("/api/v1/applications/me");
      alert("Application submitted successfully");
      router.push("/dashboard");
    } catch (e: any) {
      alert(e.message || "Failed to submit application");
    } finally {
      setIsSubmitting(false);
    }
  };

  const updatePreference = (key: string, value: string) => {
    setApplicationData({ ...applicationData, [key]: value });
  };

  const updateChoice = (rank: number, name: string) => {
    const choices = [...(applicationData.university_choices || [])];
    const index = choices.findIndex(c => c.university_choice_rank === rank);
    if (index >= 0) {
      choices[index].university_name = name;
    } else {
      choices.push({ university_choice_rank: rank, university_name: name });
    }
    setApplicationData({ ...applicationData, university_choices: choices });
  };

  return (
    <>
      <div className="p-8 space-y-10">
        <form className="max-w-5xl mx-auto space-y-10 relative">
          <ApplicationPreferences 
            targetSemester={applicationData?.semester_preference || "Spring"} 
            duration={applicationData?.duration_preference || "1 Semester"} 
            onChange={updatePreference}
          />
          <UniversityChoices 
            choices={applicationData?.university_choices || []} 
            onChange={updateChoice}
          />

          <div className="pointer-events-auto">
            <EventsAttended isEditing={true} />
          </div>
          
          <div className="pointer-events-auto">
            <LanguageProficiencies />
          </div>
          
          <div className="pointer-events-auto">
            <DocumentsChecklist 
              application={applicationData} 
              onUpdate={(key, value) => setApplicationData({ ...applicationData, [key]: value })}
            />
          </div>

          <EndorsementDetails
            data={{
              program_advisor: applicationData.program_advisor,
              department_chair: applicationData.department_chair,
              college_secretary: applicationData.college_secretary,
              dean_name: applicationData.dean_name,
            }}
            onChange={(key, value) => setApplicationData({ ...applicationData, [key]: value })}
          />
          
          {/* Spacer for fixed footer ONLY if footer is visible */}
      {!hasApplication && <div className="h-10"></div>}
        </form>
      </div>

      {/* Sticky Bottom Bar */}
      {!hasApplication && (
        <footer className="sticky bottom-0 w-full h-20 bg-surface border-t border-outline-variant px-8 flex items-center justify-between shadow-[0_-4px_12px_rgba(0,0,0,0.05)] z-40">
          <div className="flex items-center gap-2 text-on-surface-variant">
            <Info className="h-[18px] w-[18px]" />
            <p className="font-label-md text-label-md">New Application</p>
          </div>
          
          <div className="flex items-center gap-4">
            <button 
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="px-8 py-3 bg-primary text-on-primary rounded-xl font-bold hover:bg-primary/90 transition-all active:scale-95 shadow-md flex items-center gap-2 disabled:opacity-50"
            >
              <FileText className="h-5 w-5" />
              {isSubmitting ? "Submitting..." : "Submit Application"}
            </button>
          </div>
        </footer>
      )}
    </>
  );
}
