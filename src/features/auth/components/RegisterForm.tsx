"use client";

import { useState } from "react";
import { User, LogIn, ChevronRight, CheckCircle2, AlertCircle } from "lucide-react";
import useSWR from "swr";
import { fetcher } from "@/lib/api-client";

export function RegisterForm() {
  const { data: programsData } = useSWR("/api/v1/programs", fetcher);
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    const formData = new FormData(e.currentTarget);
    const payload = Object.fromEntries(formData.entries());
    
    // Explicitly set role
    payload.role = "student";

    try {
      const res = await fetch("/api/v1/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.detail || "Registration failed");
      }

      setSuccess(true);
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
    } catch (err: any) {
      setErrorMsg(err.message);
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-6 animate-in zoom-in duration-500 bg-surface-container-lowest border border-outline-variant/50 rounded-2xl">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
          <CheckCircle2 className="w-10 h-10 text-green-600" />
        </div>
        <div className="text-center">
          <h2 className="font-headline-sm text-headline-sm text-primary font-bold mb-2">Registration Successful</h2>
          <p className="text-on-surface-variant font-body-md max-w-xs mx-auto">Your academic dossier has been created. Redirecting you to login...</p>
        </div>
      </div>
    );
  }

  return (
    <form className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500" onSubmit={handleSubmit}>
      {errorMsg && (
        <div className="p-4 bg-error-container/40 border border-error/20 text-on-error-container rounded-xl text-sm flex items-start gap-3">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-error" />
          <p className="leading-relaxed font-body-md">{errorMsg}</p>
        </div>
      )}

      {/* Section 1: Account Credentials */}
      <div className="space-y-6">
        <div className="border-b border-outline-variant/60 pb-3">
          <h3 className="font-title-md text-title-md text-primary tracking-tight">1. Account Credentials</h3>
          <p className="text-on-surface-variant font-body-sm mt-1">Used to access the exchange portal securely.</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-6">
          <div className="space-y-2">
            <label className="font-label-md text-label-md text-on-surface font-medium">School Email</label>
            <div className="relative group">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-on-surface-variant/50 group-focus-within:text-primary transition-colors" />
              <input 
                type="email" 
                name="email"
                required
                placeholder="juan@iskolarngbayan.pup.edu.ph"
                className="w-full bg-surface border border-outline-variant rounded-xl py-3 pl-11 pr-4 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-body-md text-on-surface placeholder:text-on-surface-variant/40 hover:border-outline"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="font-label-md text-label-md text-on-surface font-medium">Password</label>
            <div className="relative group">
              <LogIn className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-on-surface-variant/50 group-focus-within:text-primary transition-colors" />
              <input 
                type="password" 
                name="password"
                required
                placeholder="••••••••"
                className="w-full bg-surface border border-outline-variant rounded-xl py-3 pl-11 pr-4 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-body-md text-on-surface placeholder:text-on-surface-variant/40 hover:border-outline"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Section 2: Student Information */}
      <div className="space-y-6">
        <div className="border-b border-outline-variant/60 pb-3">
          <h3 className="font-title-md text-title-md text-primary tracking-tight">2. Student Information</h3>
          <p className="text-on-surface-variant font-body-sm mt-1">Your official academic details exactly as they appear on your records.</p>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <label className="font-label-md text-label-md text-on-surface font-medium">Full Legal Name</label>
            <input 
              type="text" 
              name="full_name"
              required
              placeholder="e.g. Juan Miguel Dela Cruz"
              className="w-full bg-surface border border-outline-variant rounded-xl py-3 px-4 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-body-md text-on-surface placeholder:text-on-surface-variant/40 hover:border-outline"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-6">
            <div className="space-y-2">
              <label className="font-label-md text-label-md text-on-surface font-medium">Student Number</label>
              <input 
                type="text" 
                name="student_number"
                required
                placeholder="2023-10001-MN-0"
                className="w-full bg-surface border border-outline-variant rounded-xl py-3 px-4 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-body-md text-on-surface placeholder:text-on-surface-variant/40 hover:border-outline font-mono text-[15px]"
              />
            </div>

            <div className="space-y-2">
              <label className="font-label-md text-label-md text-on-surface font-medium">Academic Program</label>
              <div className="relative">
                <select 
                  name="program_id"
                  required
                  defaultValue=""
                  className="w-full bg-surface border border-outline-variant rounded-xl py-3 pl-4 pr-10 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-body-md text-on-surface appearance-none hover:border-outline bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2020%2020%20%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M5%207.5L10%2012.5L15%207.5%22%20stroke%3D%22%236b7280%22%20stroke-width%3D%221.5%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%3C%2Fsvg%3E')] bg-[length:20px_20px] bg-no-repeat bg-[position:right_12px_center] invalid:text-on-surface-variant/40"
                >
                  <option value="" disabled>Select a program...</option>
                  {programsData?.map((p: any) => (
                    <option key={p.program_id} value={p.program_id} className="text-on-surface">{p.program_name}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section 3: Guardian Information */}
      <div className="space-y-6">
        <div className="border-b border-outline-variant/60 pb-3">
          <h3 className="font-title-md text-title-md text-primary tracking-tight">3. Emergency / Guardian Contact</h3>
          <p className="text-on-surface-variant font-body-sm mt-1">Required for international mobility and processing.</p>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-6">
            <div className="space-y-2">
              <label className="font-label-md text-label-md text-on-surface font-medium">Guardian Name</label>
              <input 
                type="text" 
                name="guardian_name"
                required
                placeholder="e.g. Maria Dela Cruz"
                className="w-full bg-surface border border-outline-variant rounded-xl py-3 px-4 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-body-md text-on-surface hover:border-outline placeholder:text-on-surface-variant/40"
              />
            </div>

            <div className="space-y-2">
              <label className="font-label-md text-label-md text-on-surface font-medium">Relationship</label>
              <div className="relative">
                <select 
                  name="guardian_relation"
                  required
                  defaultValue=""
                  className="w-full bg-surface border border-outline-variant rounded-xl py-3 pl-4 pr-10 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-body-md text-on-surface appearance-none hover:border-outline bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2020%2020%20%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M5%207.5L10%2012.5L15%207.5%22%20stroke%3D%22%236b7280%22%20stroke-width%3D%221.5%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%3C%2Fsvg%3E')] bg-[length:20px_20px] bg-no-repeat bg-[position:right_12px_center] invalid:text-on-surface-variant/40"
                >
                  <option value="" disabled>Select relationship...</option>
                  <option value="Father" className="text-on-surface">Father</option>
                  <option value="Mother" className="text-on-surface">Mother</option>
                  <option value="Legal Guardian" className="text-on-surface">Legal Guardian</option>
                  <option value="Sibling" className="text-on-surface">Sibling</option>
                </select>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-6">
            <div className="space-y-2">
              <label className="font-label-md text-label-md text-on-surface font-medium">Contact Number</label>
              <input 
                type="tel" 
                name="guardian_contact_number"
                required
                placeholder="+63 912 345 6789"
                className="w-full bg-surface border border-outline-variant rounded-xl py-3 px-4 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-body-md text-on-surface hover:border-outline placeholder:text-on-surface-variant/40 font-mono text-[15px]"
              />
            </div>

            <div className="space-y-2">
              <label className="font-label-md text-label-md text-on-surface font-medium">Email Address (Optional)</label>
              <input 
                type="email" 
                name="guardian_email"
                placeholder="maria@gmail.com"
                className="w-full bg-surface border border-outline-variant rounded-xl py-3 px-4 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-body-md text-on-surface hover:border-outline placeholder:text-on-surface-variant/40"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="pt-8">
        <button 
          type="submit"
          disabled={loading}
          className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-on-primary font-label-lg py-4 px-10 rounded-xl transition-all flex items-center justify-center gap-2 group active:scale-[0.98] disabled:opacity-50 shadow-sm hover:shadow"
        >
          {loading ? "Processing..." : "Complete Registration"}
          {!loading && <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
        </button>
        <p className="mt-5 text-on-surface-variant font-label-sm text-center sm:text-left max-w-md">
          By registering, you agree to the university's data privacy policy and authorize the processing of your academic records.
        </p>
      </div>
    </form>
  );
}
