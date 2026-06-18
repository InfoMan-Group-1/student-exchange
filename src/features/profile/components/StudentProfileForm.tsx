"use client";

import { useState } from "react";
import { BadgeCheck, Users, GraduationCap, Save, RefreshCw, CheckCircle2, Pencil } from "lucide-react";
import { apiFetch } from "@/lib/api-client";
import { mutate } from "swr";
import { EventsAttended } from "@/features/applications/components/EventsAttended";

export function StudentProfileForm({ student }: { student: any }) {
  const [isSaving, setIsSaving] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const displayToast = (msg: string) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleReset = () => {
    if (confirm("Are you sure you want to discard changes?")) {
      setIsEditing(false);
      window.location.reload();
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSaving(true);

    const formData = new FormData(e.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    try {
      // apiFetch throws on non-2xx — no need to check res.ok
      await apiFetch("/api/v1/students/me/profile", {
        method: "PATCH",
        body: JSON.stringify(payload),
      });

      mutate("/api/v1/students/me/profile");
      setIsSuccess(true);
      displayToast("Profile updated successfully");
      setIsEditing(false);
      setTimeout(() => setIsSuccess(false), 2000);
    } catch (e: any) {
      displayToast(e.message || "Failed to save profile");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      <div className="max-w-5xl mx-auto p-container-padding animate-in fade-in slide-in-from-bottom-4 duration-700">
        {!isEditing && (
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-headline-md text-headline-md text-on-surface">
              Hi, <span className="text-primary font-bold">{student?.full_name?.split(" ")[0] || "Student"}</span>!
            </h2>
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 px-6 py-2.5 bg-primary text-on-primary rounded-lg font-label-md hover:opacity-90 transition-all active:scale-95"
            >
              <Pencil className="w-4 h-4" />
              Edit Profile
            </button>
          </div>
        )}
        <form id="profile-form" className="space-y-stack-lg" onSubmit={handleSubmit}>
          <fieldset disabled={!isEditing} className={`space-y-stack-lg ${!isEditing ? "opacity-90" : ""}`}>
            
          {/* Section A: Student Information */}
          <section className="bg-surface rounded-xl shadow-[0px_2px_4px_rgba(0,0,0,0.05)] overflow-hidden border border-outline-variant/30">
            <div className="bg-surface-container-low px-card-padding py-4 border-b border-outline-variant/50 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <BadgeCheck className="text-primary h-6 w-6" />
                <h3 className="font-title-lg text-title-lg text-primary">Student Information</h3>
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-outline">Section A</span>
            </div>
            
            <div className="p-card-padding">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                
                {/* Student ID */}
                <div className="space-y-2">
                  <label className="font-label-md text-label-md text-on-surface-variant flex items-center gap-1">
                    Student Number <span className="text-error">*</span>
                  </label>
                  <input
                    type="text"
                    readOnly
                    defaultValue={student.student_number}
                    className="w-full bg-surface-container-low border border-outline-variant/50 rounded-lg py-2.5 px-4 focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all font-body-md"
                  />
                </div>

                {/* Mobile Number */}
                <div className="space-y-2">
                  <label className="font-label-md text-label-md text-on-surface-variant flex items-center gap-1">Mobile Number</label>
                  <input
                    type="text"
                    name="mobile_number"
                    defaultValue={student.mobile_number}
                    readOnly
                    className="w-full bg-surface-container-low border border-outline-variant/50 rounded-lg py-2.5 px-4 focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all font-body-md text-on-surface-variant opacity-70 cursor-not-allowed"
                  />
                </div>

                {/* Name */}
                <div className="space-y-2">
                  <label className="font-label-md text-label-md text-on-surface-variant flex items-center gap-1">
                    Full Name <span className="text-error">*</span>
                  </label>
                  <input
                    type="text"
                    name="full_name"
                    defaultValue={student.full_name}
                    className="w-full bg-surface-container-low border border-outline-variant/50 rounded-lg py-2.5 px-4 focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all font-body-md"
                  />
                </div>

                {/* Age & Sex */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="font-label-md text-label-md text-on-surface-variant">Age</label>
                    <input
                      type="number"
                      name="age"
                      defaultValue={student.age}
                      className="w-full bg-surface-container-low border border-outline-variant/50 rounded-lg py-2.5 px-4 focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all font-body-md"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="font-label-md text-label-md text-on-surface-variant">Sex</label>
                    <select
                      name="sex"
                      defaultValue={student.sex}
                      className="w-full bg-surface-container-low border border-outline-variant/50 rounded-lg py-2.5 px-4 focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all font-body-md"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                {/* Birth Date */}
                <div className="space-y-2">
                  <label className="font-label-md text-label-md text-on-surface-variant">Birth Date</label>
                  <input
                    type="date"
                    name="birth_date"
                    defaultValue={student.birth_date ? new Date(student.birth_date).toISOString().split('T')[0] : ''}
                    className="w-full bg-surface-container-low border border-outline-variant/50 rounded-lg py-2.5 px-4 focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all font-body-md"
                  />
                </div>

                {/* Nationality */}
                <div className="space-y-2">
                  <label className="font-label-md text-label-md text-on-surface-variant">Nationality</label>
                  <input
                    type="text"
                    name="nationality"
                    defaultValue={student.nationality}
                    className="w-full bg-surface-container-low border border-outline-variant/50 rounded-lg py-2.5 px-4 focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all font-body-md"
                  />
                </div>

                {/* Passport Details */}
                <div className="space-y-2">
                  <label className="font-label-md text-label-md text-on-surface-variant flex items-center gap-1">Passport Number</label>
                  <input
                    type="text"
                    name="passport_number"
                    placeholder="e.g. P1234567A"
                    defaultValue={student.passport_number}
                    readOnly
                    className="w-full bg-surface-container-low border border-outline-variant/50 rounded-lg py-2.5 px-4 focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all font-body-md text-on-surface-variant opacity-70 cursor-not-allowed"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="font-label-md text-label-md text-on-surface-variant flex items-center gap-1">Passport Issue Date</label>
                    <input
                      type="date"
                      name="passport_issue_date"
                      defaultValue={student.passport_issue_date ? new Date(student.passport_issue_date).toISOString().split('T')[0] : ''}
                      readOnly
                      className="w-full bg-surface-container-low border border-outline-variant/50 rounded-lg py-2.5 px-4 focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all font-body-md text-on-surface-variant opacity-70 cursor-not-allowed"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="font-label-md text-label-md text-on-surface-variant flex items-center gap-1">Passport Expiry Date</label>
                    <input
                      type="date"
                      name="passport_expiry_date"
                      defaultValue={student.passport_expiry_date ? new Date(student.passport_expiry_date).toISOString().split('T')[0] : ''}
                      readOnly
                      className="w-full bg-surface-container-low border border-outline-variant/50 rounded-lg py-2.5 px-4 focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all font-body-md text-on-surface-variant opacity-70 cursor-not-allowed"
                    />
                  </div>
                </div>

                {/* Year Level */}
                <div className="space-y-2">
                  <label className="font-label-md text-label-md text-on-surface-variant flex items-center gap-1">Year Level</label>
                  <input
                    type="text"
                    name="year_level"
                    defaultValue={student.year_level}
                    readOnly
                    className="w-full bg-surface-container-low border border-outline-variant/50 rounded-lg py-2.5 px-4 focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all font-body-md text-on-surface-variant opacity-70 cursor-not-allowed"
                  />
                </div>

                {/* Emails */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="font-label-md text-label-md text-on-surface-variant">School Email</label>
                    <input
                      type="email"
                      name="school_email"
                      defaultValue={student.school_email}
                      className="w-full bg-surface-container-low border border-outline-variant/50 rounded-lg py-2.5 px-4 focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all font-body-md"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="font-label-md text-label-md text-on-surface-variant">Alternate Email</label>
                    <input
                      type="email"
                      name="alternate_email"
                      defaultValue={student.alternate_email}
                      className="w-full bg-surface-container-low border border-outline-variant/50 rounded-lg py-2.5 px-4 focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all font-body-md"
                    />
                  </div>
                </div>

                {/* Academic Program */}
                <div className="space-y-2">
                  <label className="font-label-md text-label-md text-on-surface-variant">Academic Program</label>
                  <select
                    name="program_name"
                    defaultValue={student.program_name || "BS Information Technology — CCIS"}
                    className="w-full bg-surface-container-low border border-outline-variant/50 rounded-lg py-2.5 px-4 focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all font-body-md"
                  >
                    <option value="BS Information Technology — CCIS">BS Information Technology — CCIS</option>
                    <option value="BS Computer Science — CCIS">BS Computer Science — CCIS</option>
                    <option value="BS Business Administration — CBA">BS Business Administration — CBA</option>
                    <option value="BS Accountancy — CAF">BS Accountancy — CAF</option>
                    <option value="BA Communication — COC">BA Communication — COC</option>
                    <option value="BS Engineering — CE">BS Engineering — CE</option>
                  </select>
                </div>

                {/* GWA */}
                <div className="space-y-2">
                  <label className="font-label-md text-label-md text-on-surface-variant">Current GWA</label>
                  <input
                    type="number"
                    step="0.01"
                    name="cumulative_gwa"
                    defaultValue={student.cumulative_gwa}
                    className="w-full bg-surface-container-low border border-outline-variant/50 rounded-lg py-2.5 px-4 focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all font-body-md font-bold text-primary"
                  />
                </div>

                {/* Address (Span 2) */}
                <div className="space-y-2 md:col-span-2">
                  <label className="font-label-md text-label-md text-on-surface-variant">Permanent Address</label>
                  <textarea
                    rows={2}
                    name="home_address"
                    defaultValue={student.home_address}
                    className="w-full bg-surface-container-low border border-outline-variant/50 rounded-lg py-2.5 px-4 focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all font-body-md"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Section B: Guardian Information */}
          <section className="bg-surface rounded-xl shadow-[0px_2px_4px_rgba(0,0,0,0.05)] overflow-hidden border border-outline-variant/30 mb-32">
            <div className="bg-surface-container-low px-card-padding py-4 border-b border-outline-variant/50 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Users className="text-primary h-6 w-6" />
                <h3 className="font-title-lg text-title-lg text-primary">Guardian Information</h3>
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-outline">Section B</span>
            </div>
            
            <div className="p-card-padding">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                
                {/* Guardian Name */}
                <div className="space-y-2">
                  <label className="font-label-md text-label-md text-on-surface-variant">Full Name</label>
                  <input
                    type="text"
                    name="guardian_name"
                    defaultValue={student.guardian_name}
                    className="w-full bg-surface-container-low border border-outline-variant/50 rounded-lg py-2.5 px-4 focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all font-body-md"
                  />
                </div>

                {/* Relation */}
                <div className="space-y-2">
                  <label className="font-label-md text-label-md text-on-surface-variant">Relationship</label>
                  <select
                    name="relation_to_student"
                    defaultValue={student.relation_to_student}
                    className="w-full bg-surface-container-low border border-outline-variant/50 rounded-lg py-2.5 px-4 focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all font-body-md"
                  >
                    <option value="Father">Father</option>
                    <option value="Mother">Mother</option>
                    <option value="Legal Guardian">Legal Guardian</option>
                    <option value="Sibling">Sibling</option>
                  </select>
                </div>

                {/* Contact Info */}
                <div className="space-y-2">
                  <label className="font-label-md text-label-md text-on-surface-variant flex items-center gap-1">Contact Number</label>
                  <div className="relative">
                    <input
                      type="tel"
                      name="guardian_contact_number"
                      defaultValue={student.guardian_contact_number}
                      readOnly
                      className="w-full bg-surface-container-low border border-outline-variant/50 rounded-lg py-2.5 px-4 focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all font-body-md text-on-surface-variant opacity-70 cursor-not-allowed"
                    />
                  </div>
                </div>

                {/* Guardian Address */}
                <div className="space-y-2 md:col-span-2">
                  <label className="font-label-md text-label-md text-on-surface-variant flex items-center gap-1">Guardian's Address</label>
                  <textarea
                    rows={2}
                    name="guardian_address"
                    defaultValue={student.guardian_address}
                    readOnly
                    className="w-full bg-surface-container-low border border-outline-variant/50 rounded-lg py-2.5 px-4 focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all font-body-md text-on-surface-variant opacity-70 cursor-not-allowed resize-none"
                  />
                </div>

                {/* Guardian Email */}
                <div className="space-y-2">
                  <label className="font-label-md text-label-md text-on-surface-variant">Email Address</label>
                  <input
                    type="email"
                    name="guardian_email"
                    placeholder="m.delacruz@example.com"
                    defaultValue={student.guardian_email}
                    className="w-full bg-surface-container-low border border-outline-variant/50 rounded-lg py-2.5 px-4 focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all font-body-md"
                  />
                </div>

              </div>
            </div>
          </section>

          {/* Events Attended */}
          <section className="bg-surface rounded-xl shadow-[0px_2px_4px_rgba(0,0,0,0.05)] border border-outline-variant/30 p-8">
            <EventsAttended isEditing={isEditing} />
          </section>

          </fieldset>
        </form>
      </div>

      {/* Floating Action Footer */}
      {isEditing && (
        <footer className="sticky bottom-0 w-full bg-surface border-t border-outline-variant flex justify-end items-center gap-4 px-8 py-5 z-40 shadow-[0_-4px_12px_rgba(0,0,0,0.03)] mt-8">
          <button
            type="button"
            onClick={handleReset}
            className="px-8 py-3 rounded-lg border border-outline text-outline font-label-md text-label-md hover:bg-surface-container-low transition-all active:scale-95"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="profile-form"
            disabled={isSaving || isSuccess}
            className={`px-10 py-3 rounded-lg font-bold text-label-md shadow-sm transition-all flex items-center gap-2 ${
              isSuccess
                ? "bg-green-700 text-white"
                : "bg-primary text-on-primary hover:opacity-90 active:scale-95"
            }`}
          >
            {isSaving ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin" /> Saving...
              </>
            ) : isSuccess ? (
              <>
                <CheckCircle2 className="h-4 w-4" /> Saved Successfully
              </>
            ) : (
              <>
                <Save className="h-4 w-4" /> Save changes
              </>
            )}
          </button>
        </footer>
      )}

      {/* Simulated Toast Notification */}
      {showToast && (
        <div className="fixed bottom-24 right-8 bg-inverse-surface text-inverse-on-surface px-6 py-3 rounded-lg shadow-xl z-50 animate-in fade-in slide-in-from-bottom-4 duration-300">
          {toastMessage}
        </div>
      )}
    </>
  );
}
