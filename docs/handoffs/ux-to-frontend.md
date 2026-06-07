# UX → Frontend — 2026-06-02

> Implementation brief for **portfolio-frontend**. **Status:** `READY`

## Spec link

- `ux-spec.md` version: **2026-06-02**

## Scope

Implement IA/copy/motion changes under `ui/src/packages/*` only. Do not edit `server/`. Coordinate with backend for analytics proxy via separate PR if needed ([ux-to-backend.md](ux-to-backend.md)).

| Package | Files / components | Action |
|---------|-------------------|--------|
| `@portfolio/common` | `utils/constants.ts` | Nav label `work` → **Impact**; optional `analyticsEndpoint` |
| `@portfolio/common` | `navigation/Navbar.tsx` | Consumes updated `NAV_ITEMS` |
| `@portfolio/common` | `avatar/AvatarCard.tsx` | Subtitle copy; `alt` text |
| `@portfolio/common` | `utils/useReducedMotion.ts` (new) | `matchMedia('(prefers-reduced-motion: reduce)')` |
| `@portfolio/common` | `utils/trackAnalytics.ts` (new, optional) | Fire-and-forget POST helper |
| `@portfolio/home` | `HeroSection.tsx` | CTA + sentence case link labels |
| `@portfolio/work` | `projectData.ts` | Rename export to `impactThemes` + bullets + `evidence: []` |
| `@portfolio/work` | `ProjectGrid.tsx` | Rename component → `ImpactThemes` (or keep file, export new name); header, bullets, evidence |
| `@portfolio/work` | `NowSection.tsx` (new) | Now block above grid |
| `@portfolio/work` | `Work.tsx` | Compose `NowSection` + grid |
| `@portfolio/work` | `work.styles.ts` | Optional `nowSectionClass` if needed |
| `@portfolio/contact` | `ContactContent.tsx` | Backend note copy tweak |
| `@portfolio/app` | `App.tsx` | Wire `trackTabView` on `activeTab` change (optional) |
| `@portfolio/api-service` | `APIService.ts` | Add `trackAnalyticsEvent` (optional) |
| `@portfolio/common` | `navigation/useHashTab.ts` | `scrollTo` behavior respects reduced motion |

**No changes:** `ContactForm.tsx`, `useContactForm.ts`, `types.ts` field shapes, `Panel.tsx`, `App.tsx` grid structure.

## Copy blocks (FINAL — implement verbatim unless Kyle approves edits)

### `constants.ts` — `NAV_ITEMS`

```ts
{ key: "work", label: "Impact" }
```

### `HeroSection.tsx`

- Pill: `Senior Software Engineer · Builder · Systems thinker` (middle dot `·` consistent)
- H1: `Hi, I'm Kyle.`
- Body: unchanged from current hero paragraph in ux-spec
- Primary button: `Explore impact themes`
- Secondary link: `View resume`
- Tertiary button: `Get in touch`
- Proof row: `GitHub`, `LinkedIn`, `Contact`

### `AvatarCard.tsx`

- Subtitle: `Senior Software Engineer`
- `alt`: `Kyle Ruddy`

### `ContactContent.tsx`

- Backend note: `Messages go through a small Node service for validation, spam protection, and delivery—no marketing list.`

### `NowSection.tsx`

- Eyebrow: `Now`
- H3: `Current focus`
- Body: `Building and improving systems where clarity, team leverage, and thoughtful tooling matter.`  
  _(Replace when Kyle confirms; do not add employer names without approval.)_

### `ProjectGrid` / Impact header

- Eyebrow: `Impact`
- H2: `How I create leverage`
- Intro paragraph (below H2): `Themes from real work—patterns and judgment, not employer case studies. Evidence links appear only when they're safe to share.`

### Theme cards — `impactThemes` data

```ts
export type ImpactEvidence = { label: string; href: string };

export type ImpactTheme = {
  key: string;
  title: string;
  description: string;
  scope: string[];
  evidence: ImpactEvidence[];
};

export const impactThemes: ImpactTheme[] = [
  {
    key: "systems-platform",
    title: "Systems & Platform Work",
    description:
      "I build reliable internal tools, backend systems, and product foundations that help teams move faster.",
    scope: [
      "Platform and service boundaries",
      "Operational reliability",
      "Developer experience for internal users",
    ],
    evidence: [],
  },
  {
    key: "ai-enhanced",
    title: "AI-Enhanced Development",
    description:
      "I use modern AI tooling thoughtfully to prototype faster, automate repetitive work, and sharpen engineering output.",
    scope: [
      "Workflow automation",
      "Prototyping and iteration speed",
      "Guardrails for quality and maintainability",
    ],
    evidence: [],
  },
  {
    key: "product-minded",
    title: "Product-Minded Engineering",
    description:
      "I care about maintainability, user experience, and shipping practical solutions—not just writing code.",
    scope: [
      "Tradeoffs and scope",
      "UX for internal and external users",
      "Sustainable delivery",
    ],
    evidence: [],
  },
];
```

