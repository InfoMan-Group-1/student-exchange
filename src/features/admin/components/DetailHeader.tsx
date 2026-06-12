"use client";

import { useState } from "react";
import { CheckCircle2, Edit } from "lucide-react";
import { apiFetch } from "@/lib/api-client";
import { mutate } from "swr";

export function DetailHeader({ info }: { info: any }) {
  const [updating, setUpdating] = useState(false);

  const toggleComplete = async () => {
    setUpdating(true);
    try {
      await apiFetch(`/api/v1/applications/${info.application_id}`, {
        method: "PATCH",
        body: JSON.stringify({ is_complete: !info.is_complete }),
      });
      await mutate(`/api/v1/applications/${info.application_id}`);
    } catch (err) {
      console.error("Failed to update status", err);
      alert("Failed to update status");
    } finally {
      setUpdating(false);
    }
  };
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
      <div className="flex items-center gap-6">
        <div className="w-24 h-24 rounded-xl overflow-hidden shadow-sm bg-surface-container-high border border-outline-variant flex items-center justify-center font-display-lg text-on-surface-variant">
          {/* Fallback avatar block */}
          {info.full_name?.split(" ").map((n: string) => n[0]).join("")}
        </div>
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h2 className="font-headline-lg text-primary">{info.full_name}</h2>
            <span className="bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full font-label-sm uppercase">
              {info.is_complete ? "UNDER REVIEW" : "MISSING DOCS"}
            </span>
          </div>
          <p className="font-body-lg text-on-surface-variant">
            Student #{info.student_number} • {info.program}
          </p>
        </div>
      </div>
      
      <div className="flex gap-3">
        <button className="px-6 py-2 border border-outline text-primary font-bold rounded-lg hover:bg-surface-container-low transition-all active:scale-95 flex items-center gap-2">
          <Edit className="h-5 w-5" />
          <span className="font-label-md">Edit Info</span>
        </button>
        <button 
          onClick={toggleComplete}
          disabled={updating}
          className={`px-6 py-2 text-on-primary font-bold rounded-lg transition-all active:scale-95 flex items-center gap-2 ${info.is_complete ? 'bg-secondary hover:bg-secondary-container text-white' : 'bg-primary hover:brightness-125'} disabled:opacity-50`}
        >
          <CheckCircle2 className="h-5 w-5" />
          <span className="font-label-md">{updating ? "Updating..." : info.is_complete ? "Mark as Incomplete" : "Mark as Complete"}</span>
        </button>
      </div>
    </div>
  );
}
