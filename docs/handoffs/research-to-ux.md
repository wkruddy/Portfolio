# Design Brief — 2026-06-02

**Learnings ref:** methodology v0.1 / run log 2026-06-02 ([docs/research/learnings.md](../research/learnings.md))

## Goal

Help hiring managers and senior peers quickly understand **who Kyle is**, **what problems he wants**, and **how to reach him** — with Staff++ credibility and zero fabricated proof.

## Audience

- **Primary:** Hiring managers and eng leaders evaluating senior IC / staff-leaning candidates.
- **Secondary:** Peers and collaborators checking GitHub/LinkedIn depth.
- **<30s scan:** Name, level signal, domain interests (platforms, systems, AI-assisted workflows), one credible work theme, clear CTA (work tab, resume, or contact).

## Positioning (Staff++)

**Must-keep (from codebase):**

- Kyle Ruddy — builder with bias toward clarity, speed, real-world usefulness.
- Interests: product engineering, internal platforms, AI-assisted workflows, team leverage.
- Tags: Frontend-focused Fullstack, Systems, AI Tooling.
- Work framed as three **themes** (not employer case studies): Systems & Platform Work; AI-Enhanced Development; Product-Minded Engineering.
- Tone: calm, specific, anti-hype (hero, contact, project cards).

**Hypothesis (research — not yet in copy):**

- Visitors may under-read **staff-level scope** because work section lacks proof anchors (OSS links, talk titles, or approved metrics).
- “Senior Software Engineer” pill + “Software Engineer” on avatar card is slightly inconsistent — UX may align titles once Kyle confirms target level.

**[confirm with Kyle]:**

- Target title band (Senior vs Staff) and geography/remote
- What employer or client work may be named, linked, or summarized
- OSS repos, talks, or metrics safe to surface on Work tab

## Reference board

| Site | Score (avg) | What works | What to avoid | URL |
|------|-------------|------------|---------------|-----|
| Matt Pryor | 4.4 | Principal narrative; platform scale in plain language; OSS with context | Heavy employer timeline Kyle may not replicate | https://mpryor.dev/ |
| Prafull Salunke | 4.0 | Long-form through-line; architectural evolution | Very long scroll; enterprise names throughout | https://www.prafulls.me/portfolio |
| Pranto Das | 3.8 | Outcome blocks; build→scale story | Dense résumé-style sections; metric-heavy | https://www.portfolio.pranto.site/ |

**Current site (baseline):** Tab IA (home / work / contact), dark panel UI, thematic work cards — **fits** restraint criterion; **gap** vs references is depth of proof on Work without breaking authenticity rules.

## IA & content signals

- **Navigation:** Keep hash tabs unless UX tests show scroll-first improves scan; references span both — no forced single-page migration.
- **Hero proof types:** Identity line + 2–3 interest pillars (already strong); consider secondary proof row: resume + GitHub + one “scope” line — **only** with Kyle-approved facts.
- **Work section:** Strengthen **themes → evidence** pattern: per theme, optional bullet of real artifacts (repo link, blog, talk) — never placeholder case studies. Align with SOUL: company work not showcaseable by default.
- **Contact:** Low friction form + honest backend note (already present); keep CTA aligned with “thoughtful engineering roles / systems problems.”

## Visual / motion trends (optional)

- Senior references favor **text-forward**, generous spacing, limited motion — matches current Framer Motion on hero/avatar (subtle). UX should cap motion under `prefers-reduced-motion` when expanding sections.
- Dark slate + sky/violet accent is differentiated; research does not mandate light mode.

## Open questions for UX

- [ ] Single consistent title string (Senior SWE vs Software Engineer vs Staff-target)?
- [ ] Work tab structure: stay 3 thematic cards vs add subsections with external links?
- [ ] Should hero secondary line name **employer-safe** specialties (e.g. internal platforms only) after Kyle confirms?
- [ ] Is resume PDF the primary “depth” artifact, or should GitHub README/project pins be surfaced on Work?

## Sources

- [docs/research/sources.md](../research/sources.md)
- [SOUL.md](../../SOUL.md)
- Curated refs: mpryor.dev, prafulls.me/portfolio, portfolio.pranto.site
- Discovery meta: [sitebuilderreport software engineer portfolios](https://www.sitebuilderreport.com/inspiration/software-engineer-portfolios) (filter only)
