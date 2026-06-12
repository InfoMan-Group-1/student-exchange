import { Building2 } from "lucide-react";
import { UniversityChoice } from "@/lib/mockApplicationData";

interface Props {
  choices: any[];
  onChange: (rank: number, name: string) => void;
}

export function UniversityChoices({ choices, onChange }: Props) {
  // We need to render exactly 3 choice slots
  const slots = [1, 2, 3];

  return (
    <section className="bg-surface rounded-xl shadow-[0px_2px_4px_rgba(0,0,0,0.05)] border border-outline-variant/30 p-card-padding">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-primary-container/10 flex items-center justify-center text-primary">
          <Building2 className="h-6 w-6" />
        </div>
        <h3 className="font-title-lg text-title-lg text-primary">2. University Choices</h3>
      </div>
      
      <div className="space-y-6">
        {slots.map((rank) => {
          const isFirst = rank === 1;
          const numberStyle = isFirst 
            ? "bg-secondary text-on-secondary" 
            : "bg-outline text-white";

            const placeholderInst = isFirst ? "e.g. Nanyang Technological University" : 
                                    rank === 2 ? "Second Choice Institution" : "Third Choice Institution";

            // Find the choice data for this rank
            const choiceData = choices.find(c => c.university_choice_rank === rank);

            return (
              <div key={rank} className="grid grid-cols-12 gap-4 items-end">
                <div className="col-span-1 flex justify-center pb-3">
                  <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${numberStyle}`}>
                    {rank}
                  </span>
                </div>
                <div className="col-span-11 grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    {isFirst && (
                      <label className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
                        Host Institution
                      </label>
                    )}
                    <input 
                      type="text" 
                      value={choiceData?.university_name || ""}
                      onChange={(e) => onChange(rank, e.target.value)}
                      placeholder={placeholderInst}
                      className="w-full bg-surface-container-low border border-outline rounded-lg px-4 py-3 font-body-md text-body-md focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
  );
}
