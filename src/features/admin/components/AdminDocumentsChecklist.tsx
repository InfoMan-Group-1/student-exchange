"use client";

import { useState } from "react";
import { FileCheck, CheckCircle2, XCircle, Eye } from "lucide-react";
import { apiFetch } from "@/lib/api-client";
import { mutate } from "swr";

export function AdminDocumentsChecklist({ detail }: { detail: any }) {
  const [updating, setUpdating] = useState<string | null>(null);

  const documents = [
    { key: "has_application_form", name: "Application Form", isComplete: detail.has_application_form },
    { key: "has_cv", name: "Curriculum Vitae", isComplete: detail.has_cv },
    { key: "has_tcg", name: "True Copy of Grades", isComplete: detail.has_tcg },
    { key: "has_recommendation_letter", name: "Recommendation Letter", isComplete: detail.has_recommendation_letter },
    { key: "has_essay", name: "Essay", isComplete: detail.has_essay },
    { key: "has_form_5", name: "Form 5 (Enrollment)", isComplete: detail.has_form_5 },
    { key: "has_valid_passport", name: "Passport Copy", isComplete: detail.has_valid_passport },
    { key: "has_online_application_form", name: "Online Application Form", isComplete: detail.has_online_application_form },
  ];

  const toggleDocument = async (docKey: string, currentStatus: boolean) => {
    setUpdating(docKey);
    try {
      await apiFetch(`/api/v1/applications/${detail.application_id}`, {
        method: "PATCH",
        body: JSON.stringify({ [docKey]: !currentStatus }),
      });
      // Re-fetch data
      await mutate(`/api/v1/applications/${detail.application_id}`);
    } catch (err) {
      console.error("Failed to update document status:", err);
      alert("Failed to update document status.");
    } finally {
      setUpdating(null);
    }
  };

  return (
    <section className="bg-surface rounded-xl p-card-padding shadow-[0_2px_4px_rgba(0,0,0,0.05)] border border-outline-variant">
      <h3 className="font-title-lg text-primary mb-4 flex items-center gap-2">
        <FileCheck className="h-6 w-6 text-secondary" />
        Documents Checklist
      </h3>
      <ul className="space-y-3">
        {documents.map((doc, index) => {
          const isComplete = doc.isComplete;
          
          return (
            <li key={index} className="flex items-center justify-between group">
              <div 
                className={`flex items-center gap-3 cursor-pointer ${updating === doc.key ? 'opacity-50 pointer-events-none' : ''}`}
                onClick={() => toggleDocument(doc.key, doc.isComplete)}
              >
                {isComplete ? (
                  <CheckCircle2 className="h-5 w-5 text-green-600 hover:scale-110 transition-transform" />
                ) : (
                  <XCircle className="h-5 w-5 text-error hover:scale-110 transition-transform" />
                )}
                <span className="font-body-md select-none hover:text-primary transition-colors">{doc.name}</span>
              </div>
              
              {isComplete ? (
                <button className="opacity-0 group-hover:opacity-100 text-on-tertiary-container transition-opacity hover:text-primary">
                  <Eye className="h-5 w-5" />
                </button>
              ) : (
                <span className="font-label-sm text-error">MISSING</span>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
