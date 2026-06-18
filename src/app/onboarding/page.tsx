"use client";

import { useState, useEffect } from "react";
import useSWR, { mutate } from "swr";
import { fetcher, apiFetch } from "@/lib/api-client";
import { useRouter } from "next/navigation";
import { UserCircle2, ArrowRight } from "lucide-react";
import { formatPhoneNumber } from "@/lib/utils";
import { EventsAttended } from "@/features/applications/components/EventsAttended";

export default function OnboardingPage() {
  const router = useRouter();
  const { data: profile, isLoading } = useSWR("/api/v1/students/me/profile", fetcher);
  const [isSaving, setIsSaving] = useState(false);
  
  const [birthDate, setBirthDate] = useState("");
  const [age, setAge] = useState<number | "">("");
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    if (profile?.birth_date) {
      setBirthDate(new Date(profile.birth_date).toISOString().split('T')[0]);
    }
  }, [profile]);

  useEffect(() => {
    if (birthDate) {
      const today = new Date();
      const birth = new Date(birthDate);
      let calculatedAge = today.getFullYear() - birth.getFullYear();
      const m = today.getMonth() - birth.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
        calculatedAge--;
      }
      setAge(calculatedAge > 0 ? calculatedAge : "");
    } else {
      setAge("");
    }
  }, [birthDate]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSaving(true);

    const formData = new FormData(e.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    if (typeof payload.mobile_number === "string") {
      payload.mobile_number = formatPhoneNumber(payload.mobile_number);
    }
    
    // Ensure age is included if computed
    payload.age = age.toString();

    try {
      await apiFetch("/api/v1/students/me/profile", {
        method: "PATCH",
        body: JSON.stringify(payload),
      });

      // Save events
      for (const event of events) {
        await apiFetch(`/api/v1/events/me`, {
          method: "POST",
          body: JSON.stringify({ event_id: event.event_id })
        });
      }

      await mutate("/api/v1/students/me/profile");
      router.push("/dashboard");
    } catch (e: any) {
      alert(e.message || "Failed to save profile. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-on-surface-variant">Loading your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface-container-lowest flex flex-col">
      <header className="px-8 py-6 flex items-center justify-between bg-surface border-b border-outline-variant">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary rounded flex items-center justify-center font-bold text-on-primary text-xs">
            SL
          </div>
          <span className="font-headline-md font-bold text-primary">SintaLink</span>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-4xl bg-surface rounded-2xl shadow-xl border border-outline-variant/30 overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="bg-primary/5 px-8 py-10 text-center border-b border-outline-variant/50">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <UserCircle2 className="w-8 h-8 text-primary" />
            </div>
            <h1 className="font-headline-lg font-bold text-primary mb-2">Welcome to SintaLink!</h1>
            <p className="font-body-lg text-on-surface-variant max-w-xl mx-auto">
              Before you can apply for the exchange program, we need to finalize your student record. 
              <br/><br/>
              <strong>Note:</strong> Some of these details cannot be changed later.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-10">
            
            {/* 1. Personal Details */}
            <div className="space-y-6">
              <h3 className="font-title-lg text-primary border-b border-outline-variant pb-2">1. Personal Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="font-label-md text-on-surface-variant">Birth Date <span className="text-error">*</span></label>
                  <input
                    required
                    type="date"
                    name="birth_date"
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                    className="w-full bg-surface-container-low border border-outline-variant/50 rounded-lg py-3 px-4 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-body-md"
                  />
                </div>
                <div className="space-y-2">
                  <label className="font-label-md text-on-surface-variant">Age</label>
                  <input
                    readOnly
                    type="number"
                    value={age}
                    placeholder="Auto-computed"
                    className="w-full bg-surface-container-low border border-outline-variant/50 rounded-lg py-3 px-4 transition-all font-body-md text-on-surface-variant opacity-70 cursor-not-allowed"
                  />
                </div>
                <div className="space-y-2">
                  <label className="font-label-md text-on-surface-variant">Sex <span className="text-error">*</span></label>
                  <select
                    required
                    name="sex"
                    defaultValue={profile?.sex || ""}
                    className="w-full bg-surface-container-low border border-outline-variant/50 rounded-lg py-3 px-4 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-body-md"
                  >
                    <option value="" disabled>Select Sex</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="font-label-md text-on-surface-variant">Nationality <span className="text-error">*</span></label>
                  <input
                    required
                    type="text"
                    name="nationality"
                    defaultValue={profile?.nationality || ""}
                    placeholder="e.g. Filipino"
                    className="w-full bg-surface-container-low border border-outline-variant/50 rounded-lg py-3 px-4 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-body-md"
                  />
                </div>
                <div className="space-y-2">
                  <label className="font-label-md text-on-surface-variant">Alternate Email</label>
                  <input
                    type="email"
                    name="alternate_email"
                    defaultValue={profile?.alternate_email || ""}
                    placeholder="personal.email@example.com"
                    className="w-full bg-surface-container-low border border-outline-variant/50 rounded-lg py-3 px-4 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-body-md"
                  />
                </div>
              </div>
            </div>

            {/* 2. Contact Information */}
            <div className="space-y-6">
              <h3 className="font-title-lg text-primary border-b border-outline-variant pb-2">2. Contact Information</h3>
              <div className="space-y-2">
                <label className="font-label-md text-on-surface-variant">Home Address (Permanent) <span className="text-error">*</span></label>
                <textarea
                  required
                  rows={2}
                  name="home_address"
                  placeholder="Complete permanent residential address"
                  defaultValue={profile?.home_address || ""}
                  className="w-full bg-surface-container-low border border-outline-variant/50 rounded-lg py-3 px-4 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-body-md resize-none"
                />
              </div>
              <div className="space-y-2">
                <label className="font-label-md text-on-surface-variant">Personal Mobile Number <span className="text-error">*</span></label>
                <input
                  required
                  type="tel"
                  name="mobile_number"
                  defaultValue={profile?.mobile_number || ""}
                  placeholder="+63 912 345 6789"
                  className="w-full bg-surface-container-low border border-outline-variant/50 rounded-lg py-3 px-4 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-body-md"
                />
              </div>
            </div>

            {/* 3. Guardian Information */}
            <div className="space-y-6">
              <h3 className="font-title-lg text-primary border-b border-outline-variant pb-2">3. Guardian Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="font-label-md text-on-surface-variant">Guardian Name <span className="text-error">*</span></label>
                  <input
                    required
                    type="text"
                    name="guardian_name"
                    defaultValue={profile?.guardian_name || ""}
                    placeholder="e.g. Maria Dela Cruz"
                    className="w-full bg-surface-container-low border border-outline-variant/50 rounded-lg py-3 px-4 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-body-md"
                  />
                </div>
                <div className="space-y-2">
                  <label className="font-label-md text-on-surface-variant">Relationship <span className="text-error">*</span></label>
                  <select
                    required
                    name="relation_to_student"
                    defaultValue={profile?.relation_to_student || ""}
                    className="w-full bg-surface-container-low border border-outline-variant/50 rounded-lg py-3 px-4 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-body-md"
                  >
                    <option value="" disabled>Select relationship</option>
                    <option value="Father">Father</option>
                    <option value="Mother">Mother</option>
                    <option value="Legal Guardian">Legal Guardian</option>
                    <option value="Sibling">Sibling</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="font-label-md text-on-surface-variant">Guardian Contact Number <span className="text-error">*</span></label>
                  <input
                    required
                    type="tel"
                    name="guardian_contact_number"
                    defaultValue={profile?.guardian_contact_number || ""}
                    placeholder="+63 912 345 6789"
                    className="w-full bg-surface-container-low border border-outline-variant/50 rounded-lg py-3 px-4 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-body-md"
                  />
                </div>
                <div className="space-y-2">
                  <label className="font-label-md text-on-surface-variant">Guardian Email</label>
                  <input
                    type="email"
                    name="guardian_email"
                    defaultValue={profile?.guardian_email || ""}
                    placeholder="guardian@example.com"
                    className="w-full bg-surface-container-low border border-outline-variant/50 rounded-lg py-3 px-4 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-body-md"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="font-label-md text-on-surface-variant">Guardian's Address <span className="text-error">*</span></label>
                <textarea
                  required
                  rows={2}
                  name="guardian_address"
                  placeholder="Complete residential address of your guardian"
                  defaultValue={profile?.guardian_address || ""}
                  className="w-full bg-surface-container-low border border-outline-variant/50 rounded-lg py-3 px-4 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-body-md resize-none"
                />
              </div>
            </div>

            {/* 4. Academic Details */}
            <div className="space-y-6">
              <h3 className="font-title-lg text-primary border-b border-outline-variant pb-2">4. Academic Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="font-label-md text-on-surface-variant">Year Level <span className="text-error">*</span></label>
                  <select
                    required
                    name="year_level"
                    defaultValue={profile?.year_level || ""}
                    className="w-full bg-surface-container-low border border-outline-variant/50 rounded-lg py-3 px-4 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-body-md"
                  >
                    <option value="" disabled>Select Year Level</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="font-label-md text-on-surface-variant">Cumulative GWA <span className="text-error">*</span></label>
                  <input
                    required
                    type="number"
                    step="0.01"
                    name="cumulative_gwa"
                    defaultValue={profile?.cumulative_gwa || ""}
                    placeholder="e.g. 1.25"
                    className="w-full bg-surface-container-low border border-outline-variant/50 rounded-lg py-3 px-4 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-body-md font-bold text-primary"
                  />
                </div>
              </div>
            </div>

            {/* 5. Passport Details */}
            <div className="space-y-6">
              <h3 className="font-title-lg text-primary border-b border-outline-variant pb-2">5. Passport Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="font-label-md text-on-surface-variant">Passport Number</label>
                  <input
                    type="text"
                    name="passport_number"
                    defaultValue={profile?.passport_number || ""}
                    placeholder="e.g. P1234567A"
                    className="w-full bg-surface-container-low border border-outline-variant/50 rounded-lg py-3 px-4 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-body-md uppercase"
                  />
                </div>
                <div className="space-y-2">
                  <label className="font-label-md text-on-surface-variant">Issue Date</label>
                  <input
                    type="date"
                    name="passport_issue_date"
                    defaultValue={profile?.passport_issue_date ? new Date(profile.passport_issue_date).toISOString().split('T')[0] : ''}
                    className="w-full bg-surface-container-low border border-outline-variant/50 rounded-lg py-3 px-4 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-body-md"
                  />
                </div>
                <div className="space-y-2">
                  <label className="font-label-md text-on-surface-variant">Expiry Date</label>
                  <input
                    type="date"
                    name="passport_expiry_date"
                    defaultValue={profile?.passport_expiry_date ? new Date(profile.passport_expiry_date).toISOString().split('T')[0] : ''}
                    className="w-full bg-surface-container-low border border-outline-variant/50 rounded-lg py-3 px-4 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-body-md"
                  />
                </div>
              </div>
            </div>

            {/* 5. Events Attended */}
            <div className="space-y-6">
              <h3 className="font-title-lg text-primary border-b border-outline-variant pb-2">5. Exchange Events Attended</h3>
              <EventsAttended 
                isEditing={true} 
                localMode={true} 
                localEvents={events} 
                onUpdate={setEvents} 
              />
            </div>

            <div className="pt-6 border-t border-outline-variant flex justify-end">
              <button
                type="submit"
                disabled={isSaving}
                className="bg-primary text-on-primary px-8 py-3 rounded-full font-label-lg hover:bg-primary/90 transition-all flex items-center gap-2 disabled:opacity-50"
              >
                {isSaving ? "Completing Profile..." : "Complete Profile"}
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
