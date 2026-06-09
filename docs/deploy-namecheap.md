# Deploy Portfolio to Namecheap

Guide for Kyle's portfolio: Vite React SPA (`ui/`) + Express API (`server/`) on the same domain.

**Repo layout (no Docker/nginx in repo today):**

| Piece | Path | Notes |
|-------|------|-------|
| Frontend | `ui/` | Vite → `ui/dist/` (static files only) |
| Backend | `server/` | Express 5, TypeScript, Resend email |
| Dev proxy | `ui/vite.config.ts` | `/contact-api` → `localhost:3001` |
| API paths (prod) | `server/src/server.ts` | Dual-mounted: `/api/*` and `/contact-api/api/*` |
| FE endpoints | `ui/src/packages/common/utils/constants.ts` | `/contact-api/api/contact`, `/contact-api/api/analytics/events` |
| Env template | `server/.env.example` | Required secrets listed below |

**Routing:** The SPA uses **hash tabs** (`/#home`, `/#work`, `/#contact`), not React Router paths. Apache/nginx does not need a catch-all rewrite for client routes — only static files and `/contact-api` matter.

---

## Executive summary

| Question | Answer |
|----------|--------|
| **Which Namecheap product?** | **Express needs a long-running Node process.** Namecheap **shared** (Stellar / Stellar Plus) can run Node via cPanel **Setup Node.js App** (Phusion Passenger) — workable for a low-traffic portfolio. **Namecheap VPS** is the better default: full SSH, nginx reverse proxy, PM2, predictable deploys. |
| **cPanel File Manager vs Cyberduck vs FTP vs SSH** | **Static `ui/dist/`:** Cyberduck or FTP/SFTP (fast, repeatable). File Manager is fine for one-offs. **Server code:** SSH + git (VPS) or zip upload + cPanel **Run NPM Install** (shared). **Do not upload `node_modules`** from your Mac — install on the server. |
| **Recommended path** | **If you already pay for Namecheap shared:** static in `public_html` + Node app at **`/contact-api`** (see Path A). **If starting fresh or you want one clean stack:** **Namecheap VPS** + nginx + PM2 (Path B). **If shared Node is painful:** static on Namecheap + API on Railway/Render (Path C). |

---

## 1. Product choice

### Shared hosting (Stellar / Stellar Plus)

