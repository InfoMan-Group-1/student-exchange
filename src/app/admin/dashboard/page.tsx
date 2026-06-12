"use client";

import { Download } from "lucide-react";
import useSWR from "swr";
import { fetcher } from "@/lib/api-client";
import { AdminStatCards } from "@/features/admin/components/AdminStatCards";
import { ApplicationsChart } from "@/features/admin/components/ApplicationsChart";
import { RecentAlerts } from "@/features/admin/components/RecentAlerts";
import { IncompleteApplicationsTable } from "@/features/admin/components/IncompleteApplicationsTable";
import { getAdminDashboardData } from "@/lib/mockAdminData"; // Fallback for alerts/chart

export default function AdminDashboardPage() {
  const { data, error, isLoading } = useSWR("/api/v1/admin/dashboard", fetcher);

  if (isLoading) return <div className="p-8 text-center text-on-surface-variant font-body-lg animate-pulse">Loading dashboard...</div>;
  if (error) return <div className="p-8 text-center text-error font-body-lg">Failed to load dashboard data.</div>;
  
  return (
    <div className="p-container-padding space-y-stack-lg max-w-7xl mx-auto pb-12">
      <section className="flex items-end justify-between">
        <div>
          <h1 className="font-headline-lg text-headline-lg text-primary">Dashboard</h1>
          <p className="font-body-md text-on-surface-variant mt-1">Overview of the current exchange application cycle.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 border border-outline text-primary font-label-md rounded-lg flex items-center gap-2 hover:bg-surface-container transition-colors active:scale-95">
            <Download className="h-5 w-5" />
            Export Report
          </button>
        </div>
      </section>

      <AdminStatCards stats={{
        totalApplicants: data?.stats?.totalApplicants || 0,
        totalApplicantsChange: "+0% vs LY",
        avgAge: 20,
        avgAgeStatus: "Stable",
        bestGwa: data?.stats?.averageGwa || 0,
        bestGwaStatus: "Average",
        incompleteApps: data?.stats?.incompleteApplications || 0,
        incompleteAppsStatus: "Action Required"
      }} />

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <ApplicationsChart />
        <RecentAlerts alerts={[
          { id: "1", type: "info", title: "System Update", description: "Admin Dashboard APIs are now connected." }
        ]} />
      </section>

      <IncompleteApplicationsTable apps={data?.recentIncomplete || []} />

      {/* Atmospheric Footer Decor */}
      <footer className="pt-8 opacity-30 pointer-events-none">
        <div className="border-t border-outline-variant pt-8 flex justify-between items-center font-label-sm text-on-surface-variant">
          <p>© 2024 Polytechnic University of the Philippines. International Affairs Office.</p>
          <div className="flex gap-6">
            <span>V 2.4.0-admin</span>
            <span>System Status: Optimal</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
