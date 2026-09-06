# SocialFlow — Build Plan (kaise kaise banayenge)

Yeh document batata hai **step by step** kya banayenge, kis order me, aur har step ka "done" kya hai.
Reference: [PRD.md](./PRD.md). Har milestone khatam hone par yahan checkbox tick karo.

---

## Tech stack (decided baseline)

| Layer | Choice |
|---|---|
| Monorepo | pnpm workspaces + Turborepo |
| Web | Next.js (App Router) + TypeScript (strict) |
| Styling | Tailwind CSS + design tokens (CSS variables) |
| Auth + DB | Supabase (Auth + Postgres + RLS) |
| ORM / migrations | Drizzle ORM + Supabase migrations (SQL) |
| Validation | Zod (every API boundary) |
| Queue | BullMQ + Redis (Upstash for dev/prod) |
| Worker | Standalone Node service (`apps/worker`) |
| Storage | Cloudflare R2 (S3-compatible), signed URLs |
| Billing | Razorpay Subscriptions (Stripe later, behind interface) |
| Email | Resend |
| Monitoring | Sentry + pino structured logs |
| Tests | Vitest (unit/integration), Playwright (E2E) |
| Deploy | Web → Vercel; Worker + Redis → Railway |

> Local dev is on WAMP path but the app is **not** PHP/MySQL — Next.js + Supabase. WAMP folder is just where the repo lives.

---

## Repo structure (target)

```
apps/
  web/            # Next.js product + marketing
  worker/         # scheduler + publish jobs + media processing
packages/
  db/             # drizzle schema, migrations, RLS policies, seed, RLS tests
  ui/             # design tokens + primitives (Button, Sheet, Rail, Timeline...)
  social-core/    # SocialPublisher interface + error normalization + registry
  social-meta/    # Facebook Pages + Instagram adapters
  social-linkedin/# LinkedIn adapter
  billing/        # Razorpay client, webhook verify, entitlement engine
  validation/     # shared Zod schemas (post, media, platform limits)
  config/         # brand config (name, logo, colors, domain, support email)
infra/            # env docs, deploy notes, runbooks
docs/             # this folder
```

---

## Milestone 0 — Foundation

**Goal:** empty repo → deployable skeleton with design system + DB + CI.

Steps:
1. `pnpm init`, Turborepo config, workspace globs, shared `tsconfig.base.json` (strict).
2. Scaffold `apps/web` (Next.js, TS, Tailwind, ESLint, Prettier).
3. `packages/config` — brand config object (`brand.ts`): name, logoPath, colors, domain, supportEmail. Nothing hard-codes "SocialFlow".
4. `packages/ui` — design tokens from PRD §4 as CSS variables + Tailwind theme. Base primitives: `Button`, `Sheet` (side drawer), `Rail`, `Divider`, `TimelineRow`, `Field`. Non-boxy: no default card component; use bands + rules.
5. `packages/db` — Supabase project, Drizzle setup, first migration = empty + `profiles` table, RLS enabled by default.
6. CI (GitHub Actions): typecheck, lint, unit tests, build. Vercel preview deploy on PR.
7. `.env.example` with every var from PRD §20. Real secrets in `.env.local` (gitignored).

**Exit:** PR preview deploys; `pnpm typecheck && pnpm test && pnpm build` green; migrations apply cleanly.

---

## Milestone 1 — Identity (auth, workspace, roles, onboarding)

Steps:
1. Supabase Auth: email/password signup, email verification, password reset, "sign out all sessions".
2. Server profile bootstrap: on first authenticated request, upsert `profiles` row.
3. Tables + migrations: `workspaces`, `workspace_members`, `audit_logs`, `notifications`.
4. Onboarding flow: create-or-join workspace → collect name, timezone, use case. Persist progress (resumable) in a `onboarding_state` json on profile or workspace.
5. Terms/Privacy acceptance: store version + timestamp on profile.
6. RLS policies: every workspace-owned table filtered by `workspace_id IN (user's memberships)`. Helper SQL function `current_workspace_ids()`.
7. Role checks: server-side `can(user, action, workspace)` helper mapping PRD §5.2 table.
8. Owner transfer flow (requires re-auth). Invitations: token, expiry, revoke.
9. App shell: left rail (desktop) + bottom nav (mobile), workspace switcher, command palette stub.

