import { ArrowRight, MoreVertical, Eye } from "lucide-react";
import { IncompleteApplication } from "@/lib/mockAdminData";
import Link from "next/link";

export function IncompleteApplicationsTable({ apps }: { apps: IncompleteApplication[] }) {
  return (
    <section className="bg-surface rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.05)] border border-outline-variant/30 overflow-hidden">
      <div className="p-card-padding border-b border-outline-variant flex justify-between items-center bg-surface-container-lowest">
        <div>
          <h4 className="font-title-lg text-primary">Incomplete Applications</h4>
          <p className="font-label-sm text-on-surface-variant">Students needing immediate document follow-up</p>
        </div>
        <Link 
          href="/admin/applications"
          className="text-primary font-label-md font-bold hover:underline flex items-center gap-1 group"
        >
          View all applicants
          <ArrowRight className="h-[18px] w-[18px] transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr className="bg-surface-container-low">
              <th className="px-6 py-4 font-label-md text-on-surface-variant border-b border-outline-variant">Student #</th>
              <th className="px-6 py-4 font-label-md text-on-surface-variant border-b border-outline-variant">Name</th>
              <th className="px-6 py-4 font-label-md text-on-surface-variant border-b border-outline-variant">College</th>
              <th className="px-6 py-4 font-label-md text-on-surface-variant border-b border-outline-variant">GWA</th>
              <th className="px-6 py-4 font-label-md text-on-surface-variant border-b border-outline-variant">Status</th>
              <th className="px-6 py-4 font-label-md text-on-surface-variant border-b border-outline-variant">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant">
            {apps.map((app) => {
              let avatarThemeClass = "";
              if (app.colorTheme === "secondary") {
                avatarThemeClass = "bg-secondary-container text-on-secondary-container";
              } else if (app.colorTheme === "primary") {
                avatarThemeClass = "bg-primary-container text-on-primary";
              } else {
                avatarThemeClass = "bg-on-tertiary-container text-white";
              }

              return (
                <tr key={app.studentNumber} className="hover:bg-surface-container-low/50 transition-colors">
                  <td className="px-6 py-4 font-body-md text-on-surface whitespace-nowrap">{app.studentNumber}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-[12px] ${avatarThemeClass}`}>
                        {app.initials}
                      </div>
                      <span className="font-body-md text-on-surface">{app.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-body-md text-on-surface-variant">{app.college}</td>
                  <td className="px-6 py-4 font-body-md text-on-surface">{app.gwa ? Number(app.gwa).toFixed(2) : "N/A"}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-3 py-1 bg-error-container text-on-error-container rounded-full text-[12px] font-bold">
                      {app.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <Link 
                      href={`/admin/applications/${app.application_id}`}
                      className="text-primary hover:bg-surface-container-high transition-colors p-2 rounded-full inline-flex active:scale-95"
                      title="View Application"
                    >
                      <Eye className="h-5 w-5" />
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
