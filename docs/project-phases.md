## Production Blueprint: Next.js + TiDB + Native SQL + Vercel

## Phase 0 — Scope Lock and Architecture Baseline

### Objectives
- Freeze MVP scope from your project document.
- Prevent feature creep and schema rewrites later.

### Tasks
1. Define user roles (example: `student`, `university`, `admin`).
2. Confirm core modules (example):
   - student profile
   - university catalog
   - exchange applications
   - status tracking
   - admin approvals
3. Write one-page “Definition of Done” per module.
4. Create API contract draft (endpoint list + request/response shapes).

### Best Practices
- Keep v1 small and complete.
- Every UI screen must map to an API endpoint and table.

### Pitfalls
- Designing UI first without schema constraints.
- No ownership per module.

---

## Phase 1 — Project Setup (Next.js JS-only)

### Objectives
- Establish clean structure and predictable conventions.

### Tasks
1. Create app:
```bash
npx create-next-app@latest student-exchange --js --eslint --tailwind --src-dir --app
```
2. Install dependencies:
```bash
npm install mysql2 zod
npm install -D dbmate
```
3. Add scripts in `package.json`:
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint",
    "db:up": "dbmate --migrations-dir ./db/migrations up",
    "db:down": "dbmate --migrations-dir ./db/migrations down",
    "db:new": "dbmate --migrations-dir ./db/migrations new",
    "db:status": "dbmate --migrations-dir ./db/migrations status"
  }
}
```

### Recommended Structure
```txt
src/
  app/
    api/
      auth/
      students/
      universities/
      applications/
      admin/
    (routes for pages)
  components/
    ui/
    forms/
    layout/
  features/
    students/
    universities/
    applications/
    admin/
  lib/
    db.js
    env.js
    logger.js
    errors.js
    auth.js
    repositories/
      student-repo.js
      university-repo.js
      application-repo.js
      admin-repo.js
    validation/
      student.schema.js
      application.schema.js
  types/ (optional for JSDoc typedefs)
db/
  migrations/
  seeds/
scripts/
docs/
```

### Pitfalls
- Mixing SQL directly inside route handlers.
- No naming standard for files/endpoints.

---

## Phase 2 — Database Design (TiDB, MySQL-compatible)

### Objectives
- Convert project requirements into normalized tables + relations.

### Suggested Entity Mapping (Student Exchange)
- `users` (auth identity + role)
- `students` (student-specific profile)
- `universities` (partner schools)
- `programs` (offered exchange programs)
- `applications` (student submissions)
- `application_status_history` (audit trail)
- `documents` (optional upload metadata)
- `admin_actions` (review decisions)

### Example Schema Direction
- `users.id` -> referenced by `students.user_id`
- `universities.id` -> referenced by `programs.university_id`
- `applications.student_id`, `applications.program_id`
- Unique constraints where business requires (e.g., one active application per student/program cycle)

### Best Practices
- Use foreign keys.
- Add indexes early on filter columns (`status`, `created_at`, `student_id`).
- Include audit fields: `created_at`, `updated_at`.

### Pitfalls
- Storing status changes in one column only (no history).
- Missing uniqueness constraints.

---

## Phase 3 — Manual SQL Migrations (No ORM)

### Objectives
- Version schema changes safely across dev/staging/prod.

### Tasks
1. Create migration:
```bash
npm run db:new -- create_applications_table
```
2. Fill SQL file:
```sql
-- migrate:up
CREATE TABLE applications (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  student_id BIGINT UNSIGNED NOT NULL,
  program_id BIGINT UNSIGNED NOT NULL,
  status VARCHAR(30) NOT NULL DEFAULT 'draft',
  submitted_at DATETIME NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_app_student FOREIGN KEY (student_id) REFERENCES students(id),
  CONSTRAINT fk_app_program FOREIGN KEY (program_id) REFERENCES programs(id),
  INDEX idx_app_status (status),
  INDEX idx_app_student (student_id)
);