**Tests:** RLS integration tests — user A cannot read/write workspace B rows (SELECT/INSERT/UPDATE/DELETE). Role permission unit tests.

**Exit:** RLS tests prove tenant isolation.

---

## Milestone 2 — Billing (plans, Razorpay, entitlements)

Steps:
1. Tables: `plans`, `subscriptions`. Seed 3 plans (Starter/Professional/Agency) with `limits_json` from PRD §11.
2. `packages/billing`:
   - Razorpay client wrapper.
   - `createSubscriptionCheckout(workspace, planCode)`.
   - Webhook signature verify (raw body) + idempotent handler keyed on `webhook_events(provider, external_event_id)`.
   - Billing state machine (PRD §11): pending→active→past_due→paused/cancelled.
   - `EntitlementEngine`: given workspace → resolved limits + feature flags; `checkLimit(action)` returns allow/deny + reason + remaining.
3. Reconciliation job (worker cron): poll Razorpay for drift, don't trust redirects.
4. UI: Billing page — plan chapters (non-boxy, PRD §4), usage horizon bar, invoices list (visible after cancellation), cancel (end of period).
5. Grace period config in DB (`plans` or a `billing_config` table).

**Tests:** webhook replay is safe (same event twice = one state change); entitlement calc unit tests; failed-payment → grace → paused transition.

**Exit:** replay-safe subscription lifecycle.

---

## Milestone 3 — Connections (Meta + LinkedIn OAuth)

Steps:
1. Table: `social_accounts` (+ unique `workspace_id + platform + external_id`).
2. Token encryption: `packages/config` crypto helper — AES-256-GCM, key from `ENCRYPTION_KEY` (outside DB), versioned metadata for rotation.
3. `packages/social-core`: `SocialPublisher` interface, `SocialError` normalization (AUTH/PERMISSION/VALIDATION/RATE_LIMIT/MEDIA/TRANSIENT/QUOTA/UNKNOWN), adapter registry.
4. OAuth routes: `/api/connections/:platform/start` (state + PKCE, exact redirect allowlist, explain scopes screen first), `/callback`, `/refresh`, `/disconnect`.
5. `packages/social-meta`: Facebook Pages + Instagram Professional — OAuth, list eligible Pages/IG accounts, `refreshToken`, `revoke`.
6. `packages/social-linkedin`: LinkedIn OAuth, company role validation, refresh, revoke.
7. Connection health: states Connected/Expiring/Permission missing/Reconnect required/Revoked. Cron checks expiry → notification before it affects schedule.
8. Disconnect: remote revoke + immediate local secret wipe. Pause scheduled jobs targeting the account.
9. UI: Connections page as horizontal "constellation" rail (PRD §4), status beneath, reconnect action.

**Tests:** OAuth state mismatch rejected; token encrypt/decrypt + rotation; disconnect wipes secrets; contract tests against recorded provider responses.

**Exit:** connect, refresh, revoke verified for both platforms.

---

## Milestone 4 — Composer (content model, media, validation, drafts)

Steps:
1. Tables: `posts`, `post_media`, `post_destinations`.
2. Media upload: `/api/media/upload-session` → signed R2 URL → `/complete`. Server-side scan (ClamAV or provider), MIME-by-content check, size limits, generate safe preview/derivatives.
3. `packages/validation`: per-platform limits (char count, media formats, dimensions, duration, count) + `validatePost(post, destinations)` → blocking errors + warnings.
4. Composer UI — three-step Create → Adapt → Review:
   - Master caption = source; each selected platform gets optional override.
   - Composer stage layout: media central canvas, settings side sheet (PRD §4).
   - Live preview by platform + device aspect; "preview is indicative" disclosure.
   - Non-destructive crop (store crop params, keep original).
   - Autosave: debounced, visible "Saved" state, cross-tab conflict handling (version field + last-write detection).
   - Contextual primary action: Publish now / Schedule / Submit for approval / Save draft.
   - Plain-language readiness summary before submit.
5. Library page: media, drafts, saved captions, filters.

