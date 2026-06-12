"use client";

import { CheckCircle2, Eye } from "lucide-react";
import { apiFetch } from "@/lib/api-client";
import { mutate } from "swr";
import { useState } from "react";

interface Props {
  application: any;
}

export function DocumentsChecklist({ application }: Props) {
  const documents = [
    { key: "has_application_form", name: "Application Form", desc: "Validated by the University Registrar" },
    { key: "has_cv", name: "Curriculum Vitae", desc: "Standard format" },
    { key: "has_tcg", name: "True Copy of Grades", desc: "Verified true copy" },
    { key: "has_recommendation_letter", name: "Recommendation Letter", desc: "From faculty" },
    { key: "has_medical_certificate", name: "Medical Certificate", desc: "Fit to travel" },
    { key: "has_consent_form", name: "Consent Form", desc: "Parent/Guardian consent" },
    { key: "has_study_plan", name: "Study Plan", desc: "Signed by Department Chairperson" },
    { key: "has_valid_passport", name: "Passport Copy", desc: "Valid for at least 12 months" },
  ];

  const [toggling, setToggling] = useState<string | null>(null);

  const toggleStatus = async (key: string, currentValue: boolean) => {
    try {
      setToggling(key);
      const payload = { [key]: !currentValue };
      const res = await apiFetch("/api/v1/applications/me", {
        method: "PATCH",
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        mutate("/api/v1/applications/me");
      }
    } catch (e) {
      alert("Failed to update document status");
    } finally {
      setToggling(null);
    }
  };

  return (
    <section className="bg-surface rounded-xl shadow-[0px_2px_4px_rgba(0,0,0,0.05)] border border-outline-variant/30 p-card-padding">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-primary-container/10 flex items-center justify-center text-primary">
          <CheckCircle2 className="h-6 w-6" />
        </div>
        <h3 className="font-title-lg text-title-lg text-primary">3. Documents Checklist</h3>
      </div>
      
      <div className="space-y-4">
        {documents.map((doc) => {
          const isChecked = !!application[doc.key];
          
          return (
            <label 
              key={doc.key}
              className={`flex items-center gap-4 p-3 hover:bg-surface-container-low rounded-lg transition-colors group ${toggling === doc.key ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
            >
              <input 
                type="checkbox" 
                checked={isChecked}
                disabled={toggling === doc.key}
                onChange={() => toggleStatus(doc.key, isChecked)}
                className="w-5 h-5 rounded border-outline text-primary focus:ring-primary focus:ring-offset-0 disabled:opacity-50"
              />
              <div className={`flex-1 transition-colors ${isChecked ? "text-on-surface" : "text-on-surface-variant"}`}>
                <p className="font-label-md text-label-md font-bold">{doc.name}</p>
                <p className="text-[12px] opacity-80">{doc.desc}</p>
              </div>
              <Eye className="h-5 w-5 text-secondary opacity-0 group-hover:opacity-100 transition-opacity" />
            </label>
          );
        })}
      </div>
    </section>
  );
}
