import { Stamp } from "lucide-react";

const fields = [
  { key: "program_advisor",   label: "Program Advisor" },
  { key: "department_chair",  label: "Department Chair" },
  { key: "college_secretary", label: "College Secretary" },
  { key: "dean_name",         label: "Dean" },
];

export function AdminEndorsementDetails({ detail }: { detail: any }) {
  return (
    <section className="bg-surface rounded-xl p-card-padding shadow-[0_2px_4px_rgba(0,0,0,0.05)] border border-outline-variant">
      <h3 className="font-title-lg text-primary mb-4 flex items-center gap-2">
        <Stamp className="h-6 w-6 text-secondary" />
        Endorsement Details
      </h3>
      <div className="space-y-4">
        {fields.map(({ key, label }) => (
          <div key={key}>
            <p className="font-label-sm text-on-surface-variant uppercase mb-0.5">{label}</p>
            <p className="font-body-md text-on-surface">
              {detail[key] || <span className="italic text-on-surface-variant opacity-60">Not provided</span>}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
