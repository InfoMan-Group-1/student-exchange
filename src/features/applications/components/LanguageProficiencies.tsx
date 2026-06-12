"use client";

import { Languages, Plus, Trash2, RefreshCw } from "lucide-react";
import { useState } from "react";
import useSWR, { mutate } from "swr";
import { fetcher, apiFetch } from "@/lib/api-client";

const PROFICIENCY_LEVELS = ["A1", "A2", "B1", "B2", "C1", "C2", "Native"];

export function LanguageProficiencies() {
  const { data, isLoading } = useSWR("/api/v1/students/me/languages", fetcher);
  const languages: { language_name: string; proficiency_level: string }[] = data?.data ?? [];

  const [newLang, setNewLang] = useState("");
  const [newLevel, setNewLevel] = useState("B2");
  const [adding, setAdding] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [removing, setRemoving] = useState<string | null>(null);

  const handleAdd = async () => {
    if (!newLang.trim()) return;
    setAdding(true);
    try {
      await apiFetch("/api/v1/students/me/languages", {
        method: "POST",
        body: JSON.stringify({ name: newLang.trim(), level: newLevel }),
      });
      mutate("/api/v1/students/me/languages");
      setNewLang("");
      setNewLevel("B2");
      setShowForm(false);
    } catch {
      alert("Failed to add language.");
    } finally {
      setAdding(false);
    }
  };

  const handleRemove = async (langName: string) => {
    setRemoving(langName);
    try {
      await apiFetch(`/api/v1/students/me/languages?name=${encodeURIComponent(langName)}`, {
        method: "DELETE",
      });
      mutate("/api/v1/students/me/languages");
    } catch {
      alert("Failed to remove language.");
    } finally {
      setRemoving(null);
    }
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
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-1 text-secondary font-label-md text-label-md hover:underline"
        >
          <Plus className="h-[18px] w-[18px]" />
          Add language
        </button>
      </div>

      {/* Inline add form */}
      {showForm && (
        <div className="mb-4 flex gap-3 items-end p-3 bg-surface-container-low rounded-xl border border-outline-variant/50">
          <div className="flex-1 space-y-1">
            <p className="text-[10px] uppercase text-on-surface-variant font-bold">Language</p>
            <input
              type="text"
              value={newLang}
              onChange={(e) => setNewLang(e.target.value)}
              placeholder="e.g. Korean"
              className="bg-transparent border-b border-outline-variant w-full focus:outline-none focus:border-primary py-1 text-sm font-label-md"
            />
          </div>
          <div className="space-y-1">
            <p className="text-[10px] uppercase text-on-surface-variant font-bold">Level</p>
            <select
              value={newLevel}
              onChange={(e) => setNewLevel(e.target.value)}
              className="bg-transparent border-b border-outline-variant focus:outline-none focus:border-primary text-sm font-bold"
            >
              {PROFICIENCY_LEVELS.map((l) => (
                <option key={l} value={l}>{l}</option>
              ))}
            </select>
          </div>
          <button
            type="button"
            onClick={handleAdd}
            disabled={adding || !newLang.trim()}
            className="flex items-center gap-1.5 bg-primary text-on-primary px-4 py-2 rounded-lg font-label-md text-sm transition-all hover:brightness-110 active:scale-95 disabled:opacity-50"
          >
            {adding ? <RefreshCw className="h-4 w-4 animate-spin" /> : null}
            Save
          </button>
        </div>
      )}

      <div className="space-y-3">
        {isLoading ? (
          <p className="text-on-surface-variant font-label-md animate-pulse py-4">Loading languages...</p>
        ) : languages.length === 0 ? (
          <p className="text-on-surface-variant font-label-md text-center py-4 opacity-60">No languages added yet.</p>
        ) : (
          languages.map((lang) => (
            <div
              key={lang.language_name}
              className="flex items-center gap-4 p-4 bg-surface-container-low rounded-xl border border-outline-variant/50"
            >
              <div className="flex-1 grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-[10px] uppercase text-on-surface-variant font-bold">Language</p>
                  <p className="font-label-md text-label-md">{lang.language_name}</p>
                </div>
                <div className="space-y-1 text-right flex flex-col items-end">
                  <p className="text-[10px] uppercase text-on-surface-variant font-bold w-full">Proficiency</p>
                  <span className="px-2 py-0.5 bg-primary text-on-primary rounded-md text-[12px] font-bold">
                    {lang.proficiency_level}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => handleRemove(lang.language_name)}
                disabled={removing === lang.language_name}
                className="text-on-surface-variant/40 hover:text-error transition-colors disabled:opacity-30"
              >
                {removing === lang.language_name
                  ? <RefreshCw className="h-4 w-4 animate-spin" />
                  : <Trash2 className="h-5 w-5" />}
              </button>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
