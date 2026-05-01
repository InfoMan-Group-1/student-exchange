# Student Exchange Project Manual

This guide lists the main commands for this project and what each one does.

## Stack at a glance

- Frontend + backend framework: `Next.js` (App Router)
- Database driver: `mysql2` (native SQL queries)
- Migration tool: `dbmate` (SQL migration files)
- Validation: `zod`
- UI components: `shadcn/ui`
- Seed runner: custom `scripts/seed.mjs`

## 1) First-time setup

Install dependencies:

```bash
npm install
```

What it does:
- Installs all packages from `package.json`
- Creates/updates `node_modules`

Configure environment:

1. Copy values from `.env.example` into `.env`
2. Fill in real database values

Important env keys:
- `DB_HOST`
- `DB_PORT`
- `DB_USERNAME`
- `DB_PASSWORD`
- `DB_DATABASE`
- `DB_SSL` (`true` recommended for cloud DB)
- `DATABASE_URL` (used by dbmate CLI)

## 2) Run the app

Start dev server:

```bash
npm run dev
```

What it does:
- Starts Next.js in development mode
- App is available at `http://localhost:3000`

Build for production:

```bash
npm run build
```

Run built app:

```bash
npm run start
```

## 3) Code quality

Run linter:

```bash
npm run lint
```

What it does:
- Runs ESLint checks for code issues

## 4) Database migrations (dbmate)

Create a new migration file:

```bash
npm run db:new -- add_students_table
```

What it does:
- Generates a new SQL migration file in `db/migrations`

Apply pending migrations:

```bash
npm run db:up
```

What it does:
- Executes new migration `-- migrate:up` blocks
- Updates migration history table managed by dbmate

Rollback one migration:

```bash
npm run db:down
```

What it does:
- Executes the latest migration `-- migrate:down` block

Check migration status:

```bash
npm run db:status
```

What it does:
- Shows which migrations are applied/pending

## 5) Seed data (separate from migrations)

Seed files live in:

- `db/seeds`

Run all seed files:

```bash
npm run db:seed
```

What it does:
- Runs all `.sql` files in `db/seeds` in filename order

Run one seed file:

```bash
npm run db:seed:file -- 001_students_seed.sql
```

What it does:
- Runs only the specified seed SQL file

## 6) Dependency management commands

Install a runtime dependency:

```bash
npm install <package-name>
```

Install a development dependency:

```bash
npm install -D <package-name>
```

Remove dependency:

```bash
npm uninstall <package-name>
```

When dependencies change:
- Commit both `package.json` and `package-lock.json`

## 7) shadcn/ui commands

Initialize shadcn (already done in this project):

```bash
npx shadcn@latest init -d
```

Add components:

```bash
npx shadcn@latest add button input card label table
```

What it does:
- Adds UI component files into `src/components/ui`

## 8) Useful troubleshooting

If migrations fail:
- Verify `.env` and `DATABASE_URL`
- Ensure `DB_SSL=true` for cloud DB unless provider says otherwise
- Run `npm run db:status` to inspect state

If app cannot connect to DB:
- Check host/port/username/password/database
- Confirm network allowlist/firewall on cloud DB
- Confirm TLS requirements from provider

If seed fails:
- Ensure migrations are applied first (`npm run db:up`)
- Check SQL syntax in seed file

## 9) Recommended daily flow

1. `npm run db:up`
2. `npm run db:seed` (optional, for local data)
3. `npm run dev`
4. `npm run lint` before commit
