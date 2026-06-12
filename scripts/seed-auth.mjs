import mysql from "mysql2/promise";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USERNAME || "root",
  password: process.env.DB_PASSWORD || "password",
  database: process.env.DB_DATABASE || "student_exchange",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  ssl: { minVersion: "TLSv1.2" },
});

async function seed() {
  console.log("Seeding auth data...");

  try {
    const adminPasswordHash = await bcrypt.hash("adminpassword", 10);
    const studentPasswordHash = await bcrypt.hash("studentpassword", 10);

    // 1. Insert Admin
    const [adminResult] = await pool.execute(
      `INSERT INTO users (email, password_hash, role) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE password_hash = VALUES(password_hash)`,
      ["admin@example.com", adminPasswordHash, "admin"]
    );
    console.log("Admin user seeded.");

    // 2. Insert Student User
    const [studentUserResult] = await pool.execute(
      `INSERT INTO users (email, password_hash, role) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE password_hash = VALUES(password_hash)`,
      ["student@example.com", studentPasswordHash, "student"]
    );

    // Get the user ID for the student
    const [userRows] = await pool.execute(`SELECT id FROM users WHERE email = 'student@example.com'`);
    const studentUserId = userRows[0].id;
    console.log(`Student user seeded with ID: ${studentUserId}`);

    // 3. Ensure a related Program and Guardian exist for the student
    await pool.execute(
      `INSERT INTO programs (program_id, program_name, college_name) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE program_name = VALUES(program_name)`,
      ["PROG1", "BS Computer Science", "CCIS"]
    );

    await pool.execute(
      `INSERT INTO guardians (guardian_id, guardian_name, relation_to_student, guardian_contact_number) VALUES (?, ?, ?, ?) ON DUPLICATE KEY UPDATE guardian_name = VALUES(guardian_name)`,
      ["GUARD1", "John Doe Sr.", "Father", "+639123456789"]
    );

    // 4. Create Student profile
    await pool.execute(
      `INSERT INTO students (student_number, user_id, program_id, guardian_id, full_name, school_email, year_level, cumulative_gwa) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE user_id = VALUES(user_id)`,
      ["2025-00001-MN-0", studentUserId, "PROG1", "GUARD1", "Jane Doe", "student@example.com", "3rd Year", 1.25]
    );
    console.log("Student profile linked and seeded.");

    console.log("Auth seeding completed successfully!");
  } catch (error) {
    console.error("Error seeding auth data:", error);
  } finally {
    await pool.end();
  }
}

seed();
