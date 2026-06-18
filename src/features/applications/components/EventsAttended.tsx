"use client";

import useSWR, { mutate } from "swr";
import { fetcher, apiFetch } from "@/lib/api-client";
import { Calendar, CheckCircle2, Plus, ChevronDown, ChevronUp } from "lucide-react";
import { useState, useRef, useEffect } from "react";

export function EventsAttended({ 
  isEditing,
  localMode = false,
  localEvents = [],
  onUpdate
}: { 
  isEditing?: boolean;
  localMode?: boolean;
  localEvents?: any[];
  onUpdate?: (events: any[]) => void;
}) {
  const { data: allEventsData } = useSWR("/api/v1/events", fetcher);
  const { data: attendedData } = useSWR(!localMode ? "/api/v1/events/me" : null, fetcher);

  const allEvents = allEventsData?.data || [];
  const attendedEvents = localMode ? localEvents : (attendedData?.data || []);
  const attendedIds = new Set(attendedEvents.map((e: any) => e.event_id));

  const [showOtherForm, setShowOtherForm] = useState(false);
  const [otherForm, setOtherForm] = useState({ event_name: "", host_country: "", event_date: "" });
  const [isAdding, setIsAdding] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleEvent = async (eventId: string, isAttending: boolean) => {
    if (!isEditing) return;
    
    if (localMode && onUpdate) {
      if (isAttending) {
        const eventToAdd = allEvents.find((e: any) => e.event_id === eventId);
        if (eventToAdd) {
          onUpdate([...attendedEvents, eventToAdd]);
        }
      } else {
        onUpdate(attendedEvents.filter((e: any) => e.event_id !== eventId));
      }
      return;
    }

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

  const handleAddOther = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otherForm.event_name || !otherForm.host_country || !otherForm.event_date) return;
    setIsAdding(true);
    try {
      // Create new event globally
      const res = await apiFetch("/api/v1/events", {
        method: "POST",
        body: JSON.stringify(otherForm)
      });
      const newEvent = res.data;
      
      if (localMode && onUpdate) {
        onUpdate([...attendedEvents, newEvent]);
        mutate("/api/v1/events");
        setOtherForm({ event_name: "", host_country: "", event_date: "" });
        setIsAdding(false);
        return;
      }

      // Auto-check it off (server mode)
      await apiFetch(`/api/v1/events/me`, {
        method: "POST",
        body: JSON.stringify({ event_id: newEvent.event_id })
      });

      mutate("/api/v1/events");
      mutate("/api/v1/events/me");
      setOtherForm({ event_name: "", host_country: "", event_date: "" });
    } catch (err) {
      console.error(err);
      alert("Failed to add custom event.");
    } finally {
      setIsAdding(false);
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
      
      <div className="relative" ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="w-full flex items-center justify-between p-4 bg-surface-container-low border border-outline-variant/50 rounded-lg hover:border-primary/50 transition-all font-label-md text-on-surface"
        >
          <span>Select events attended ({attendedIds.size} selected)</span>
          {isDropdownOpen ? <ChevronUp className="w-5 h-5 text-on-surface-variant" /> : <ChevronDown className="w-5 h-5 text-on-surface-variant" />}
        </button>

        {isDropdownOpen && (
          <div className="absolute top-full left-0 right-0 mt-2 z-50 bg-surface border border-outline-variant/50 rounded-xl shadow-lg max-h-80 overflow-y-auto p-2">
            <div className="flex flex-col gap-1">
              {allEvents.map((event: any) => {
                const isAttended = attendedIds.has(event.event_id);
                return (
                  <label 
                    key={event.event_id} 
                    className={`flex items-start gap-4 p-3 rounded-lg transition-all ${
                      isAttended ? "bg-primary-container/10" : "hover:bg-surface-container-low"
                    } ${isEditing ? "cursor-pointer" : "cursor-default opacity-90"}`}
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
                    <div className="flex-1 min-w-0">
                      <h4 className={`font-label-md mb-0.5 truncate ${isAttended ? "text-primary font-bold" : "text-on-surface"}`} title={event.event_name}>
                        {event.event_name}
                      </h4>
                      <p className="font-body-sm text-on-surface-variant flex gap-2 text-xs">
                        <span>{new Date(event.event_date).toLocaleDateString()}</span>
                        <span>•</span>
                        <span className="truncate" title={event.host_country || event.location}>{event.host_country || event.location}</span>
                      </p>
                    </div>
                    {isAttended && (
                      <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                    )}
                  </label>
                );
              })}
              
              {isEditing && !showOtherForm && (
                <button
                  type="button"
                  onClick={() => {
                    setShowOtherForm(true);
                    setIsDropdownOpen(false);
                  }}
                  className="flex items-center gap-2 p-3 mt-1 rounded-lg hover:bg-surface-container-low transition-all text-primary font-label-md"
                >
                  <Plus className="w-5 h-5" />
                  Add Other Event...
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {attendedEvents.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {attendedEvents.map((event: any) => (
            <div key={event.event_id} className="px-3 py-1.5 bg-primary-container/10 text-primary border border-primary/20 rounded-full font-label-sm flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              {event.event_name}
            </div>
          ))}
        </div>
      )}

      {showOtherForm && isEditing && (
        <div className="mt-6 p-4 rounded-lg border border-outline-variant bg-surface-container-lowest">
          <h4 className="font-label-lg text-primary mb-4">Add Custom Event</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="space-y-1">
              <label className="font-label-sm text-on-surface-variant">Event Name *</label>
              <input required type="text" value={otherForm.event_name} onChange={e => setOtherForm(prev => ({...prev, event_name: e.target.value}))} className="w-full bg-surface border border-outline-variant/50 rounded-lg py-2 px-3 focus:ring-2 focus:ring-primary/20 focus:border-primary font-body-md" placeholder="e.g. Japan Exchange 2024" />
            </div>
            <div className="space-y-1">
              <label className="font-label-sm text-on-surface-variant">Host Country *</label>
              <input required type="text" value={otherForm.host_country} onChange={e => setOtherForm(prev => ({...prev, host_country: e.target.value}))} className="w-full bg-surface border border-outline-variant/50 rounded-lg py-2 px-3 focus:ring-2 focus:ring-primary/20 focus:border-primary font-body-md" placeholder="e.g. Japan" />
            </div>
            <div className="space-y-1">
              <label className="font-label-sm text-on-surface-variant">Event Date *</label>
              <input required type="date" value={otherForm.event_date} onChange={e => setOtherForm(prev => ({...prev, event_date: e.target.value}))} className="w-full bg-surface border border-outline-variant/50 rounded-lg py-2 px-3 focus:ring-2 focus:ring-primary/20 focus:border-primary font-body-md" />
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <button type="button" onClick={(e) => { e.preventDefault(); e.stopPropagation(); setShowOtherForm(false); }} className="px-4 py-2 font-label-md text-on-surface-variant hover:bg-surface-container rounded-lg transition-colors">Cancel</button>
            <button type="button" onClick={handleAddOther} disabled={isAdding || !otherForm.event_name || !otherForm.host_country || !otherForm.event_date} className="px-4 py-2 font-label-md text-on-primary bg-primary rounded-lg transition-colors disabled:opacity-50 flex items-center gap-2">
              {isAdding ? "Saving..." : "Save & Check"}
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
