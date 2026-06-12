import { FileCheck, CheckCircle2, XCircle, Eye } from "lucide-react";
import { ApplicationDetailData } from "@/lib/mockAdminData";

export function AdminDocumentsChecklist({ detail }: { detail: ApplicationDetailData }) {
  const documents = [
    { name: "Application Form", isComplete: detail.has_application_form },
    { name: "Curriculum Vitae", isComplete: detail.has_cv },
    { name: "True Copy of Grades", isComplete: detail.has_tcg },
    { name: "Recommendation Letter", isComplete: detail.has_recommendation_letter },
    { name: "Essay / Letter of Intent", isComplete: detail.has_essay },
    { name: "Form 5 / Reg Card", isComplete: detail.has_form_5 },
    { name: "Valid Passport", isComplete: detail.has_valid_passport },
    { name: "Online Application Form", isComplete: detail.has_online_application_form },
  ];

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
              <div className="flex items-center gap-3">
                {isComplete ? (
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                ) : (
                  <XCircle className="h-5 w-5 text-error" />
                )}
                <span className="font-body-md">{doc.name}</span>
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
