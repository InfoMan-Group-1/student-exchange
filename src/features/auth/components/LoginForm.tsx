"use client";

import { useState } from "react";
import { Eye, EyeOff, LogIn } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ErrorBanner } from "./ErrorBanner";
import { setAuthToken } from "@/lib/api-client";

type UserRole = "student" | "admin";

export function LoginForm() {
  const [role, setRole] = useState<UserRole>("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/v1/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMessage(data.detail || data.message || "Login failed");
      } else {
        // Success: Store token and redirect
        setAuthToken(data.token);
        console.log("Logged in successfully");
        if (role === "admin") {
          router.push("/admin/dashboard");
        } else {
          router.push("/dashboard");
        }
      }
    } catch (err) {
      setErrorMessage("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <ErrorBanner message={errorMessage} onClose={() => setErrorMessage("")} />

      <div className="p-8">
        <h2 className="font-headline-md text-headline-md text-on-surface mb-6">
          Sign in
        </h2>

        {/* Segmented Control */}
        <div className="flex border-b border-surface-container-high mb-8">
          <button
            type="button"
            onClick={() => setRole("student")}
            className={`flex-1 pb-3 font-label-md text-label-md transition-all relative group ${
              role === "student"
                ? "text-primary font-bold"
                : "text-on-surface-variant hover:text-primary"
            }`}
          >
            Student
            {role === "student" ? (
              <span className="absolute bottom-0 left-0 w-full h-[3px] bg-[#fdaf00]"></span>
            ) : (
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-transparent transition-all group-hover:bg-outline-variant"></span>
            )}
          </button>
          <button
            type="button"
            onClick={() => setRole("admin")}
            className={`flex-1 pb-3 font-label-md text-label-md transition-all relative group ${
              role === "admin"
                ? "text-primary font-bold"
                : "text-on-surface-variant hover:text-primary"
            }`}
          >
            Admin
            {role === "admin" ? (
              <span className="absolute bottom-0 left-0 w-full h-[3px] bg-[#fdaf00]"></span>
            ) : (
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-transparent transition-all group-hover:bg-outline-variant"></span>
            )}
          </button>
        </div>

        {/* Form */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label
              className="block font-label-md text-label-md text-on-surface-variant"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant rounded-lg font-body-md text-body-md focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-on-tertiary-container disabled:opacity-50"
              id="email"
              name="email"
              placeholder={
                role === "admin" ? "admin@pup.edu.ph" : "student@pup.edu.ph"
              }
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label
                className="block font-label-md text-label-md text-on-surface-variant"
                htmlFor="password"
              >
                Password
              </label>
              <Link
                href="/login/forgot"
                className="font-label-md text-primary font-bold hover:underline"
              >
                Forgot your password?
              </Link>
            </div>
            <div className="relative">
              <input
                className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant rounded-lg font-body-md text-body-md focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-on-tertiary-container disabled:opacity-50"
                id="password"
                name="password"
                placeholder="••••••••"
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
              />
              <button
                className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary transition-colors disabled:opacity-50"
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLoading}
              >
                {showPassword ? (
                  <EyeOff className="h-[20px] w-[20px]" />
                ) : (
                  <Eye className="h-[20px] w-[20px]" />
                )}
              </button>
            </div>
          </div>

          {/* Primary Button */}
          <button
            className="w-full bg-primary text-on-primary font-label-md text-label-md py-4 rounded-lg hover:bg-primary-container transition-all active:scale-[0.98] shadow-sm flex items-center justify-center gap-2 disabled:opacity-70 disabled:active:scale-100"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Signing in..." : "Sign in"}
            {!isLoading && <LogIn className="h-[18px] w-[18px]" />}
          </button>
        </form>

        {/* Back Link */}
        <div className="mt-8 text-center">
          <a
            className="inline-flex items-center gap-2 font-label-md text-label-md text-[#5a413d] hover:text-primary transition-colors group"
            href="#"
          >
            <span className="transition-transform group-hover:-translate-x-1">
              ←
            </span>
            Back to home
          </a>
        </div>
      </div>
    </>
  );
}
