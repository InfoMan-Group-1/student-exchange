"use client";

import { usePathname } from "next/navigation";
import { Bell, HelpCircle, Search } from "lucide-react";

export function AdminHeader() {
  const pathname = usePathname();
  const isApplications = pathname === "/admin/applications";
  return (
    <header className="flex justify-between items-center w-full h-20 px-8 sticky top-0 z-40 bg-surface border-b border-outline-variant">
      <div className="flex flex-col">
        <h2 className="font-headline-md text-primary font-bold">
          {isApplications ? "Applicants List" : "Admin portal"}
        </h2>
        {isApplications && (
          <p className="font-label-md text-on-surface-variant">Review and manage student exchange applications</p>
        )}
      </div>

      <div className="flex items-center gap-6">
        <div className="relative hidden lg:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-on-surface-variant" />
          <input 
            type="text" 
            placeholder="Search applications..." 
            className="pl-10 pr-4 py-2 bg-surface-container-low border border-outline rounded-full w-64 font-label-md focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
          />
        </div>

        <div className="flex items-center gap-2">
          <button className="p-2 text-on-surface-variant hover:bg-surface-container-low rounded-full transition-colors active:scale-95">
            <Bell className="h-6 w-6" />
          </button>
          <button className="p-2 text-on-surface-variant hover:bg-surface-container-low rounded-full transition-colors active:scale-95">
            <HelpCircle className="h-6 w-6" />
          </button>
          
          <div className="h-8 w-[1px] bg-outline-variant mx-2"></div>
          
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="font-label-md text-on-surface font-bold leading-none">Admin User</p>
              <p className="font-label-sm text-on-surface-variant">Office of Registrar</p>
            </div>
            <img 
              alt="Admin avatar" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAP7kFaGsCmheTJqGhUbW2S5EOwaD2PKnWHaATpwBox3aIVvi-98aCZoroZCym8kaxBf_og3dR-cYfr3JOqbhFdrQ0pVq4fccijBuNbbE5WRsbR6Mhbza3yJcQUR88LnpAhpnr_xivVMQqf4EIlZzLATK5hifjJS2D_MdELWZXtlLpHM7ZGgz6WOaMZ4P-LWefCYxOClJUdSKzp_Y2FWLhWjj9yHf6EfBEInNC_i6zk8RHGKo9IBQqaLlbzHB_NTf4JicM3opHr96Wl"
              className="w-10 h-10 rounded-full border-2 border-primary/10 object-cover"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
