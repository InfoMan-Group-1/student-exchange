import { Calendar } from "lucide-react";

interface Event { event_name: string; host_country: string; event_date: string; }

export function AdminEventsTable({ events }: { events?: Event[] }) {
  const displayEvents = events || [];

  return (
    <section className="bg-surface rounded-xl p-card-padding shadow-[0_2px_4px_rgba(0,0,0,0.05)] border border-outline-variant">
      <h3 className="font-title-lg text-primary mb-4 flex items-center gap-2">
        <Calendar className="h-6 w-6 text-secondary" />
        Events Attended
      </h3>
      {displayEvents.length === 0 ? (
        <p className="font-body-md text-on-surface-variant italic">No events attended</p>
      ) : (
        <div className="space-y-4">
          {displayEvents.map((evt, index) => (
            <div key={index} className="flex flex-col border-b border-outline-variant/30 pb-3 last:border-0 last:pb-0">
              <span className="font-body-md font-bold text-on-surface">{evt.event_name}</span>
              <div className="flex justify-between items-center mt-1">
                <span className="font-body-sm text-on-surface-variant">
                  {new Date(evt.event_date).toLocaleDateString()}
                </span>
                <span className="bg-primary/10 text-primary px-2 py-1 rounded font-label-sm">
                  {evt.host_country}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
