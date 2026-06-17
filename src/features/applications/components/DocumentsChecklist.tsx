"use client";

import { CheckCircle2, Eye } from "lucide-react";
import { apiFetch } from "@/lib/api-client";
import { mutate } from "swr";
import { useState } from "react";

interface Props {
  application: any;
  onUpdate?: (key: string, value: boolean) => void;
}

export function DocumentsChecklist({ application, onUpdate }: Props) {
  const documents = [
    { key: "has_application_form", name: "Application Form", desc: "Hardcopy sent to the school" },
    { key: "has_cv", name: "Curriculum Vitae (CV)", desc: "Standard format" },
    { key: "has_tcg", name: "True Copy of Grades", desc: "Verified true copy" },
    { key: "has_recommendation_letter", name: "Recommendation Letter", desc: "From faculty" },
    { key: "has_essay", name: "Essay", desc: "Signed by Department Chairperson" },
    { key: "has_form_5", name: "Form 5 (Enrollment)", desc: "Latest enrollment form" },
    { key: "has_valid_passport", name: "Passport Copy", desc: "Valid for at least 12 months" },
    { key: "has_online_application_form", name: "Online Application Form", desc: "Partner university form" },
  ];

  const [toggling, setToggling] = useState<string | null>(null);

  const toggleStatus = async (key: string, currentValue: boolean) => {
    try {
      setToggling(key);
      const payload = { [key]: !currentValue };
      await apiFetch("/api/v1/applications/me", {
        method: "PATCH",
        body: JSON.stringify(payload)
      });
      // Immediately update parent local state for real-time reflection
      if (onUpdate) {
        onUpdate(key, !currentValue);
      }
      mutate("/api/v1/applications/me");
    } catch (e) {
      alert("Failed to update document status");
    } finally {
      setToggling(null);
    }
  };

  return (
    <section className={`bg-surface rounded-xl shadow-[0px_2px_4px_rgba(0,0,0,0.05)] border border-outline-variant/30 p-card-padding relative ${!application.application_id ? 'opacity-70 pointer-events-none' : ''}`}>
      {!application.application_id && (
        <div className="absolute inset-0 bg-surface/50 z-10 flex items-center justify-center rounded-xl backdrop-blur-[1px]">
          <div className="bg-surface px-4 py-2 rounded-lg shadow-sm border border-outline-variant font-label-md text-on-surface-variant">
            Please submit the application first to enable the checklist.
          </div>
        </div>
      )}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-primary-container/10 flex items-center justify-center text-primary">
          <CheckCircle2 className="h-6 w-6" />
        </div>
        <h3 className="font-title-lg text-title-lg text-primary">4. Documents Checklist</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {documents.map((doc) => {
          const isChecked = !!application[doc.key];
          
          return (
            <label 
              key={doc.key}
              className={`flex items-start gap-4 p-4 rounded-lg border transition-all group ${
                isChecked ? "border-primary bg-primary-container/5" : "border-outline-variant/50 bg-surface"
              } ${toggling === doc.key ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:border-primary/50"}`}
            >
              <div className="pt-0.5">
                <input 
                  type="checkbox" 
                  checked={isChecked}
                  disabled={toggling === doc.key}
                  onChange={() => toggleStatus(doc.key, isChecked)}
                  className="w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary/20 transition-all cursor-pointer disabled:opacity-50"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className={`font-label-lg text-label-lg mb-1 truncate ${isChecked ? "text-primary font-bold" : "text-on-surface"}`} title={doc.name}>{doc.name}</p>
                <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2" title={doc.desc}>{doc.desc}</p>
              </div>
              <Eye className="h-5 w-5 text-secondary opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
            </label>
          );
        })}
      </div>
    </section>
  );
}