-- migrate:down
DROP TABLE IF EXISTS applications;
```
3. Apply:
```bash
npm run db:up
```
4. Roll back one step if needed:
```bash
npm run db:down
```

### Best Practices
- One migration = one logical change.
- Always write `down` section.
- Never edit old applied migrations; add new migration instead.

### Pitfalls
- Manual DB edits in UI without migration record.
- Destructive `down` in production without backup plan.

---

## Phase 4 — Secure TiDB Connection in Next.js

### Objectives
- Stable, secure DB access from API routes/server actions only.

### `src/lib/env.js`
```js
import { z } from "zod";

const schema = z.object({
  DB_HOST: z.string().min(1),
  DB_PORT: z.coerce.number().default(4000),
  DB_USERNAME: z.string().min(1),
  DB_PASSWORD: z.string().min(1),
  DB_DATABASE: z.string().min(1),
  DB_SSL: z.enum(["true", "false"]).default("true")
});

export const env = schema.parse(process.env);
```

### `src/lib/db.js`
```js
import mysql from "mysql2/promise";
import { env } from "./env";

export const pool = mysql.createPool({
  host: env.DB_HOST,
  port: env.DB_PORT,
  user: env.DB_USERNAME,
  password: env.DB_PASSWORD,
  database: env.DB_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  ssl: env.DB_SSL === "true" ? { minVersion: "TLSv1.2" } : undefined
});
```

### Env Strategy
- `.env.local` for local dev
- Vercel Project Env for staging/prod
- Never expose DB vars to browser (`NEXT_PUBLIC_*` not for secrets)

### Pitfalls
- Opening new connection per request (don’t; use pool).
- Running DB code in client components.

---

## Phase 5 — Backend Development (API + Repository Pattern)

### Objectives
- Keep routes thin; move SQL to repositories.

### Repository Pattern (Raw SQL)
`src/lib/repositories/application-repo.js`
```js
import { pool } from "@/lib/db";

export async function listApplicationsByStudent(studentId) {
  const [rows] = await pool.execute(
    `SELECT a.id, a.status, a.created_at, p.name AS program_name
     FROM applications a
     JOIN programs p ON p.id = a.program_id
     WHERE a.student_id = ?
     ORDER BY a.created_at DESC`,
    [studentId]
  );
  return rows;
}

export async function createApplication({ studentId, programId }) {
  const [result] = await pool.execute(
    `INSERT INTO applications (student_id, program_id, status)
     VALUES (?, ?, 'draft')`,
    [studentId, programId]
  );
  return result.insertId;
}
```

### Route Handler Example
`src/app/api/applications/route.js`
```js
import { NextResponse } from "next/server";
import { z } from "zod";
import { createApplication } from "@/lib/repositories/application-repo";

const schema = z.object({
  studentId: z.number().int().positive(),
  programId: z.number().int().positive()
});

export async function POST(req) {
  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ message: "Invalid payload" }, { status: 400 });
    }

    const id = await createApplication(parsed.data);
    return NextResponse.json({ id }, { status: 201 });
  } catch (e) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
