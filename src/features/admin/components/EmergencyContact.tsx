import { HeartPulse } from "lucide-react";
import { ApplicationDetailData } from "@/lib/mockAdminData";

export function EmergencyContact({ contact }: { contact: ApplicationDetailData["emergencyContact"] }) {
  return (
    <section className="bg-surface rounded-xl p-card-padding shadow-[0_2px_4px_rgba(0,0,0,0.05)] border border-outline-variant">
      <h3 className="font-title-lg text-primary mb-4 flex items-center gap-2">
        <HeartPulse className="h-6 w-6 text-secondary" />
        Emergency Contact
      </h3>
      <div className="space-y-4">
        <div>
          <p className="font-label-sm text-on-tertiary-container uppercase">Name</p>
          <p className="font-body-md text-on-surface">{contact.name}</p>
        </div>
        <div>
          <p className="font-label-sm text-on-tertiary-container uppercase">Relationship</p>
          <p className="font-body-md text-on-surface">{contact.relationship}</p>
        </div>
        <div>
          <p className="font-label-sm text-on-tertiary-container uppercase">Phone Number</p>
          <p className="font-body-md text-on-surface">{contact.phoneNumber}</p>
        </div>
      </div>
    </section>
  );
}
