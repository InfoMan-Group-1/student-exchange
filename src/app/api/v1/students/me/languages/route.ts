import { NextRequest, NextResponse } from "next/server";
import { StudentProfileService } from "@/lib/services/student.profile.service";
import { verifyAuthToken, createProblemDetails } from "@/lib/api-utils";

export async function GET(req: NextRequest) {
  const user = verifyAuthToken(req);
  if (!user || user.role !== "student") return createProblemDetails(403, "Forbidden", "Student access required.");

  try {
    const service = new StudentProfileService();
    const languages = await service.getLanguages(user.userId);
    return NextResponse.json({ data: languages });
  } catch (error: any) {
    return createProblemDetails(500, "Error", error.message);
  }
}

export async function POST(req: NextRequest) {
  const user = verifyAuthToken(req);
  if (!user || user.role !== "student") return createProblemDetails(403, "Forbidden", "Student access required.");

  try {
    const { name, level } = await req.json();
    if (!name || !level) return createProblemDetails(400, "Bad Request", "Missing name or level");
    
    const service = new StudentProfileService();
    await service.addLanguage(user.userId, name, level);
    return NextResponse.json({ message: "Language added successfully" });
  } catch (error: any) {
    return createProblemDetails(500, "Error", error.message);
  }
}

export async function DELETE(req: NextRequest) {
  const user = verifyAuthToken(req);
  if (!user || user.role !== "student") return createProblemDetails(403, "Forbidden", "Student access required.");

  try {
    const { searchParams } = new URL(req.url);
    const name = searchParams.get("name");
    if (!name) return createProblemDetails(400, "Bad Request", "Missing language name to delete.");
    
    const service = new StudentProfileService();
    await service.removeLanguage(user.userId, name);
    return NextResponse.json({ message: "Language removed successfully" });
  } catch (error: any) {
    return createProblemDetails(500, "Error", error.message);
  }
}
