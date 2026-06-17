import { Building2, ChevronDown } from "lucide-react";
import { UniversityChoice } from "@/lib/types/application";
import useSWR from "swr";
import { fetcher } from "@/lib/api-client";
import { useState, useRef, useEffect } from "react";

interface Props {
  choices: any[];
  onChange: (rank: number, name: string) => void;
}

export function UniversityChoices({ choices, onChange }: Props) {
  // We need to render exactly 3 choice slots
  const slots = [1, 2, 3];
  
  const { data } = useSWR("/api/v1/universities", fetcher);
  const universities: string[] = data?.data || [];

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
                    <Combobox
                      value={choiceData?.university_name || ""}
                      options={universities}
                      onChange={(val) => onChange(rank, val)}
                      placeholder={placeholderInst}
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

function Combobox({ value, options, onChange, placeholder }: { value: string, options: string[], onChange: (val: string) => void, placeholder: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filtered = options.filter(o => o.toLowerCase().includes(inputValue.toLowerCase()));

  return (
    <div ref={wrapperRef} className="relative w-full">
      <div className="relative">
        <input 
          type="text" 
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            onChange(e.target.value);
            setIsOpen(true);
          }}
          onClick={() => setIsOpen(true)}
          placeholder={placeholder}
          className="w-full bg-surface-container-low border border-outline rounded-lg px-4 py-3 pr-10 font-body-md text-body-md focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
        />
        <ChevronDown 
          className={`absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant w-5 h-5 cursor-pointer transition-transform ${isOpen ? 'rotate-180' : ''}`}
          onClick={() => setIsOpen(!isOpen)} 
        />
      </div>
      
      {isOpen && (
        <div className="absolute z-50 w-full mt-1 max-h-60 overflow-y-auto bg-surface border border-outline-variant rounded-lg shadow-[0_4px_20px_rgba(0,0,0,0.1)] py-2">
          {filtered.length > 0 ? filtered.map(opt => (
            <div 
              key={opt} 
              className="px-4 py-2.5 hover:bg-surface-container-high cursor-pointer text-body-md text-on-surface transition-colors"
              onClick={() => {
                setInputValue(opt);
                onChange(opt);
                setIsOpen(false);
              }}
            >
              {opt}
            </div>
          )) : (
            <div className="px-4 py-3 text-on-surface-variant font-label-md text-sm bg-primary-container/10">
              "{inputValue}" will be added as a custom university.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
