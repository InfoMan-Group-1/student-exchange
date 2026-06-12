import { Users, CheckCircle2, BellRing, TrendingUp } from "lucide-react";
import { ApplicantsData } from "@/lib/types/admin";

export function ApplicantsQuickStats({ stats }: { stats: ApplicantsData["stats"] }) {
  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-surface-container-low p-6 rounded-xl border border-outline-variant relative overflow-hidden group">
        <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:scale-110 transition-transform duration-500">
          <Users className="h-[120px] w-[120px]" />
        </div>
        <p className="font-label-md text-on-surface-variant mb-1">Total Applicants</p>
        <h3 className="font-display-lg text-primary">{stats.totalApplicants}</h3>
        <p className="text-[12px] text-green-600 font-bold mt-2 flex items-center gap-1">
          <TrendingUp className="h-[14px] w-[14px]" />
          +12% from last term
        </p>
      </div>

      <div className="bg-surface-container-low p-6 rounded-xl border border-outline-variant relative overflow-hidden group">
        <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:scale-110 transition-transform duration-500">
          <CheckCircle2 className="h-[120px] w-[120px]" />
        </div>
        <p className="font-label-md text-on-surface-variant mb-1">Reviewed Applications</p>
        <h3 className="font-display-lg text-secondary">{stats.reviewedApplications}</h3>
        <p className="text-[12px] text-on-surface-variant mt-2">69% completion rate</p>
      </div>

      <div className="bg-primary p-6 rounded-xl relative overflow-hidden group">
        <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-110 transition-transform duration-500 text-on-primary">
          <BellRing className="h-[120px] w-[120px]" />
        </div>
        <p className="font-label-md text-on-primary-container mb-1">Priority Attention</p>
        <h3 className="font-display-lg text-on-primary">{stats.priorityAttention}</h3>
        <p className="text-[12px] text-on-primary/60 mt-2">Requires immediate registrar action</p>
      </div>
    </section>
  );
}
