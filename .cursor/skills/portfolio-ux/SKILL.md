---
name: portfolio-ux
description: >-
  Defines portfolio information architecture, Staff++ copy tone, design tokens,
  motion, and FE/BE handoffs with acceptance criteria. Use before implementation
  when changing look, feel, structure, or contact flows; confirms design with user.
disable-model-invocation: true
---

# Portfolio UX

Own **what** visitors see and **how** it reads—not implementation. Confirm design with the user before FE/BE build net-new UI.

## Inputs

- [SOUL.md](../../SOUL.md) — read at session start (voice, constraints, site goals)
- `docs/handoffs/research-to-ux.md` (if present)
- Current UI: `ui/src/packages/app/App.tsx` (hash tabs: home / work / contact), `home/`, `work/`, `contact/`, `common/navigation/`
- Styles: `ui/src/packages/layout/globals.css`, `ui/tailwind.config.js`, `*.styles.ts` packages

## Copy tone: Staff++

- **Voice**: Senior IC / staff engineer — clear, specific, calm confidence.
- **Show**: Judgment, scope, tradeoffs, systems thinking, outcomes where true.
- **Avoid**: Sales pitch, “rockstar,” buzzword stacks, fake metrics, invented case studies.
- **Work section**: Describe **real** themes (see `projectData.ts`); extend with honest detail only.

Get **user approval** on hero headline, work framing, and contact CTA before marking spec ready for code.

## Information architecture

Document current or proposed structure:

| Tab | Purpose | Primary CTA |
|-----|---------|-------------|
| home | Identity + proof | → work or contact |
| work | Evidence of scope | detail or external links |
| contact | Low-friction reach | form submit |

Note hash routing (`useHashTab`) — deep links and navbar labels must stay consistent.

## UX spec format (`docs/handoffs/ux-spec.md`)

```markdown
# UX Spec — [version/date]

## Summary
[2–3 sentences]

## User stories
- As a [visitor], I want … so that …

## Page / section specs

### Home (ui/src/packages/home/)
- Layout: [grid, breakpoints]
- Content: [exact or draft copy blocks]
- States: default, reduced-motion

### Work (ui/src/packages/work/)
- …

### Contact (ui/src/packages/contact/)
- …

## Design tokens
| Token | Value | Usage |
|-------|-------|-------|
| (map to Tailwind/theme in tailwind.config.js / globals.css) |

## Typography
- Headings / body / mono — families, scale, line-height

## Motion
- Principles; max duration; prefers-reduced-motion behavior

## Accessibility
- Focus order, contrast targets, form labels/errors

## Acceptance criteria
- [ ] Testable checks FE can verify
- [ ] …

## Out of scope
- …
```

## Lane handoffs

Split implementation-facing detail:

- **FE**: `docs/handoffs/ux-to-frontend.md` — components, files under `ui/src/packages/*`, responsive behavior, assets.
- **BE**: `docs/handoffs/ux-to-backend.md` — only if APIs, validation, analytics, or email copy change (`server/src/routes/`).

Keep both handoffs aligned to the same spec version.

## FE collaboration rules

- Reference **package paths** (`@portfolio/home`, `@portfolio/contact`, etc.) not vague “homepage.”
- Prefer extending existing components over new abstractions.
- Do not edit `server/`; put API needs in `ux-to-backend.md`.

## Exit gate

Spec is **READY** when:

1. Acceptance criteria are complete and testable.
2. User approved positioning/copy for changed surfaces.
3. `ux-to-frontend.md` and `ux-to-backend.md` updated (or marked N/A).

## Anti-patterns

- Handing FE a moodboard without file-level guidance.
- Promising backend behavior without `ux-to-backend.md`.
- Visual implementation in this skill (no JSX/CSS edits except fixing typos in docs).
