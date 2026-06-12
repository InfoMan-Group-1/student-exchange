import { CalendarClock } from "lucide-react";
import { Application } from "@/lib/types/student";

export function DeadlineCard({ application }: { application: Application }) {
  // Simple calculation for remaining days based on mock date "2023-10-30" vs "2023-10-18"
  // For the sake of matching the wireframe mock
  const remainingDays = 12;

  return (
    <div className="bg-error-container/20 border border-error/20 p-5 rounded-xl flex items-start gap-4">
      <CalendarClock className="text-error h-6 w-6" />
      <div>
        <p className="font-label-md text-error font-bold">Submission Deadline</p>
        <p className="font-headline-md text-primary">Oct 30, 2023</p>
        <p className="text-xs text-on-surface-variant mt-1">
          {remainingDays} days remaining to finalize all documents.
        </p>
      </div>
    </div>
  );
}
