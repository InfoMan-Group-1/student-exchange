import Link from "next/link";
import { LayoutDashboard, FileText, Globe, File, Mail } from "lucide-react";

export function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 h-full w-[280px] bg-primary-container py-6 px-4 flex flex-col shadow-sm z-50">
      <div className="mb-10 px-4">
        <h1 className="font-headline-lg text-headline-lg font-bold text-on-primary">
          PUP Exchange
        </h1>
        <p className="font-label-md text-label-md text-on-primary/70">
          Student Portal
        </p>
      </div>

      <nav className="flex-1 space-y-1">
        {/* Dashboard Active */}
        <Link
          href="/dashboard"
          className="flex items-center gap-3 border-l-4 border-secondary bg-white/10 text-on-primary font-bold py-3 px-4 transition-all duration-200 opacity-100 scale-[0.99]"
        >
          <LayoutDashboard className="h-5 w-5" />
          <span className="font-label-md text-label-md">Dashboard</span>
        </Link>
        <Link
          href="/dashboard/applications"
          className="flex items-center gap-3 text-on-primary/70 hover:text-on-primary hover:bg-white/5 py-3 px-4 transition-all duration-200"
        >
          <FileText className="h-5 w-5" />
          <span className="font-label-md text-label-md">Applications</span>
        </Link>
        <Link
          href="/dashboard/programs"
          className="flex items-center gap-3 text-on-primary/70 hover:text-on-primary hover:bg-white/5 py-3 px-4 transition-all duration-200"
        >
          <Globe className="h-5 w-5" />
          <span className="font-label-md text-label-md">Exchange Programs</span>
        </Link>
        <Link
          href="/dashboard/documents"
          className="flex items-center gap-3 text-on-primary/70 hover:text-on-primary hover:bg-white/5 py-3 px-4 transition-all duration-200"
        >
          <File className="h-5 w-5" />
          <span className="font-label-md text-label-md">Documents</span>
        </Link>
        <Link
          href="/dashboard/messages"
          className="flex items-center gap-3 text-on-primary/70 hover:text-on-primary hover:bg-white/5 py-3 px-4 transition-all duration-200"
        >
          <Mail className="h-5 w-5" />
          <span className="font-label-md text-label-md">Messages</span>
        </Link>
      </nav>

      <div className="mt-auto px-4">
        <button className="w-full bg-secondary text-white py-3 rounded-lg font-label-md flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
          Start Application
        </button>
      </div>
    </aside>
  );
}
