import { MapPin, ArrowRight } from "lucide-react";
import Link from "next/link";

export function ProgramSelectionCard({ choices }: { choices: any[] }) {
  const primaryChoice = choices?.find((c: any) => c.university_choice_rank === 1);

  if (!primaryChoice) {
    return (
      <div className="relative overflow-hidden rounded-xl bg-surface border border-outline-variant/30 p-6 shadow-[0_4px_12px_rgba(0,0,0,0.05)] text-center">
        <p className="text-on-surface-variant font-body-md mb-4">No primary university choice selected yet.</p>
        <Link href="/dashboard/applications" className="text-primary font-bold hover:underline">Select your choices</Link>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-xl bg-surface border border-outline-variant/30 shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
      <div className="h-32 w-full bg-surface-container-highest relative flex items-center justify-center bg-gradient-to-r from-primary/80 to-secondary/80">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute bottom-4 left-4 text-white">
          <span className="text-[10px] uppercase font-bold tracking-widest bg-secondary px-2 py-0.5 rounded">
            Primary Choice
          </span>
          <h4 className="font-title-lg text-title-lg mt-1">{primaryChoice.university_name}</h4>
        </div>
      </div>
      <div className="p-5 space-y-4">
        <div className="p-3 bg-surface-container-low rounded-lg border border-outline-variant/20">
           <p className="text-xs text-on-surface-variant font-bold uppercase tracking-tight mb-1">
            Status
          </p>
          <p className="font-body-md text-primary font-semibold">
            Pending Approval
          </p>
        </div>
        <div className="flex justify-between items-center pt-2">
          <span className="text-xs text-on-surface-variant italic">
            Choices can be updated in application
          </span>
          <Link href="/dashboard/applications" className="text-primary font-label-md flex items-center gap-1 hover:gap-2 transition-all">
            Update <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
