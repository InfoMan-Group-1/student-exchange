import { getMockApplicationData } from "@/lib/mockApplicationData";
import { ApplicationForm } from "@/features/applications/components/ApplicationForm";

export default async function ApplicationsPage() {
  const applicationData = await getMockApplicationData();

  return <ApplicationForm data={applicationData} />;
}
