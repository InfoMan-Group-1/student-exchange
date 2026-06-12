export type UserRole = "student" | "admin";

export interface MockUser {
  id: string;
  email: string;
  role: UserRole;
  name: string;
}

// Mock database simulating students and admins
const MOCK_USERS: MockUser[] = [
  {
    id: "admin-1",
    email: "admin@pup.edu.ph",
    role: "admin",
    name: "System Administrator",
  },
  {
    id: "student-1",
    email: "student@pup.edu.ph",
    role: "student",
    name: "Juan Dela Cruz",
  },
];

export async function mockLogin(email: string, role: UserRole): Promise<{ success: boolean; user?: MockUser; message?: string }> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  const user = MOCK_USERS.find((u) => u.email === email && u.role === role);

  if (!user) {
    return {
      success: false,
      message: "Invalid credentials. Please verify your administrative access code and try again.", // Default error message from wireframe
    };
  }

  return {
    success: true,
    user,
  };
}
