import { ChecklistItem } from "@/lib/mockStudentData";
import { CheckCircle, XCircle } from "lucide-react";

export function ApplicationChecklist({ items }: { items: ChecklistItem[] }) {
  return (
    <div className="lg:col-span-8 space-y-4">
      <h3 className="font-headline-md text-headline-md text-primary px-2">
        Application Checklist
      </h3>
      <div className="bg-surface rounded-xl border border-outline-variant/30 overflow-hidden">
        <div className="divide-y divide-outline-variant/50">
          {items.map((item) => {
            const isDone = item.status === "verified" || item.status === "uploaded";
            
            return (
              <div
                key={item.id}
                className={`flex items-center justify-between p-5 hover:bg-surface-container-low transition-all duration-200 hover:translate-x-1 ${
                  item.status === "missing" ? "bg-surface-container-lowest" : ""
                }`}
              >
                <div className="flex items-center gap-4">
                  {isDone ? (
                    <CheckCircle className="text-green-600 h-6 w-6" />
                  ) : (
                    <XCircle className="text-error h-6 w-6" />
                  )}
                  <div>
                    <p className="font-label-md text-label-md text-on-surface">
                      {item.title}
                    </p>
                    <p
                      className={`text-xs ${
                        item.status === "missing"
                          ? "text-error"
                          : "text-on-surface-variant"
                      }`}
                    >
                      {item.metaText}
                    </p>
                  </div>
                </div>
                {isDone ? (
                  <button className="text-primary hover:underline font-label-sm">
                    View
                  </button>
                ) : (
                  <button className="bg-primary text-white px-4 py-1.5 rounded-lg text-xs font-bold hover:opacity-90">
                    Upload
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
