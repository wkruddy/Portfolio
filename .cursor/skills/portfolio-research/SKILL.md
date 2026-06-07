---
name: portfolio-research
description: >-
  Researches portfolio trends, references, and positioning for a Staff++
  engineer site; persists learnings across runs; outputs a Design Brief for UX.
  Use when exploring competitors, IA patterns, motion/typography trends, or
  filling research-to-ux handoffs.
disable-model-invocation: true
---

# Portfolio Research

Gather external signal and internal constraints so UX can spec confidently. **Do not** write React or Express code.

## Mandatory session start

1. Read [SOUL.md](../../SOUL.md) — identity, voice, hard constraints.
2. Read [docs/research/learnings.md](../../docs/research/learnings.md) — methodology + run log; follow **next-run strategy**.
3. Skim [docs/research/sources.md](../../docs/research/sources.md) — revisit curated URLs before broad search.
4. Read `ui/src/packages/work/projectData.ts` and copy in `home/`, `contact/`, `work/` — know what is **already claimed**.

## Mandatory session end

Append a structured block to **Run log** in `learnings.md`:

```markdown
### Run detail — YYYY-MM-DD

**Queries:** …
**Worked:** …
**Failed:** …
**Next:** …
```

Also add a one-line row to the run-log table. Promote strong URLs to `sources.md` if not already listed.

Update `docs/handoffs/research-to-ux.md` and set **Learnings ref:** to the run date or methodology version from `learnings.md` header.

## Iteration loop

```
Plan queries → Search/browse → Score references → Extract patterns → Update learnings.md → Refine next-run strategy
```

Full loop doc: [docs/research/README.md](../../docs/research/README.md).

## Boundaries

- **In scope**: Trends, references, audience, positioning, content gaps, accessibility/motion norms.
- **Out of scope**: Final visual design, component code, API design.
- **Output home**: `docs/handoffs/research-to-ux.md`.

## Crawling & discovery playbook

### When to use WebSearch vs `sources.md`

| Use | When |
|-----|------|
| **sources.md** first | Default — score known Staff++/principal sites for IA, hero, work proof |
| **WebSearch** | New query angles from learnings “next iteration”; finding candidates to add to sources |
| **Both** | Each full research pass — at least one curated revisit + 1–3 new queries |

### Search strategies

- Combine **level** + **pattern**: e.g. `principal engineer portfolio`, `staff engineer personal site minimal`.
- Add **problem domain** when relevant: `internal platforms`, `systems thinking`, `AI-assisted engineering` (match Kyle’s themes).
- Avoid generic `best portfolio 2025` unless mining a list for 1–2 senior candidates to score and discard the rest.
- Log every query in the run log — even null results teach the next run.

### Evaluation rubric (Staff++ sites)

Score each reference **1–5** on each criterion; average ≥ **3.5** to include in the Design Brief reference board.

| # | Criterion | 5 looks like |
|---|-----------|--------------|
| 1 | **Authenticity** | Real career arc; no inflated or fictional case studies |
| 2 | **Senior signal** | Scope, judgment, platforms, tradeoffs — not tutorial projects |
| 3 | **Scannability** | Clear hierarchy; recruiter can grok in ~30s |
| 4 | **Restraint** | Calm typography/motion; no buzzword soup or “rockstar” tone |
| 5 | **Honest work proof** | Themes, OSS, or approved case studies — fits Kyle’s constraints in SOUL.md |

Note **what to avoid** per site even when scoring high (e.g. employer-heavy timelines Kyle cannot mirror).

## Research method (brief content)

1. **Positioning**: How do strong Staff+/principal portfolios signal scope and judgment without hype?
2. **References**: 3–6 scored sites (diverse: minimal, narrative, product-led). IA, hero pattern, work proof style.
3. **Trends** (actionable only): typography, density, dark/light, motion level, contact friction.
4. **Gaps**: What this repo under-communicates vs documented strengths; flag `[confirm with Kyle]`.
5. **Risks**: Fake case studies, buzzword soup, mobile nav debt — flag for UX.

Prefer primary observation (open URLs) over generic listicles.

## Design Brief format

Fill `docs/handoffs/research-to-ux.md`:

```markdown
# Design Brief — [date]

**Learnings ref:** [methodology version / last run-log date from learnings.md]

## Goal
…

## Audience
…

## Positioning (Staff++)
…

## Reference board
| Site | Score (avg) | What works | What to avoid | URL |
|------|-------------|------------|---------------|-----|

## IA & content signals
…

## Visual / motion trends (optional)
…

## Open questions for UX
- [ ] …

## Sources
- …
```

## Collaboration with UX

- Hand off **tensions**, not layouts: e.g. “editorial long-form vs scan-friendly cards.”
- Mark **must-keep** facts from codebase vs **hypothesis** vs **[confirm with Kyle]**.
- UX owns acceptance criteria; research does not sign off on implementation.

## Anti-patterns

- Skipping `learnings.md` append (breaks the improvement loop).
- Recommending fictional projects or inflated titles.
- Copying competitor copy verbatim.
- Specifying hex colors or component APIs (defer to UX → FE).
- One-off web search with no logged queries or sources update.

## Done when

- Template sections filled or explicitly N/A.
- Run log appended in `learnings.md`.
- Brief cites learnings ref.
- UX can draft `ux-spec.md` without another research pass unless user adds new goals.
