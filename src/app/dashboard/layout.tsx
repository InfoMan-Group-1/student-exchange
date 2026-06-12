import { ReactNode } from "react";
import Link from "next/link";
import { DashboardHeader } from "@/components/layout/DashboardHeader";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <ProtectedRoute allowedRoles={["student"]}>
      <div className="bg-background text-on-background font-body-md min-h-screen flex flex-col w-full">
        {/* Top Navigation Bar — now fetches its own data client-side */}
        <DashboardHeader />

        {/* Content Area */}
        <main className="flex-1 flex flex-col">
          {children}
        </main>

        {/* Footer / Support */}
        <footer className="mt-auto p-8 border-t border-outline-variant/30 flex justify-between items-center bg-surface-container-lowest">
          <p className="text-xs text-on-surface-variant">
            © {new Date().getFullYear()} Polytechnic University of the Philippines - Office of International Affairs
          </p>
          <div className="flex gap-4">
            <Link className="text-xs text-primary font-bold hover:underline" href="/support">
              Support Center
            </Link>
            <Link className="text-xs text-primary font-bold hover:underline" href="/privacy">
              Privacy Policy
            </Link>
          </div>
        </footer>
      </div>
    </ProtectedRoute>
  );
}
