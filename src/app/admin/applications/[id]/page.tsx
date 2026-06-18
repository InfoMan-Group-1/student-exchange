"use client";

import { use, useState } from "react";
import useSWR, { mutate } from "swr";
import { fetcher, apiFetch } from "@/lib/api-client";
import { useRouter } from "next/navigation";
import { DetailHeader } from "@/features/admin/components/DetailHeader";
import { StudentSummary } from "@/features/admin/components/StudentSummary";
import { EmergencyContact } from "@/features/admin/components/EmergencyContact";
import { AcademicPreferences } from "@/features/admin/components/AcademicPreferences";
import { AdminDocumentsChecklist } from "@/features/admin/components/AdminDocumentsChecklist";
import { AdminLanguagesTable } from "@/features/admin/components/AdminLanguagesTable";
import { AdminEndorsementDetails } from "@/features/admin/components/AdminEndorsementDetails";
import { AdminEventsTable } from "@/features/admin/components/AdminEventsTable";
import { DetailFooter } from "@/features/admin/components/DetailFooter";
import { DeleteConfirmationModal } from "@/features/admin/components/DeleteConfirmationModal";

export default function ApplicationDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { data: detail, error, isLoading } = useSWR(`/api/v1/applications/${id}`, fetcher);
  
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const router = useRouter();

  if (isLoading) return <div className="p-8 text-center text-on-surface-variant animate-pulse">Loading application detail...</div>;
  if (error || !detail) return <div className="p-8 text-center text-error">Failed to load application detail.</div>;

  const handleEdit = () => {
    setFormData(detail);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData(null);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await apiFetch(`/api/v1/students/${detail.student_number}`, {
        method: "PATCH",
        body: JSON.stringify({
          school_email: formData.school_email,
          mobile_number: formData.mobile_number,
          cumulative_gwa: formData.cumulative_gwa,
          home_address: formData.home_address,
          year_level: formData.year_level,
          passport_issue_date: formData.passport_issue_date,
          passport_expiry_date: formData.passport_expiry_date,
          guardian_name: formData.guardian_name,
          guardian_contact_number: formData.guardian_contact_number,
          relation_to_student: formData.relationship,
          guardian_address: formData.guardian_address
        }),
      });
      await mutate(`/api/v1/applications/${id}`);
      setIsEditing(false);
    } catch (err) {
      console.error(err);
      alert("Failed to save student details.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDeleteConfirm = async () => {
    try {
      await apiFetch(`/api/v1/applications/${id}`, {
        method: "DELETE",
      });
      mutate("/api/v1/applications");
      router.push("/admin/applications");
    } catch (err) {
      console.error(err);
      alert("Failed to delete application.");
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto w-full pb-12">
      <DetailHeader 
        info={detail} 
        isEditing={isEditing} 
        isSaving={isSaving} 
        onEdit={handleEdit} 
        onCancel={handleCancel} 
        onSave={handleSave} 
        onDelete={() => setIsDeleteModalOpen(true)}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4 space-y-8">
          <StudentSummary info={detail} isEditing={isEditing} formData={formData} onChange={handleChange} />
          <EmergencyContact info={detail} isEditing={isEditing} formData={formData} onChange={handleChange} />
        </div>

        <div className="lg:col-span-8 space-y-8">
          <AcademicPreferences preferences={detail.university_choices} detail={detail} />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <AdminDocumentsChecklist detail={detail} />
            <AdminLanguagesTable languages={detail.languages} />
          </div>
          <AdminEventsTable events={detail.events} />
          <AdminEndorsementDetails detail={detail} />
        </div>
      </div>

      <DetailFooter />

      <DeleteConfirmationModal 
        isOpen={isDeleteModalOpen}
        applicationId={detail.application_id}
        studentName={detail.full_name}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
}
