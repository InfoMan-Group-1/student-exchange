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

  async updateApplication(applicationId: string, data: Record<string, any>) {
    // Basic sanitization to ensure we only update allowed fields in the applications table
    const allowedFields = [
      'semester_preference', 'duration_preference', 'is_complete',
      'has_application_form', 'has_cv', 'has_tcg', 'has_valid_passport',
      'has_recommendation_letter', 'has_medical_certificate', 
      'has_consent_form', 'has_study_plan'
    ];
    
    const cleanData: Record<string, any> = {};
    for (const key of Object.keys(data)) {
      if (allowedFields.includes(key)) {
        cleanData[key] = data[key];
      }
    }
    
    return repo.updateApplication(applicationId, cleanData);
  }

  async updateUniversityChoices(applicationId: string, choices: { rank: number, name: string }[]) {
    // Since we just need to replace choices, we delete existing and re-insert
    await repo.deleteUniversityChoices(applicationId);
    
    for (const choice of choices) {
      await repo.insertUniversityChoice(applicationId, choice.rank, choice.name);
    }
    return true;
  }
}
