# Student Exchange

Student Exchange is a full-stack starter app built with Next.js, MySQL, and native SQL queries.  
This repository is structured to be easy for new contributors to navigate and extend.

## Tech stack

- `Next.js` (App Router) for frontend + API routes
- `mysql2` for native SQL database access
- `dbmate` for SQL migrations
- `zod` for request validation
- `shadcn/ui` for base UI components

## Quick start for new members

1. Install dependencies:

```bash
npm install
```

2. Configure environment variables:
- Copy `.env.example` to `.env`
- Fill in real database values

Required keys:
- `DB_HOST`
- `DB_PORT`
- `DB_USERNAME`
- `DB_PASSWORD`
- `DB_DATABASE`

Optional:
- `DB_SSL=true` (recommended for cloud DB)
- `DATABASE_URL` (used by `dbmate`)

3. Apply migrations:

```bash
npm run db:up
```

4. Seed sample data (optional):

```bash
npm run db:seed
```

5. Start local development:

```bash
npm run dev
```

App runs at `http://localhost:3000`.

## Project structure

```txt
student-exchange/
|- src/
|  |- app/
|  |  |- api/students/route.ts          # HTTP endpoints for students
|  |  |- page.tsx                       # Home page entrypoint
|  |- features/
|  |  |- students/
|  |  |  |- components/
|  |  |  |  |- students-dashboard.tsx   # Students UI container
|  |  |  |- server/
|  |  |  |  |- repository.ts            # Student SQL queries
|  |  |  |  |- schema.ts                # Student request schema
|  |  |  |- model.ts                    # Shared Student type
|  |- components/ui/                     # shadcn base components
|  |- lib/
|  |  |- db.ts                          # MySQL pool setup
|  |  |- env.ts                         # Environment variable loading
|  |  |- repositories/students.ts       # Compatibility re-export
|  |  |- validation/student.ts          # Compatibility re-export
|- db/
|  |- migrations/                       # dbmate migration files
|  |- seeds/                            # seed SQL files
|- scripts/
|  |- seed.mjs                          # custom seed runner
|- docs/                                # setup and project notes
```

## Main commands

- `npm run dev` - start development server
- `npm run build` - create production build
- `npm run start` - run production build
- `npm run lint` - run ESLint
- `npm run db:new -- <name>` - create migration
- `npm run db:up` - apply migrations
- `npm run db:down` - rollback latest migration
- `npm run db:status` - check migration status
- `npm run db:seed` - run all seed files
- `npm run db:seed:file -- 001_students_seed.sql` - run one seed file

## Contribution guideline (initial)

- Keep domain logic inside `src/features/<domain>/...`
- Put reusable low-level utilities in `src/lib/...`
- Keep API route handlers thin; delegate to `features/.../server`
- Add validation in feature `schema.ts` before writing DB calls
- Update this README when adding a new domain feature
