# UX Spec — 2026-06-02

**Status:** `READY`  
**Learnings ref:** methodology v0.1 / run 2026-06-02 ([docs/research/learnings.md](../research/learnings.md))  
**Design brief:** [research-to-ux.md](research-to-ux.md)  
**Lane handoffs:** [ux-to-frontend.md](ux-to-frontend.md), [ux-to-backend.md](ux-to-backend.md)

## Summary

Reframe the **Work** tab as **Impact** (hash `#work` unchanged): three honest **impact themes** replace generic “project” cards, with optional **Now** subsection for current focus. Home hero and avatar align on senior IC positioning; CTAs use Staff++ language (“impact themes,” not “projects”). Hash-tab IA stays. Design tokens map to existing Tailwind theme (`background`, `foreground`, `muted`, `hero`, `panel`, sky/violet accents). Motion stays subtle with explicit `prefers-reduced-motion` cuts. Contact API and form contract unchanged; optional client analytics for tab/CTA events uses existing `POST /api/analytics/events` schema.

## User stories

- As a **hiring manager**, I want to scan identity, level, and domain interests in under 30 seconds so that I can decide whether to open resume or contact.
- As an **eng leader**, I want impact framed as themes with scope signals (not fake case studies) so that I can assess staff-leaning judgment without confidential employer detail.
- As a **peer**, I want GitHub/LinkedIn/resume one click away so that I can verify depth after the first impression.
- As **Kyle**, I want optional evidence links per theme (when approved) without inventing metrics or employers so that the site stays authentic.
- As a **visitor using reduced motion**, I want no essential information hidden behind animation so that the site remains accessible.

## Information architecture

| Tab key (`TabKey`) | Nav label | Hash | Purpose | Primary CTA |
|--------------------|-----------|------|---------|-------------|
| `home` | Home | `#home` | Identity + proof row | → Impact tab or Contact |
| `work` | Impact | `#work` | Impact themes + optional Now | External proof links (when present) or Contact |
| `contact` | Contact | `#contact` | Low-friction inbound | Form submit |

**Routing:** Keep `useHashTab` and `VALID_TABS` keys (`home` | `work` | `contact`). Only the **nav label** for `work` changes from “Work” to “Impact”. Deep links `#work` remain valid.

**Out of IA scope:** Single-page scroll migration; new tabs; employer timelines.

---

## Page / section specs

### Home (`ui/src/packages/home/`)

#### Layout

- Unchanged grid in `App.tsx`: `lg:grid-cols-[1.3fr_0.7fr]`, `gap-10`, hero left / `AvatarCard` right.
- Breakpoints: existing `sm` / `lg` typography on `h1`; hero `max-w-3xl` body.

#### Content blocks (final copy)

| Element | Copy |
|---------|------|
| Hero pill | `Senior Software Engineer · Builder · Systems thinker` |
| H1 | `Hi, I'm Kyle.` |
| Body | `I build thoughtful software with a bias toward clarity, speed, and real-world usefulness. I'm especially interested in product engineering, internal platforms, AI-assisted workflows, and the systems that make teams more effective.` |
| Primary CTA (button → `#work`) | `Explore impact themes` |
| Secondary CTA (link) | `View resume` → `SITE_CONFIG.resumeUrl` |
| Tertiary CTA (button → `#contact`) | `Get in touch` |
| Proof row links | `GitHub` · `LinkedIn` · `Contact` (unchanged URLs; sentence case labels) |

#### Avatar card (`ui/src/packages/common/avatar/AvatarCard.tsx`)

| Element | Copy |
|---------|------|
| Name | `Kyle Ruddy` |
| Subtitle (align with hero) | `Senior Software Engineer` |
| Pills | `Frontend-focused Fullstack` · `Systems` · `AI Tooling` |

#### States

- **Default:** Framer Motion fade/slide on hero (`duration: 0.5`) and avatar (`0.55`, `delay: 0.1`).
- **Reduced motion:** See Motion section — instant opacity or no transform.

