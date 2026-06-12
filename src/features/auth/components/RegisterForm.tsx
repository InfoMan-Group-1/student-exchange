"use client";

import { useState, useEffect } from "react";
import { User, LogIn, ChevronRight, CheckCircle2 } from "lucide-react";
import useSWR from "swr";
import { fetcher } from "@/lib/api-client";

export function RegisterForm() {
  const { data: programsData, error: programsError } = useSWR("/api/v1/programs", fetcher);
  
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
      <div className="flex flex-col items-center justify-center py-10 space-y-4">
        <CheckCircle2 className="w-16 h-16 text-green-500" />
        <h2 className="font-title-lg text-title-lg text-primary text-center">Registration Successful!</h2>
        <p className="text-on-surface-variant text-center text-sm">Redirecting to login...</p>
      </div>
    );
  }

  return (
    <form className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500" onSubmit={handleSubmit}>
      {errorMsg && (
        <div className="p-3 bg-error-container text-on-error-container rounded-lg text-sm">
          {errorMsg}
        </div>
      )}

      {/* Account Details */}
      <div className="space-y-4">
        <h3 className="font-title-sm text-title-sm text-primary border-b border-outline-variant pb-2">Account Details</h3>
        <div className="space-y-1">
          <label className="font-label-md text-label-md text-on-surface-variant ml-1">Email / School Email</label>
          <div className="relative group">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-on-surface-variant/50 group-focus-within:text-primary transition-colors" />
            <input 
              type="email" 
              name="email"
              required
              placeholder="e.g. juan@iskolarngbayan.pup.edu.ph"
              className="w-full bg-surface border border-outline-variant rounded-xl py-3 pl-11 pr-4 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-body-md text-on-surface placeholder:text-on-surface-variant/40"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="font-label-md text-label-md text-on-surface-variant ml-1">Password</label>
          <div className="relative group">
            <LogIn className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-on-surface-variant/50 group-focus-within:text-primary transition-colors" />
            <input 
              type="password" 
              name="password"
              required
              placeholder="••••••••"
              className="w-full bg-surface border border-outline-variant rounded-xl py-3 pl-11 pr-4 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-body-md text-on-surface placeholder:text-on-surface-variant/40"
            />
          </div>
        </div>
      </div>

      {/* Student Details */}
      <div className="space-y-4">
        <h3 className="font-title-sm text-title-sm text-primary border-b border-outline-variant pb-2">Student Information</h3>
        <div className="space-y-1">
          <label className="font-label-md text-label-md text-on-surface-variant ml-1">Full Name</label>
          <input 
            type="text" 
            name="full_name"
            required
            placeholder="e.g. Juan Dela Cruz"
            className="w-full bg-surface border border-outline-variant rounded-xl py-3 px-4 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-body-md text-on-surface placeholder:text-on-surface-variant/40"
          />
        </div>

        <div className="space-y-1">
          <label className="font-label-md text-label-md text-on-surface-variant ml-1">Student Number</label>
          <input 
            type="text" 
            name="student_number"
            required
            placeholder="e.g. 2023-10001-MN-0"
            className="w-full bg-surface border border-outline-variant rounded-xl py-3 px-4 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-body-md text-on-surface placeholder:text-on-surface-variant/40"
          />
        </div>

        <div className="space-y-1">
          <label className="font-label-md text-label-md text-on-surface-variant ml-1">Academic Program</label>
          <select 
            name="program_id"
            required
            className="w-full bg-surface border border-outline-variant rounded-xl py-3 px-4 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-body-md text-on-surface placeholder:text-on-surface-variant/40 appearance-none"
          >
            <option value="">Select a program...</option>
            {programsData?.map((p: any) => (
              <option key={p.program_id} value={p.program_id}>{p.program_name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Guardian Details */}
      <div className="space-y-4">
        <h3 className="font-title-sm text-title-sm text-primary border-b border-outline-variant pb-2">Guardian Information</h3>
        <div className="space-y-1">
          <label className="font-label-md text-label-md text-on-surface-variant ml-1">Guardian Full Name</label>
          <input 
            type="text" 
            name="guardian_name"
            required
            placeholder="e.g. Maria Dela Cruz"
            className="w-full bg-surface border border-outline-variant rounded-xl py-3 px-4 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-body-md text-on-surface placeholder:text-on-surface-variant/40"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="font-label-md text-label-md text-on-surface-variant ml-1">Relationship</label>
            <select 
              name="guardian_relation"
              required
              className="w-full bg-surface border border-outline-variant rounded-xl py-3 px-4 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-body-md text-on-surface placeholder:text-on-surface-variant/40 appearance-none"
            >
              <option value="Father">Father</option>
              <option value="Mother">Mother</option>
              <option value="Legal Guardian">Legal Guardian</option>
              <option value="Sibling">Sibling</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="font-label-md text-label-md text-on-surface-variant ml-1">Contact Number</label>
            <input 
              type="tel" 
              name="guardian_contact_number"
              placeholder="+63"
              className="w-full bg-surface border border-outline-variant rounded-xl py-3 px-4 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-body-md text-on-surface placeholder:text-on-surface-variant/40"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="font-label-md text-label-md text-on-surface-variant ml-1">Guardian Email</label>
          <input 
            type="email" 
            name="guardian_email"
            placeholder="e.g. maria@gmail.com"
            className="w-full bg-surface border border-outline-variant rounded-xl py-3 px-4 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-body-md text-on-surface placeholder:text-on-surface-variant/40"
          />
        </div>
      </div>

      <button 
        type="submit"
        disabled={loading}
        className="w-full bg-primary hover:bg-primary/90 text-on-primary font-bold py-3.5 px-4 rounded-xl transition-all flex items-center justify-center gap-2 group active:scale-[0.98] disabled:opacity-50"
      >
        {loading ? "Registering..." : "Create Account"}
        {!loading && <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
      </button>
    </form>
  );
}
