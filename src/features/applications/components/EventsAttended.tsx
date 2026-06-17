"use client";

import useSWR, { mutate } from "swr";
import { fetcher, apiFetch } from "@/lib/api-client";
import { Calendar, CheckCircle2 } from "lucide-react";

export function EventsAttended({ isEditing }: { isEditing?: boolean }) {
  const { data: allEventsData } = useSWR("/api/v1/events", fetcher);
  const { data: attendedData } = useSWR("/api/v1/events/me", fetcher);

  const allEvents = allEventsData?.data || [];
  const attendedEvents = attendedData?.data || [];
  const attendedIds = new Set(attendedEvents.map((e: any) => e.event_id));

  const toggleEvent = async (eventId: string, isAttending: boolean) => {
    if (!isEditing) return;
    try {
      if (isAttending) {
        await apiFetch(`/api/v1/events/me`, {
          method: "POST",
          body: JSON.stringify({ event_id: eventId })
        });
      } else {
        await apiFetch(`/api/v1/events/me?event_id=${eventId}`, {
          method: "DELETE"
        });
      }
      mutate("/api/v1/events/me");
    } catch (e) {
      console.error(e);
      alert("Failed to update event attendance.");
    }
  };

  return (
    <section className="bg-surface rounded-xl shadow-[0px_2px_4px_rgba(0,0,0,0.05)] border border-outline-variant/30 p-card-padding">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-primary-container/10 flex items-center justify-center text-primary">
          <Calendar className="h-6 w-6" />
        </div>
        <h3 className="font-title-lg text-title-lg text-primary">Events Attended</h3>
      </div>
      
      <div className="space-y-3">
        {allEvents.map((event: any) => {
          const isAttended = attendedIds.has(event.event_id);
          return (
            <label 
              key={event.event_id} 
              className={`flex items-start gap-4 p-4 rounded-lg border transition-all ${
                isAttended ? "border-primary bg-primary-container/5" : "border-outline-variant/50 bg-surface"
              } ${isEditing ? "cursor-pointer hover:border-primary/50" : "cursor-default opacity-90"}`}
            >
              <div className="pt-0.5">
                <input 
                  type="checkbox" 
                  className="w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary/20 transition-all cursor-pointer"
                  checked={isAttended}
                  disabled={!isEditing}
                  onChange={(e) => toggleEvent(event.event_id, e.target.checked)}
                />
              </div>
              <div className="flex-1">
                <h4 className={`font-label-lg text-label-lg mb-1 ${isAttended ? "text-primary font-bold" : "text-on-surface"}`}>
                  {event.event_name}
                </h4>
                <p className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-4">
                  <span>{new Date(event.event_date).toLocaleDateString()}</span>
                  <span>{event.location}</span>
                </p>
                {event.description && (
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-2 opacity-80">
                    {event.description}
                  </p>
                )}
              </div>
              {isAttended && (
                <CheckCircle2 className="w-6 h-6 text-primary shrink-0" />
              )}
            </label>
          );
        })}
        {allEvents.length === 0 && (
          <p className="text-on-surface-variant font-body-md">No events available.</p>
        )}
      </div>
    </section>
  );
}