#### Home acceptance (section-level)

- Hero primary button sets hash to `work` and label reads “Explore impact themes”.
- Avatar subtitle matches hero seniority string (not “Software Engineer” alone).
- No new employers, repos, or metrics in hero without `[confirm with Kyle]` approval.

---

### Impact tab — formerly Work (`ui/src/packages/work/`)

Rename section mentally and in UI copy from “projects / what I do” to **impact themes**. Keep package `@portfolio/work` and file names unless FE chooses a rename in a follow-up PR (not required for v1).

#### Section header

| Element | Copy |
|---------|------|
| Eyebrow | `Impact` |
| H2 | `How I create leverage` |
| Intro (optional, below H2) | `Themes from real work—patterns and judgment, not employer case studies. Evidence links appear only when they're safe to share.` |

#### Impact themes (replace flat `projects` cards)

Data shape (extends `projectData.ts`; FE implements as `impactThemes` array):

| Theme key | Title | Description | Scope bullets (static, honest) |
|-----------|-------|-------------|----------------------------------|
| `systems-platform` | Systems & Platform Work | I build reliable internal tools, backend systems, and product foundations that help teams move faster. | Platform and service boundaries · Operational reliability · Developer experience for internal users |
| `ai-enhanced` | AI-Enhanced Development | I use modern AI tooling thoughtfully to prototype faster, automate repetitive work, and sharpen engineering output. | Workflow automation · Prototyping and iteration speed · Guardrails for quality and maintainability |
| `product-minded` | Product-Minded Engineering | I care about maintainability, user experience, and shipping practical solutions—not just writing code. | Tradeoffs and scope · UX for internal and external users · Sustainable delivery |

**Evidence row (per theme, optional):** Zero or more links `{ label, href, external?: boolean }`. **Default v1:** empty arrays for all themes (no placeholder URLs). When Kyle approves artifacts, FE adds rows only from approved list in [ux-to-frontend.md](ux-to-frontend.md) appendix.

**Card UI:** Keep `projectCardClass` visual treatment; add eyebrow `Theme` or theme key slug; bullets as `ul` with `text-muted` `leading-7`; evidence as text links `text-sky-300/90 hover:text-foreground` with external `rel="noreferrer"` + `target="_blank"`.

#### Optional “Now” subsection

Placed **above** the theme grid on Impact tab.

| Element | Copy |
|---------|------|
| Eyebrow | `Now` |
| H3 | `Current focus` |
| Body (default until Kyle confirms) | `Building and improving systems where clarity, team leverage, and thoughtful tooling matter. [confirm with Kyle: one-line current focus without employer name if desired]` |

- If Kyle supplies a line, replace bracketed sentence only—no employer names unless explicitly approved in SOUL gap list.
- Visual: single `Panel` or bordered block consistent with theme cards; no motion stagger required.

#### Layout

- Header block `space-y-2`, then Now block `mb-8`, then `grid gap-4 md:grid-cols-3` for themes.
- Staggered card entrance: keep `delay: 0.1 * index` unless reduced motion.

#### Impact tab acceptance (section-level)

- Nav shows “Impact”; hash `#work` still loads this tab.
- No card titles implying fictional products, clients, or employers.
- Theme copy matches table above (allow minor punctuation normalization).
- Evidence links render only when present in data—no “Coming soon” placeholders.

---

### Contact (`ui/src/packages/contact/`)

#### Layout

- Unchanged: `lg:grid-cols-[0.9fr_1.1fr]` — `ContactContent` + `ContactForm` in `Panel`.

#### Content blocks

| Element | Copy |
|---------|------|
| Eyebrow | `Contact` |
| H2 | `Let's build something useful.` |
| Body | `I'm interested in thoughtful engineering roles, interesting systems problems, and opportunities to create leverage through better tools and better software.` |
| Backend note | `Messages go through a small Node service for validation, spam protection, and delivery—no marketing list.` |

