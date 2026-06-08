# SOUL — Kyle Ruddy portfolio context

Baseline identity and constraints for **all** portfolio agents. Read at session start; do not contradict without explicit user approval.

## Who Kyle is

**Kyle Ruddy** — software engineer positioning as senior IC targeting staff-level roles (site copy: “Senior Software Engineer” everywhere; staff-level targeting in hero subhead and Now, not in title). Tags: **Frontend-focused Fullstack**, **Systems**, **AI Tooling**.

**Public presence (from repo):**

| Channel | URL / path |
|---------|------------|
| GitHub | https://github.com/wkruddy |
| LinkedIn | https://linkedin.com/in/kyleruddy |
| Resume | `/resume.pdf` (linked from hero) |

**Stated interests (hero + work themes):** product engineering, internal platforms, AI-assisted workflows, systems that improve team effectiveness; reliable internal tools and product foundations; thoughtful use of AI for prototyping and automation; maintainability, UX, and practical shipping.

**Work section** (`projectData.ts`) — three **thematic** Impact cards, not employer case studies:

| Theme | Proof |
|-------|-------|
| Systems & Platform Work | Resume link; Atlassian named once in scope; six-figure annual infrastructure savings (endpoint licensing/capacity) |
| AI-Enhanced Development | [Portfolio](https://github.com/wkruddy/Portfolio), [MealPrepper](https://github.com/wkruddy/MealPrepper) as open experiments |
| Product-Minded Engineering | Portfolio (source); MealPrepper as real-problem experiment |

**Confirmed positioning (2026-06-08):**

- **Title band:** Senior Software Engineer everywhere (pill, avatar, `SITE_CONFIG.role`).
- **Staff targeting:** Hero subhead + Now + Contact—not in job title.
- **Remote:** East Coast–based, remote-first; open to fully remote staff IC roles (Now + Contact).
- **Employers:** Atlassian may be named once in Systems theme scope; no logos or screenshots.
- **Metrics:** Six-figure annual infrastructure savings (endpoint licensing/capacity optimization)—Impact scope only, phrased without hype; do not name vendors.
- **Evidence:** Resume PDF, Portfolio repo, MealPrepper repo—no invented case studies.
- **Resume:** PDF content may be quoted in Impact `scope[]` with source discipline.
- **Depth artifact:** Resume primary; GitHub repos labeled as experiments where appropriate.

## Voice & tone (Staff++)

- **Calm, specific, understated** — judgment and scope without hype.
- **Builder + systems thinker** — clarity, speed, real-world usefulness (hero language).
- **Show**: tradeoffs, platform thinking, leverage, product-minded engineering.
- **Avoid**: “rockstar,” buzzword stacks, fake metrics, sales CTAs, invented case studies.
- **Contact tone**: “Let’s build something useful” — interested in thoughtful roles, systems problems, better tools (see `ContactContent.tsx`).

Align new copy with existing hero/contact; UX owns final strings after user approval.

## Hard constraints

1. **No fiction** — Do not add employers, clients, repos, awards, or project narratives that are not documented in repo, resume, or explicit user input.
2. **Company work** — Assume most employer work is **not** showcaseable as named case studies unless Kyle approves. Prefer themes, patterns, and OSS/side work over confidential detail.
3. **No metric invention** — Do not add “10x,” team sizes, revenue, or uptime claims without a source.
4. **Lane integrity** — Research/UX do not ship React or Express; FE does not change `server/` without handoffs; BE does not change `ui/` without handoffs.
5. **Gates** — Net-new visual/IA in `ui/` requires approved `docs/handoffs/ux-spec.md` (+ lane handoffs). API changes require aligned `ux-to-backend.md`.

## What the site must accomplish

For visitors (recruiters, hiring managers, peers) in **under ~30 seconds**:

1. **Identity** — Who Kyle is and what kind of problems he cares about.
2. **Credibility** — Senior engineering judgment via honest themes and links (GitHub, LinkedIn, resume), not volume of fake projects.
3. **Low-friction next step** — Work tab for scope signal; contact form for inbound; external links for depth.

**IA today:** hash tabs — Home, Work, Contact (`constants.ts` / `useHashTab`). Keep nav labels and deep links consistent when changing structure.

**Contact surface:** Form posts to `SITE_CONFIG.contactEndpoint` (`/contact-api/api/contact`); copy mentions validation, spam mitigation, analytics, and email via the Node backend — agents should not promise features the server does not implement.

**Stack (for accurate docs, not marketing):** React + Vite + Tailwind in `ui/`; Express API in `server/`. Portfolio is a real shipped site, not a tutorial template.

## What agents should never do

- Invent or embellish work history, employers, or OSS contributions.
- Copy competitor portfolio text verbatim.
- Specify hex colors, component APIs, or API shapes in research (defer to UX → FE/BE handoffs).
- Implement homepage or work UI changes without UX spec + user approval on positioning/copy.
- Commit secrets (`.env`, API keys) or log raw contact message bodies.
- Skip authenticity checks because a reference site uses hype or fake case studies.

## Pipeline & docs

| Artifact | Purpose |
|----------|---------|
| [SOUL.md](SOUL.md) | This file — identity + constraints |
| [docs/research/](docs/research/) | Research iteration loop + persisted learnings |
| [docs/handoffs/research-to-ux.md](docs/handoffs/research-to-ux.md) | Design Brief → UX |
| [docs/handoffs/ux-spec.md](docs/handoffs/ux-spec.md) | Signed-off UX (gate for FE/BE) |
| [docs/agent-orchestration.md](docs/agent-orchestration.md) | Full pipeline diagram |
| [AGENTS.md](AGENTS.md) | Skill index |

**Skills:** `portfolio-orchestrator`, `portfolio-research`, `portfolio-ux`, `portfolio-frontend`, `portfolio-backend` in `.cursor/skills/`.

**Rule:** [.cursor/rules/portfolio-agents.mdc](.cursor/rules/portfolio-agents.mdc) when editing `ui/`, `server/`, or `docs/`.
