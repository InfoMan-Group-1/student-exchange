import { ApplicationRepository } from "@/lib/repositories/application.repository";

const repo = new ApplicationRepository();

export class ApplicationService {
  async listApplications(limit: number, startingAfter?: string | null, isComplete?: boolean | null) {
    const applications = await repo.getApplications(limit, startingAfter, isComplete);
    
    let hasMore = false;
    let nextCursor = null;
    
    if (Array.isArray(applications) && applications.length === limit) {
      const lastAppId = applications[applications.length - 1].application_id;
      const hasNext = await repo.checkNext(limit, lastAppId);
      if (hasNext) {
        hasMore = true;
        nextCursor = lastAppId;
      }
    }

    return {
      object: "list",
      has_more: hasMore,
      next_cursor: nextCursor,
      data: applications
    };
  }

  async getApplication(applicationId: string) {
    const application = await repo.getApplicationById(applicationId);
    if (!application) {
      return null;
    }

    const choices = await repo.getUniversityChoices(applicationId);

    return {
      ...application,
      university_choices: choices
    };
  }
}
