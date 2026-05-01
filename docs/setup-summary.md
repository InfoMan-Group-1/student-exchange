# Setup Summary

This document records what has been set up in this project so far.

## Core app foundation

- Bootstrapped a fresh Next.js app using:
  - App Router
  - TypeScript
  - Tailwind CSS
  - ESLint

## Dependencies installed

### Runtime dependencies

- `mysql2`
- `zod`
- `swr`
- shadcn/UI dependencies (including component utility packages)

### Development dependencies

- `dbmate`

## UI setup (shadcn)

- Initialized `shadcn/ui`
- Added core components:
  - `button`
  - `input`
  - `card`
  - `label`
  - `table`

## Database and SQL migration setup

- Added SQL migration workflow using dbmate
- Added migration file:
  - `db/migrations/202605010001_create_students.sql`

This migration creates a `students` table and includes a rollback block.

## Backend and database code structure

- `src/lib/env.ts`
  - Zod environment validation
  - Quote-safe env parsing (handles wrapped values like `'value'`)
- `src/lib/db.ts`
  - MySQL connection pool setup
  - TLS support controlled by `DB_SSL`
- `src/lib/validation/student.ts`
  - Request payload schema for student creation
- `src/lib/repositories/students.ts`
  - Native SQL query layer (`listStudents`, `createStudent`)
- `src/app/api/students/route.ts`
  - `GET /api/students`
  - `POST /api/students`

## Frontend implementation

- Replaced default homepage with a working full-stack example:
  - `src/app/page.tsx`
- Includes:
  - Student creation form
  - Students table
  - API integration to `/api/students`
  - Client data fetching with `swr`

## NPM scripts added

- Migration scripts:
  - `db:up`
  - `db:down`
  - `db:new`
  - `db:status`
- Seed scripts:
  - `db:seed`
  - `db:seed:file`

## Seed system (separate from migrations)

- Added dedicated seed directory:
  - `db/seeds`
- Added initial seed file:
  - `db/seeds/001_students_seed.sql`
- Added seed runner:
  - `scripts/seed.mjs`

Seed execution is intentionally separate from dbmate migrations.

## Documentation added/updated

- Updated `README.md` with:
  - Environment setup
  - Migration commands
  - Seed commands
  - Project structure
- Added command manual:
  - `docs/project-manual.md`
- Added this setup summary:
  - `docs/setup-summary.md`

## Verification performed

- Ran ESLint checks
- Resolved React hook lint issue on homepage by moving list fetching to `swr`
- Final lint status: passing

## Notes and extras

- TLS guidance:
  - `DB_SSL=true` is generally enough for managed cloud MySQL/TiDB
  - Optional custom CA support can be added later if needed
- Migration safety guidance:
  - Prefer dbmate commands over manually editing migration history tables
