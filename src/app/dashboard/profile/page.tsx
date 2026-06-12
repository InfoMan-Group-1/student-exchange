"use client";

import useSWR from "swr";
import { fetcher } from "@/lib/api-client";
import { StudentProfileForm } from "@/features/profile/components/StudentProfileForm";

export default function ProfilePage() {
  const { data: student, error, isLoading } = useSWR("/api/v1/students/me/profile", fetcher);

  if (isLoading) return <div className="p-8 text-center text-on-surface-variant animate-pulse">Loading profile...</div>;
  if (error || !student) return <div className="p-8 text-center text-error">Failed to load profile.</div>;

  return (
    <>
      <StudentProfileForm student={student} />
    </>
  );
}
