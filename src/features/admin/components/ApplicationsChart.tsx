import { BarChart3 } from "lucide-react";

export function ApplicationsChart() {
  return (
    <div className="lg:col-span-2 bg-surface p-card-padding rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.05)] border border-outline-variant/30">
      <div className="flex items-center justify-between mb-6">
        <h4 className="font-title-lg text-primary">Applications by College</h4>
        <div className="flex gap-2">
          <button className="px-3 py-1 bg-surface-container-low text-primary font-label-sm rounded-full border border-outline">
            Weekly
          </button>
          <button className="px-3 py-1 text-on-surface-variant font-label-sm rounded-full">
            Monthly
          </button>
        </div>
      </div>

      <div className="aspect-[16/9] bg-surface-container-lowest border-2 border-dashed border-outline-variant rounded-lg flex flex-col items-center justify-center text-on-tertiary-container relative overflow-hidden group">
        {/* Simulated Chart Visuals */}
        <div className="absolute inset-0 flex items-end justify-around px-10 pb-8 pt-20">
          <div className="w-12 bg-primary rounded-t-lg transition-all duration-700 group-hover:h-[60%] h-[45%]" />
          <div className="w-12 bg-secondary-container rounded-t-lg transition-all duration-700 group-hover:h-[80%] h-[65%]" />
          <div className="w-12 bg-primary-container rounded-t-lg transition-all duration-700 group-hover:h-[40%] h-[30%]" />
          <div className="w-12 bg-primary/20 rounded-t-lg transition-all duration-700 group-hover:h-[90%] h-[75%]" />
          <div className="w-12 bg-secondary rounded-t-lg transition-all duration-700 group-hover:h-[50%] h-[55%]" />
        </div>

        <div className="relative z-10 text-center bg-white/80 backdrop-blur-sm px-6 py-4 rounded-xl border border-outline shadow-xl">
          <BarChart3 className="h-12 w-12 mx-auto mb-2 opacity-50" />
          <p className="font-label-md font-bold">College Distribution Chart</p>
          <p className="text-[12px]">Interactive Visualization Placeholder</p>
        </div>
      </div>
    </div>
  );
}
