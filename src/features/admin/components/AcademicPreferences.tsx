import { GraduationCap } from "lucide-react";
import { ApplicationDetailData } from "@/lib/mockAdminData";

export function AcademicPreferences({ preferences }: { preferences: ApplicationDetailData["university_choices"] }) {
  return (
    <section className="bg-surface rounded-xl shadow-[0_2px_4px_rgba(0,0,0,0.05)] border border-outline-variant overflow-hidden">
      <div className="p-card-padding border-b border-outline-variant flex justify-between items-center bg-surface-container-lowest">
        <h3 className="font-title-lg text-primary flex items-center gap-2">
          <GraduationCap className="h-6 w-6 text-secondary" />
          Academic Preferences
        </h3>
        <span className="font-label-md text-on-tertiary-container">AY 2024-2025</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-surface-container-low">
            <tr>
              <th className="px-6 py-3 font-label-sm text-on-surface-variant uppercase">Rank</th>
              <th className="px-6 py-3 font-label-sm text-on-surface-variant uppercase">Partner University</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant">
            {preferences.map((pref) => (
              <tr key={pref.university_choice_rank} className="hover:bg-surface-container-lowest transition-colors">
                <td className="px-6 py-4 font-label-md text-primary font-bold">Choice {pref.university_choice_rank}</td>
                <td className="px-6 py-4 font-body-md">{pref.university_name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
