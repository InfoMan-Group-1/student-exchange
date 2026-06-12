"use client";

import { Bell, HelpCircle, Search, User } from "lucide-react";
import { usePathname } from "next/navigation";

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

  return (
    <header className="sticky top-0 z-40 bg-surface border-b border-outline-variant flex justify-between items-center w-full h-20 px-8">
      {isProfile ? (
        <div className="flex items-center gap-4">
          <User className="text-outline h-6 w-6" />
          <h2 className="font-headline-lg text-2xl font-bold text-primary">
            Student Profile
          </h2>
        </div>
      ) : (
        <div>
          <h2 className="font-headline-lg text-headline-lg font-bold text-primary">
            Welcome, {fullName}
          </h2>
          <span className="font-label-sm text-label-sm text-on-tertiary-container tracking-wider uppercase">
            Student No: {studentNumber}
          </span>
        </div>
      )}

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
          <div className="flex items-center gap-3 pl-4 border-l border-outline-variant">
            <div className="w-10 h-10 rounded-full bg-surface-container-highest overflow-hidden border-2 border-primary-container/20">
              <img
                alt="User profile avatar"
                className="w-full h-full object-cover"
                src={avatarUrl}
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
