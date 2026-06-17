"use client";

import { useState } from "react";
import useSWR, { mutate } from "swr";
import { fetcher, apiFetch } from "@/lib/api-client";
import { useRouter } from "next/navigation";
import { BadgeCheck, ArrowRight, UserCircle2 } from "lucide-react";
import { formatPhoneNumber } from "@/lib/utils";

export default function OnboardingPage() {
  const router = useRouter();
  const { data: profile, isLoading } = useSWR("/api/v1/students/me/profile", fetcher);
  const [isSaving, setIsSaving] = useState(false);

  // If the profile is already fully complete, we could redirect to dashboard, 
  // but we will let them see the onboarding screen so they know they are onboarding.
  // The actual check will be if the essential fields are already present.

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSaving(true);

    const formData = new FormData(e.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    if (typeof payload.mobile_number === "string") {
      payload.mobile_number = formatPhoneNumber(payload.mobile_number);
    }

    try {
      await apiFetch("/api/v1/students/me/profile", {
        method: "PATCH",
        body: JSON.stringify(payload),
      });

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
        <div className="w-full max-w-2xl bg-surface rounded-2xl shadow-xl border border-outline-variant/30 overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="bg-primary/5 px-8 py-10 text-center border-b border-outline-variant/50">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <UserCircle2 className="w-8 h-8 text-primary" />
            </div>
            <h1 className="font-headline-lg font-bold text-primary mb-2">Welcome to SintaLink!</h1>
            <p className="font-body-lg text-on-surface-variant max-w-md mx-auto">
              Before you can apply for the exchange program, we need to finalize a few details for your student record. 
              <br/><br/>
              <strong>Note:</strong> These details cannot be changed later.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-8">
            <div className="space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="font-label-md text-on-surface-variant">Phone Number <span className="text-error">*</span></label>
                  <input
                    required
                    type="tel"
                    name="mobile_number"
                    defaultValue={profile?.mobile_number || ""}
                    placeholder="+63 912 345 6789"
                    className="w-full bg-surface-container-low border border-outline-variant/50 rounded-lg py-3 px-4 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-body-md"
                  />
                </div>

                <div className="space-y-2">
                  <label className="font-label-md text-on-surface-variant">Year Level <span className="text-error">*</span></label>
                  <select
                    required
                    name="year_level"
                    defaultValue={profile?.year_level || ""}
                    className="w-full bg-surface-container-low border border-outline-variant/50 rounded-lg py-3 px-4 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-body-md"
                  >
                    <option value="" disabled>Select Year Level</option>
                    <option value="1st Year">1st Year</option>
                    <option value="2nd Year">2nd Year</option>
                    <option value="3rd Year">3rd Year</option>
                    <option value="4th Year">4th Year</option>
                    <option value="5th Year">5th Year</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="font-label-md text-on-surface-variant">Passport Issue Date</label>
                  <input
                    type="date"
                    name="passport_issue_date"
                    defaultValue={profile?.passport_issue_date ? new Date(profile.passport_issue_date).toISOString().split('T')[0] : ''}
                    className="w-full bg-surface-container-low border border-outline-variant/50 rounded-lg py-3 px-4 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-body-md"
                  />
                </div>

                <div className="space-y-2">
                  <label className="font-label-md text-on-surface-variant">Passport Expiry Date</label>
                  <input
                    type="date"
                    name="passport_expiry_date"
                    defaultValue={profile?.passport_expiry_date ? new Date(profile.passport_expiry_date).toISOString().split('T')[0] : ''}
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

            <div className="pt-6 flex justify-end">
              <button
                type="submit"
                disabled={isSaving}
                className="flex items-center gap-2 px-8 py-3 bg-primary text-on-primary rounded-xl font-bold hover:bg-primary/90 transition-all active:scale-95 shadow-md disabled:opacity-50"
              >
                {isSaving ? "Saving..." : "Complete Profile"}
                {!isSaving && <ArrowRight className="w-5 h-5" />}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
