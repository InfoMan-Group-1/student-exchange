"use client";

import { useState, useMemo } from "react";
import { Eye, ChevronLeft, ChevronRight, CheckCircle2, Clock, Trash2 } from "lucide-react";
import Link from "next/link";
import { apiFetch } from "@/lib/api-client";
import { mutate } from "swr";
import { DeleteConfirmationModal } from "./DeleteConfirmationModal";

interface Applicant {
  application_id: string;
  student_number: string;
  full_name: string;
  semester_preference: string | null;
  duration_preference: string | null;
  program: string;
  college: string;
  cumulative_gwa: number;
  is_complete: boolean;
}

const PAGE_SIZE = 10;

export function ApplicantsTable({
  applicants,
  search,
  filterStatus,
}: {
  applicants: Applicant[];
  search: string;
  filterStatus: string;
}) {
  const [page, setPage] = useState(1);
  const [appToDelete, setAppToDelete] = useState<{ id: string, name: string } | null>(null);

  const handleDeleteConfirm = async () => {
    if (!appToDelete) return;
    try {
      await apiFetch(`/api/v1/applications/${appToDelete.id}`, {
        method: "DELETE",
      });
      mutate("/api/v1/applications");
      setAppToDelete(null);
    } catch (err) {
      console.error(err);
      alert("Failed to delete application.");
    }
  };

  const filtered = useMemo(() => {
    let list = applicants;
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (a) =>
          a.full_name.toLowerCase().includes(q) ||
          a.student_number.toLowerCase().includes(q) ||
          a.program.toLowerCase().includes(q)
      );
    }
    if (filterStatus === "Complete") list = list.filter((a) => a.is_complete);
    if (filterStatus === "Pending") list = list.filter((a) => !a.is_complete);
    return list;
  }, [applicants, search, filterStatus]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paginated = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  return (
    <section className="bg-surface rounded-xl shadow-sm border border-outline-variant overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[900px]">
          <thead className="bg-surface-container-low">
            <tr>
              <th className="px-6 py-4 font-label-md text-on-surface-variant border-b border-outline-variant">Student</th>
              <th className="px-6 py-4 font-label-md text-on-surface-variant border-b border-outline-variant">Program / College</th>
              <th className="px-6 py-4 font-label-md text-on-surface-variant border-b border-outline-variant">GWA</th>
              <th className="px-6 py-4 font-label-md text-on-surface-variant border-b border-outline-variant">Status</th>
              <th className="px-6 py-4 font-label-md text-on-surface-variant border-b border-outline-variant text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant">
            {paginated.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-16 text-center text-on-surface-variant font-body-md">
                  No applicants found matching your filters.
                </td>
              </tr>
            ) : (
              paginated.map((app, idx) => (
                <tr key={app.application_id} className="hover:bg-surface-container-low transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
                        idx % 2 === 0 ? "bg-primary-container text-on-primary-container" : "bg-secondary-container text-on-secondary-container"
                      }`}>
                        {app.full_name.substring(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-label-md font-bold text-on-surface group-hover:text-primary transition-colors">{app.full_name}</p>
                        <p className="text-xs text-on-surface-variant font-mono">{app.student_number}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-label-md text-on-surface">{app.program}</p>
                    <p className="text-xs text-on-surface-variant">{app.college}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-label-md text-on-surface font-bold">{Number(app.cumulative_gwa).toFixed(2)}</span>
                  </td>
                  <td className="px-6 py-4">
                    {app.is_complete ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Complete
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-error/10 text-error">
                        <Clock className="w-3.5 h-3.5" /> Pending
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <Link
                        href={`/admin/applications/${app.application_id}`}
                        className="text-primary font-label-md hover:underline underline-offset-4 inline-flex items-center gap-1"
                        title="View Application"
                      >
                        <Eye className="h-4 w-4" />
                      </Link>
                      <button 
                        onClick={() => setAppToDelete({ id: app.application_id, name: app.full_name })}
                        className="text-on-surface-variant hover:text-error transition-colors"
                        title="Delete Application"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="px-6 py-4 bg-surface-container-low border-t border-outline-variant flex items-center justify-between">
        <p className="font-label-md text-on-surface-variant">
          {filtered.length === 0
            ? "No results"
            : `Showing ${(currentPage - 1) * PAGE_SIZE + 1}–${Math.min(currentPage * PAGE_SIZE, filtered.length)} of ${filtered.length}`}
        </p>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="p-2 rounded-lg border border-outline-variant text-on-surface-variant hover:bg-surface transition-colors disabled:opacity-40"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <div className="flex gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`w-10 h-10 rounded-lg font-label-md transition-colors ${
                  p === currentPage
                    ? "bg-primary text-on-primary"
                    : "text-on-surface-variant hover:bg-surface-container-high"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="p-2 rounded-lg border border-outline-variant text-on-surface-variant hover:bg-surface transition-colors disabled:opacity-40"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      <DeleteConfirmationModal 
        isOpen={!!appToDelete}
        applicationId={appToDelete?.id || ""}
        studentName={appToDelete?.name || ""}
        onClose={() => setAppToDelete(null)}
        onConfirm={handleDeleteConfirm}
      />
    </section>
  );
}
