# Google Stitch UI Prompt — Student Exchange MVP

Copy everything below into Google Stitch as your design brief. Generate **one artboard per screen** listed in the Screen Inventory.

---

## Product context

Design a web app UI for **PUP Student Exchange** (Polytechnic University of the Philippines): students apply for international exchange; staff review applications. This is an **MVP** — clean, simple, trustworthy, academic. **Desktop-first** (1280px), with a simplified mobile layout where noted.

**Users**
- **Student** — views status, edits profile, submits one exchange application
- **Admin** — reviews applicants, sees stats, opens application details

**Tone**
- **Authoritative yet accessible** — scholarly ambition, institutional reliability
- **Modern corporate with soft-tactile influence** — stable, established, premium academic
- Plenty of whitespace, clear hierarchy, accessible contrast
- Not playful; not childish

---

## Design system — **Academic Exchange Excellence**

Use this theme on **every screen**. Do not substitute other palettes.

### Brand & style

The UI is for the **PUP Student Exchange Management System**. Balance PUP institutional heritage with a forward-thinking, digital-first interface. The system should feel **stable** and **established** — suitable for long administrative sessions and complex applicant data.

### Color tokens (use exact hex values)

| Role | Hex | Usage |
|------|-----|--------|
| **Background** | `#f9f9f9` | Page canvas |
| **On background** | `#1a1c1c` | Primary body text |
| **Surface / cards** | `#ffffff` | Cards, modals, main panels (`surface-container-lowest`) |
| **Surface container** | `#eeeeee` | Subtle grouped areas |
| **On surface variant** | `#5a413d` | Secondary / muted text |
| **Outline** | `#8e706c` | Borders when needed |
| **Outline variant** | `#e2bfb9` | Soft dividers |
| **Primary** | `#570000` | Primary button fill (dark maroon) |
| **Primary container** | `#800000` | Sidebar, headers, brand anchor |
| **On primary** | `#ffffff` | Text on primary buttons |
| **On primary container** | `#ff8371` | Text on maroon sidebar (if needed) |
| **Inverse primary** | `#ffb4a8` | Soft accents on dark surfaces |
| **Secondary / Gold** | `#805600` | Secondary button text, accents |
| **Secondary container** | `#fdaf00` | Active nav indicator, highlights, “Pending” chips |
| **On secondary container** | `#694600` | Text on gold chips |
| **Tertiary** | `#272727` | Dark UI chrome optional |
| **Error** | `#ba1a1a` | Errors |
| **Error container** | `#ffdad6` | Error backgrounds |

**Functional color notes**
- **Maroon `#800000`** — primary brand, sidebar background, key actions
- **Gold `#fdaf00` / `#ffba43`** — active nav (left bar), warnings, pending status
- **Approved:** soft emerald green (not in token list — use tasteful `#2e7d32` on light green bg)
- **Rejected / urgent:** maroon `#800000` or error `#ba1a1a`

### Typography (Inter only)

| Token | Size / weight | Use |
|-------|----------------|-----|
| **display-lg** | 48px / 700, line 56px | Landing hero only |
| **headline-lg** | 32px / 600, line 40px | Page titles (desktop) |
| **headline-lg-mobile** | 24px / 600 | Page titles (mobile) |
| **headline-md** | 24px / 600 | Section headings |
| **title-lg** | 20px / 600 | Card titles |
| **body-lg** | 18px / 400 | Lead paragraphs |
| **body-md** | 16px / 400 | Default body (tables, forms) |
| **label-md** | 14px / 500 | Field labels |
| **label-sm** | 12px / 600, letter-spacing 0.05em | Table headers, metadata |

### Layout & spacing

- **Pattern:** Fixed **left sidebar** (280px) + fluid main content; top bar in main area
- **Grid:** 12-column fluid grid in main content
- **Page margins:** 32px (`container-padding: 2rem`)
- **Rhythm:** 8px base unit — `stack-sm` 8px, `stack-md` 16px, `stack-lg` 32px between sections
- **Card padding:** 24px internal minimum
- **Mobile:** Sidebar → hamburger; margins 16px

### Elevation & depth

- **Level 0:** Background `#f9f9f9`
- **Level 1 (cards, sidebar):** White `#ffffff`, shadow `0 4px 20px rgba(0,0,0,0.05)`
- **Level 2 (dropdowns, modals):** White, shadow `0 10px 30px rgba(0,0,0,0.12)`
- Prefer tonal layering over heavy borders; use 1px `#e8e8e8` or `#e0e0e0` only when same-color surfaces need separation

### Border radius

| Token | Value | Use |
|-------|-------|-----|
| **sm** | 4px | Small chips |
| **DEFAULT** | 8px | Buttons, inputs |
| **md** | 12px | Medium controls |
| **lg** | 16px | Cards, modals |
| **xl** | 24px | Large sections, sidebar inner corners |
| **full** | pill | Status tags only |

### Components (strict rules)

