import { BaseRepository } from "./base";

export interface UserRecord {
  id: number;
  email: string;
  password_hash: string;
  role: "admin" | "student";
  created_at: Date;
  updated_at: Date;
}

export class UserRepository extends BaseRepository {
  async findByEmail(email: string): Promise<UserRecord | null> {
    const users = await this.query<UserRecord[]>(
      `SELECT * FROM users WHERE email = ? LIMIT 1`,
      [email]
    );
    return users.length > 0 ? users[0] : null;
  }

  async create(email: string, passwordHash: string, role: "admin" | "student"): Promise<number> {
    const result = await this.query<any>(
      `INSERT INTO users (email, password_hash, role) VALUES (?, ?, ?)`,
      [email, passwordHash, role]
    );
    return result.insertId;
  }
}
