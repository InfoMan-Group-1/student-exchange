"use client";

import { Info, Pencil, CheckCircle } from "lucide-react";
import { ApplicationPreferences } from "./ApplicationPreferences";
import { UniversityChoices } from "./UniversityChoices";
import { DocumentsChecklist } from "./DocumentsChecklist";
import { LanguageProficiencies } from "./LanguageProficiencies";
import { EndorsementDetails } from "./EndorsementDetails";
import { useState } from "react";
import { apiFetch } from "@/lib/api-client";
import { mutate } from "swr";
import { useSearchParams } from "next/navigation";

export function ApplicationForm({ data }: { data: any }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [applicationData, setApplicationData] = useState(data || {});
  const searchParams = useSearchParams();
  const isEditMode = searchParams.get("edit") === "true";
  const [isEditing, setIsEditing] = useState(!data || isEditMode); // If data exists and not in edit mode, start in read-only

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
      };
      
      // apiFetch throws on non-2xx — no need to check res.ok
      await apiFetch("/api/v1/applications/me", {
        method: "PATCH",
        body: JSON.stringify(payload)
      });
      
      mutate("/api/v1/applications/me");
      alert("Application submitted successfully");
      setIsEditing(false);
    } catch (e: any) {
      alert(e.message || "Failed to submit application");
    } finally {
      setIsSubmitting(false);
    }
  };

  const updatePreference = (key: string, value: string) => {
    if (!isEditing) return;
    setApplicationData({ ...applicationData, [key]: value });
  };

  const updateChoice = (rank: number, name: string) => {
    if (!isEditing) return;
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
      <div className={`p-8 space-y-10 ${!isEditing ? "opacity-90 pointer-events-none" : ""}`}>
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
          
          <div className="h-10"></div> {/* Spacer for fixed footer */}
        </form>
      </div>

      {/* Sticky Bottom Bar */}
      <footer className="sticky bottom-0 w-full h-20 bg-surface border-t border-outline-variant px-8 flex items-center justify-between shadow-[0_-4px_12px_rgba(0,0,0,0.05)] z-40">
        <div className="flex items-center gap-2 text-on-surface-variant">
          {isEditing ? (
            <>
              <Info className="h-[18px] w-[18px]" />
              <p className="font-label-md text-label-md">Editing Application</p>
            </>
          ) : (
            <>
              <CheckCircle className="h-[18px] w-[18px] text-success" />
              <p className="font-label-md text-label-md text-success">Application Saved</p>
            </>
          )}
        </div>
        
        <div className="flex items-center gap-4">
          {!isEditing ? (
            <button 
              type="button"
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 px-8 py-3 border border-primary text-primary font-label-md text-label-md rounded-lg hover:bg-primary-container/5 transition-all active:scale-95"
            >
              <Pencil className="w-4 h-4" />
              Edit Application
            </button>
          ) : (
            <button 
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="px-8 py-3 bg-primary text-on-primary font-label-md text-label-md rounded-lg hover:bg-primary/90 transition-all active:scale-95 disabled:opacity-50"
            >
              {isSubmitting ? "Submitting..." : "Submit Application"}
            </button>
          )}
        </div>
      </footer>
    </>
  );
}
