import { UserRepository } from "@/lib/repositories/user.repository";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { pool } from "@/lib/db";

const userRepository = new UserRepository();

export class AuthService {
  async register(data: {
    email: string;
    passwordRaw: string;
    role: "admin" | "student";
    // Student specifics (required if role is student)
    studentNumber?: string;
    programId?: string;
    guardianId?: string;
    fullName?: string;
  }) {
    // Basic validation
    if (!data.email || !data.passwordRaw || !data.role) {
      throw new Error("Missing email, password, or role.");
    }

    if (data.role === "student") {
      if (!data.studentNumber || !data.programId || !data.guardianId || !data.fullName) {
        throw new Error("Student registration requires student_number, program_id, guardian_id, and full_name.");
      }
    }

    // Check existing
    const existing = await userRepository.findByEmail(data.email);
    if (existing) {
      throw new Error("User with this email already exists.");
    }

    const passwordHash = await bcrypt.hash(data.passwordRaw, 10);

    // If admin, simple insert
    if (data.role === "admin") {
      const userId = await userRepository.create(data.email, passwordHash, data.role);
      return { userId, role: data.role };
    }

    // If student, we need a transaction to create User AND Student record
    const connection = await pool.getConnection();
    try {
      await connection.beginTransaction();

      // 1. Create User
      const [userResult] = await connection.execute(
        `INSERT INTO users (email, password_hash, role) VALUES (?, ?, ?)`,
        [data.email, passwordHash, data.role]
      );
      const userId = (userResult as any).insertId;

      // 2. Create Student
      await connection.execute(
        `INSERT INTO students (student_number, user_id, program_id, guardian_id, full_name, school_email) VALUES (?, ?, ?, ?, ?, ?)`,
        [data.studentNumber, userId, data.programId, data.guardianId, data.fullName, data.email]
      );

      await connection.commit();
      return { userId, role: data.role };
    } catch (err) {
      await connection.rollback();
      throw err;
    } finally {
      connection.release();
    }
  }

  async login(email: string, passwordRaw: string) {
    const user = await userRepository.findByEmail(email);
    if (!user) {
      throw new Error("Invalid email or password.");
    }

    const isValid = await bcrypt.compare(passwordRaw, user.password_hash);
    if (!isValid) {
      throw new Error("Invalid email or password.");
    }

    // Sign JWT (7 days expiration)
    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || "fallback_secret",
      { expiresIn: "7d" }
    );

    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    };
  }
}
