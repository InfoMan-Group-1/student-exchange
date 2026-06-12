"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Bell, HelpCircle, Search, LayoutDashboard, Users, LogOut } from "lucide-react";

export function AdminHeader() {
  const pathname = usePathname();
  const isApplications = pathname === "/admin/applications";

  return (
    <header className="flex justify-between items-center w-full h-16 px-8 sticky top-0 z-40 bg-surface border-b border-outline-variant shadow-sm">
      <div className="flex items-center gap-12">
        {/* Branding */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary-container rounded flex items-center justify-center font-bold text-on-primary-container text-xs">
            PUP
          </div>
          <span className="font-headline-md font-bold text-primary">Admin</span>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link 
            href="/admin/dashboard"
            className={`flex items-center gap-2 font-label-md transition-colors ${
              pathname === "/admin/dashboard" ? "text-primary font-bold border-b-2 border-primary py-5" : "text-on-surface-variant hover:text-primary py-5"
            }`}
          >
            <LayoutDashboard className="h-4 w-4" />
            Dashboard
          </Link>
          <Link 
            href="/admin/applications"
            className={`flex items-center gap-2 font-label-md transition-colors ${
              pathname.startsWith("/admin/applications") ? "text-primary font-bold border-b-2 border-primary py-5" : "text-on-surface-variant hover:text-primary py-5"
            }`}
          >
            <Users className="h-4 w-4" />
            Applicants
          </Link>
        </nav>
      </div>

      <div className="flex items-center gap-6 flex-1 justify-end">
        <div className="flex items-center gap-2">
        
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="font-label-md font-bold text-on-surface">Admin User</p>
              <p className="text-[12px] text-on-surface-variant">Registrar Office</p>
            </div>
            <div className="w-9 h-9 rounded-full bg-surface-container-highest overflow-hidden border border-outline-variant hover:ring-2 hover:ring-primary/50 transition-all cursor-pointer">
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCfMh36CEtkgiZrA4SkM3Yw96fmbgVTrQkntyHJLf3HQ1ndXv9doYoEHS7DINJHSsYtcWqFNyD7jxh8KBTnbNo5CwSfH7lTLY8cJC5Pj4hNHA-1Xbrkx8nxcR0O5YXywXKZei4o17JG8wmPSNY2Fixzhu9cfOVaN_iBJZH1Q01WPTb4IDF_opz63i6KhhjhpJKxvqWeCyEKG-pZx6NPxm5HXRy7EAgyTLQbIftKQuN6tyrcaMfgDrqTr_p7F61ON3Tl_OslRJfq2z6l"
                alt="Admin User"
                className="w-full h-full object-cover"
              />
            </div>
            <Link href="/login" className="p-2 text-on-surface-variant hover:text-error hover:bg-error/10 rounded-full transition-colors ml-2" title="Logout">
              <LogOut className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