```

### Best Practices
- Prepared statements (`?`) always.
- Validate all input with Zod.
- Return normalized error shape.

### Pitfalls
- SQL string concatenation (SQL injection risk).
- Business logic inside UI components.

---

## Phase 6 — Frontend Development (Next.js JS)

### Objectives
- Build role-based, API-driven pages.

### Suggested Feature-to-UI Mapping
- **Student**
  - Profile page
  - Program browse/search
  - Application create/view/status
- **University**
  - Program management
  - Applicant list view
- **Admin**
  - Review queue
  - Approve/reject flow
  - Reports dashboard (basic)

### Tasks
1. Build route groups per role.
2. Build reusable forms/components.
3. Add loading/error/empty states for all tables/lists.
4. Add optimistic refresh only where safe.

### Pitfalls
- No pagination for large lists.
- Missing disabled/loading button states (double submissions).

---

## Phase 7 — Integration Phase

### Objectives
- Ensure end-to-end flow works from DB -> API -> UI.

### Tasks
1. Seed realistic data in `db/seeds/`.
2. Test core flows:
   - create student profile
   - submit application
   - admin update status
3. Verify API status codes and UI handling.
4. Add contract checks for response shapes.

### Pitfalls
- Testing only happy paths.
- No status transition rules (e.g., approved -> draft should be blocked).

---

## Phase 8 — Testing Strategy

### Objectives
- Prevent regressions before deployment.

### Minimum Test Plan
- **Unit:** validation and utility functions.
- **Integration:** repository + API routes using test DB.
- **E2E:** top 3 flows in browser automation (student submit, admin review, status visible).

### Manual QA Checklist
- Auth and role access checks
- Form validation and error messages
- SQL migration up/down in staging DB
- Slow network behavior on key pages

---

## Phase 9 — Deployment to Vercel

### Objectives
- Reliable production release with safe env management.

### Tasks
1. Push to GitHub.
2. Import project to Vercel.
3. Add production env variables in Vercel:
   - `DB_HOST`, `DB_PORT`, `DB_USERNAME`, `DB_PASSWORD`, `DB_DATABASE`, `DB_SSL`
4. Run migrations against production DB (CI job or controlled manual step).
5. Smoke test production endpoints.

### Pitfalls
- Deploying before running migrations.
- Using dev DB credentials in prod.

---

## Phase 10 — Post-Deployment Improvements

### Objectives
- Improve reliability, security, and observability.

### Prioritized Enhancements
1. Centralized logging with request IDs.
2. Rate limiting on write-heavy endpoints.
3. Soft delete and audit logs.
4. Query performance tuning (`EXPLAIN` + index fixes).
5. Add staging environment with separate TiDB branch/cluster.
6. Add backup/restore runbook and incident checklist.

---

## Dedicated Section A — Organizing Raw SQL (Repository Style)

### Rules
- One repository per domain (`student-repo.js`, `application-repo.js`).
- Routes call service/repository; never embed long SQL in route files.
- Name queries by behavior (`listByStatus`, `createDraft`, `approveApplication`).

### Query File Pattern
- Keep SQL strings inline in repo functions for traceability, or
- keep `lib/sql/<domain>.sql.js` exported constants if queries grow large.

### Security Rules
- Use placeholders only.
- Whitelist sortable columns if dynamic sorting is needed.
- Never pass raw client filter directly into SQL fragments.

---

## Dedicated Section B — Manual SQL Migration Design

### Recommended Policy
- Prefix migration files with timestamp.
- Include `-- migrate:up` and `-- migrate:down`.
- Add schema + index + FK changes in same migration only if strongly related.
- Track data migrations separately from schema migrations.

### Release Policy
- Run migrations in staging first.
- Production migration window + rollback plan.
- Keep backups before destructive migrations.

---

## Dedicated Section C — TiDB Connection & Pooling

### Production Checklist
- TLS enabled (`DB_SSL=true`)
- Pooled connections
- Environment variables per environment
- No DB access from browser/client code
- Network rules/allowlist set in TiDB cloud

### Env Layout
- Local: `.env.local`
- Staging: Vercel Staging env
- Prod: Vercel Production env
- Keep DBs separate (never share local/prod DB)

---

## Security and Reliability Baseline

- **Auth basics:** start with session/JWT and role middleware in API routes.
- **Authorization:** enforce role checks server-side for every sensitive route.
- **Validation:** Zod all request bodies, params, query.
- **Error handling:** standardized JSON error format + internal log details.
- **Performance:** indexes, pagination, selective columns, avoid `SELECT *`.
- **Observability:** request logs, DB timing logs, error tracking.

---

## Suggested Initial Endpoint Set (MVP)

- `POST /api/auth/login`
- `GET /api/students/me`
- `PUT /api/students/me`
- `GET /api/programs`
- `GET /api/programs/:id`
- `POST /api/applications`
- `GET /api/applications/me`
- `PATCH /api/admin/applications/:id/status`

---

## Team Execution Plan (4–6 weeks)

- **Week 1:** Setup, migrations baseline, auth skeleton
- **Week 2:** Student + programs module
- **Week 3:** Application flow end-to-end
- **Week 4:** Admin review workflow + status history
- **Week 5:** Testing + staging hardening
- **Week 6:** Production deploy + stabilization
