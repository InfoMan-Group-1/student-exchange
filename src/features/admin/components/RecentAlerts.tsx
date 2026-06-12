import { AlertTriangle, Info, Mail } from "lucide-react";
import { AdminAlert } from "@/lib/types/admin";

export function RecentAlerts({ alerts }: { alerts: AdminAlert[] }) {
  return (
    <div className="bg-surface p-card-padding rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.05)] border border-outline-variant/30">
      <h4 className="font-title-lg text-primary mb-6">Recent Alerts</h4>
      <div className="space-y-4">
        {alerts.map((alert) => {
          let Icon = Info;
          let borderColor = "border-secondary";
          let iconColor = "text-secondary";

          if (alert.type === "warning") {
            Icon = AlertTriangle;
            borderColor = "border-error";
            iconColor = "text-error";
          } else if (alert.type === "mail") {
            Icon = Mail;
            borderColor = "border-on-tertiary-container";
            iconColor = "text-on-tertiary-container";
          }

          return (
            <div 
              key={alert.id}
              className={`flex gap-4 p-3 hover:bg-surface-container-low rounded-lg transition-colors cursor-pointer border-l-4 ${borderColor}`}
            >
              <Icon className={`h-5 w-5 ${iconColor} flex-shrink-0 mt-0.5`} />
              <div>
                <p className="font-label-md font-bold">{alert.title}</p>
                <p className="text-[12px] text-on-surface-variant">{alert.description}</p>
              </div>
            </div>
          );
        })}
      </div>
      <button className="w-full mt-8 py-2 text-primary border border-primary/20 rounded-lg font-label-md hover:bg-primary/5 transition-colors">
        View All Notifications
      </button>
    </div>
  );
}
