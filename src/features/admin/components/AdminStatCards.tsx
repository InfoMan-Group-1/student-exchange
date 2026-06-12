import { Users, CalendarDays, Star, FileClock } from "lucide-react";
import { AdminStats } from "@/lib/types/admin";

export function AdminStatCards({ stats }: { stats: AdminStats }) {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Card 1: Applicants */}
      <div className="bg-surface p-card-padding rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.05)] border border-outline-variant/30 flex flex-col justify-between group hover:border-primary/20 transition-all">
        <div className="flex justify-between items-start">
          <div className="p-2 bg-primary/5 rounded-lg text-primary">
            <Users className="h-6 w-6" />
          </div>
          <span className="text-secondary font-label-sm">{stats.totalApplicantsChange}</span>
        </div>
        <div className="mt-4">
          <p className="font-label-md text-on-surface-variant">Total applicants</p>
          <h3 className="font-display-lg text-[36px] text-primary mt-1">{stats.totalApplicants}</h3>
        </div>
      </div>

      {/* Card 2: Avg Age */}
      <div className="bg-surface p-card-padding rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.05)] border border-outline-variant/30 flex flex-col justify-between group hover:border-primary/20 transition-all">
        <div className="flex justify-between items-start">
          <div className="p-2 bg-primary/5 rounded-lg text-primary">
            <CalendarDays className="h-6 w-6" />
          </div>
          <span className="text-on-tertiary-container font-label-sm">{stats.avgAgeStatus}</span>
        </div>
        <div className="mt-4">
          <p className="font-label-md text-on-surface-variant">Avg age</p>
          <h3 className="font-display-lg text-[36px] text-primary mt-1">{stats.avgAge}</h3>
        </div>
      </div>

      {/* Card 3: Best GWA */}
      <div className="bg-surface p-card-padding rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.05)] border border-outline-variant/30 flex flex-col justify-between group hover:border-primary/20 transition-all">
        <div className="flex justify-between items-start">
          <div className="p-2 bg-primary/5 rounded-lg text-primary">
            <Star className="h-6 w-6" />
          </div>
          <span className="text-secondary font-label-sm">{stats.bestGwaStatus}</span>
        </div>
        <div className="mt-4">
          <p className="font-label-md text-on-surface-variant">Best GWA</p>
          <h3 className="font-display-lg text-[36px] text-primary mt-1">{stats.bestGwa}</h3>
        </div>
      </div>

      {/* Card 4: Incomplete Apps */}
      <div className="bg-surface p-card-padding rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.05)] border border-outline-variant/30 flex flex-col justify-between group hover:border-primary/20 transition-all">
        <div className="flex justify-between items-start">
          <div className="p-2 bg-error/5 rounded-lg text-error">
            <FileClock className="h-6 w-6" />
          </div>
          <span className="text-error font-label-sm">{stats.incompleteAppsStatus}</span>
        </div>
        <div className="mt-4">
          <p className="font-label-md text-on-surface-variant">Incomplete apps</p>
          <h3 className="font-display-lg text-[36px] text-primary mt-1">{stats.incompleteApps}</h3>
        </div>
      </div>
    </section>
  );
}
