import { getApplicantsData } from "@/lib/mockAdminData";
import { ApplicantsToolbar } from "@/features/admin/components/ApplicantsToolbar";
import { ApplicantsTable } from "@/features/admin/components/ApplicantsTable";
import { ApplicantsQuickStats } from "@/features/admin/components/ApplicantsQuickStats";

export default async function ApplicantsPage() {
  const data = await getApplicantsData();

  return (
    <div className="p-8 space-y-6 max-w-7xl mx-auto pb-12">
      <ApplicantsToolbar />
      <ApplicantsTable applicants={data.applicants} />
      <ApplicantsQuickStats stats={data.stats} />
    </div>
  );
}
