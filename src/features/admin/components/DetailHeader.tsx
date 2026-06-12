import { CheckCircle2, Edit } from "lucide-react";
import { ApplicationDetailData } from "@/lib/mockAdminData";

export function DetailHeader({ info }: { info: ApplicationDetailData["studentInfo"] }) {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
      <div className="flex items-center gap-6">
        <div className="w-24 h-24 rounded-xl overflow-hidden shadow-sm bg-surface-container-high border border-outline-variant flex items-center justify-center font-display-lg text-on-surface-variant">
          {/* Fallback avatar block */}
          {info.name.split(" ").map(n => n[0]).join("")}
        </div>
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h2 className="font-headline-lg text-primary">{info.name}</h2>
            <span className="bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full font-label-sm uppercase">
              {info.status}
            </span>
          </div>
          <p className="font-body-lg text-on-surface-variant">
            Student #{info.studentNumber} • {info.course}
          </p>
        </div>
      </div>
      
      <div className="flex gap-3">
        <button className="px-6 py-2 border border-outline text-primary font-bold rounded-lg hover:bg-surface-container-low transition-all active:scale-95 flex items-center gap-2">
          <Edit className="h-5 w-5" />
          <span className="font-label-md">Edit Info</span>
        </button>
        <button className="px-6 py-2 bg-primary text-on-primary font-bold rounded-lg hover:brightness-125 transition-all active:scale-95 flex items-center gap-2">
          <CheckCircle2 className="h-5 w-5" />
          <span className="font-label-md">Mark as complete</span>
        </button>
      </div>
    </div>
  );
}
