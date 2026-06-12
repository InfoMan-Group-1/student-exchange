import { GraduationCap } from "lucide-react";

export function AcademicPreferences({ preferences, detail }: { preferences: any[]; detail?: any }) {
  return (
    <section className="bg-surface rounded-xl shadow-[0_2px_4px_rgba(0,0,0,0.05)] border border-outline-variant overflow-hidden">
      <div className="p-card-padding border-b border-outline-variant flex justify-between items-center bg-surface-container-lowest">
        <h3 className="font-title-lg text-primary flex items-center gap-2">
          <GraduationCap className="h-6 w-6 text-secondary" />
          Academic Preferences
        </h3>
        <span className="font-label-md text-on-surface-variant">AY 2024-2025</span>
      </div>

      {detail && (
        <div className="grid grid-cols-2 divide-x divide-outline-variant border-b border-outline-variant">
          <div className="px-6 py-4">
            <p className="font-label-sm text-on-surface-variant uppercase mb-1">Target Semester</p>
            <p className="font-body-md text-on-surface">{detail.semester_preference || "—"}</p>
          </div>
          <div className="px-6 py-4">
            <p className="font-label-sm text-on-surface-variant uppercase mb-1">Duration</p>
            <p className="font-body-md text-on-surface">{detail.duration_preference || "—"}</p>
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-surface-container-low">
            <tr>
              <th className="px-6 py-3 font-label-sm text-on-surface-variant uppercase">Rank</th>
              <th className="px-6 py-3 font-label-sm text-on-surface-variant uppercase">Partner University</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant">
            {(preferences ?? []).map((pref) => (
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

