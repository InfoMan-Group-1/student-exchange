import { Application } from "@/lib/mockStudentData";

export function BriefStats({ application }: { application: any }) {
  // Count boolean flags for documents
  const documentKeys = [
    'has_application_form', 'has_cv', 'has_tcg', 'has_recommendation_letter',
    'has_medical_certificate', 'has_consent_form', 'has_study_plan', 'has_valid_passport'
  ];
  const uploadedCount = documentKeys.filter(key => application[key]).length;
  const totalCount = documentKeys.length;

  return (
    <div className="bg-surface p-card-padding rounded-xl border border-outline-variant/30 shadow-[0_4px_12px_rgba(0,0,0,0.05)] flex flex-col justify-between">
      <div className="grid grid-cols-3 gap-2 text-center h-full items-center">
        <div className="flex flex-col">
          <span className="text-on-surface-variant font-label-sm">Semester</span>
          <span className="font-title-lg text-primary">{application.semester_preference || "N/A"}</span>
        </div>
        <div className="flex flex-col border-x border-outline-variant">
          <span className="text-on-surface-variant font-label-sm">Duration</span>
          <span className="font-title-lg text-primary">{application.duration_preference || "N/A"}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-on-surface-variant font-label-sm">Documents</span>
          <span className="font-title-lg text-primary">
            {uploadedCount}/{totalCount}
          </span>
        </div>
      </div>
    </div>
  );
}
