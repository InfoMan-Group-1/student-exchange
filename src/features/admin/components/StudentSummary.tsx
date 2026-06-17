import { User } from "lucide-react";
import { ApplicationDetailData } from "@/lib/types/admin";

export function StudentSummary({ info, isEditing, formData, onChange }: any) {
  return (
    <section className="bg-surface rounded-xl p-card-padding shadow-[0_2px_4px_rgba(0,0,0,0.05)] border border-outline-variant">
      <h3 className="font-title-lg text-primary mb-4 flex items-center gap-2">
        <User className="h-6 w-6 text-secondary" />
        Student Summary
      </h3>
      <div className="space-y-4">
        <div>
          <p className="font-label-sm text-on-tertiary-container uppercase">Personal Email</p>
          {isEditing ? (
            <input type="email" name="school_email" value={formData?.school_email || ''} onChange={onChange} className="w-full font-body-md text-on-surface bg-surface-container-low border border-outline px-3 py-1.5 rounded-md focus:outline-none focus:border-primary" />
          ) : (
            <p className="font-body-md text-on-surface">{info.school_email}</p>
          )}
        </div>
        <div>
          <p className="font-label-sm text-on-tertiary-container uppercase">Contact Number</p>
          {isEditing ? (
            <input type="text" name="mobile_number" value={formData?.mobile_number || ''} onChange={onChange} className="w-full font-body-md text-on-surface bg-surface-container-low border border-outline px-3 py-1.5 rounded-md focus:outline-none focus:border-primary" />
          ) : (
            <p className="font-body-md text-on-surface">{info.mobile_number}</p>
          )}
        </div>
        <div>
          <p className="font-label-sm text-on-tertiary-container uppercase">Current GWA</p>
          {isEditing ? (
            <input type="number" step="0.01" name="cumulative_gwa" value={formData?.cumulative_gwa || ''} onChange={onChange} className="w-full font-body-md text-on-surface bg-surface-container-low border border-outline px-3 py-1.5 rounded-md focus:outline-none focus:border-primary" />
          ) : (
            <p className="font-body-md text-on-surface">{info.cumulative_gwa}</p>
          )}
        </div>
        <div>
          <p className="font-label-sm text-on-tertiary-container uppercase">Year Level</p>
          {isEditing ? (
            <input type="text" name="year_level" value={formData?.year_level || ''} onChange={onChange} className="w-full font-body-md text-on-surface bg-surface-container-low border border-outline px-3 py-1.5 rounded-md focus:outline-none focus:border-primary" />
          ) : (
            <p className="font-body-md text-on-surface">{info.year_level || "—"}</p>
          )}
        </div>
        <div className="pt-4 border-t border-outline-variant grid grid-cols-2 gap-4">
          <div>
            <p className="font-label-sm text-on-tertiary-container uppercase">Passport Issue</p>
            {isEditing ? (
              <input type="date" name="passport_issue_date" value={formData?.passport_issue_date ? new Date(formData.passport_issue_date).toISOString().split('T')[0] : ''} onChange={onChange} className="w-full font-body-md text-on-surface bg-surface-container-low border border-outline px-3 py-1.5 rounded-md focus:outline-none focus:border-primary" />
            ) : (
              <p className="font-body-md text-on-surface">{info.passport_issue_date ? new Date(info.passport_issue_date).toLocaleDateString() : "—"}</p>
            )}
          </div>
          <div>
            <p className="font-label-sm text-on-tertiary-container uppercase">Passport Expiry</p>
            {isEditing ? (
              <input type="date" name="passport_expiry_date" value={formData?.passport_expiry_date ? new Date(formData.passport_expiry_date).toISOString().split('T')[0] : ''} onChange={onChange} className="w-full font-body-md text-on-surface bg-surface-container-low border border-outline px-3 py-1.5 rounded-md focus:outline-none focus:border-primary" />
            ) : (
              <p className="font-body-md text-on-surface">{info.passport_expiry_date ? new Date(info.passport_expiry_date).toLocaleDateString() : "—"}</p>
            )}
          </div>
        </div>
        <div className="pt-4 border-t border-outline-variant">
          <p className="font-label-sm text-on-tertiary-container uppercase mb-2">Home Address</p>
          {isEditing ? (
            <textarea name="home_address" value={formData?.home_address || ''} onChange={onChange} rows={3} className="w-full font-body-md text-on-surface bg-surface-container-low border border-outline px-3 py-1.5 rounded-md focus:outline-none focus:border-primary resize-none" />
          ) : (
            <p className="font-body-md text-on-surface leading-relaxed">{info.home_address}</p>
          )}
        </div>
      </div>
    </section>
  );
}
