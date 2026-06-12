import { User } from "lucide-react";
import { ApplicationDetailData } from "@/lib/types/admin";

export function StudentSummary({ info }: { info: ApplicationDetailData }) {
  return (
    <section className="bg-surface rounded-xl p-card-padding shadow-[0_2px_4px_rgba(0,0,0,0.05)] border border-outline-variant">
      <h3 className="font-title-lg text-primary mb-4 flex items-center gap-2">
        <User className="h-6 w-6 text-secondary" />
        Student Summary
      </h3>
      <div className="space-y-4">
        <div>
          <p className="font-label-sm text-on-tertiary-container uppercase">Personal Email</p>
          <p className="font-body-md text-on-surface">{info.school_email}</p>
        </div>
        <div>
          <p className="font-label-sm text-on-tertiary-container uppercase">Contact Number</p>
          <p className="font-body-md text-on-surface">{info.mobile_number}</p>
        </div>
        <div>
          <p className="font-label-sm text-on-tertiary-container uppercase">Current GWA</p>
          <p className="font-body-md text-on-surface">{info.cumulative_gwa}</p>
        </div>
        <div className="pt-4 border-t border-outline-variant">
          <p className="font-label-sm text-on-tertiary-container uppercase mb-2">Home Address</p>
          <p className="font-body-md text-on-surface leading-relaxed">{info.home_address}</p>
        </div>
      </div>
    </section>
  );
}
