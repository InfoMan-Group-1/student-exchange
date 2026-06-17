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
    const languages = await repo.getLanguagesForStudent(application.student_number);

    return {
      ...application,
      university_choices: choices,
      languages,
    };
  }

  async updateApplication(applicationId: string, data: Record<string, any>) {
    // Allowlist strictly matches applications table columns (see migration 202508250004)
    const allowedFields = [
      'semester_preference', 'duration_preference', 'is_complete',
      'has_application_form', 'has_cv', 'has_tcg', 'has_valid_passport',
      'has_recommendation_letter', 'has_essay', 'has_form_5',
      'has_online_application_form',
      'program_advisor', 'department_chair', 'college_secretary', 'dean_name',
    ];

    const cleanData: Record<string, any> = {};
    for (const key of Object.keys(data)) {
      if (allowedFields.includes(key)) {
        cleanData[key] = data[key];
      }
    }

    const application = await repo.getApplicationById(applicationId);
    if (!application) throw new Error("Application not found.");

    const merged = { ...application, ...cleanData };
    const requiredDocs = [
      "has_application_form", "has_cv", "has_tcg", "has_valid_passport",
      "has_recommendation_letter", "has_essay", "has_form_5",
      "has_online_application_form"
    ];

    // Evaluate completeness if documents are being updated
    const isDocUpdate = requiredDocs.some(k => Object.keys(cleanData).includes(k));
    if (isDocUpdate) {
      cleanData.is_complete = requiredDocs.every(k => !!merged[k]);
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

  async deleteApplication(applicationId: string) {
    const application = await repo.getApplicationById(applicationId);
    if (!application) throw new Error("Application not found.");
    
    return repo.deleteApplication(applicationId);
  }
}
