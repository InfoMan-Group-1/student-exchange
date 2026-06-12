"use client";

interface ProgramStat {
  program_name: string;
  college_name: string;
  total: number;
  complete_count: number;
}

export function ApplicationsChart({ byProgram }: { byProgram?: ProgramStat[] }) {
  const data = byProgram ?? [];
  const maxTotal = Math.max(...data.map(p => Number(p.total)), 1);

  const collegColors: Record<string, string> = {
    "CCIS": "bg-primary",
    "CEA": "bg-secondary-container",
    "CBA": "bg-primary-container",
    "CAL": "bg-primary/40",
    "COE": "bg-secondary",
  };

  return (
    <div className="lg:col-span-2 bg-surface p-card-padding rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.05)] border border-outline-variant/30">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h4 className="font-title-lg text-primary">Applications by Program</h4>
          <p className="font-label-sm text-on-surface-variant mt-0.5">{data.length} programs</p>
        </div>
      </div>

      {data.length === 0 ? (
        <div className="flex items-center justify-center h-48 text-on-surface-variant font-label-md">
          No application data yet.
        </div>
      ) : (
        <div className="space-y-4">
          {data.map((prog) => {
            const total = Number(prog.total);
            const complete = Number(prog.complete_count);
            const pct = Math.round((total / maxTotal) * 100);
            const completePct = total > 0 ? Math.round((complete / total) * 100) : 0;
            const color = collegColors[prog.college_name] ?? "bg-primary/60";

            return (
              <div key={prog.program_name} className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-label-md text-on-surface font-medium truncate max-w-[240px]">{prog.program_name}</p>
                    <p className="font-label-sm text-on-surface-variant">{prog.college_name}</p>
                  </div>
                  <div className="text-right">
                    <span className="font-label-md font-bold text-on-surface">{total}</span>
                    <p className="font-label-sm text-on-surface-variant">{completePct}% complete</p>
                  </div>
                </div>
                <div className="h-2 w-full bg-surface-container rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${color}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
