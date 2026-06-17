import { HeartPulse } from "lucide-react";
import { ApplicationDetailData } from "@/lib/types/admin";

export function EmergencyContact({ info, isEditing, formData, onChange }: any) {
  return (
    <section className="bg-surface rounded-xl p-card-padding shadow-[0_2px_4px_rgba(0,0,0,0.05)] border border-outline-variant">
      <h3 className="font-title-lg text-primary mb-4 flex items-center gap-2">
        <HeartPulse className="h-6 w-6 text-secondary" />
        Emergency Contact
      </h3>
      <div className="space-y-4">
        <div>
          <p className="font-label-sm text-on-tertiary-container uppercase">Name</p>
          {isEditing ? (
            <input type="text" name="guardian_name" value={formData?.guardian_name || ''} onChange={onChange} className="w-full font-body-md text-on-surface bg-surface-container-low border border-outline px-3 py-1.5 rounded-md focus:outline-none focus:border-primary" />
          ) : (
            <p className="font-body-md text-on-surface">{info.guardian_name}</p>
          )}
        </div>
        <div>
          <p className="font-label-sm text-on-tertiary-container uppercase">Relationship</p>
          {isEditing ? (
            <input type="text" name="relationship" value={formData?.relationship || ''} onChange={onChange} className="w-full font-body-md text-on-surface bg-surface-container-low border border-outline px-3 py-1.5 rounded-md focus:outline-none focus:border-primary" />
          ) : (
            <p className="font-body-md text-on-surface">{info.relationship}</p>
          )}
        </div>
        <div>
          <p className="font-label-sm text-on-tertiary-container uppercase">Phone Number</p>
          {isEditing ? (
            <input type="text" name="guardian_contact_number" value={formData?.guardian_contact_number || ''} onChange={onChange} className="w-full font-body-md text-on-surface bg-surface-container-low border border-outline px-3 py-1.5 rounded-md focus:outline-none focus:border-primary" />
          ) : (
            <p className="font-body-md text-on-surface">{info.guardian_contact_number}</p>
          )}
        </div>
      </div>
    </section>
  );
}
