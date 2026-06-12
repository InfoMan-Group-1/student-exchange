"use client";

import useSWR from "swr";
import { fetcher } from "@/lib/api-client";
import { ApplicantsToolbar } from "@/features/admin/components/ApplicantsToolbar";
import { ApplicantsTable } from "@/features/admin/components/ApplicantsTable";
import { ApplicantsQuickStats } from "@/features/admin/components/ApplicantsQuickStats";

export default function ApplicantsPage() {
  const { data, error, isLoading } = useSWR("/api/v1/applications", fetcher);

  if (isLoading) return <div className="p-8 text-center text-on-surface-variant animate-pulse">Loading applicants...</div>;
  if (error) return <div className="p-8 text-center text-error">Failed to load applicants.</div>;

  return (
    <div className="p-8 space-y-6 max-w-7xl mx-auto pb-12">
      <ApplicantsToolbar />
      <ApplicantsTable applicants={data?.data || []} />
      <ApplicantsQuickStats stats={{ 
        totalApplicants: data?.data?.length || 0, 
        reviewedApplications: data?.data?.filter((a:any) => a.is_complete).length || 0, 
        priorityAttention: data?.data?.filter((a:any) => !a.is_complete).length || 0 
      }} />
    </div>
  );
}
