"use client";

import { CheckCircle2, Eye } from "lucide-react";
import { useState } from "react";
import { ApplicationDocument } from "@/lib/mockApplicationData";

interface Props {
  initialDocuments: ApplicationDocument[];
}

export function DocumentsChecklist({ initialDocuments }: Props) {
  // Use state to track local checkbox changes
  const [docs, setDocs] = useState(initialDocuments);

  const toggleStatus = (id: string) => {
    setDocs((prev) => 
      prev.map((d) => {
        if (d.id === id) {
          return { ...d, status: d.status === "Pending" ? "Uploaded" : "Pending" };
        }
        return d;
      })
    );
  };

  return (
    <section className="bg-surface rounded-xl shadow-[0px_2px_4px_rgba(0,0,0,0.05)] border border-outline-variant/30 p-card-padding">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-primary-container/10 flex items-center justify-center text-primary">
          <CheckCircle2 className="h-6 w-6" />
        </div>
        <h3 className="font-title-lg text-title-lg text-primary">3. Documents Checklist</h3>
      </div>
      
      <div className="space-y-4">
        {docs.map((doc) => {
          const isChecked = doc.status === "Uploaded" || doc.status === "Verified";
          
          return (
            <label 
              key={doc.id}
              className="flex items-center gap-4 p-3 hover:bg-surface-container-low rounded-lg transition-colors group cursor-pointer"
            >
              <input 
                type="checkbox" 
                checked={isChecked}
                onChange={() => toggleStatus(doc.id)}
                className="w-5 h-5 rounded border-outline text-primary focus:ring-primary focus:ring-offset-0"
              />
              <div className={`flex-1 transition-colors ${isChecked ? "text-on-surface" : "text-on-surface-variant"}`}>
                <p className="font-label-md text-label-md font-bold">{doc.documentType}</p>
                <p className="text-[12px] opacity-80">{doc.description}</p>
              </div>
              <Eye className="h-5 w-5 text-secondary opacity-0 group-hover:opacity-100 transition-opacity" />
            </label>
          );
        })}
      </div>
    </section>
  );
}