- **Primary button:** Fill `#570000` or `#800000`, text `#ffffff`, radius 8px; hover slightly darker + subtle lift
- **Secondary button:** Outline maroon, text `#570000` / `#800000`; or gold accent for tertiary actions
- **Inputs:** Light fill `#f3f3f3` (`surface-container-low`), radius 8px; **focus:** 2px stroke `#800000`
- **Cards:** White, radius 16px, Level 1 shadow, 24px padding
- **Sidebar nav:** Background `#800000` (primary-container); **active link:** gold **vertical bar** 4px left (`#fdaf00`) + subtle white overlay (~10% opacity); inactive text `#ffdad4` or white 80%
- **Status chips (pill):** Draft = gray `#e2e2e2`; Submitted/Pending = gold tint bg `#ffddaf`; Complete/Approved = soft emerald; Rejected = `#ffdad6` + error text
- **Data tables:** No vertical borders; horizontal dividers `#e0e0e0`; **row hover** faint gold `#fff9e6` or `#ffddaf` at 30% opacity
- **Icons:** Simple line icons, `#5a413d` or white on sidebar

**Do not use:** Stock photos, harsh gradients, neon colors, non-Inter fonts, dark mode (unless requested as second pass)

---

## Screen inventory (generate all 8)

| # | Screen name | Route (reference) | Role |
|---|-------------|-------------------|------|
| 1 | Landing Page | `/` | Shared |
| 2 | Login | `/login` | Shared |
| 3 | Student Dashboard | `/student` | Student |
| 4 | Student Profile | `/student/profile` | Student |
| 5 | Student Application Form | `/student/application` | Student |
| 6 | Admin Dashboard | `/admin` | Admin |
| 7 | Admin Applicants List | `/admin/applicants` | Admin |
| 8 | Admin Application Detail | `/admin/applicants/[id]` | Admin |

---

## Screen 1 — Landing Page

**Goal:** Introduce the program and route users to login.

**Theme:** Background `#f9f9f9`; hero uses **display-lg** (48px Inter bold); maroon + gold accents only.

**Layout**
- Minimal top nav: app name left (maroon `#800000`), “Login” link right
- Centered hero: headline **“Student Exchange Program”** (`display-lg`, `#1a1c1c`)
- Subtext `body-lg`, color `#5a413d`
- Two CTAs: **Student Login** (primary `#570000`) and **Staff Login** (secondary outline maroon)
- Footer: “Polytechnic University of the Philippines” in `label-sm`, `#5a413d`

**Content placeholders**
- Headline, 2-line description, 2 buttons

---

## Screen 2 — Login

**Goal:** Sign in; role is implied by which portal they came from or a simple toggle.

**Theme:** Centered **Level 2** card (white, 16px radius, soft shadow); inputs `#f3f3f3` fill, maroon focus ring.

**Layout**
- Centered card (max-width ~400px), 24px padding
- Title **Sign in** — `headline-md`
- Segmented control: **Student** | **Admin** (active segment uses gold `#fdaf00` indicator or underline)
- Fields: **Email**, **Password** — `label-md` above inputs
- Primary button: **Sign in** (maroon fill)
- Link: “Back to home” — `#5a413d`

**States**
- Error banner: `error-container` `#ffdad6`, text `#93000a`

---

## Screen 3 — Student Dashboard

**Goal:** At-a-glance application status and next steps.

**Theme:** Full dashboard shell — **280px maroon sidebar** + `#f9f9f9` main area; stat/status content in white cards.

**Layout**
- **Sidebar (280px, `#800000`):** Logo/app name; nav items Dashboard (active + gold left bar), Profile, Application; logout at bottom
- **Top bar (main):** `headline-lg` “Welcome, Juan Dela Cruz”; student number in `label-sm`; Log out text button
- **Main content:**
  - **Status card:** Large badge — `Draft` | `Submitted` | `Complete`; short sentence (“Complete your application to proceed”)
  - **Progress row:** 3 mini stats — Semester preference, Duration, Documents completed (e.g. `6/8`)
  - **Checklist preview:** List of required documents with check/cross icons (Application form, CV, TCG, Recommendation letter, Essay, Form 5, Valid passport, Online application form)
  - **Primary CTA:** “Continue application” → links to Application Form
- **Secondary card:** First choice university (read-only) if application exists

**Sample data**
- Name: Juan Dela Cruz, Status: Submitted, Semester: Spring, Duration: 1 Sem, 6/8 documents

---

## Screen 4 — Student Profile

**Goal:** View and edit personal and guardian information.

**Layout**
- Same student sidebar + top bar
- Two stacked sections in cards:

**Section A — Student information**
- Student number (read-only)
- Full name, Age, Nationality, Sex
- Birth date
- School email, Alternate email
- Home address, Mobile number
- Passport number, Passport issue/expiry dates
- Year level, Cumulative GWA
- Program (dropdown display: `BS Information Technology — CCIS`)

**Section B — Guardian**
- Guardian name, Relation to student (e.g. Mother)
- Guardian address, Contact number, Email

**Footer actions**
- **Save changes** (primary), **Cancel** (secondary)

