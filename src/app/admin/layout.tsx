import { AdminHeader } from "@/components/layout/AdminHeader";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-background text-on-background font-body-md min-h-screen flex flex-col w-full">
      {/* Top Navigation Bar */}
      <AdminHeader />

      {/* Content Area */}
      <main className="flex-1 flex flex-col">
        <ProtectedRoute allowedRoles={["admin"]}>
          {children}
        </ProtectedRoute>
      </main>
    </div>
  );
}