- **Pros:** Cheap if you already have it; static files via Apache; Node.js 6.x–24.x via [Setup Node.js App](https://www.namecheap.com/support/knowledgebase/article.aspx/10047/2182/how-to-work-with-nodejs-app/).
- **Cons:** Jailed SSH (request via helpdesk on Stellar; included on Stellar Plus); **one Node app per Application URL**; no custom nginx; Passenger quirks (503s, route prefix, no binding to port 80/443); resource limits (LVE).
- **Verdict:** OK for a personal portfolio with modest contact-form traffic. Not ideal if you want git-push deploys or custom proxy rules.

### VPS (Namecheap VPS or similar)

- **Pros:** Root SSH, nginx, PM2, certbot, git pull deploys, serve static + proxy API on one domain with full control.
- **Cons:** ~$6–10+/mo; you manage OS updates, firewall, SSL.
- **Verdict:** **Recommended** for Express + same-domain `/contact-api` with minimal surprise.

### Domain-only on Namecheap

If hosting is elsewhere, keep DNS at Namecheap and point A/CNAME records to VPS, Vercel, Railway, etc.

---

## 2. Upload workflows compared

| Method | Best for | Notes |
|--------|----------|-------|
| **cPanel File Manager** | First deploy, small fixes | Upload zip → Extract. Slow for frequent UI rebuilds. |
| **Cyberduck / FileZilla (SFTP/FTP)** | Uploading `ui/dist/*` | Use cPanel FTP credentials. Prefer SFTP. Sync `dist/` contents into `public_html/`. |
| **SSH (jailed, shared)** | `git pull`, `npm install`, logs | Enter Node virtualenv from Setup Node.js App dashboard. Limited shell. |
| **SSH (full, VPS)** | Everything | Clone repo, build, PM2, nginx — primary workflow on VPS. |
| **Git on shared** | Server updates without re-zipping | [Namecheap KB: Git on shared servers](https://www.namecheap.com/support/knowledgebase/article.aspx/9586/89/how-to-deal-with-git-on-our-shared-servers/). Clone outside `public_html`; deploy artifacts only. |

**Do not** upload local `node_modules`. Run **Run NPM Install** in cPanel (shared) or `npm ci --omit=dev` over SSH (VPS).

---

## 3. Pre-deploy checklist (local)

### 3.1 Build the UI

```bash
cd ui
npm ci
npm run build
# Output: ui/dist/ (index.html, assets/, plus files from ui/public/)
```

Ensure `ui/public/` assets (`resume.pdf`, `avatar.jpg`, favicons) are present — Vite copies them into `dist/`.

### 3.2 Build the server

The server compiles to JavaScript for production (`npm start` → `node dist/server.js`).

```bash
cd server
npm ci
npm run build
# Output: server/dist/server.js (and mirrored route/middleware modules)
```

`server/tsconfig.json` keeps `"noEmit": true` for editor/typecheck; production emit uses `tsconfig.build.json` (`tsc -p tsconfig.build.json`).

Also copy `server/data/` if you want persisted analytics on disk (optional; file is created at runtime).

### 3.3 Environment variables

Set on the host (never commit `.env`):

| Variable | Required | Example |
|----------|----------|---------|
| `RESEND_API_KEY` | Yes | `re_…` |
| `CONTACT_TO_EMAIL` | Yes | `hello@yourdomain.com` |
| `CONTACT_FROM_EMAIL` | Yes | `Portfolio <noreply@yourdomain.com>` |
| `ALLOWED_ORIGINS` | Yes (prod) | `https://yourdomain.com,https://www.yourdomain.com` |
| `PORT` | VPS only | `3000` (Passenger sets this on shared — leave default) |

---

## 4. Path A — Namecheap shared (cPanel)

Architecture:

```text
Browser
  ├─ GET /, /assets/*, /resume.pdf     → Apache serves public_html (static ui/dist)
  └─ POST /contact-api/api/contact      → Passenger → Express (server/)
```

### Step A1 — Static site in `public_html`

1. cPanel → **File Manager** → `public_html/`
2. Remove or backup old site files.
3. Upload **contents** of `ui/dist/` (not the `dist` folder itself) into `public_html/`.
   - Or SFTP/Cyberduck: sync `ui/dist/*` → `public_html/`.
4. **No SPA rewrite required** — hash routing (`/#work`) avoids deep-link 404s.

### Step A2 — Node API via Setup Node.js App

1. cPanel → **Setup Node.js App** → **Create Application**
2. Use these **exact field values** (replace `USERNAME` and `kyleruddy.com` with your cPanel user and live domain):

   | cPanel field | Value | Notes |
   |--------------|-------|-------|
   | **Node.js version** | **22.x** (or **20.x** if 22 unavailable) | Pick the newest **LTS** offered. Repo `.nvmrc` is 21 locally — closest LTS on cPanel is fine. |
   | **Application mode** | **Production** | |
   | **Application root** | `/home/USERNAME/portfolio-server` | **Outside** `public_html`. Good alternates: `~/portfolio-api`, `~/contact-api`. Never put the API root inside `public_html` except the Passenger stub folder cPanel creates. |
   | **Application URL** | Domain: `kyleruddy.com` (or `www.kyleruddy.com` if that is canonical) · Path: **`contact-api`** | **Use a path, not a subdomain.** The SPA calls `/contact-api/api/contact` (same origin). A subdomain (`api.kyleruddy.com`) would require rebuilding the UI with different endpoints. |
   | **Application startup file** | `dist/server.js` | Relative to application root. Build locally first: `cd server && npm ci && npm run build`. |

3. **Environment variables** — paste in the Node.js App UI only. Copy values from your local `server/.env` (never commit `.env` to git; do not upload `.env` to the server):

   | Variable | Copy from local? | Purpose |
   |----------|------------------|---------|
   | `RESEND_API_KEY` | **Yes** | Resend API key for outbound email |
   | `CONTACT_TO_EMAIL` | **Yes** | Inbox that receives contact form submissions |
   | `CONTACT_FROM_EMAIL` | **Yes** | From header Resend sends (e.g. `Portfolio <noreply@…>`) |
   | `ALLOWED_ORIGINS` | **Yes** (edit for prod) | Comma-separated browser origins allowed by CORS — must include `https://kyleruddy.com` and `https://www.kyleruddy.com` if both work |
   | `PORT` | **Yes** (optional on shared) | Passenger usually injects the listen port; setting `3000` to match local is harmless. Do not try to bind 80/443 in Express. |

4. **Upload to application root only** (`/home/USERNAME/portfolio-server/`):
   - `package.json`, `package-lock.json` (or `yarn.lock`)
   - `dist/` (compiled output, including `dist/server.js`)
   - Optional: `data/` if you want analytics persisted on disk
   - **Do not upload:** `ui/` or `ui/dist/` (static site goes in `public_html`), `node_modules` from your Mac, `src/` (not needed if `dist/` is present), `.env` file, `.git/`

5. Click **Run NPM Install**, then **Restart**.
6. In `public_html/contact-api/` (folder cPanel creates for the Application URL), edit `.htaccess` and add:

   ```apache
   RewriteEngine off
   ```

   This stops Apache from rewriting API requests ([reference](https://davenewman.tech/blog/host-node-namecheap-cpanel/)).

#### cPanel checklist (Kyle)

- [ ] Built UI locally: `cd ui && npm ci && npm run build`
- [ ] Uploaded **contents** of `ui/dist/` into `public_html/` (not the `dist` folder itself)
- [ ] Built server locally: `cd server && npm ci && npm run build`
- [ ] Created Node.js app: application root **outside** `public_html`, URL path **`contact-api`**
- [ ] Startup file: `dist/server.js`
- [ ] Pasted env vars in cPanel UI (not uploaded as `.env`)
- [ ] `ALLOWED_ORIGINS` includes production `https://…` origin(s), no typos or trailing slashes
- [ ] Uploaded server artifacts to application root; **Run NPM Install** on server
- [ ] **Restart** Node app after env or code changes
- [ ] Set `RewriteEngine off` in `public_html/contact-api/.htaccess`
- [ ] `curl https://kyleruddy.com/contact-api/api/health` → `{"ok":true,"service":"portfolio-server"}`
- [ ] Contact form on live site sends email via Resend

#### Passenger + static site (how they coexist)

- **Apache** serves the React build from `public_html/` for `/`, `/assets/*`, `/resume.pdf`, etc.
- **Passenger** handles only URLs under **`/contact-api`** and forwards them to Express in your application root.
- The frontend uses relative paths (`/contact-api/api/contact` in `constants.ts`). **Application URL path must be `contact-api`** so public URLs match what the SPA calls.
- Express **dual-mounts** routes at both `/api/*` and `/contact-api/api/*` (`server/src/server.ts`) so health, contact, and analytics work whether the proxy strips the prefix or not.
- cPanel creates `public_html/contact-api/` as a routing stub — it is **not** where server code lives; only the `.htaccess` tweak lives there.

### Step A3 — Verify

```bash
curl -s https://yourdomain.com/contact-api/api/health
# → {"ok":true,"service":"portfolio-server"}

curl -s -X POST https://yourdomain.com/contact-api/api/contact \
  -H 'Content-Type: application/json' \
  -d '{"name":"Test","email":"test@example.com","message":"Hello"}'
```

Open the site, submit the contact form, confirm email via Resend.

### Shared-hosting gotchas

- **503:** Wrong startup file, missing `dist/server.js`, or uploaded Mac `node_modules`. Re-run NPM Install on server; check Passenger logs in Node.js App UI.
- **Cannot GET /contact-api/…:** Application URL must match public path; server dual-mounts `/api` and `/contact-api/api` for Passenger prefix behavior.
- **CORS errors:** Set `ALLOWED_ORIGINS` to your exact HTTPS origin(s).
- **Do not** bind Express to port 80/443 — Passenger owns the socket; `app.listen(env.port)` is fine.

---

## 5. Path B — Namecheap VPS (recommended)

Architecture:

```text
nginx :443
  ├─ /                → /var/www/portfolio (ui/dist static)
  └─ /contact-api/    → proxy_pass http://127.0.0.1:3000
                              Express (PM2)
```

### Step B1 — Server setup

```bash
# On VPS (Ubuntu)
sudo apt update && sudo apt install -y nginx certbot python3-certbot-nginx
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs
sudo npm install -g pm2
```

### Step B2 — Deploy files

```bash
sudo mkdir -p /var/www/portfolio
sudo chown $USER:$USER /var/www/portfolio

# Static UI (from local machine)
rsync -avz ui/dist/ user@VPS:/var/www/portfolio/

# API (git or rsync)
git clone https://github.com/wkruddy/Portfolio.git ~/portfolio
cd ~/portfolio/server && npm ci && npm run build
```

Create `~/portfolio/server/.env` from `.env.example` with production values.

### Step B3 — PM2

```bash
cd ~/portfolio/server
pm2 start dist/server.js --name portfolio-api
pm2 save
pm2 startup   # follow printed command
```

### Step B4 — nginx

```nginx
# /etc/nginx/sites-available/portfolio
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;
    root /var/www/portfolio;
    index index.html;

    location /contact-api/ {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

```bash
sudo ln -s /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

`try_files` is optional for hash-only routing but harmless for `/resume.pdf` and assets.

### Step B5 — DNS

Namecheap → domain → **Advanced DNS** → A record `@` and `www` → VPS public IP.

### VPS updates (typical)

```bash
# UI: rebuild locally, rsync dist
# API: git pull, npm ci, npm run build, pm2 restart portfolio-api
```

---

## 6. Path C — Split hosting (if shared Node fails)

Keep Namecheap for **domain + static** only; run API elsewhere.

| Layer | Host | Notes |
|-------|------|-------|
| Static UI | Namecheap `public_html` or **Cloudflare Pages / Vercel** (free) | Upload `ui/dist/` |
| API | **Railway**, **Render**, Fly.io | Deploy `server/`; set env vars |
| DNS | Namecheap | Point `@` to static host; `api.yourdomain.com` CNAME to PaaS **or** change FE constants |

If API moves to a subdomain (`https://api.yourdomain.com`), update:

- `ALLOWED_ORIGINS` on the server
- `SITE_CONFIG.contactEndpoint` / `analyticsEndpoint` in `constants.ts` (requires UI rebuild)

Same-origin `/contact-api` avoids CORS complexity — prefer Path A or B when possible.

---

## 7. Production mapping reference

Dev (Vite) proxies `/contact-api` → Express. Production must preserve the same public paths:

| Client calls | Express handler |
|--------------|-----------------|
| `POST /contact-api/api/contact` | `contactRouter` |
| `POST /contact-api/api/analytics/events` | `analyticsRouter` |
| `GET /contact-api/api/health` | Health check |

On VPS, nginx forwards the **full path** (including `/contact-api`) to Express — dual mounts in `server.ts` handle this.

---

## 8. Quick decision tree

```text
Already on Namecheap shared?
  ├─ Yes → Path A (static + Setup Node.js App at /contact-api)
  └─ No  → Willing to run a VPS?
            ├─ Yes → Path B (recommended)
            └─ No  → Path C (static Namecheap + Railway/Render API)
```

---

## 9. Related docs

- [Namecheap: How to work with Node.js App](https://www.namecheap.com/support/knowledgebase/article.aspx/10047/2182/how-to-work-with-nodejs-app/)
- [Namecheap: Git on shared servers](https://www.namecheap.com/support/knowledgebase/article.aspx/9586/89/how-to-deal-with-git-on-our-shared-servers/)
- [Hosting Node on Namecheap cPanel (Passenger notes)](https://davenewman.tech/blog/host-node-namecheap-cpanel/)
- [Hosting React static build on Namecheap](https://davenewman.tech/blog/host-react-namecheap/)
- Repo handoff gap (now addressed): `docs/handoffs/pipeline-status.md` — production `/contact-api` mapping
