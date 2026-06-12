import { ReactNode } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { DashboardHeader } from "@/components/layout/DashboardHeader";
import { getStudentDashboardData } from "@/lib/mockStudentData";

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const { student } = await getStudentDashboardData();

  return (
    <div className="bg-background text-on-background font-body-md overflow-hidden flex h-screen w-full">
      {/* Sidebar Navigation */}
      <Sidebar student={student} />

      {/* Main Canvas */}
      <div className="ml-[280px] h-screen overflow-y-auto flex flex-col flex-1">
        {/* Top Navigation Bar */}
        <DashboardHeader
          fullName={student.fullName}
          studentNumber={student.studentNumber}
          avatarUrl={student.avatarUrl}
        />

        {/* Content Area */}
        {children}

        {/* Footer / Support */}
        <footer className="mt-auto p-8 border-t border-outline-variant/30 flex justify-between items-center bg-surface-container-lowest">
          <p className="text-xs text-on-surface-variant">
            © {new Date().getFullYear()} Polytechnic University of the Philippines - Office of International Affairs
          </p>
          <div className="flex gap-4">
            <a className="text-xs text-primary font-bold hover:underline" href="#">
              Support Center
            </a>
            <a className="text-xs text-primary font-bold hover:underline" href="#">
              Privacy Policy
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}
