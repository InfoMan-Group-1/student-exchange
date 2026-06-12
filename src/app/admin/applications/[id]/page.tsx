"use client";

import { use } from "react";
import useSWR from "swr";
import { fetcher } from "@/lib/api-client";
import { DetailHeader } from "@/features/admin/components/DetailHeader";
import { StudentSummary } from "@/features/admin/components/StudentSummary";
import { EmergencyContact } from "@/features/admin/components/EmergencyContact";
import { AcademicPreferences } from "@/features/admin/components/AcademicPreferences";
import { AdminDocumentsChecklist } from "@/features/admin/components/AdminDocumentsChecklist";
import { AdminLanguagesTable } from "@/features/admin/components/AdminLanguagesTable";
import { AdminEndorsementDetails } from "@/features/admin/components/AdminEndorsementDetails";
import { DetailFooter } from "@/features/admin/components/DetailFooter";

export default function ApplicationDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { data: detail, error, isLoading } = useSWR(`/api/v1/applications/${id}`, fetcher);

  if (isLoading) return <div className="p-8 text-center text-on-surface-variant animate-pulse">Loading application detail...</div>;
  if (error || !detail) return <div className="p-8 text-center text-error">Failed to load application detail.</div>;

  return (
    <div className="p-8 max-w-7xl mx-auto w-full pb-12">
      <DetailHeader info={detail} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4 space-y-8">
          <StudentSummary info={detail} />
          <EmergencyContact info={detail} />
        </div>

        <div className="lg:col-span-8 space-y-8">
          <AcademicPreferences preferences={detail.university_choices} detail={detail} />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <AdminDocumentsChecklist detail={detail} />
            <AdminLanguagesTable languages={detail.languages} />
          </div>
          <AdminEndorsementDetails detail={detail} />
        </div>
      </div>

      <DetailFooter />
    </div>
  );
}
