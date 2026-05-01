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
