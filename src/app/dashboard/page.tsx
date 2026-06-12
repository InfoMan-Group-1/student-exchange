"use client";

import useSWR from "swr";
import { fetcher } from "@/lib/api-client";
import { ApplicationOverviewCard } from "@/features/dashboard/components/ApplicationOverviewCard";
import { BriefStats } from "@/features/dashboard/components/BriefStats";
import { ApplicationChecklist } from "@/features/dashboard/components/ApplicationChecklist";
import { ProgramSelectionCard } from "@/features/dashboard/components/ProgramSelectionCard";

export default function DashboardPage() {
  const { data: response, error, isLoading } = useSWR("/api/v1/applications/me", fetcher);

  if (isLoading) return <div className="p-8 text-center text-on-surface-variant animate-pulse">Loading dashboard...</div>;
  if (error || !response?.data) return <div className="p-8 text-center text-error">Failed to load dashboard. You might not have an application yet.</div>;

  const data = response.data;

  return (
    <div className="p-8 max-w-6xl mx-auto w-full space-y-stack-lg">
      {/* Status Card & Primary CTA */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ApplicationOverviewCard application={data} />
        <BriefStats application={data} />
      </section>

      {/* Main Layout: Bento Style */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Checklist (Large Column) */}
        <ApplicationChecklist application={data} />

        {/* Secondary Info (Right Column) */}
        <div className="lg:col-span-4 space-y-6">
          <h3 className="font-headline-md text-headline-md text-primary px-2">
            Program Selection
          </h3>
          <ProgramSelectionCard choices={data.university_choices} />
        </div>
      </section>
    </div>
  );
}
