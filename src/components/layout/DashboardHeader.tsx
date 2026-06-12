import { Bell, HelpCircle } from "lucide-react";
import Image from "next/image";

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
  return (
    <header className="sticky top-0 z-40 bg-surface border-b border-outline-variant flex justify-between items-center w-full h-20 px-8">
      <div>
        <h2 className="font-headline-lg text-headline-lg font-bold text-primary">
          Welcome, {fullName}
        </h2>
        <span className="font-label-sm text-label-sm text-on-tertiary-container tracking-wider uppercase">
          Student No: {studentNumber}
        </span>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex gap-2">
          <button className="p-2 rounded-full hover:bg-surface-container-low transition-colors text-on-surface-variant">
            <Bell className="h-6 w-6" />
          </button>
          <button className="p-2 rounded-full hover:bg-surface-container-low transition-colors text-on-surface-variant">
            <HelpCircle className="h-6 w-6" />
          </button>
        </div>
        <div className="flex items-center gap-3 pl-4 border-l border-outline-variant">
          <div className="w-10 h-10 rounded-full bg-surface-container-highest overflow-hidden">
            <img
              alt="User profile avatar"
              className="w-full h-full object-cover"
              src={avatarUrl}
            />
          </div>
        </div>
      </div>
    </header>
  );
}
