import { GraduationCap } from "lucide-react";
import { ApplicationDetailData } from "@/lib/mockAdminData";

export function AcademicPreferences({ preferences }: { preferences: ApplicationDetailData["academicPreferences"] }) {
  return (
    <section className="bg-surface rounded-xl shadow-[0_2px_4px_rgba(0,0,0,0.05)] border border-outline-variant overflow-hidden">
      <div className="p-card-padding border-b border-outline-variant flex justify-between items-center bg-surface-container-lowest">
        <h3 className="font-title-lg text-primary flex items-center gap-2">
          <GraduationCap className="h-6 w-6 text-secondary" />
          Academic Preferences
        </h3>
        <span className="font-label-md text-on-tertiary-container">AY 2024-2025 Semester 1</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-surface-container-low">
            <tr>
              <th className="px-6 py-3 font-label-sm text-on-surface-variant uppercase">Priority</th>
              <th className="px-6 py-3 font-label-sm text-on-surface-variant uppercase">Partner University</th>
              <th className="px-6 py-3 font-label-sm text-on-surface-variant uppercase">Location</th>
              <th className="px-6 py-3 font-label-sm text-on-surface-variant uppercase">Course Match</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant">
            {preferences.map((pref) => (
              <tr key={pref.priority} className="hover:bg-surface-container-lowest transition-colors">
                <td className="px-6 py-4 font-label-md text-primary font-bold">{pref.priority}</td>
                <td className="px-6 py-4 font-body-md">{pref.university}</td>
                <td className="px-6 py-4 font-body-md">{pref.location}</td>
                <td className="px-6 py-4">
                  <span className="bg-surface-container-high px-2 py-1 rounded-md text-[12px] font-bold">
                    {pref.match}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
