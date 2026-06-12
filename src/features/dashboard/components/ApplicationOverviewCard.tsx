import Link from "next/link";
import { Pencil } from "lucide-react";

export function ApplicationOverviewCard({ application }: { application: any }) {
  const isComplete = application?.is_complete;

  return (
    <div className="bg-surface p-card-padding rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.05)] border border-outline-variant/30 flex flex-col md:flex-row justify-between items-center gap-6">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <span className="px-4 py-1 rounded-full font-label-sm bg-primary text-on-primary">
            Application Submitted
          </span>
          <span className="font-title-lg text-title-lg text-on-surface">
            Application Overview
          </span>
        </div>
        <p className="font-body-md text-body-md text-on-surface-variant">
          {isComplete
            ? "All documents submitted. Your application is under review by the committee."
            : "Your application is submitted. Complete the document checklist to finalize."}
        </p>
      </div>
      <div className="flex items-center gap-3 w-full md:w-auto">
        <Link
          href="/dashboard/applications?edit=true"
          className="flex-1 md:flex-none flex items-center justify-center gap-2 border border-primary text-primary px-6 py-3 rounded-lg font-label-md hover:bg-primary/5 active:scale-95 transition-all whitespace-nowrap"
        >
          <Pencil className="w-4 h-4" />
          Edit
        </Link>
        <Link
          href="/dashboard/applications"
          className="flex-1 md:flex-none flex items-center justify-center bg-primary text-on-primary px-6 py-3 rounded-lg font-label-md shadow-sm hover:opacity-95 active:scale-95 transition-all whitespace-nowrap"
        >
          View
        </Link>
      </div>
    </div>
  );
}
