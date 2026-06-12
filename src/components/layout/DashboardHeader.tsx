"use client";

import { Bell, HelpCircle, Search, User, LogOut, LayoutDashboard, FileText } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface DashboardHeaderProps {
  fullName: string;
  studentNumber: string;
  avatarUrl: string;
}

export function DashboardHeader({
  fullName,
  studentNumber,
  avatarUrl,
}: DashboardHeaderProps) {
  const pathname = usePathname();
  const isProfile = pathname === "/dashboard/profile";
  const isApplication = pathname === "/dashboard/applications";

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
        {isProfile && (
          <div className="relative hidden lg:block">
            <input
              type="text"
              placeholder="Search resources..."
              className="bg-surface-container-low border border-outline-variant rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 w-64"
            />
            <Search className="absolute left-3 top-2.5 text-outline h-4 w-4" />
          </div>
        )}

        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-surface-container-high rounded-full transition-colors relative">
            <Bell className="h-6 w-6" />
            {isProfile && (
              <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full" />
            )}
          </button>
          <button className="p-2 hover:bg-surface-container-high rounded-full transition-colors">
            <HelpCircle className="h-6 w-6" />
          </button>
          
          {isApplication ? (
            <>
              <div className="h-8 w-[1px] bg-outline-variant mx-2"></div>
              <div className="flex items-center gap-3">
                <div className="text-right hidden sm:block">
                  <p className="font-label-md text-label-md font-bold text-primary">
                    Draft Application
                  </p>
                  <p className="text-[11px] text-on-surface-variant uppercase tracking-widest">
                    Academic Year 2024-2025
                  </p>
                </div>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-3 pl-4 border-l border-outline-variant">
              <Link href="/dashboard/profile" className="w-9 h-9 rounded-full bg-surface-container-highest overflow-hidden border border-primary-container/20 hover:ring-2 hover:ring-primary/50 transition-all">
                <img
                  alt="User profile avatar"
                  className="w-full h-full object-cover"
                  src={avatarUrl}
                />
              </Link>
              <Link href="/login" className="p-2 text-on-surface-variant hover:text-error hover:bg-error/10 rounded-full transition-colors ml-2" title="Logout">
                <LogOut className="h-5 w-5" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