Use a two-column form grid on desktop; single column on narrow view.

---

## Screen 5 — Student Application Form

**Goal:** Complete exchange application in one scrollable page (MVP).

**Layout**
- Same student sidebar; title **“Exchange application”**
- Multi-section form:

**Section 1 — Preferences**
- Semester preference (select)
- Duration preference (select: 1 Sem, 1 Year, etc.)

**Section 2 — University choices (ranked)**
- Table or 3 rows: Rank 1, 2, 3 + University name (text inputs)
- Helper text: “List your top three preferred host universities”

**Section 3 — Required documents (checklist)**
- Checkbox list (checked = submitted):
  - Application form, CV, TCG, Recommendation letter, Essay, Form 5, Valid passport, Online application form

**Section 4 — Languages**
- Small repeatable block: Language name + Proficiency level (dropdown: A1, A2, B1, B2, C1, C2)
- **+ Add language** button; show 2 example rows (English B2, Filipino C2)

**Section 5 — Signatories (optional MVP)**
- Program advisor, Department chair, College secretary, Dean name (text inputs)

**Sticky bottom bar**
- **Save draft** (secondary), **Submit application** (primary)

Show validation hint on one field as example (optional).

---

## Screen 6 — Admin Dashboard

**Goal:** Overview metrics and quick access to review queue.

**Theme:** Same sidebar system as student (maroon rail, gold active state); admin label “Admin portal” in top bar.

**Layout**
- **Sidebar (admin):** Dashboard (active), Applicants; same `#800000` styling
- **Top bar:** **Admin portal** + Log out

**Main content**
- **Page title:** Dashboard — `headline-lg`
- **Stat cards (4 in a row, white cards, 16px radius, Level 1 shadow):**
  - Total applicants (e.g. 20)
  - Average age (e.g. 21.5)
  - Best GWA (e.g. 1.25) — label “Highest academic standing (lowest GWA)”
  - Incomplete applications (e.g. 3)
- **Chart placeholder (optional):** Simple bar or donut “Applications by college” — can be gray placeholder block labeled “Chart”
- **Recent incomplete table:** Columns — Student #, Name, College, GWA, Status; 5 rows; row click goes to detail
- Link: **View all applicants**

---

## Screen 7 — Admin Applicants List

**Goal:** Searchable list of all students/applicants.

**Layout**
- Admin sidebar; title **Applicants**
- **Toolbar:** Search box (“Search by name or student number”), filter dropdowns: **College**, **Status** (All / Complete / Incomplete)
- **Data table:**
  - Columns: Student #, Full name, Program, College, GWA, Application status, Actions
  - Status badge per row
  - Actions: **View** button or clickable row
- Pagination footer: “Showing 1–20 of 20”
- Use realistic Filipino names and IDs from sample: `2023-10001-MN-0`, `Ana Santos`, `PR002`, CCIS, `1.50`, Complete

---

## Screen 8 — Admin Application Detail

**Goal:** Read-only review of one applicant; admin can mark complete.

**Layout**
- Admin sidebar; breadcrumb: Applicants > **Juan Dela Cruz**
- **Header row:** Student name, student number, status badge, **Mark as complete** button (primary, right)

**Two-column layout (desktop)**

**Left column — Student & guardian (read-only)**
- Compact summary: program, college, age, nationality, emails, GWA, passport
- Guardian block: name, relation, contact

**Right column — Application**
- Preferences: semester, duration
- **University choices table:** Rank 1–3 + university names
- **Documents checklist:** all items with green check / red missing
- **Languages table:** language + proficiency
- Signatories: advisor, chair, secretary, dean

**Bottom**
- Secondary actions: **Back to list**; optional **Export PDF** (disabled/ghost — visual only)

Use sample content consistent with previous screens.

---

## Flow diagram (for Stitch context)

```text
Landing → Login → Student Dashboard ↔ Profile ↔ Application Form
                 → Admin Dashboard → Applicants List → Application Detail
```

---

## Deliverables checklist for Stitch

- [ ] 8 distinct desktop frames (1440×900 or 1280×800)
- [ ] Theme **Academic Exchange Excellence** applied consistently (maroon sidebar, gold active nav, Inter type scale)
- [ ] Sidebar width **280px** on all logged-in screens
- [ ] Student vs Admin: same design system, different nav labels only
- [ ] Realistic placeholder text (Philippines addresses, `@iskolarngbayan.pup.edu.ph` emails)
- [ ] Table row hover gold tint `#fff9e6`
- [ ] Optional: Applicants table empty state

---

## Optional follow-up prompt (paste after first generation)

> Refine all 8 screens to strictly match **Academic Exchange Excellence**: sidebar `#800000` with gold `#fdaf00` active indicator, background `#f9f9f9`, cards white with 16px radius and soft shadow, primary buttons `#570000`, Inter typography per scale (body-md 16px, headline-lg 32px). Add mobile frames (375px) for Landing, Login, and Student Dashboard with 16px margins and collapsed nav.