**Deprecation:** Remove or re-export `projects` as alias to `impactThemes` only if needed for a transitional commit; prefer single export.

### Evidence link appendix (populate when Kyle approves — v1 empty)

| Theme key | Label | href |
|-----------|-------|------|
| _(none v1)_ | | |

---

## Layout & responsive

- **Home:** No grid changes.
- **Impact:** Vertical stack: header (`space-y-2`) → Now (`mb-8`) → `grid gap-4 md:grid-cols-3`.
- **Theme card interior:** `space-y-3` — title, description, `ul` with `list-disc pl-5 space-y-1` for scope, optional evidence `flex flex-wrap gap-3` below.
- **Contact:** Unchanged two-column at `lg`.

## Tokens / classes

Reuse existing — do not add new hex to `tailwind.config.js` for v1.

| Usage | Class / export |
|-------|----------------|
| Theme / Now cards | `projectCardClass` or duplicate as `impactCardClass` (same rules) |
| Now panel variant | `Panel` + `p-6` or `projectCardClass` without hover lift |
| Evidence links | `text-sm text-sky-300/90 underline-offset-2 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300/30 rounded` |
| Section eyebrows | `text-sm uppercase tracking-[0.2em] text-muted` |
| Intro | `max-w-2xl text-muted leading-7` |

## Motion

1. Add `useReducedMotion()` in `@portfolio/common`.
2. **HeroSection / AvatarCard / theme cards:** when reduced, set `transition={{ duration: 0 }}` or `initial={false}`; disable theme `delay`.
3. **useHashTab:** `window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' })`.
4. **Navbar** `layoutId` underline: if reduced, render static underline without `motion.span` spring (conditional).

## States & edge cases

- **Empty evidence:** Do not render evidence row DOM (no empty state message).
- **Long Now line:** `max-w-2xl` wrap; no truncation.
- **Analytics POST fails:** Swallow error; no UI toast in v1.
- **Tab deep link:** Initial load `#work` shows Impact content without requiring click.

## API usage (read-only)

| Call | Endpoint | Notes |
|------|----------|-------|
| Contact | `SITE_CONFIG.contactEndpoint` | Unchanged `submitContactForm` |
| Analytics (optional) | `SITE_CONFIG.analyticsEndpoint` → `/contact-api/api/analytics/events` (proxied) | See BE handoff; use same proxy prefix as contact |

Example analytics payload from FE:

```ts
trackAnalyticsEvent({
  type: "tab_view",
  path: "/",
  tab: "work",
});
```

```ts
trackAnalyticsEvent({
  type: "cta_click",
  path: "/",
  tab: "home",
  meta: { cta: "hero_impact_themes" },
});
```

**`meta.cta` keys:** `hero_impact_themes` | `hero_resume` | `hero_contact` | `proof_github` | `proof_linkedin` | `proof_contact` | `nav_resume` | `nav_tab_home` | `nav_tab_work` | `nav_tab_contact`

## Acceptance criteria (from ux-spec)

- [ ] Nav label **Impact**; `#work` routing works
- [ ] Hero CTA **Explore impact themes**; avatar **Senior Software Engineer**
- [ ] Impact header + Now + three themes with scope bullets
- [ ] No fake projects/employers/metrics
- [ ] Contact copy + form unchanged functionally
- [ ] Reduced motion: no stagger, non-smooth hash scroll
- [ ] (Optional) Analytics events per ux-to-backend.md

## FE notes / blockers

- **Proxy:** `vite.config.ts` only proxies `/contact-api` today. BE handoff adds `/contact-api/api/analytics` under same mount — FE should use `/contact-api/api/analytics/events` unless BE documents a different public path.
- **Package export:** Update `work/index.ts` if component rename affects public exports.
- **Tests:** No new test requirement unless user asks; manual check list in ux-spec.
