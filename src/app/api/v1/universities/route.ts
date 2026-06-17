import { NextResponse } from "next/server";
import { ApplicationRepository } from "@/lib/repositories/application.repository";

export async function GET() {
  try {
    const repo = new ApplicationRepository();
    const universities = await repo.getDistinctUniversities();
    return NextResponse.json({ data: universities });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
