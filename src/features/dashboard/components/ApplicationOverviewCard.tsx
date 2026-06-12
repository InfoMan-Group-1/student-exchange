import Link from "next/link";

export function ApplicationOverviewCard({ application }: { application: any }) {
  const isComplete = application?.is_complete;

  return (
    <div className="lg:col-span-2 bg-surface p-card-padding rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.05)] border border-outline-variant/30 flex flex-col md:flex-row justify-between items-center gap-6">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <span className={`px-4 py-1 rounded-full font-label-sm ${isComplete ? "bg-primary-container text-on-primary-container" : "bg-secondary-container text-on-secondary-container"}`}>
            {isComplete ? "Application Complete" : "Pending / Incomplete"}
          </span>
          <span className="font-title-lg text-title-lg text-on-surface">
            Application Overview
          </span>
        </div>
        <p className="font-body-md text-body-md text-on-surface-variant">
          {isComplete 
            ? "Your application is fully submitted and is currently under review by the committee."
            : "Complete your application to proceed with the screening process."}
        </p>
      </div>
      <Link 
        href="/dashboard/applications"
        className="bg-primary text-on-primary px-8 py-3 rounded-lg font-label-md shadow-sm hover:opacity-95 active:scale-95 transition-all text-center"
      >
        {isComplete ? "View my application" : "Continue application"}
      </Link>
    </div>
  );
}
