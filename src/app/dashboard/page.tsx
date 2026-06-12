"use client";

import { useState } from "react";
import useSWR from "swr";
import { fetcher, apiFetch } from "@/lib/api-client";
import { ApplicationOverviewCard } from "@/features/dashboard/components/ApplicationOverviewCard";
import { BriefStats } from "@/features/dashboard/components/BriefStats";
import { ApplicationChecklist } from "@/features/dashboard/components/ApplicationChecklist";
import { ProgramSelectionCard } from "@/features/dashboard/components/ProgramSelectionCard";
import { FileText, ArrowRight } from "lucide-react";

export default function DashboardPage() {
  const { data: response, error, isLoading, mutate } = useSWR("/api/v1/applications/me", fetcher);
  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState("");

  const handleCreateApplication = async () => {
    setCreating(true);
    setCreateError("");
    try {
      await apiFetch("/api/v1/applications/me", {
        method: "POST",
        body: JSON.stringify({}),
      });
      mutate(); // re-fetch after creating
    } catch (err: any) {
      setCreateError(err.message || "Failed to create application.");
      setCreating(false);
    }
  };

  if (isLoading) {
    return (
      <div className="p-8 text-center text-on-surface-variant animate-pulse">
        Loading dashboard...
      </div>
    );
  }

  // No application yet — show empty state with CTA
  if (error || !response?.data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 text-center">
        <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
          <FileText className="w-10 h-10 text-primary" />
        </div>
        <h2 className="font-headline-md text-headline-md text-on-surface font-bold mb-3">
          No Application Yet
        </h2>
        <p className="font-body-md text-on-surface-variant max-w-sm mb-8">
          You haven't started an exchange application. Click below to create your application and begin the process.
        </p>
        {createError && (
          <p className="text-error font-label-md mb-4">{createError}</p>
        )}
        <button
          onClick={handleCreateApplication}
          disabled={creating}
          className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-on-primary font-label-md py-3 px-8 rounded-xl transition-all active:scale-[0.98] shadow-sm hover:shadow disabled:opacity-50 group"
        >
          {creating ? "Creating..." : "Start My Application"}
          {!creating && <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
        </button>
      </div>
    );
  }

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
