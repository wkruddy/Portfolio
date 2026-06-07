# UX → Backend — 2026-06-02

> Implementation brief for **portfolio-backend**. **Status:** `READY`

## Spec link

- `ux-spec.md` version: **2026-06-02**

## Scope

Support **optional** client-side analytics for tab and CTA interactions. **No breaking changes** to contact API validation, response shapes, or rate limits. Server-side request logging may continue to record path-level `page_view` events — do not duplicate noisy per-asset logging.

| Area | Action |
|------|--------|
| `server/src/utils/validation.ts` | Document allowed `meta.cta` values (optional stricter enum — only if BE wants tighter validation) |
| `server/src/routes/analytics.ts` | No route change required if schema accepts payloads |
| `server/src/routes/contact.ts` | **No changes** |
| `server/src/server.ts` | Confirm analytics mount path for FE proxy |
| `ui/vite.config.ts` | _(FE)_ — BE documents expected public URL only |

**N/A:** Email templates, Resend content, contact field renames, new env vars for v1.

## Endpoints

| Method | Path (server) | Public path (via Vite proxy) | Purpose |
|--------|---------------|------------------------------|---------|
| POST | `/api/analytics/events` | `/contact-api/api/analytics/events` | Client tab/CTA events |
| POST | `/api/contact` | `/contact-api/api/contact` | Unchanged |
| GET | `/api/analytics/summary` | `/contact-api/api/analytics/summary` | Dev/ops only — not called from UI v1 |

Mount reference (`server/src/server.ts`): `app.use("/api/analytics", analyticsRouter)`.

## Request / response

### POST `/api/analytics/events`

**Request** (JSON) — must pass existing `analyticsEventSchema`:

```json
{
  "type": "tab_view",
  "path": "/",
  "tab": "work",
  "timestamp": "2026-06-02T12:00:00.000Z"
}
```

```json
{
  "type": "cta_click",
  "path": "/",
  "tab": "home",
  "meta": {
    "cta": "hero_impact_themes"
  }
}
```

```json
{
  "type": "page_view",
  "path": "/",
  "tab": "home"
}
```

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `type` | `"page_view" \| "tab_view" \| "cta_click"` | yes | |
| `path` | string 1–255 | yes | Use `"/"` for SPA |
| `tab` | `"home" \| "work" \| "contact"` | optional | **Required** for `tab_view`; recommended for `cta_click` |
| `meta` | `Record<string, string>` | optional | `cta` key for clicks — see allowed values |
| `timestamp` | ISO string | optional | Client time; server still sets `createdAt` |

**Response:** `202 { "ok": true }` on success; `400 { "ok": false, "error": "Invalid analytics payload." }` on validation failure.

### Contact — unchanged

```json
{
  "name": "string",
  "email": "string",
  "message": "string",
  "company": ""
}
```

Response patterns unchanged (`fieldErrors`, rate limit, etc.).

## Validation & errors

- **Contact:** Keep `contactSchema` field names and messages — FE depends on exact keys (`name`, `email`, `message`, `company`).
- **Analytics:** Current Zod schema is sufficient. Optional enhancement (non-breaking): add `meta.cta` enum refinement **only** if all FE keys are deployed together:

  `hero_impact_themes`, `hero_resume`, `hero_contact`, `proof_github`, `proof_linkedin`, `proof_contact`, `nav_resume`, `nav_tab_home`, `nav_tab_work`, `nav_tab_contact`

- Reject unknown `type` or `tab` with existing 400 body — do not change error string (FE ignores body on analytics).

## Side effects

### Email (`server/src/services/resend.ts`)

- **No changes** for v1.

### Analytics (`server/src/routes/analytics.ts`, `analyticsStore.ts`)

- `recordEvent` persists `type`, `path`, `tab`, `ip`, `userAgent`, `createdAt` — extend stored document with `meta` if not already persisted (today spread `...parsed.data` in route — verify `meta` lands in JSON file).
- **Do not** log contact message bodies or PII from analytics `meta` beyond `cta` keys.
- **requestLogger** auto `page_view` on API paths: acceptable; avoid double-counting strategy in ops notes only (not a code requirement for v1).

### Tab rename (Impact)

- Analytics `tab` enum stays `work` for hash key — **do not** rename to `impact` in schema without FE + BE coordinated migration. Nav label change is UI-only.

## Security & limits

- **Rate limit:** Existing middleware applies to analytics POST — ensure limits allow bursty tab navigation (if too strict, BE may exempt `POST /api/analytics/events` with separate generous cap — document in PR if changed).
- **PII / logging:** No raw email/name in analytics events; `requestLogger` console lines remain method/path/status only.
- **CORS:** Same origin via Vite proxy in dev; production assumes UI and API same-site or proxied.

## Env vars

- No new variables for v1.
- Existing Resend/analytics storage paths unchanged.

## Acceptance criteria

- [ ] `POST /api/analytics/events` accepts `tab_view` with `tab: "work"` after UI Impact rename
- [ ] `POST /api/analytics/events` accepts `cta_click` with `meta.cta` keys listed above
- [ ] Invalid payload still returns `400` with `Invalid analytics payload.`
- [ ] Contact `POST /api/contact` behavior and validation unchanged (regression smoke test)
- [ ] `meta` object stored in analytics JSON when provided (verify one manual POST)
- [ ] No new secrets committed; contact messages not written to analytics file

## BE notes / blockers

- **FE proxy:** Confirm production deployment maps `/contact-api` → Express like dev; analytics path is `/contact-api/api/analytics/events`.
- **Optional:** If `recordEvent` type omits `meta`, widen `AnalyticsEvent` interface in `analyticsStore.ts` — non-breaking additive field.
- **Breaking change forbidden:** Renaming `tab` enum value `work` → `impact` without version bump and FE hash migration.
