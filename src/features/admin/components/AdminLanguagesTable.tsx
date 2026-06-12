import { Languages } from "lucide-react";
import { ApplicationDetailData } from "@/lib/mockAdminData";

export function AdminLanguagesTable({ languages }: { languages: ApplicationDetailData["languages"] }) {
  return (
    <section className="bg-surface rounded-xl p-card-padding shadow-[0_2px_4px_rgba(0,0,0,0.05)] border border-outline-variant">
      <h3 className="font-title-lg text-primary mb-4 flex items-center gap-2">
        <Languages className="h-6 w-6 text-secondary" />
        Languages
      </h3>
      <div className="space-y-4">
        {languages.map((lang, index) => (
          <div key={index} className="flex items-center justify-between">
            <span className="font-body-md">{lang.language}</span>
            <span className="bg-secondary/10 text-secondary px-2 py-1 rounded font-label-sm">
              {lang.proficiency}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
