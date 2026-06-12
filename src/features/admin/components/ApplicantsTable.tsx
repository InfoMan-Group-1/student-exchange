import { Eye, ChevronLeft, ChevronRight } from "lucide-react";
import { ApplicantListEntry } from "@/lib/mockAdminData";
import Link from "next/link";

export function ApplicantsTable({ applicants }: { applicants: ApplicantListEntry[] }) {
  return (
    <section className="bg-surface rounded-xl shadow-sm border border-outline-variant overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[1000px]">
          <thead className="bg-surface-container-low">
            <tr>
              <th className="px-6 py-4 font-label-md text-on-surface-variant border-b border-outline-variant">Student #</th>
              <th className="px-6 py-4 font-label-md text-on-surface-variant border-b border-outline-variant">Name</th>
              <th className="px-6 py-4 font-label-md text-on-surface-variant border-b border-outline-variant">Program</th>
              <th className="px-6 py-4 font-label-md text-on-surface-variant border-b border-outline-variant">College</th>
              <th className="px-6 py-4 font-label-md text-on-surface-variant border-b border-outline-variant text-center">GWA</th>
              <th className="px-6 py-4 font-label-md text-on-surface-variant border-b border-outline-variant">Status</th>
              <th className="px-6 py-4 font-label-md text-on-surface-variant border-b border-outline-variant text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant">
            {applicants.map((app) => {
              const isComplete = app.status === "Complete";
              
              let avatarThemeClass = "";
              if (app.colorTheme === "secondary") {
                avatarThemeClass = "bg-secondary-fixed text-on-secondary-fixed";
              } else {
                avatarThemeClass = "bg-primary-fixed text-on-primary-fixed";
              }

              return (
                <tr key={app.studentNumber} className="hover:bg-surface-container-lowest transition-colors">
                  <td className="px-6 py-4 font-label-md text-on-surface whitespace-nowrap">{app.studentNumber}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-[12px] ${avatarThemeClass}`}>
                        {app.initials}
                      </div>
                      <span className="font-body-md font-medium text-on-surface">{app.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-body-md text-on-surface-variant">{app.program}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 bg-tertiary-container text-on-tertiary-fixed rounded font-label-sm">
                      {app.college}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-body-md font-bold text-center">{app.gwa.toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {isComplete ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-100 text-green-700 rounded-full font-label-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                        Complete
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-secondary-container text-on-secondary-container rounded-full font-label-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                        Pending
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link href="#" className="text-primary font-label-md hover:underline underline-offset-4 flex items-center justify-end gap-1 ml-auto">
                      View <Eye className="h-[18px] w-[18px]" />
                    </Link>
                  </td>
                </tr>
              );
            })}
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
