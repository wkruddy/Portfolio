---
name: portfolio-orchestrator
description: >-
  Coordinates the Portfolio multi-agent pipeline (research → UX spec → parallel
  FE/BE → polish). Sequences handoffs, merges artifacts, and escalates to the
  user. Use when planning portfolio work across agents, running the full
  pipeline, or when the user mentions portfolio-orchestrator or agent workflow.
disable-model-invocation: true
---

# Portfolio Orchestrator

Coordinate portfolio work without implementing UI or server code yourself unless the user explicitly asks you to fill a gap.

## Repo map

| Lane | Path | Skill |
|------|------|-------|
| Research | `docs/handoffs/`, `docs/research/` | `portfolio-research` |
| UX | `docs/handoffs/ux-spec.md` | `portfolio-ux` |
| Frontend | `ui/src/` | `portfolio-frontend` |
| Backend | `server/src/` | `portfolio-backend` |

Human guide: [docs/agent-orchestration.md](../../docs/agent-orchestration.md)

**Baseline context:** [SOUL.md](../../SOUL.md) for all agents. Research uses [docs/research/learnings.md](../../docs/research/learnings.md) (append after each research run).

## Pipeline (default order)

```
Research (Design Brief)
    → UX (signed-off spec + handoffs)
    → FE ∥ BE (parallel, same UX version)
    → Polish (orchestrator or FE+UX: a11y, copy, motion QA)
```

### Phase gates

| Phase | Exit criterion | User checkpoint? |
|-------|----------------|------------------|
| Research | `research-to-ux.md` filled; `learnings.md` run log appended | Optional: trends/positioning |
| UX | `docs/handoffs/ux-spec.md` + `ux-to-frontend.md` + `ux-to-backend.md` | **Required** before FE/BE code |
| Implementation | FE/BE match spec; no cross-lane edits | Ask if API contract changes |
| Polish | Acceptance criteria in ux-spec met | Optional: final ship |

**Ask the user** when: positioning conflicts with their voice, new public API shape, removing real work from the portfolio, or scope exceeds one session.

**Do not ask** for: routine file discovery, following existing patterns in `ui/src` / `server/src`, or filling handoff templates.

## Handoff templates

| From → To | File |
|-----------|------|
| Research → UX | `docs/handoffs/research-to-ux.md` |
| UX (master) | `docs/handoffs/ux-spec.md` |
| UX → FE | `docs/handoffs/ux-to-frontend.md` |
| UX → BE | `docs/handoffs/ux-to-backend.md` |

Copy templates from repo; do not invent parallel doc locations.

## Invocation patterns

Tell the user (or parent agent) to run skills explicitly:

- `"Use portfolio-research skill: [question]"`
- `"Use portfolio-ux skill: turn research into UX spec"`
- `"Use portfolio-frontend skill: implement ux-to-frontend"`
- `"Use portfolio-backend skill: implement ux-to-backend"`

For Cursor **Task** subagents: one task per lane with the skill name in the prompt and the relevant handoff file path attached.

## Orchestrator checklist

```
- [ ] Goal stated in one sentence (what changes for visitors)
- [ ] Research brief exists OR user waived research
- [ ] If research ran: `docs/research/learnings.md` updated (improvement loop)
- [ ] UX spec + FE/BE handoffs exist
- [ ] User approved UX (if net-new visual/IA)
- [ ] FE and BE tasks reference same ux-spec version/date
- [ ] No fake projects; Staff++ voice preserved
- [ ] Polish: cross-check acceptance criteria
```

## Merge rules

- **Conflicts**: UX wins on look/copy/IA; BE wins on API/security; FE wins on component structure inside `ui/`.
- **Contract changes**: Update `ux-to-backend.md` and `ux-to-frontend.md` together; notify user.
- **Scope**: Orchestrator does not expand into homepage pixels unless scheduled in the current pipeline run.

## Authenticity constraint

Portfolio content must reflect **real** experience. Do not add fictional employers, repos, or case studies. Research may cite trends; UX/FE express **documented** work and honest Staff++ positioning.
