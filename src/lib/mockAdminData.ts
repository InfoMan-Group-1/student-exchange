export interface AdminStats {
  totalApplicants: number;
  totalApplicantsChange: string;
  avgAge: number;
  avgAgeStatus: string;
  bestGwa: number;
  bestGwaStatus: string;
  incompleteApps: number;
  incompleteAppsStatus: string;
}

export interface AdminAlert {
  id: string;
  type: "warning" | "info" | "mail";
  title: string;
  description: string;
}

export interface IncompleteApplication {
  application_id: string;
  studentNumber: string;
  name: string;
  initials: string;
  college: string;
  gwa: number;
  status: string;
  colorTheme: "secondary" | "primary" | "tertiary";
}

export interface ApplicantListEntry {
  application_id: string;
  student_number: string;
  full_name: string;
  semester_preference: string | null;
  duration_preference: string | null;
  program: string;
  college: string;
  cumulative_gwa: number;
  is_complete: boolean;
  colorTheme: "primary" | "secondary";
}

export interface ApplicationDetailData {
  application_id: string;
  student_number: string;
  is_complete: boolean;
  has_application_form: boolean;
  has_cv: boolean;
  has_tcg: boolean;
  has_recommendation_letter: boolean;
  has_essay: boolean;
  has_form_5: boolean;
  has_valid_passport: boolean;
  has_online_application_form: boolean;
  
  full_name: string;
  school_email: string;
  mobile_number: string;
  home_address: string;
  cumulative_gwa: number;
  program: string;
  college: string;

  guardian_name: string;
  relationship: string;
  guardian_contact_number: string;

  university_choices: Array<{
    university_choice_rank: number;
    university_name: string;
  }>;
  languages: Array<{
    language_name: string;
    proficiency_level: string;
  }>;
}

export interface ApplicantsData {
  applicants: ApplicantListEntry[];
  stats: {
    totalApplicants: number;
    reviewedApplications: number;
    priorityAttention: number;
  };
}

export interface AdminDashboardData {
  stats: AdminStats;
  alerts: AdminAlert[];
  incompleteApplications: IncompleteApplication[];
}


