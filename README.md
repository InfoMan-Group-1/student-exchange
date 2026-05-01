## Student Exchange Starter

Simple full-stack Next.js setup using:

- Native SQL queries with `mysql2`
- SQL migrations with `dbmate`
- Request validation with `zod`
- UI components with `shadcn/ui`

## 1) Configure environment

Copy `.env.example` values into your local `.env` and set your real database values.

Required:
- `DB_HOST`
- `DB_PORT`
- `DB_USERNAME`
- `DB_PASSWORD`
- `DB_DATABASE`

Optional (defaults to secure TLS on):
- `DB_SSL=true`
- `DATABASE_URL` (used by dbmate CLI)

Example:

```env
DB_HOST=your-host
DB_PORT=4000
DB_USERNAME=your-user
DB_PASSWORD=your-password
DB_DATABASE=students_exchange
DB_SSL=true
DATABASE_URL=mysql://your-user:your-password@your-host:4000/students_exchange?tls=true
```

## 2) Run migrations

```bash
npm run db:up
```

Migration files are in `db/migrations`.

Useful commands:
- `npm run db:new -- create_students`
- `npm run db:status`
- `npm run db:down`

## 3) Seed data (separate from migrations)

Seed files are in `db/seeds`.

Run all seed files:

```bash
npm run db:seed
```

Run a single seed file:

```bash
npm run db:seed:file -- 001_students_seed.sql
```

## 4) Start development server

```bash
npm run dev
```

## Project structure

- `src/lib/db.ts` - MySQL pool setup
- `src/lib/repositories/students.ts` - native SQL query functions
- `src/lib/validation/student.ts` - Zod request validation
- `src/app/api/students/route.ts` - backend API endpoints
- `src/app/page.tsx` - simple UI using shadcn components
