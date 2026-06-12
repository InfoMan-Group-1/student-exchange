"use client";

import { Info } from "lucide-react";
import { ApplicationPreferences } from "./ApplicationPreferences";
import { UniversityChoices } from "./UniversityChoices";
import { DocumentsChecklist } from "./DocumentsChecklist";
import { LanguageProficiencies } from "./LanguageProficiencies";
import { useState } from "react";
import { apiFetch } from "@/lib/api-client";
import { mutate } from "swr";

export function ApplicationForm({ data }: { data: any }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [applicationData, setApplicationData] = useState(data);

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      
      const payload = {
        semester_preference: applicationData.semester_preference,
        duration_preference: applicationData.duration_preference,
        choices: applicationData.university_choices.map((c: any) => ({
          rank: c.university_choice_rank,
          name: c.university_name,
        })),
        // Document toggles are automatically updated via DocumentsChecklist immediately
      };
      
      const res = await apiFetch("/api/v1/applications/me", {
        method: "PATCH",
        body: JSON.stringify(payload)
      });
      
      if (!res.ok) throw new Error("Failed to save");
      
      // Revalidate to ensure UI is in sync
      mutate("/api/v1/applications/me");
      alert("Application saved successfully");
    } catch (e) {
      alert("Failed to save application");
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
      <div className="flex-1 overflow-y-auto p-8 pb-32 space-y-10">
        <form className="max-w-5xl mx-auto space-y-10">
          <ApplicationPreferences 
            targetSemester={applicationData?.semester_preference || "1st Semester"} 
            duration={applicationData?.duration_preference || "1 Semester"} 
            onChange={updatePreference}
          />
          
          <UniversityChoices 
            choices={applicationData?.university_choices || []} 
            onChange={updateChoice}
          />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <DocumentsChecklist application={applicationData} />
            {/* Keeping Languages purely client-side for now as it's not fully modeled in the DB yet */}
            <LanguageProficiencies initialLanguages={[]} />
          </div>
          
          <div className="h-10"></div> {/* Spacer for fixed footer */}
        </form>
      </div>

      {/* Sticky Bottom Bar */}
      <footer className="fixed bottom-0 left-[280px] right-0 h-20 bg-surface border-t border-outline-variant px-8 flex items-center justify-between shadow-[0_-4px_12px_rgba(0,0,0,0.05)] z-40">
        <div className="flex items-center gap-2 text-on-surface-variant">
          <Info className="h-[18px] w-[18px]" />
          <p className="font-label-md text-label-md">Last autosaved at 14:32 PM</p>
        </div>
        
        <div className="flex items-center gap-4">
          <button 
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="px-8 py-3 border border-primary text-primary font-label-md text-label-md rounded-lg hover:bg-primary-container/5 transition-all active:scale-95 disabled:opacity-50"
          >
            {isSubmitting ? "Saving..." : "Save application"}
          </button>
        </div>
      </footer>
    </>
  );
}
