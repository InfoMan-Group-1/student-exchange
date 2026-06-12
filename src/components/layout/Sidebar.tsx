import Link from "next/link";
import { LayoutDashboard, FileText, Globe, File, Mail, School } from "lucide-react";
import { Student } from "@/lib/mockStudentData";

export function Sidebar({ student }: { student: Student }) {
  return (
    <aside className="fixed left-0 top-0 h-full w-[280px] bg-primary-container text-on-primary-container flex flex-col py-6 px-4 shadow-sm z-50">
      <div className="flex items-center gap-3 px-4 mb-10">
        <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
          <School className="text-white h-6 w-6" />
        </div>
        <div>
          <h1 className="font-headline-lg text-headline-lg font-bold text-white leading-none">
            PUP Exchange
          </h1>
          <p className="font-label-md text-label-md text-white/70">
            Student Portal
          </p>
        </div>
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

      <div className="mt-auto px-4 py-4 bg-white/5 rounded-xl">
        <div className="flex items-center gap-3 mb-4">
          <img
            alt="User profile"
            className="w-10 h-10 rounded-full border-2 border-secondary-container object-cover"
            src={student.avatarUrl}
          />
          <div>
            <p className="font-label-md text-label-md font-bold text-white">
              {student.fullName}
            </p>
            <p className="text-[10px] uppercase tracking-wider text-white/50">
              {student.studentNumber}
            </p>
          </div>
        </div>
        <button className="w-full py-2 bg-secondary text-on-secondary rounded-lg font-label-md text-label-md hover:bg-secondary/90 transition-colors">
          Start New Application
        </button>
      </div>
    </aside>
  );
}
