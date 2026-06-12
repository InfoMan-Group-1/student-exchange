# MVP Gap Analysis — PUP Student Exchange

Conducted via direct codebase audit of all pages, APIs, database migrations, and UI components.

---

## ✅ What's Fully Working

| Area | Status |
|------|--------|
| Auth (Login/Register/JWT/RBAC) | ✅ Complete |
| Student Profile (GET/PATCH) | ✅ Complete |
| Student Languages (GET/POST/DELETE) | ✅ Complete |
| Student Application (GET/POST/PATCH) | ✅ Complete |
| University Choices (PUT) | ✅ Complete |
| Admin Dashboard stats API | ✅ Complete |
| Admin Applications list (GET) | ✅ Complete |
| Admin Application detail (GET/PATCH) | ✅ Complete |
| Registration + Guardian creation | ✅ Complete |

---

## 🔴 Critical Gaps (Blocking MVP)

### 1. Logout Doesn't Clear Token
**File:** [`DashboardHeader.tsx`](file:///c:/Users/QC-SDO/Desktop/student-exchange/src/components/layout/DashboardHeader.tsx#L102)

The Logout button is just a `<Link href="/login">` — it does **not** call `removeAuthToken()`. Clicking it navigates to `/login` but leaves the JWT in `localStorage`, so `ProtectedRoute` immediately redirects the user *back* to the dashboard. Users cannot log out.

**Fix:** Replace the logout link with a client-side button that calls `removeAuthToken()` before navigating.

---

### 2. Dashboard Crashes When Student Has No Application
**File:** [`src/app/dashboard/page.tsx`](file:///c:/Users/QC-SDO/Desktop/student-exchange/src/app/dashboard/page.tsx#L14)

When a newly registered student logs in (who has no application record yet), `GET /api/v1/applications/me` returns an error or null. The page currently renders a generic error state with no call-to-action. New students would be stuck.

**Fix:** Show an empty state with a "Start Your Application" button that calls `POST /api/v1/applications/me`.

---

### 3. `DashboardHeader` Receives Hardcoded Mock Data
**File:** [`src/app/dashboard/layout.tsx`](file:///c:/Users/QC-SDO/Desktop/student-exchange/src/app/dashboard/layout.tsx)

The layout calls `getStudentDashboardData()` (from the old mock file) to populate `DashboardHeader` with `fullName`, `studentNumber`, and `avatarUrl`. This data is **not coming from the real API**. All users will see the mock student's name in the header.

**Fix:** Replace the mock call with a server-side fetch to `GET /api/v1/students/me/profile`, or convert the header to a client component using `useAuth` + SWR.

---

### 4. Checklist Shows Fields Not In Database
**File:** [`ApplicationChecklist.tsx`](file:///c:/Users/QC-SDO/Desktop/student-exchange/src/features/dashboard/components/ApplicationChecklist.tsx#L10-L13)

The checklist renders `has_medical_certificate`, `has_consent_form`, and `has_study_plan` — but these columns **do not exist** in the `applications` table (migration `202508250004`). These will always show as `false`/missing and can never be toggled.

**Fix:** Remove these three fields from the checklist. The real boolean flags in the DB are: `has_application_form`, `has_cv`, `has_tcg`, `has_recommendation_letter`, `has_essay`, `has_form_5`, `has_valid_passport`, `has_online_application_form`.

---

### 5. `PUT /api/v1/applications/[id]/choices` Is Admin-Only (Bug)
**File:** [`choices/route.ts`](file:///c:/Users/QC-SDO/Desktop/student-exchange/src/app/api/v1/applications/%5Bapplication_id%5D/choices/route.ts#L10)

This endpoint requires `role === "admin"`, but students need to submit their own university choices. The student-facing `PATCH /api/v1/applications/me` partially handles this via the service layer, but this named route is inaccessible to students.

**Fix:** Either change the guard to allow the owning student, or confirm `PATCH /api/v1/applications/me` with `{ choices: [...] }` is the intended path (and remove this route or document the difference).

---

## 🟡 Medium Gaps (Should Fix for MVP Quality)

### 6. Admin Dashboard Chart Is a Placeholder
**File:** [`ApplicationsChart.tsx`](file:///c:/Users/QC-SDO/Desktop/student-exchange/src/features/admin/components/ApplicationsChart.tsx)

The "Applications by College" chart is hardcoded CSS bars with no real data. The admin dashboard API (`/api/v1/admin/dashboard`) doesn't currently return a breakdown by college/program.

**Fix:** Add a `byProgram` aggregation to the admin dashboard API and wire it to the chart (even a simple static bar chart with real numbers is better than a placeholder).

---

### 7. `events` and `events_attended` Tables Have No APIs
**Migrations:** `202508250006`, `202508250007`

Two full database tables — `events` and `events_attended` — have no corresponding API routes at all. They are invisible to both the admin and student UIs.

**Assessment for MVP:** These can be deferred if events are not part of the student application flow. However, if the admin is supposed to manage events students attend, this is a gap.

---

### 8. Admin Application Detail — Status Dropdown Uses Mock Values
**File:** [`AdminStatCards.tsx`](file:///c:/Users/QC-SDO/Desktop/student-exchange/src/features/admin/components/AdminStatCards.tsx)

Several stat card values (`totalApplicantsChange`, `avgAge`, `avgAgeStatus`, `bestGwaStatus`) are hardcoded strings like `"+0% vs LY"` and `"Stable"`. The API does not return these computed fields.

**Fix:** Add aggregations (average age, GWA) to the admin dashboard service, or remove these placeholder labels.

---

## 🟢 Low Priority / Nice-to-Have

| Gap | Notes |
|-----|-------|
| No password reset flow | Users who forget passwords have no recovery path |
| No admin login page | Both admin and student share `/login` — works but not explicitly separated |
| No pagination on admin applicants list | Will break with large datasets |
| `ApplicantsToolbar` search is not wired | The search input renders but doesn't filter the table |
| No 404 or error boundary pages | Navigation to invalid routes shows a generic Next.js error |

---

## Priority Order for MVP Shipping

1. **🔴 Fix Logout** — users are completely stuck logged in
2. **🔴 Empty state for new students** — new registrations see an error immediately
3. **🔴 Wire DashboardHeader to real API** — removes mock data from production
4. **🔴 Fix ApplicationChecklist fields** — remove non-existent DB columns
5. **🟡 Wire ApplicationsChart to real data** — low effort, high polish
6. **🟡 Fix `choices` route auth** — audit or remove the admin-gated endpoint
