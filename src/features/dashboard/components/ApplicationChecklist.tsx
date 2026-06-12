import { CheckCircle, XCircle } from "lucide-react";
import Link from "next/link";

export function ApplicationChecklist({ application }: { application: any }) {
  const documents = [
    { key: "has_application_form", name: "Application Form", isComplete: application.has_application_form },
    { key: "has_cv", name: "Curriculum Vitae (CV)", isComplete: application.has_cv },
    { key: "has_tcg", name: "True Copy of Grades", isComplete: application.has_tcg },
    { key: "has_recommendation_letter", name: "Recommendation Letter", isComplete: application.has_recommendation_letter },
    { key: "has_essay", name: "Essay", isComplete: application.has_essay },
    { key: "has_form_5", name: "Form 5 (Enrollment)", isComplete: application.has_form_5 },
    { key: "has_valid_passport", name: "Valid Passport", isComplete: application.has_valid_passport },
    { key: "has_online_application_form", name: "Online Application Form", isComplete: application.has_online_application_form },
  ];

  return (
    <div className="space-y-4">
      <h3 className="font-headline-md text-headline-md text-primary px-2">
        Application Checklist
      </h3>
      <div className="grid grid-cols-2 gap-3">
        {documents.map((item) => {
          const isDone = item.isComplete;

          return (
            <div
              key={item.key}
              className={`flex items-center gap-3 p-4 rounded-xl border transition-all duration-200 ${
                isDone
                  ? "bg-surface border-outline-variant/30"
                  : "bg-surface-container-lowest border-error/20"
              }`}
            >
              <div className="shrink-0">
                {isDone ? (
                  <CheckCircle className="text-green-600 h-5 w-5" />
                ) : (
                  <XCircle className="text-error h-5 w-5" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-label-md text-label-md text-on-surface truncate">{item.name}</p>
                <p className={`text-xs ${isDone ? "text-on-surface-variant" : "text-error"}`}>
                  {isDone ? "Submitted" : "Missing"}
                </p>
              </div>
              {!isDone && (
                <Link
                  href="/dashboard/applications"
                  className="shrink-0 bg-primary text-white px-3 py-1 rounded-md text-xs font-bold hover:opacity-90"
                >
                  Upload
                </Link>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
