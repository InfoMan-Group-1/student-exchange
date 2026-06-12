"use client";

import { useState } from "react";
import useSWR from "swr";
import { fetcher } from "@/lib/api-client";
import { ApplicantsToolbar } from "@/features/admin/components/ApplicantsToolbar";
import { ApplicantsTable } from "@/features/admin/components/ApplicantsTable";
import { ApplicantsQuickStats } from "@/features/admin/components/ApplicantsQuickStats";

export default function ApplicantsPage() {
  const { data, error, isLoading } = useSWR("/api/v1/applications", fetcher);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All Status");

  if (isLoading) return <div className="p-8 text-center text-on-surface-variant animate-pulse">Loading applicants...</div>;
  if (error) return <div className="p-8 text-center text-error">Failed to load applicants.</div>;

  const applicants = data?.data ?? [];

  return (
    <div className="p-8 space-y-6 max-w-7xl mx-auto pb-12">
      <ApplicantsToolbar
        search={search}
        filterStatus={filterStatus}
        onSearchChange={setSearch}
        onStatusChange={setFilterStatus}
      />
      <ApplicantsTable
        applicants={applicants}
        search={search}
        filterStatus={filterStatus}
      />
      <ApplicantsQuickStats stats={{
        totalApplicants: applicants.length,
        reviewedApplications: applicants.filter((a: any) => a.is_complete).length,
        priorityAttention: applicants.filter((a: any) => !a.is_complete).length,
      }} />
    </div>
  );
}
