import { Check } from "lucide-react";

export function ExchangeJourneyTimeline({ application }: { application: any }) {
  const steps = [
    { label: "Application Setup", key: "profile" },
    { label: "Application Submitted", key: "submitted" },
    { label: "Under Review", key: "review" },
    { label: "Interview Stage", key: "interview" },
    { label: "Accepted", key: "accepted" },
    { label: "Pre-Departure", key: "predeparture" },
  ];

  let currentStepIndex = application?.is_complete ? 1 : 0;
  
  return (
    <div className="bg-surface p-card-padding rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.05)] border border-outline-variant/30 w-full mb-6 relative overflow-hidden">
      <h3 className="font-headline-md text-headline-md text-primary mb-10">Your Exchange Journey</h3>
      <div className="relative flex items-center justify-between w-full px-4 md:px-8">
        {/* Connecting Line */}
        <div className="absolute left-8 right-8 top-1/2 -translate-y-1/2 h-1 bg-outline-variant/30 -z-10 rounded-full"></div>
        <div className="absolute left-8 top-1/2 -translate-y-1/2 h-1 bg-primary -z-10 transition-all duration-500 rounded-full" style={{ width: `calc(${(currentStepIndex / (steps.length - 1)) * 100}% - 32px)` }}></div>
        
        {steps.map((step, index) => {
          const isCompleted = index < currentStepIndex;
          const isCurrent = index === currentStepIndex;
          
          return (
            <div key={step.key} className="flex flex-col items-center gap-3 bg-surface px-1 md:px-3 relative z-10">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${isCompleted ? 'bg-primary text-on-primary shadow-md' : isCurrent ? 'bg-primary-container text-primary border-[3px] border-primary shadow-sm' : 'bg-surface-container text-on-surface-variant border-2 border-outline-variant'}`}>
                {isCompleted ? <Check className="w-4 h-4 stroke-[3]" /> : <span className="text-xs font-bold">{index + 1}</span>}
              </div>
              <span className={`text-[10px] md:text-xs font-bold text-center max-w-[80px] leading-tight ${isCurrent ? 'text-primary' : isCompleted ? 'text-on-surface' : 'text-on-surface-variant'}`}>
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