#### Form (unchanged fields)

- Labels: Name, Email, Message.
- Placeholders: `Your name` · `you@example.com` · `Tell me a bit about what you're working on...`
- Submit: `Send message` / loading `Sending...`
- Success: `Thanks — your message was sent.`

#### Contact acceptance (section-level)

- `POST` body shape unchanged (`name`, `email`, `message`, `company` honeypot).
- No new required fields.

---

### Global (`ui/src/packages/common/`, `layout/`, `app/`)

#### Navbar

- Brand: `Kyle Ruddy` (text).
- Tabs: Home · **Impact** · Contact.
- Resume CTA: `View resume` (desktop), same `SITE_CONFIG.resumeUrl`.
- Mobile menu: keep cycle behavior; order home → work → contact.

#### `SITE_CONFIG` (`constants.ts`)

- `role`: `Senior Software Engineer` (used in meta/copy helpers if added).
- URLs unchanged.

#### Focus order (per tab)

1. Navbar brand → nav items → resume link (md+).
2. Main content: headings → primary actions → secondary links → form fields (contact).
3. Skip link: out of scope v1.

---

## Design tokens

Map to `ui/tailwind.config.js`, `ui/src/packages/layout/globals.css`, and shared layout classes.

| Token / class | Value / source | Usage |
|---------------|----------------|-------|
| `background` | `#020617` | Page shell (`App`), navbar fallback |
| `foreground` | `#e2e8f0` | Headings, primary text |
| `muted` | `#94a3b8` | Body secondary, eyebrows |
| `bg-hero` | radial + linear gradient in config | `body` background |
| `panelClass` | `rounded-3xl border border-white/10 bg-slate-900/70 shadow-panel backdrop-blur` | `Panel`, cards |
| `pillClass` | `rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-slate-300` | Hero pill, avatar tags |
| `shadow-panel` | `0 30px 70px rgba(2, 6, 23, 0.38)` | Cards, panels |
| `shadow-glow` | `0 18px 45px rgba(124, 58, 237, 0.24)` | Primary buttons, avatar ring |
| Accent gradient | `from-sky-300 to-violet-400` | Primary CTAs, avatar border |
| Primary button text | `text-slate-950` on gradient | Hero + submit |
| Secondary surface | `border-white/10 bg-white/5` | Secondary buttons, cards hover |
| Border focus (forms) | `focus:border-sky-300/40 focus:ring-sky-300/20` | `fieldClass` |
| Error | `text-rose-300`, `border-rose-300/60` | Field errors |
| Eyebrow | `text-sm uppercase tracking-[0.2em] text-muted` | Section labels |
| Section container | `sectionWrapClass` | Main max-width `max-w-6xl`, horizontal padding |

**Typography**

- Family: Inter stack from `globals.css` (`ui-sans-serif` system fallbacks).
- H1 hero: `text-5xl sm:text-6xl lg:text-7xl font-semibold leading-none tracking-tight`.
- Section H2: `text-2xl sm:text-3xl font-semibold tracking-tight`.
- Body: `text-lg sm:text-xl leading-8` (hero); `leading-7` (cards, contact).
- No new font files in v1.

---

## Motion

**Principles:** Text-forward; motion supports orientation, not decoration. Senior references favor restraint.

| Surface | Default | Max duration | Reduced motion (`prefers-reduced-motion: reduce`) |
|---------|---------|--------------|--------------------------------------------------|
| Hero block | opacity + `y: 24 → 0` | 500ms | opacity only or `initial={false}` |
| Avatar card | opacity + scale `0.96 → 1` | 550ms | opacity only |
| Impact theme cards | opacity + `y: 16`, stagger `0.1 * index` | 400ms per card | no stagger; single fade or static |
| Navbar underline | `layoutId` spring | spring default | instant state change, no spring |
| Hash tab scroll | `behavior: "smooth"` | — | `behavior: "auto"` in `useHashTab` / hash listener |

