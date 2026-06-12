import { getStudentDashboardData } from "@/lib/mockStudentData";
import { StudentProfileForm } from "@/features/profile/components/StudentProfileForm";

export default async function ProfilePage() {
  const data = await getStudentDashboardData();

  return (
    <>
      <StudentProfileForm student={data.student} />
    </>
  );
}
