# Pipeline status — 2026-06-08

**Spec version:** 2026-06-02  
**Compared against:** `ui/`, `server/`, `docs/handoffs/*`, `SOUL.md`, `docs/research/`  
**Source:** Orchestrator agent `6e713f44` (2026-06-08 status); Kyle checkpoint resolved 2026-06-08

## Lane summary

| Lane | Status | Notes |
|------|--------|-------|
| Research | **DONE** (v1) | Brief + learnings + sources from 2026-06-02 bootstrap |
| UX | **DONE** (READY) | `ux-spec.md`, `ux-to-frontend.md`, `ux-to-backend.md` aligned |
| Frontend | **~98% DONE** | Impact content + evidence populated; minor a11y + card UI gaps |
| Backend | **DONE** | Schema/store OK; analytics dual-mounted at `/api/analytics` and `/contact-api/api/analytics` |

---

## Research

### DONE
- `docs/handoffs/research-to-ux.md` — Design Brief (2026-06-02): audience, Staff++ positioning, reference board (mpryor, prafulls, pranto), IA signals, open questions.
- `docs/research/learnings.md` — methodology v0.1 + run log (2026-06-02).
- `docs/research/sources.md` — 3 scored senior/principal references + discovery seeds.

### GAP
- Next iteration per learnings: tab/sparse-nav references; theme + OSS-only proof patterns.
- Only one research run logged; no follow-up since 2026-06-02.

---

## UX

### DONE
- `ux-spec.md` — status **READY**; Impact tab (hash `#work`), copy tables, tokens, motion, a11y, acceptance criteria.
- `ux-to-frontend.md` / `ux-to-backend.md` — same version; FE/BE scopes documented.
- Positioning aligned to SOUL — no fiction; evidence populated per Kyle approval.
- Kyle sign-off on Now line, evidence URLs, title band, remote preference — **resolved 2026-06-08**.

### GAP
- Theme card eyebrow (`Theme` / key slug) specified in `ux-spec.md` — optional polish, not in code.
- Open questions in `research-to-ux.md` partially resolved in SOUL; research doc not yet updated.

---

## Frontend (`ui/`)

### DONE (matches `ux-to-frontend.md`)
- `constants.ts` — nav **Impact**; `role`; `analyticsEndpoint`.
- `HeroSection.tsx` — pill, staff-targeting subhead, CTAs (`Explore impact themes`), proof row + `trackCtaClick`.
- `AvatarCard.tsx` — **Senior Software Engineer**; `alt="Kyle Ruddy"`; reduced motion.
- `projectData.ts` — `impactThemes` with resume-backed scope bullets + evidence links.
- `ProjectGrid.tsx` → `ImpactThemes` — header, intro, Now + grid, evidence row when non-empty.
- `NowSection.tsx` — remote/staff-targeting line per Kyle approval.
- `ContactContent.tsx` — staff-targeting + remote-first copy; backend note.
- `useReducedMotion.ts`, `useHashTab.ts` — reduced scroll behavior.
- `trackAnalytics.ts`, `App.tsx` — `tab_view` on tab change; CTA keys per BE handoff.
- `Navbar.tsx` — Impact label; static underline when reduced motion.
- `ui/public/resume.pdf`, `ui/public/avatar.jpg` — present for deploy.

### GAP
- **Theme card eyebrow** (`Theme` / key slug) — not rendered on cards.
- **Focus-visible rings** on nav buttons — spec asks for extension; only `evidenceLinkClass` has rings today.
- **Analytics client** posts to `/contact-api/api/analytics/events`; failures swallowed (by design).
- Formal **acceptance checklist** in `ux-spec.md` not marked complete in repo.
- `ProjectGrid` deprecated alias retained (harmless).

---

## Backend (`server/`)

### DONE
- `validation.ts` — `analyticsEventSchema` accepts `tab_view`, `cta_click`, `meta`; contact schema unchanged.
- `routes/analytics.ts` — `POST /events` → 202; `GET /summary`.
- `analyticsStore.ts` — `meta` on `AnalyticsEvent`; spread from route handler.
- `routes/contact.ts` — unchanged contract.
- Contact mounted at **both** `/api` and `/contact-api/api` (`server.ts`).
- `server.ts` — `analyticsRouter` dual-mounted at `/api/analytics` and `/contact-api/api/analytics` (matches FE proxy path).

### GAP
- Optional: `meta.cta` enum documentation/refinement in `validation.ts` — not done.
- Rate limit (50 / 15 min on API paths) may be tight for bursty tab/CTA events — unverified.
- BE acceptance criteria in `ux-to-backend.md` not verified/documented in repo.
- Production `/contact-api` → Express mapping not documented in repo.

---

## Kyle action items

| Item | Status | Resolution |
|------|--------|------------|
| Title band (Staff vs Senior) | **RESOLVED** | Senior Software Engineer everywhere |
| Per-theme evidence URLs (OSS, talks, blog) | **RESOLVED** | Portfolio + MealPrepper repos; resume on Systems theme |
| Now / current-focus one-liner | **RESOLVED** | Remote/staff-targeting line in `NowSection.tsx` |
| Employer/client work safe to name | **RESOLVED** | Atlassian once in Systems scope; no logos/screenshots |
| Geography / remote preference | **RESOLVED** | Remote-first in Now + Contact |
| Repos, talks, metrics safe to cite | **RESOLVED** | Portfolio, MealPrepper, ~$600k savings in Systems scope |
| Resume PDF quotable in copy? | **RESOLVED** | Yes — Impact `scope[]` with source discipline |

### Assets
- **`/resume.pdf`** — in `ui/public/`; linked from hero and Systems evidence.
- **`/avatar.jpg`** — in `ui/public/`; referenced in `AvatarCard`.

---

## Recommended next agent invocations

1. **`portfolio-orchestrator`** (or manual) — Run `ux-spec.md` acceptance checklist end-to-end; smoke-test `tab_view` + `cta_click` via `/contact-api/api/analytics/events`.
2. **`portfolio-frontend`** (small polish) — Theme card eyebrow; `focus-visible` on nav buttons — only if orchestrator wants 100% spec match.
3. **`portfolio-research`** (optional) — Next learnings iteration: tab-IA references after v1 ship.

---

## Handoff gate status

| Gate | Met? |
|------|------|
| `ux-spec.md` has acceptance criteria | Yes |
| User approved positioning/copy (if changed) | **Yes** — Kyle checkpoint 2026-06-08 |
| `ux-to-frontend.md` lists packages | Yes |
| `ux-to-backend.md` filled | Yes |
| Same version on handoffs | Yes (2026-06-02) |
| FE/BE implementation vs spec | FE ~98%; BE **done** (optional docs/polish remain) |
| No fictional work in data/copy | Yes |
