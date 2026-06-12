import { getStudentDashboardData } from "@/lib/mockStudentData";
import { ApplicationOverviewCard } from "@/features/dashboard/components/ApplicationOverviewCard";
import { BriefStats } from "@/features/dashboard/components/BriefStats";
import { ApplicationChecklist } from "@/features/dashboard/components/ApplicationChecklist";
import { ProgramSelectionCard } from "@/features/dashboard/components/ProgramSelectionCard";
import { DeadlineCard } from "@/features/dashboard/components/DeadlineCard";

export default async function DashboardPage() {
  const data = await getStudentDashboardData();

  return (
    <div className="p-8 max-w-6xl mx-auto w-full space-y-stack-lg">
      {/* Status Card & Primary CTA */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ApplicationOverviewCard application={data.application} />
        <BriefStats application={data.application} />
      </section>

      {/* Main Layout: Bento Style */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Checklist (Large Column) */}
        <ApplicationChecklist items={data.checklist} />

        {/* Secondary Info (Right Column) */}
        <div className="lg:col-span-4 space-y-6">
          <h3 className="font-headline-md text-headline-md text-primary px-2">
            Program Selection
          </h3>
          <ProgramSelectionCard choice={data.primaryChoice} />
          <DeadlineCard application={data.application} />
        </div>
      </section>
    </div>
  );
}
