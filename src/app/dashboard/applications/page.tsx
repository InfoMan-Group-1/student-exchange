"use client";

import useSWR from "swr";
import { fetcher } from "@/lib/api-client";
import { ApplicationForm } from "@/features/applications/components/ApplicationForm";

export default function ApplicationsPage() {
  const { data: response, error, isLoading } = useSWR("/api/v1/applications/me", fetcher);

  if (isLoading) return <div className="p-8 text-center text-on-surface-variant animate-pulse">Loading application data...</div>;
  if (error) return <div className="p-8 text-center text-error">Failed to load application data.</div>;

  return <ApplicationForm data={response?.data} />;
}
