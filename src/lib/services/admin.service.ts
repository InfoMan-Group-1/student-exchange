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
      recentIncomplete
    };
  }
}
