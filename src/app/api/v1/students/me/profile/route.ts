import { NextRequest, NextResponse } from "next/server";
import { StudentProfileService } from "@/lib/services/student.profile.service";
import { verifyAuthToken, createProblemDetails } from "@/lib/api-utils";

export async function GET(req: NextRequest) {
  const user = verifyAuthToken(req);
  if (!user || user.role !== "student") {
    return createProblemDetails(403, "Forbidden", "Student access required.");
  }

  try {
    const service = new StudentProfileService();
    const profile = await service.getProfile(user.userId);
    
    // Flatten guardian
    const flattened = {
      ...profile,
      guardian_name: profile.guardian?.guardian_name,
      guardian_contact_number: profile.guardian?.guardian_contact_number,
      guardian_email: profile.guardian?.guardian_email,
      relation_to_student: profile.guardian?.relation_to_student,
      guardian_address: profile.guardian?.guardian_address
    };
    delete flattened.guardian;

    return NextResponse.json(flattened);
  } catch (error: any) {
    console.error("Student profile fetch failed:", error);
    return createProblemDetails(500, "Internal Server Error", error.message || "Failed to retrieve profile.");
  }
}

export async function PATCH(req: NextRequest) {
  const user = verifyAuthToken(req);
  if (!user || user.role !== "student") {
    return createProblemDetails(403, "Forbidden", "Student access required.");
  }

  try {
    const body = await req.json();
    const service = new StudentProfileService();
    await service.updateProfile(user.userId, body);
    return NextResponse.json({ message: "Profile updated successfully" });
  } catch (error: any) {
    console.error("Student profile update failed:", error);
    return createProblemDetails(500, "Internal Server Error", error.message || "Failed to update profile.");
  }
}
