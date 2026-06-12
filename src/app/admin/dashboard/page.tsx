import { Download } from "lucide-react";
import { getAdminDashboardData } from "@/lib/mockAdminData";
import { AdminStatCards } from "@/features/admin/components/AdminStatCards";
import { ApplicationsChart } from "@/features/admin/components/ApplicationsChart";
import { RecentAlerts } from "@/features/admin/components/RecentAlerts";
import { IncompleteApplicationsTable } from "@/features/admin/components/IncompleteApplicationsTable";

export default async function AdminDashboardPage() {
  const data = await getAdminDashboardData();

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

      <AdminStatCards stats={data.stats} />

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <ApplicationsChart />
        <RecentAlerts alerts={data.alerts} />
      </section>

      <IncompleteApplicationsTable apps={data.incompleteApplications} />

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
