import { z } from "zod";

function stripWrappingQuotes(value: string): string {
  return value.replace(/^['"]|['"]$/g, "");
}

const envSchema = z.object({
  DB_HOST: z.string().min(1).transform(stripWrappingQuotes),
  DB_PORT: z.coerce.number().int().positive().default(3306),
  DB_USERNAME: z.string().min(1).transform(stripWrappingQuotes),
  DB_PASSWORD: z.string().min(1).transform(stripWrappingQuotes),
  DB_DATABASE: z.string().min(1).transform(stripWrappingQuotes),
  DB_SSL: z
    .enum(["true", "false"])
    .optional()
    .transform((value) => value !== "false"),
});

export const env = envSchema.parse(process.env);