**Tests:** validation unit tests per platform; autosave no-silent-loss; upload abuse (wrong MIME, oversize) rejected.

**Exit:** autosave + previews work across responsive sizes.

---

## Milestone 5 — Publishing (queue, worker, adapters, retries)

Steps:
1. Tables: `publish_jobs` (unique `idempotency_key`), indexes on `run_at/state`.
2. Scheduler (worker cron, every ~30s): find `post_destinations` due → enqueue **one job per destination**.
3. Worker job processor:
   - Take lease (`lease_until`), lock row.
   - Validate entitlement + account status.
   - Call adapter `validate` → `uploadMedia` → `publish(idempotencyKey)`.
   - Lifecycle transitions: queued→processing→uploaded/processing_remote→published | retrying→failed.
   - Retry transient with exponential backoff + jitter; never retry PERMISSION/VALIDATION.
   - Crashed worker: expired lease → job reclaimed.
   - Persist remote_id, permalink, raw error category, safe user message, timestamps.
4. Remote video finalization: webhook or bounded polling → `getStatus`.
5. Provider outage handling (PRD §14): don't fail immediately, backoff within window, incident banner, independent platforms keep going.
6. Notifications: final failure (email + in-app), partial success shown honestly (no fake green).
7. `scheduled_at` stored UTC; display in workspace tz.

**Tests:** idempotency — retry never double-posts; worker crash mid-job recovered; permanent failure not retried; at-least-once semantics.

**Exit:** scheduled test publishes, no duplicates, works with browser closed.

---

## Milestone 6 — Operations (calendar, approvals, notifications, admin, audit)

Steps:
1. Calendar: month/week/list views; filters by member/platform/status; `GET /api/calendar`.
2. Drag-to-reschedule: confirm timezone, update only eligible jobs (not already processing/published).
3. Approvals: `approvals` table; editor submit → approver comment/approve/request-changes; post-approval edit → draft or reapproval per workspace policy. Log every transition to `audit_logs`.
4. Notifications center (in-app) + email templates for all PRD §12 events.
5. Admin console: user/workspace search (no tokens), subscription + entitlement view, job history + normalized errors + retry count, suspend workspace (reason + audit), plans/coupons/feature flags, integration health + webhook freshness dashboard.
6. Audit log viewer (workspace-scoped + admin global).

**Exit:** failure + recovery journeys are operable end-to-end.

---

## Milestone 7 — Launch hardening

Steps:
1. Policy pages: Privacy, Terms, Data Deletion Instructions. In-product account deletion workflow (PRD §10).
2. Security pass: CSP, HSTS, secure cookies, origin checks, rate limits (IP/user/workspace/action), dependency scan, `/security-review`.
3. Retention jobs: media, audit logs, provider payloads, backups.
4. Monitoring: Sentry releases, alerts, structured logs, uptime.
5. Backups + documented restore drill.
6. Meta + LinkedIn app review submissions; scope justification screens.
7. OpenAPI spec generation; marketing homepage (PRD §4).
8. Full E2E: signup → subscribe → connect → compose → schedule → publish.

**Exit:** paid pilot customers can onboard safely (Definition of Done, PRD §18).

---

## Working agreement

- One milestone at a time. Each PR: typecheck + tests + lint green, changed-files summary.
- No secrets in client responses, ever. No token in browser.
- No scraping / browser automation for posting.
- New platform ≠ done until connect + refresh + publish + retry + error + disconnect all tested.
- Ask the user only when a missing decision changes data/security/billing/API behavior — see [DECISIONS.md](./DECISIONS.md).

## Progress tracker

- [~] M0 Foundation — `apps/web` scaffolded (Next.js 15 + React 19 + TS + Tailwind v4), homepage built + design system in `globals.css`, build/typecheck green. TODO: pnpm workspace + Turborepo, `packages/*`, `apps/worker`, Supabase/DB, CI.
- [ ] M0b — port `marketing/index.html` design into `apps/web` (done as the homepage; keep the static file as reference)
- [ ] M1 Identity
- [ ] M2 Billing
- [ ] M3 Connections
- [ ] M4 Composer
- [ ] M5 Publishing
- [ ] M6 Operations
- [ ] M7 Launch
