import { BaseRepository } from "./base";

export class EventRepository extends BaseRepository {
  async getAllEvents() {
    return this.query<any[]>(`SELECT * FROM events ORDER BY event_date DESC`);
  }

  async getEventById(eventId: string) {
    const rows = await this.query<any[]>(`SELECT * FROM events WHERE event_id = ?`, [eventId]);
    return rows[0] ?? null;
  }

  async getEventsForStudent(studentNumber: string) {
    const sql = `
      SELECT e.event_id, e.event_name, e.host_country, e.event_date
      FROM events_attended ea
      JOIN events e ON ea.event_id = e.event_id
      WHERE ea.student_number = ?
      ORDER BY e.event_date DESC
    `;
    return this.query<any[]>(sql, [studentNumber]);
  }

  async markAttended(studentNumber: string, eventId: string) {
    const sql = `INSERT IGNORE INTO events_attended (student_number, event_id) VALUES (?, ?)`;
    return this.query(sql, [studentNumber, eventId]);
  }

  async removeAttendance(studentNumber: string, eventId: string) {
    return this.query(`DELETE FROM events_attended WHERE student_number = ? AND event_id = ?`, [studentNumber, eventId]);
  }

  async createEvent(eventName: string, hostCountry: string, eventDate: string) {
    // Generate sequential ID like EV014
    const rows = await this.query<any[]>(`
      SELECT event_id 
      FROM events 
      WHERE event_id LIKE 'EV%' 
      ORDER BY CAST(SUBSTRING(event_id, 3) AS UNSIGNED) DESC 
      LIMIT 1
    `);
    let nextId = "EV001";
    if (rows.length > 0) {
      const lastId = rows[0].event_id; // e.g. "EV013"
      const numPart = parseInt(lastId.replace("EV", ""), 10);
      if (!isNaN(numPart)) {
        nextId = `EV${String(numPart + 1).padStart(3, "0")}`;
      }
    }
    const sql = `INSERT INTO events (event_id, event_name, host_country, event_date) VALUES (?, ?, ?, ?)`;
    await this.query(sql, [nextId, eventName, hostCountry, eventDate]);
    return nextId;
  }
}
