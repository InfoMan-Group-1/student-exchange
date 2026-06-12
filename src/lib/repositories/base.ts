import { pool } from "@/lib/db";

export class BaseRepository {
  protected async query<T>(sql: string, values?: any[]): Promise<T> {
    const [rows] = await pool.execute(sql, values);
    return rows as T;
  }
}
