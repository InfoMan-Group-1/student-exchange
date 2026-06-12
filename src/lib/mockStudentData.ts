export interface Student {
  studentNumber: string;
  fullName: string;
  avatarUrl: string;
}

export interface Application {
  status: string;
  semester: string;
  duration: string;
  documentsUploaded: number;
  documentsTotal: number;
  deadlineDate: string;
}

export interface ChecklistItem {
  id: string;
  title: string;
  status: "verified" | "uploaded" | "missing";
  metaText: string;
  isRequired: boolean;
}

export interface UniversityChoice {
  universityName: string;
  location: string;
  assignedProgram: string;
  isPrimary: boolean;
  isReadOnly: boolean;
  imageUrl: string;
}

export interface DashboardData {
  student: Student;
  application: Application;
  checklist: ChecklistItem[];
  primaryChoice: UniversityChoice;
}

export async function getStudentDashboardData(): Promise<DashboardData> {
  // Simulate network latency
  await new Promise((resolve) => setTimeout(resolve, 300));

  return {
    student: {
      studentNumber: "2023-10001-MN-0",
      fullName: "Juan Dela Cruz",
      avatarUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBIFKITN_oKc9OiPFdNZFClWxiB344e9i8wUR8XL6HOVgyo0se3giosKX30QYvFc0Eu0_mvQBXStCIIekxUEE1RstF7Si5DDUdcW_KWgZgaBDtr1I_OOesnrgGCbt-Gb5c_Z5VsTR8JE2cbm-zYAkonifKBIf_HxwiVHI4uUZLNVHxOAegFQ5459dMNMTZkbC33fbAwIVzWHMJZlxRAksYSaDUVpf9XImPxK_2s6twvWYo6-udK6wG6B28xbDoDQHKXNDKAoCO4i3qn",
    },
    application: {
      status: "Submitted",
      semester: "Spring",
      duration: "1 Sem",
      documentsUploaded: 6,
      documentsTotal: 8,
      deadlineDate: "2023-10-30",
    },
    checklist: [
      {
        id: "cv",
        title: "Curriculum Vitae (CV)",
        status: "uploaded",
        metaText: "Uploaded on Oct 12, 2023",
        isRequired: true,
      },
      {
        id: "tcg",
        title: "Transcript of Records (TCG)",
        status: "verified",
        metaText: "Verified by Registrar",
        isRequired: true,
      },
      {
        id: "recommendation",
        title: "Recommendation Letter",
        status: "verified",
        metaText: "From Dean Santos",
        isRequired: true,
      },
      {
        id: "language",
        title: "Language Proficiency Test",
        status: "missing",
        metaText: "Missing Attachment",
        isRequired: true,
      },
      {
        id: "essay",
        title: "Study Plan / Essay",
        status: "missing",
        metaText: "Required for NUS",
        isRequired: true,
      },
    ],
    primaryChoice: {
      universityName: "National University of Singapore",
      location: "Queenstown, Singapore",
      assignedProgram: "School of Computing: CS Exchange",
      isPrimary: true,
      isReadOnly: true,
      imageUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBx3m_e11W6gJdFpMtTTbUA75_kAMdYeNkN-38ib1YUFNGWquzPzYa5cbATnnQY-ROeacXAmCrBkjVdn60CzlmoBNZLIhuOt0MwT52rLbdABNRRU8zPHj-YIj-KrfaaRnMbL7BA_hQiAuvwmm5EtoD51UXb2LUKfdHtvj8YR0FIm6qmIKr5l1FMh-a4HFiMx8BmZwvpQbxTixWTh8HnKa2avnDC5V7V1uh2kIMkaalzs4m70dIv-IdrRDs5dOoFBgH2Sk54-7ZqfLww",
    },
  };
}
