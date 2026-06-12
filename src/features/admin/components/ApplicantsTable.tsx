import { Eye, ChevronLeft, ChevronRight, CheckCircle2, Clock } from "lucide-react";
import { ApplicantListEntry } from "@/lib/mockAdminData";
import Link from "next/link";

export function ApplicantsTable({ applicants }: { applicants: ApplicantListEntry[] }) {
  return (
    <section className="bg-surface rounded-xl shadow-sm border border-outline-variant overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[1000px]">
          <thead className="bg-surface-container-low">
            <tr>
              <th className="px-6 py-4 font-label-md text-on-surface-variant border-b border-outline-variant">Student</th>
              <th className="px-6 py-4 font-label-md text-on-surface-variant border-b border-outline-variant">Program/College</th>
              <th className="px-6 py-4 text-left font-label-md text-on-surface-variant font-bold border-b border-outline-variant">GWA</th>
              <th className="px-6 py-4 text-left font-label-md text-on-surface-variant font-bold border-b border-outline-variant">Status</th>
              <th className="px-6 py-4 font-label-md text-on-surface-variant border-b border-outline-variant text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant">
            {applicants.map((app) => (
              <tr key={app.application_id} className="hover:bg-surface-container-low transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
                      app.colorTheme === "primary" ? "bg-primary-container text-on-primary-container" : "bg-secondary-container text-on-secondary-container"
                    }`}>
                      {app.full_name.substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-label-md font-bold text-on-surface group-hover:text-primary transition-colors">{app.full_name}</p>
                      <p className="text-xs text-on-surface-variant">{app.student_number}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <p className="font-label-md text-on-surface">{app.program}</p>
                  <p className="text-xs text-on-surface-variant">{app.college}</p>
                </td>
                <td className="px-6 py-4">
                  <span className="font-label-md text-on-surface font-bold">{app.cumulative_gwa.toFixed(2)}</span>
                </td>
                <td className="px-6 py-4">
                  {app.is_complete ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-success/10 text-success">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Complete
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-error/10 text-error">
                      <Clock className="w-3.5 h-3.5" />
                      Pending
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 text-right">
                  <Link href={`/admin/applications/${app.application_id}`} className="text-primary font-label-md hover:underline underline-offset-4 flex items-center justify-end gap-1 ml-auto">
                    View <Eye className="h-[18px] w-[18px]" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Pagination */}
      <div className="px-6 py-4 bg-surface-container-low border-t border-outline-variant flex items-center justify-between">
        <p className="font-label-md text-on-surface-variant">Showing 1–2 of 20</p>
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-lg border border-outline-variant text-on-surface-variant hover:bg-surface transition-colors disabled:opacity-40" disabled>
            <ChevronLeft className="h-5 w-5" />
          </button>
          <div className="flex gap-1">
            <button className="w-10 h-10 rounded-lg bg-primary text-on-primary font-label-md">1</button>
            <button className="w-10 h-10 rounded-lg text-on-surface-variant hover:bg-surface-container-high font-label-md">2</button>
          </div>
          <button className="p-2 rounded-lg border border-outline-variant text-on-surface-variant hover:bg-surface transition-colors">
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
