"use client";

import { useState } from "react";
import { Student } from "@/lib/mockStudentData";
import { BadgeCheck, Users, GraduationCap, Save, RefreshCw, CheckCircle2 } from "lucide-react";

export function StudentProfileForm({ student }: { student: Student }) {
  const [isSaving, setIsSaving] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const displayToast = (msg: string) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleReset = () => {
    if (confirm("Are you sure you want to discard changes?")) {
      // In a real app, reset form to initial values
      displayToast("Changes discarded");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    setTimeout(() => {
      setIsSaving(false);
      setIsSuccess(true);
      
      setTimeout(() => {
        setIsSuccess(false);
      }, 2000);
    }, 1200);
  };

  return (
    <>
      <div className="max-w-5xl mx-auto p-container-padding animate-in fade-in slide-in-from-bottom-4 duration-700">
        <form id="profile-form" className="space-y-stack-lg" onSubmit={handleSubmit}>
          
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
                    defaultValue={student.studentNumber}
                    className="w-full bg-surface-container-low border border-outline-variant/50 rounded-lg py-2.5 px-4 focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all font-body-md"
                  />
                </div>

                {/* Name */}
                <div className="space-y-2">
                  <label className="font-label-md text-label-md text-on-surface-variant flex items-center gap-1">
                    Full Name <span className="text-error">*</span>
                  </label>
                  <input
                    type="text"
                    defaultValue={student.fullName}
                    className="w-full bg-surface-container-low border border-outline-variant/50 rounded-lg py-2.5 px-4 focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all font-body-md"
                  />
                </div>

                {/* Age & Sex */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="font-label-md text-label-md text-on-surface-variant">Age</label>
                    <input
                      type="number"
                      defaultValue={student.age}
                      className="w-full bg-surface-container-low border border-outline-variant/50 rounded-lg py-2.5 px-4 focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all font-body-md"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="font-label-md text-label-md text-on-surface-variant">Sex</label>
                    <select
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
                    defaultValue={student.birthDate}
                    className="w-full bg-surface-container-low border border-outline-variant/50 rounded-lg py-2.5 px-4 focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all font-body-md"
                  />
                </div>

                {/* Nationality */}
                <div className="space-y-2">
                  <label className="font-label-md text-label-md text-on-surface-variant">Nationality</label>
                  <input
                    type="text"
                    defaultValue={student.nationality}
                    className="w-full bg-surface-container-low border border-outline-variant/50 rounded-lg py-2.5 px-4 focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all font-body-md"
                  />
                </div>

                {/* Passport Details */}
                <div className="space-y-2">
                  <label className="font-label-md text-label-md text-on-surface-variant">Passport Number</label>
                  <input
                    type="text"
                    placeholder="e.g. P1234567A"
                    defaultValue={student.passportNumber}
                    className="w-full bg-surface-container-low border border-outline-variant/50 rounded-lg py-2.5 px-4 focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all font-body-md"
                  />
                </div>

                {/* Emails */}
                <div className="space-y-2">
                  <label className="font-label-md text-label-md text-on-surface-variant">Email Address</label>
                  <input
                    type="email"
                    defaultValue={student.email}
                    className="w-full bg-surface-container-low border border-outline-variant/50 rounded-lg py-2.5 px-4 focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all font-body-md"
                  />
                </div>

                {/* Academic Program */}
                <div className="space-y-2">
                  <label className="font-label-md text-label-md text-on-surface-variant">Academic Program</label>
                  <div className="flex items-center gap-2 p-3 bg-secondary-fixed/30 border border-secondary-fixed rounded-lg">
                    <GraduationCap className="text-on-secondary-container h-5 w-5" />
                    <span className="font-body-md text-on-secondary-container font-semibold">
                      {student.academicProgram}
                    </span>
                  </div>
                </div>

                {/* GWA & Status */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="font-label-md text-label-md text-on-surface-variant">Current GWA</label>
                    <input
                      type="text"
                      defaultValue={student.gwa}
                      className="w-full bg-surface-container-low border border-outline-variant/50 rounded-lg py-2.5 px-4 focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all font-body-md font-bold text-primary"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="font-label-md text-label-md text-on-surface-variant">Enrollment Status</label>
                    <div className="bg-green-100 text-green-800 px-3 py-2.5 rounded-lg flex items-center justify-center gap-2 text-sm font-bold">
                      <span className="w-2 h-2 rounded-full bg-green-600 animate-pulse"></span>
                      {student.enrollmentStatus}
                    </div>
                  </div>
                </div>

                {/* Address (Span 2) */}
                <div className="space-y-2 md:col-span-2">
                  <label className="font-label-md text-label-md text-on-surface-variant">Permanent Address</label>
                  <textarea
                    rows={2}
                    defaultValue={student.permanentAddress}
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
                    defaultValue={student.guardian.fullName}
                    className="w-full bg-surface-container-low border border-outline-variant/50 rounded-lg py-2.5 px-4 focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all font-body-md"
                  />
                </div>

                {/* Relation */}
                <div className="space-y-2">
                  <label className="font-label-md text-label-md text-on-surface-variant">Relationship</label>
                  <select
                    defaultValue={student.guardian.relationship}
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
                  <label className="font-label-md text-label-md text-on-surface-variant">Contact Number</label>
                  <div className="relative">
                    <span className="absolute left-4 top-2.5 text-outline text-body-md">+63</span>
                    <input
                      type="tel"
                      defaultValue={student.guardian.contactNumber}
                      className="w-full bg-surface-container-low border border-outline-variant/50 rounded-lg py-2.5 pl-12 pr-4 focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all font-body-md"
                    />
                  </div>
                </div>

                {/* Guardian Email */}
                <div className="space-y-2">
                  <label className="font-label-md text-label-md text-on-surface-variant">Email Address</label>
                  <input
                    type="email"
                    placeholder="m.delacruz@example.com"
                    defaultValue={student.guardian.emailAddress}
                    className="w-full bg-surface-container-low border border-outline-variant/50 rounded-lg py-2.5 px-4 focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all font-body-md"
                  />
                </div>

              </div>
            </div>
          </section>
        </form>
      </div>

      {/* Floating Action Footer */}
      <footer className="fixed bottom-0 right-0 w-[calc(100%-280px)] bg-surface border-t border-outline-variant flex justify-end items-center gap-4 px-10 py-6 z-40 shadow-[0_-4px_12px_rgba(0,0,0,0.03)]">
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

      {/* Simulated Toast Notification */}
      {showToast && (
        <div className="fixed bottom-24 right-8 bg-inverse-surface text-inverse-on-surface px-6 py-3 rounded-lg shadow-xl z-50 animate-in fade-in slide-in-from-bottom-4 duration-300">
          {toastMessage}
        </div>
      )}
    </>
  );
}