**Implementation:** Shared hook or utility `useReducedMotion()` in `@portfolio/common` (FE handoff). Framer `transition` overrides when reduced.

**Out of scope:** Page transitions between tabs; parallax; Lottie.

---

## Accessibility

- **Contrast:** Body `foreground` on `background` / `hero` — target WCAG AA for normal text; gradient buttons use `text-slate-950` on light gradient for CTA text.
- **Focus:** Visible focus rings on interactive elements — extend `focus-visible:ring-2 focus-visible:ring-sky-300/30` on nav buttons and theme evidence links where missing.
- **Forms:** Labels associated via `htmlFor` / `id`; `aria-invalid` on errored fields (existing).
- **Motion:** Honor `prefers-reduced-motion` (see Motion).
- **Images:** Avatar `alt="Kyle Ruddy"` (update from “Kyle avatar” for clarity).
- **Links:** External evidence links include visible label text; icon-only links not used in v1.

---

## Acceptance criteria

### IA & navigation

- [ ] Navbar third item label is **Impact**; clicking sets `location.hash` to `work`.
- [ ] Direct visit to `#work` renders Impact tab content.
- [ ] Mobile menu still cycles home → work → contact.

### Home

- [ ] Hero primary CTA copy is **Explore impact themes** and navigates to `#work`.
- [ ] Avatar subtitle is **Senior Software Engineer**.
- [ ] Hero body and pills match spec copy (minor punctuation OK).
- [ ] Resume and external links use `SITE_CONFIG` URLs.

### Impact tab

- [ ] Section eyebrow **Impact** and H2 **How I create leverage** visible.
- [ ] Three theme cards with titles and descriptions per spec table; each shows scope bullet list.
- [ ] **Now** subsection present with eyebrow **Now** and H3 **Current focus**.
- [ ] No fictional project names, employers, or metrics on the tab.
- [ ] Evidence links hidden when array empty; when populated, open in new tab with `rel="noreferrer"`.

### Contact

- [ ] Copy matches spec; form submits successfully against existing endpoint.
- [ ] Honeypot `company` field remains hidden.

### Motion & a11y

- [ ] With `prefers-reduced-motion: reduce`, theme stagger disabled and hash scroll not smooth.
- [ ] Tab nav and form remain keyboard operable with visible focus.

### Analytics (optional v1 — see BE handoff)

- [ ] Tab changes emit `tab_view` with `tab` field.
- [ ] Hero/impact/resume CTAs emit `cta_click` with `meta.cta` keys defined in ux-to-backend.md.
- [ ] Analytics failures do not block navigation or form submit.

---

## Out of scope

- Light mode / theme toggle.
- New tabs (About, Blog, etc.).
- Employer timeline, client logos, or invented OSS projects.
- Contact API field changes or new endpoints beyond analytics client wiring.
- CMS or MDX case studies.
- SEO/meta tag overhaul (unless FE adds minimal `document.title` per tab later).

---

## Open items — `[confirm with Kyle]`

Does not block READY for FE theming/copy in spec; evidence and Now line are optional enrichments.

| Item | UX default until confirmed |
|------|----------------------------|
| Title band Staff vs Senior | **Senior Software Engineer** everywhere |
| Per-theme evidence URLs | Empty — add only when approved |
| Now body one-liner | Bracketed placeholder in spec |
| Employer-safe specialty in hero | Not added in v1 |

---

## Approval

- [x] UX spec complete — version **2026-06-02**, status **READY**
- [x] Positioning/copy aligned to SOUL + existing codebase (no fiction)
- [ ] User sign-off on `[confirm with Kyle]` evidence and Now line — **pending**; FE may ship with empty evidence and placeholder Now copy flagged in UI as plain text (no “lorem”)

**Approved for implementation:** 2026-06-02 (UX agent — orchestrator/FE gate)
