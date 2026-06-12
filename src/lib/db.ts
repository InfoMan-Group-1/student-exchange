import mysql from "mysql2/promise";
import { env } from "@/lib/env";

export const pool = mysql.createPool({
  host: env.DB_HOST,
  port: env.DB_PORT,
  user: env.DB_USERNAME,
  password: env.DB_PASSWORD,
  database: env.DB_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  ssl: env.DB_SSL ? { minVersion: "TLSv1.2" } : undefined,
});

/**
 * Execute a raw parameterized SQL query against the database.
 * @param sql The raw SQL query with ? placeholders.
 * @param values An array of values to safely substitute for the placeholders.
 * @returns The query result rows.
 */
export async function query<T>(sql: string, values?: any[]): Promise<T> {
  const [rows] = await pool.execute(sql, values);
  return rows as T;
}
