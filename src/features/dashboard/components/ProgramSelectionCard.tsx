import { UniversityChoice } from "@/lib/mockStudentData";
import { MapPin, ArrowRight } from "lucide-react";
import Image from "next/image";

export function ProgramSelectionCard({ choice }: { choice: UniversityChoice }) {
  return (
    <div className="relative overflow-hidden rounded-xl bg-surface border border-outline-variant/30 shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
      <div className="h-32 w-full bg-surface-container-highest relative">
        <img
          alt="University campus"
          className="w-full h-full object-cover opacity-60"
          src={choice.imageUrl}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-4 left-4 text-white">
          {choice.isPrimary && (
            <span className="text-[10px] uppercase font-bold tracking-widest bg-secondary px-2 py-0.5 rounded">
              Primary Choice
            </span>
          )}
          <h4 className="font-title-lg text-title-lg">{choice.universityName}</h4>
        </div>
      </div>
      <div className="p-5 space-y-4">
        <div className="flex items-center gap-2 text-on-surface-variant">
          <MapPin className="h-4 w-4" />
          <span className="font-label-md">{choice.location}</span>
        </div>
        <div className="p-3 bg-surface-container-low rounded-lg border border-outline-variant/20">
          <p className="text-xs text-on-surface-variant font-bold uppercase tracking-tight mb-1">
            Assigned Program
          </p>
          <p className="font-body-md text-primary font-semibold">
            {choice.assignedProgram}
          </p>
        </div>
        <div className="flex justify-between items-center pt-2">
          {choice.isReadOnly ? (
            <span className="text-xs text-on-surface-variant italic">
              Registration is read-only
            </span>
          ) : (
            <span />
          )}
          <button className="text-primary font-label-md flex items-center gap-1 hover:gap-2 transition-all">
            Program Details <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
