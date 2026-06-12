"use client";

import { Stamp } from "lucide-react";

interface Props {
  data: {
    program_advisor?: string;
    department_chair?: string;
    college_secretary?: string;
    dean_name?: string;
  };
  onChange: (key: string, value: string) => void;
}

const fields = [
  { key: "program_advisor",    label: "Program Advisor",    placeholder: "e.g. Dr. Juan Dela Cruz" },
  { key: "department_chair",   label: "Department Chair",   placeholder: "e.g. Dr. Maria Santos" },
  { key: "college_secretary",  label: "College Secretary",  placeholder: "e.g. Ms. Ana Reyes" },
  { key: "dean_name",          label: "Dean",               placeholder: "e.g. Dr. Roberto Lopez" },
];

export function EndorsementDetails({ data, onChange }: Props) {
  return (
    <section className="bg-surface rounded-xl shadow-[0px_2px_4px_rgba(0,0,0,0.05)] border border-outline-variant/30 p-card-padding">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-primary-container/10 flex items-center justify-center text-primary">
          <Stamp className="h-6 w-6" />
        </div>
        <div>
          <h3 className="font-title-lg text-title-lg text-primary">5. Endorsement Details</h3>
          <p className="font-label-sm text-on-surface-variant">Signatories required for the application form</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {fields.map(({ key, label, placeholder }) => (
          <div key={key} className="space-y-2">
            <label className="font-label-md text-label-md text-on-surface-variant">{label}</label>
            <input
              type="text"
              value={(data as any)[key] ?? ""}
              onChange={(e) => onChange(key, e.target.value)}
              placeholder={placeholder}
              className="w-full bg-surface-container-low border border-outline rounded-lg px-4 py-3 font-body-md text-body-md focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
