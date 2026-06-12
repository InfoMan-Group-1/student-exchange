import { getApplicationDetail } from "@/lib/mockAdminData";
import { DetailHeader } from "@/features/admin/components/DetailHeader";
import { StudentSummary } from "@/features/admin/components/StudentSummary";
import { EmergencyContact } from "@/features/admin/components/EmergencyContact";
import { AcademicPreferences } from "@/features/admin/components/AcademicPreferences";
import { AdminDocumentsChecklist } from "@/features/admin/components/AdminDocumentsChecklist";
import { AdminLanguagesTable } from "@/features/admin/components/AdminLanguagesTable";
import { DetailFooter } from "@/features/admin/components/DetailFooter";

export default async function ApplicationDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const detail = await getApplicationDetail(id);

  return (
    <div className="p-8 max-w-7xl mx-auto w-full pb-12">
      <DetailHeader info={detail} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4 space-y-8">
          <StudentSummary info={detail} />
          <EmergencyContact info={detail} />
        </div>

        <div className="lg:col-span-8 space-y-8">
          <AcademicPreferences preferences={detail.university_choices} />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <AdminDocumentsChecklist detail={detail} />
            <AdminLanguagesTable languages={detail.languages} />
          </div>
        </div>
      </div>

      <DetailFooter />
    </div>
  );
}
