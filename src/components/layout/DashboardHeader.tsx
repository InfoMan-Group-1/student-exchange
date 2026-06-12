"use client";

import { useAuth } from "@/lib/hooks/useAuth";
import { removeAuthToken } from "@/lib/api-client";
import { Bell, HelpCircle, Search, User, LogOut, LayoutDashboard, FileText } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import useSWR from "swr";
import { fetcher } from "@/lib/api-client";

export function DashboardHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useAuth();

  const { data: profile } = useSWR(
    user ? "/api/v1/students/me/profile" : null,
    fetcher
  );

  const fullName = profile?.full_name ?? "Loading...";
  const studentNumber = profile?.student_number ?? "";

  const handleLogout = () => {
    removeAuthToken();
    router.push("/login");
  };

  const isApplication = pathname.startsWith("/dashboard/applications");

  return (
    <header className="sticky top-0 z-40 bg-surface border-b border-outline-variant flex justify-between items-center w-full h-16 px-8 shadow-sm">
      <div className="flex items-center gap-12">
        {/* Branding */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary rounded flex items-center justify-center font-bold text-on-primary text-xs">
            PUP
          </div>
          <span className="font-headline-md font-bold text-primary">Exchange</span>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/dashboard"
            className={`flex items-center gap-2 font-label-md transition-colors ${
              pathname === "/dashboard" ? "text-primary font-bold border-b-2 border-primary py-5" : "text-on-surface-variant hover:text-primary py-5"
            }`}
          >
            <LayoutDashboard className="h-4 w-4" />
            Dashboard
          </Link>
          <Link
            href="/dashboard/applications"
            className={`flex items-center gap-2 font-label-md transition-colors ${
              pathname.startsWith("/dashboard/applications") ? "text-primary font-bold border-b-2 border-primary py-5" : "text-on-surface-variant hover:text-primary py-5"
            }`}
          >
            <FileText className="h-4 w-4" />
            Applications
          </Link>
        </nav>
      </div>

      <div className="flex items-center gap-6">
        {isApplication && (
          <div className="text-right hidden sm:block">
            <p className="font-label-md text-label-md font-bold text-primary">Draft Application</p>
            <p className="text-[11px] text-on-surface-variant uppercase tracking-widest">Academic Year 2024–2025</p>
          </div>
        )}

        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-surface-container-high rounded-full transition-colors relative">
            <Bell className="h-6 w-6" />
          </button>
          <button className="p-2 hover:bg-surface-container-high rounded-full transition-colors">
            <HelpCircle className="h-6 w-6" />
          </button>

          <div className="flex items-center gap-3 pl-4 border-l border-outline-variant">
            <Link href="/dashboard/profile" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <div className="w-9 h-9 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                <User className="h-5 w-5 text-primary" />
              </div>
              <div className="hidden md:block text-left">
                <p className="font-label-md text-label-md text-on-surface font-medium leading-tight truncate max-w-[120px]">{fullName}</p>
                <p className="text-[11px] text-on-surface-variant font-mono">{studentNumber}</p>
              </div>
            </Link>
            <button
              onClick={handleLogout}
              className="p-2 text-on-surface-variant hover:text-error hover:bg-error/10 rounded-full transition-colors ml-1"
              title="Log out"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
