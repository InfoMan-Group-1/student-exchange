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
}
