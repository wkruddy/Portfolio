---
name: portfolio-frontend
description: >-
  Implements portfolio UI in ui/ only (React, Vite, Tailwind). Follows
  ux-to-frontend handoffs and repo package conventions. Use for components,
  styles, and client API calls — not server/ changes unless coordinated.
disable-model-invocation: true
---

# Portfolio Frontend

Implement and refine UI per approved UX handoffs. **Lane: `ui/` only.**

Respect constraints in [SOUL.md](../../SOUL.md) (no fictional work, Staff++ tone, company-work limits).

## Boundaries

| Do | Don't |
|----|-------|
| Edit `ui/src/**`, `ui/vite.config.ts`, `ui/tailwind.config.js`, `ui/index.html` | Change `server/src/**` without orchestrator + BE |
| Read `docs/handoffs/ux-to-frontend.md`, `ux-spec.md` | Invent IA/copy beyond spec |
| Use `@portfolio/*` package imports | Add fictional projects to `projectData.ts` |

Coordinate with **portfolio-backend** if `SITE_CONFIG.contactEndpoint`, request shape, or analytics client behavior changes.

## Discover conventions (read first)

```
ui/src/
  index.tsx
  packages/
    app/          # App shell, tab routing
    home/         # Hero, home sections
    work/         # ProjectGrid, projectData
    contact/      # Form, hooks, styles
    common/       # Navbar, Avatar, constants (SITE_CONFIG)
    api-service/  # submitContactForm, errors
    layout/       # globals.css, sectionWrapClass
```

- **Stack**: React, TypeScript, Vite, Tailwind, PostCSS (`ui/postcss.config.js`).
- **Routing**: Hash tabs via `useHashTab` in `common/navigation/` — not React Router pages.
- **Styling**: Tailwind utilities + co-located `*.styles.ts` in packages.
- **API**: `ui/src/packages/api-service/APIService.ts` → `SITE_CONFIG.contactEndpoint` from `@portfolio/common`.

Run from `ui/`: `yarn` / `yarn dev` (check `ui/package.json` scripts).

## Workflow

1. Confirm `ux-to-frontend.md` status is READY and matches `ux-spec.md` version.
2. List files to touch; keep diff minimal.
3. Implement sections in order of dependency (layout → home → work → contact).
4. Verify: responsive breakpoints, focus states, `prefers-reduced-motion`, form errors from API payload shape.
5. Do not “polish” copy beyond spec without UX skill or user approval.

## UX handoff expectations

`ux-to-frontend.md` should name:

- Target packages and components
- Copy (final or clearly marked draft)
- Token/class mapping to existing Tailwind theme
- Acceptance criteria copied or linked from `ux-spec.md`

## API client patterns

Contact submit uses `submitContactForm` and `ContactRequestError` with `fieldErrors`. Match server validation field names in `server/src/utils/validation.ts` when debugging — **do not** change server files; file a BE handoff note.

## Quality bar

- Accessible labels, keyboard nav, visible focus
- No layout shift on tab switch
- Staff++ tone preserved in any copy edits (stay in spec)

## When to stop and escalate

- Spec missing for the surface you’re building → request UX skill.
- Need new endpoint or env var → request BE skill + update handoffs.
- User wants visual direction change mid-build → pause; UX re-confirms.
