"use client";

import { Languages, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { LanguageProficiency } from "@/lib/mockApplicationData";

interface Props {
  initialLanguages: LanguageProficiency[];
}

export function LanguageProficiencies({ initialLanguages }: Props) {
  const [langs, setLangs] = useState(initialLanguages);

  const addLanguage = () => {
    const newLang: LanguageProficiency = {
      id: `new-${Date.now()}`,
      language: "",
      proficiencyLevel: "B2 - Upper Intermediate", // Default
    };
    setLangs([...langs, newLang]);
  };

  const removeLanguage = (id: string) => {
    setLangs(langs.filter(l => l.id !== id));
  };

  return (
    <section className="bg-surface rounded-xl shadow-[0px_2px_4px_rgba(0,0,0,0.05)] border border-outline-variant/30 p-card-padding flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary-container/10 flex items-center justify-center text-primary">
            <Languages className="h-6 w-6" />
          </div>
          <h3 className="font-title-lg text-title-lg text-primary">4. Languages</h3>
        </div>
        <button 
          type="button"
          onClick={addLanguage}
          className="flex items-center gap-1 text-secondary font-label-md text-label-md hover:underline"
        >
          <Plus className="h-[18px] w-[18px]" />
          Add language
        </button>
      </div>
      
      <div className="space-y-4">
        {langs.map((lang) => {
          const isNew = lang.id.startsWith("new-");
          
          return (
            <div 
              key={lang.id} 
              className="flex items-center gap-4 p-4 bg-surface-container-low rounded-xl border border-outline-variant/50 animate-in fade-in slide-in-from-top-2 duration-300"
            >
              <div className="flex-1 grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-[10px] uppercase text-on-surface-variant font-bold">Language</p>
                  {isNew ? (
                    <input 
                      type="text" 
                      placeholder="Specify language" 
                      className="bg-transparent border-b border-outline-variant w-full focus:outline-none focus:border-primary py-1 text-sm font-label-md"
                    />
                  ) : (
                    <p className="font-label-md text-label-md">{lang.language}</p>
                  )}
                </div>
                <div className="space-y-1 text-right flex flex-col items-end">
                  <p className="text-[10px] uppercase text-on-surface-variant font-bold w-full">Proficiency</p>
                  {isNew ? (
                    <select 
                      defaultValue="B2"
                      className="bg-transparent border-b border-outline-variant text-right focus:outline-none focus:border-primary text-[12px] font-bold"
                    >
                      <option value="A1">A1</option>
                      <option value="A2">A2</option>
                      <option value="B1">B1</option>
                      <option value="B2">B2</option>
                      <option value="C1">C1</option>
                      <option value="C2">C2</option>
                    </select>
                  ) : (
                    <span className="px-2 py-0.5 bg-primary text-on-primary rounded-md text-[12px] font-bold">
                      {lang.proficiencyLevel}
                    </span>
                  )}
                </div>
              </div>
              <button 
                type="button"
                onClick={() => removeLanguage(lang.id)}
                className="text-on-surface-variant/40 hover:text-error transition-colors"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}
