const mysql = require('mysql2/promise');

async function main() {
  const connection = await mysql.createConnection({
    host: 'gateway01.ap-southeast-1.prod.alicloud.tidbcloud.com',
    port: 4000,
    user: '2njrkjikkBGz3u9.root',
    password: '3ZVfUuUj89q6dR9Z',
    database: 'students_exchange',
    ssl: {
      minVersion: 'TLSv1.2',
      rejectUnauthorized: true
    }
  });

  try {
    await connection.execute("SET FOREIGN_KEY_CHECKS=0");

    console.log("Updating PROG1 to PR011 in programs and students table...");
    await connection.execute("UPDATE programs SET program_id = 'PR011' WHERE program_id = 'PROG1'");
    await connection.execute("UPDATE students SET program_id = 'PR011' WHERE program_id = 'PROG1'");

    await connection.execute("SET FOREIGN_KEY_CHECKS=1");

    console.log("Successfully updated PROG1 to PR011.");

    const [progs] = await connection.execute("SELECT program_id FROM programs ORDER BY CAST(SUBSTRING(program_id, 3) AS UNSIGNED) DESC LIMIT 10");
    console.log("Top Program IDs after update:", progs.map(r => r.program_id));
  } catch (err) {
    console.error("Error:", err);
  } finally {
    await connection.end();
  }
}

main();
