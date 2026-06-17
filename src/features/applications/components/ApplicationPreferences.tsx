import { Settings } from "lucide-react";

interface Props {
  targetSemester: string;
  duration: string;
  onChange: (key: string, value: string) => void;
}

export function ApplicationPreferences({ targetSemester, duration, onChange }: Props) {
  return (
    <section className="bg-surface rounded-xl shadow-[0px_2px_4px_rgba(0,0,0,0.05)] border border-outline-variant/30 p-card-padding">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-primary-container/10 flex items-center justify-center text-primary">
          <Settings className="h-6 w-6" />
        </div>
        <h3 className="font-title-lg text-title-lg text-primary">1. Preferences</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-2">
          <label className="font-label-md text-label-md text-on-surface-variant">Target Semester</label>
          <select 
            value={targetSemester}
            onChange={(e) => onChange("semester_preference", e.target.value)}
            className="w-full bg-surface-container-low border border-outline rounded-lg px-4 py-3 font-body-md text-body-md focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 appearance-none transition-all"
          >
            <option>Spring</option>
            <option>Fall</option>
          </select>
        </div>
        
        <div className="space-y-2">
          <label className="font-label-md text-label-md text-on-surface-variant">Program Duration</label>
          <div className="flex gap-4">
            <label className="flex-1 cursor-pointer">
              <input 
                type="radio" 
                name="duration" 
                className="hidden peer" 
                checked={duration === "1 Semester"} 
                onChange={() => onChange("duration_preference", "1 Semester")}
              />
              <div className="h-full border border-outline rounded-lg p-3 text-center peer-checked:border-primary peer-checked:bg-primary-container/5 peer-checked:text-primary transition-all">
                <p className="font-label-md text-label-md font-bold">1 Semester</p>
                <p className="text-[12px] opacity-70">approx. 5 months</p>
              </div>
            </label>
            <label className="flex-1 cursor-pointer">
              <input 
                type="radio" 
                name="duration" 
                className="hidden peer" 
                checked={duration === "Full Year"} 
                onChange={() => onChange("duration_preference", "Full Year")}
              />
              <div className="h-full border border-outline rounded-lg p-3 text-center peer-checked:border-primary peer-checked:bg-primary-container/5 peer-checked:text-primary transition-all">
                <p className="font-label-md text-label-md font-bold">Full Year</p>
                <p className="text-[12px] opacity-70">approx. 10 months</p>
              </div>
            </label>
          </div>
        </div>
      </div>
    </section>
  );
}
