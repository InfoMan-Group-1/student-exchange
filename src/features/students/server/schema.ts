import { z } from "zod";

export const createStudentSchema = z.object({
  fullName: z.string().trim().min(2).max(120),
  email: z.email().max(190),
  destinationCountry: z.string().trim().min(2).max(80),
});

export type CreateStudentInput = z.infer<typeof createStudentSchema>;
