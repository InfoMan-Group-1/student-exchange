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
    const [progs] = await connection.execute("SELECT program_id FROM programs ORDER BY program_id DESC LIMIT 20");
    console.log("Programs IDs:", progs.map(r => r.program_id));

    const [apps] = await connection.execute("SELECT application_id FROM applications ORDER BY application_id DESC LIMIT 20");
    console.log("Applications IDs:", apps.map(r => r.application_id));

    const [events] = await connection.execute("SELECT event_id FROM events ORDER BY event_id DESC LIMIT 20");
    console.log("Events IDs:", events.map(r => r.event_id));

  } catch (err) {
    console.error("Error:", err);
  } finally {
    await connection.end();
  }
}

main();
