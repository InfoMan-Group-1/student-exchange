import { CheckCircle, XCircle } from "lucide-react";
import Link from "next/link";

export function ApplicationChecklist({ application }: { application: any }) {
  const documents = [
    { key: "has_application_form", name: "Application Form", isComplete: application.has_application_form },
    { key: "has_cv", name: "Curriculum Vitae", isComplete: application.has_cv },
    { key: "has_tcg", name: "True Copy of Grades", isComplete: application.has_tcg },
    { key: "has_recommendation_letter", name: "Recommendation Letter", isComplete: application.has_recommendation_letter },
    { key: "has_medical_certificate", name: "Medical Certificate", isComplete: application.has_medical_certificate },
    { key: "has_consent_form", name: "Consent Form", isComplete: application.has_consent_form },
    { key: "has_study_plan", name: "Study Plan", isComplete: application.has_study_plan },
    { key: "has_valid_passport", name: "Valid Passport", isComplete: application.has_valid_passport },
  ];

  return (
    <div className="lg:col-span-8 space-y-4">
      <h3 className="font-headline-md text-headline-md text-primary px-2">
        Application Checklist
      </h3>
      <div className="bg-surface rounded-xl border border-outline-variant/30 overflow-hidden">
        <div className="divide-y divide-outline-variant/50">
          {documents.map((item) => {
            const isDone = item.isComplete;
            
            return (
              <div
                key={item.key}
                className={`flex items-center justify-between p-5 hover:bg-surface-container-low transition-all duration-200 hover:translate-x-1 ${
                  !isDone ? "bg-surface-container-lowest" : ""
                }`}
              >
                <div className="flex items-center gap-4">
                  {isDone ? (
                    <CheckCircle className="text-green-600 h-6 w-6" />
                  ) : (
                    <XCircle className="text-error h-6 w-6" />
                  )}
                  <div>
                    <p className="font-label-md text-label-md text-on-surface">
                      {item.name}
                    </p>
                    <p
                      className={`text-xs ${
                        !isDone
                          ? "text-error"
                          : "text-on-surface-variant"
                      }`}
                    >
                      {isDone ? "Submitted" : "Missing Attachment"}
                    </p>
                  </div>
                </div>
                {isDone ? (
                  <span className="text-success font-label-sm">
                    Verified
                  </span>
                ) : (
                  <Link href="/dashboard/applications" className="bg-primary text-white px-4 py-1.5 rounded-lg text-xs font-bold hover:opacity-90">
                    Upload
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
