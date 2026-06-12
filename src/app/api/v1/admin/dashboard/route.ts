import { NextRequest, NextResponse } from "next/server";
import { AdminService } from "@/lib/services/admin.service";
import { verifyAuthToken, createProblemDetails } from "@/lib/api-utils";

export async function GET(req: NextRequest) {
  const user = verifyAuthToken(req);
  if (!user || user.role !== "admin") {
    return createProblemDetails(403, "Forbidden", "Admin access required.");
  }

  try {
    const service = new AdminService();
    const data = await service.getDashboardData();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Admin dashboard fetch failed:", error);
    return createProblemDetails(500, "Internal Server Error", "Failed to retrieve dashboard stats.");
  }
}
