"use client";

import { Info } from "lucide-react";
import { ApplicationData } from "@/lib/mockApplicationData";
import { ApplicationPreferences } from "./ApplicationPreferences";
import { UniversityChoices } from "./UniversityChoices";
import { DocumentsChecklist } from "./DocumentsChecklist";
import { LanguageProficiencies } from "./LanguageProficiencies";
import { ReviewSignatories } from "./ReviewSignatories";

export function ApplicationForm({ data }: { data: ApplicationData }) {
  return (
    <>
      <div className="flex-1 overflow-y-auto p-8 pb-32 space-y-10">
        <form className="max-w-5xl mx-auto space-y-10">
          <ApplicationPreferences 
            targetSemester={data.targetSemester} 
            duration={data.duration} 
          />
          
          <UniversityChoices choices={data.choices} />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <DocumentsChecklist initialDocuments={data.documents} />
            <LanguageProficiencies initialLanguages={data.languages} />
          </div>
          
          <ReviewSignatories signatures={data.signatures} />
          
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
            className="px-8 py-3 border border-primary text-primary font-label-md text-label-md rounded-lg hover:bg-primary-container/5 transition-all active:scale-95"
          >
            Save draft
          </button>
          <button 
            type="button"
            className="px-10 py-3 bg-primary text-on-primary font-label-md text-label-md font-bold rounded-lg hover:bg-primary/90 transition-all shadow-md active:scale-95"
          >
            Submit application
          </button>
        </div>
      </footer>
    </>
  );
}
