import { Calendar, BellRing } from "lucide-react";

export function AnnouncementsSidebar() {
  return (
    <div className="bg-surface p-card-padding rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.05)] border border-outline-variant/30 flex flex-col gap-6">
      <div>
        <h3 className="font-title-lg text-title-lg text-primary mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5" /> Upcoming Deadlines
        </h3>
        <div className="space-y-3">
          <div className="p-3 bg-error-container text-on-error-container rounded-lg border border-error/20">
            <p className="text-[11px] font-bold uppercase tracking-widest mb-1">Aug 30, 2024</p>
            <p className="font-label-md">Submit Form 5 (Enrollment)</p>
          </div>
          <div className="p-3 bg-surface-container-low rounded-lg border border-outline-variant/50">
            <p className="text-[11px] font-bold text-on-surface-variant uppercase tracking-widest mb-1">Sept 2, 2024</p>
            <p className="font-label-md text-on-surface">Visa Application Workshop</p>
          </div>
        </div>
      </div>

      <hr className="border-outline-variant/30" />

      <div>
        <h3 className="font-title-lg text-title-lg text-primary mb-4 flex items-center gap-2">
          <BellRing className="w-5 h-5" /> Global Relations News
        </h3>
        <div className="space-y-4">
          <div className="group cursor-pointer">
            <p className="font-label-md text-on-surface group-hover:text-primary transition-colors">JASSO Scholarship Slots Open</p>
            <p className="text-[12px] text-on-surface-variant line-clamp-2 mt-1">
              For students applying to Japanese partner universities, the JASSO scholarship is now accepting pre-applications...
            </p>
          </div>
          <div className="group cursor-pointer">
            <p className="font-label-md text-on-surface group-hover:text-primary transition-colors">New Partner: University of Malaya</p>
            <p className="text-[12px] text-on-surface-variant line-clamp-2 mt-1">
              We are excited to announce a new student exchange agreement with UM for IT and Business students...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
