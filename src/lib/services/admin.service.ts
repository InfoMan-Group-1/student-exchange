import { AdminRepository } from "@/lib/repositories/admin.repository";

const repo = new AdminRepository();

export class AdminService {
  async getDashboardData() {
    const stats = await repo.getDashboardStats();
    const recentIncomplete = await repo.getRecentIncompleteApplications();
    const byProgram = await repo.getApplicationsByProgram();

    return {
      stats: {
        totalApplicants: Number(stats.total_applicants) || 0,
        incompleteApplications: Number(stats.incomplete_applications) || 0,
        averageGwa: Number(stats.average_gwa) || 0,
      },
      byProgram,
      recentIncomplete: recentIncomplete.map((row: any) => ({
        studentNumber: row.studentNumber,
        name: row.name,
        initials: row.name ? row.name.split(" ").map((n: string) => n[0]).join("").substring(0, 2).toUpperCase() : "??",
        college: row.college,
        gwa: row.gwa,
        status: "Missing Docs",
        colorTheme: ["primary", "secondary", "tertiary"][Math.floor(Math.random() * 3)],
        application_id: row.application_id
      }))
    };
  }
}
