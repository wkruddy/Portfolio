---
name: portfolio-backend
description: >-
  Implements portfolio API server in server/ only (Express, contact, analytics,
  rate limits). Follows ux-to-backend handoffs. Use for routes, middleware,
  validation, email — not ui/ changes unless coordinated.
disable-model-invocation: true
---

# Portfolio Backend

Implement and harden APIs per approved UX/backend handoffs. **Lane: `server/` only.**

Respect constraints in [SOUL.md](../../SOUL.md) (privacy, authenticity; no scope beyond handoffs).

## Boundaries

| Do | Don't |
|----|-------|
| Edit `server/src/**`, `server/package.json`, `server/.env.example` | Change `ui/src/**` without orchestrator + FE |
| Follow `docs/handoffs/ux-to-backend.md` | Expose secrets or commit `.env` |
| Match validation errors to FE field names | Add analytics PII beyond spec |

Coordinate with **portfolio-frontend** when response shape, status codes, or CORS origins change.

## Discover conventions (read first)

```
server/src/
  server.ts              # Express app, CORS, base paths
  routes/
    contact.ts           # Contact POST
    analytics.ts         # Analytics events
  middleware/
    rateLimit.ts
    requestLogger.ts
  services/
    resend.ts            # Email delivery
    analyticsStore.ts
  utils/
    env.ts
    validation.ts
    clientIp.ts
```

- **Entry**: `server.ts` mounts `/api` and `/contact-api/api` with shared rate limiter.
- **Health**: `GET /api/health`, `GET /contact-api/api/health`
- **Analytics**: `app.use("/api/analytics", analyticsRouter)`
- **Config**: `server/.env.example` — document new vars there only.

Run from `server/`: install per `server/package.json`; respect `server/.nvmrc`.

## API patterns

### Contact

- Router in `routes/contact.ts`; validation in `utils/validation.ts`.
- Return JSON errors compatible with FE `ContactApiErrorPayload` (`error`, `fieldErrors`).
- Rate limiting via `middleware/rateLimit.ts` on API base paths.

### Analytics

- `routes/analytics.ts` + `services/analyticsStore.ts`.
- Respect privacy: aggregate events; no surprise PII fields.

### Cross-cutting

- `trust proxy` enabled for reverse-proxy deployments.
- JSON body limit `20kb` in `server.ts`.
- CORS from `env.allowedOrigins`.

## Workflow

1. Confirm `ux-to-backend.md` READY (or N/A for FE-only work).
2. Define request/response contract in handoff before coding.
3. Implement route → validation → service → error mapping.
4. Update `.env.example` for new configuration.
5. Note breaking changes in handoff for FE.

## UX handoff expectations

`ux-to-backend.md` should specify:

- Endpoints (method, path under `/api` or contact base)
- Payload fields and validation messages
- Email/analytics side effects
- Security: rate limits, IP handling (`clientIp.ts`)

## Quality bar

- Consistent error shapes for form validation
- Safe logging (no raw message bodies in logs if sensitive)
- Fail closed on misconfiguration (`env.ts`)

## When to stop and escalate

- Visual or copy change only → UX/FE.
- New public contract without handoff → orchestrator + user.
- Need Vite proxy change → FE (`ui/vite.config.ts`) with aligned paths.
