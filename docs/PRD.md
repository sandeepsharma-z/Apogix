# SocialFlow — Product Requirements Document (v1.0)

> Multi-tenant social publishing & scheduling SaaS.
> **Core promise:** Create once. Adapt intentionally. Publish everywhere from one calm workspace.
> Source: `SocialFlow_SaaS_Complete_Product_Requirements.pdf` (28 Aug 2026). Build target: responsive web SaaS.

Requirement keywords: **MUST** = acceptance criteria, **SHOULD** = preferred, **MAY** = optional.

> **Product name: Apogix.** The PDF uses "SocialFlow" as a placeholder — read it as Apogix throughout. Brand name/logo/colors/domain/support email are centralized in `packages/config` and changeable without editing pages.

---

## 0. Ground rules (non-negotiable)

- Build in vertical slices: auth → workspace → social connection → composer → queue → publishing → billing → admin → analytics.
- Do **not** replace official social APIs with browser automation, stored passwords or scraping.
- Do **not** expose access tokens to the browser. All publishing happens **server-side**.
- A platform is not "complete" until OAuth, token refresh, failure handling and disconnect/revocation are tested.
- Preserve the non-boxy premium editorial visual language (see §4).
- Centralize brand name, logo, colors, domain, support email — changeable without editing pages.
- Never promise "every post type on every network." Capability is driven by each platform's current official API + approved scopes.

## 1. Delivery scope

| Release | Included | Not required |
|---|---|---|
| **MVP** | Facebook Pages, Instagram Professional, LinkedIn; image/text posts; scheduling; Razorpay; admin | TikTok, X, deep analytics, native mobile apps |
| **V1** | Video, reels, carousel, approvals, team roles, reusable media | White-label domains, reseller billing |
| **V2** | TikTok, YouTube, Pinterest, X add-on, AI assistance | Parity with every native editor feature |

### MVP must include
Email/password auth + email verification · workspace creation & membership · Razorpay monthly subscription lifecycle · Meta + LinkedIn OAuth · unified composer with channel overrides · post-now + scheduled publishing · media upload/validation/reusable library · queue worker + retries + failure notifications · calendar + activity history + post detail · admin console (customers, subscriptions, jobs, errors).

### MVP non-goals
Social inbox / comment replies · social listening · automated engagement (follows/likes/DMs) · personal Instagram posting · native mobile apps · complex AI generation before core publishing is reliable.

## 2. Target customers

| Segment | Job to be done | Why they pay |
|---|---|---|
| Solo creator | Prepare & schedule weekly content | Saves repetitive uploading |
| Local business | Keep several channels consistent | No dedicated social team |
| Marketing agency | Manage isolated client workspaces | Approval & operational control |
| Small brand team | Coordinate content + reviewers | Fewer missed posts / handoffs |

## 3. Information architecture

Persistent left rail (desktop) / bottom nav (mobile). Restrained navigation; secondary settings live in workspace settings.

| Area | Purpose | Key screens |
|---|---|---|
| Home | Operational overview | Today, upcoming timeline, connection health, quick compose |
| Compose | Create content | Master content, channel overrides, preview, schedule |
| Calendar | Plan visually | Month/week/list, drag to reschedule |
| Library | Reuse assets | Media, drafts, saved captions, filters |
| Analytics | Review outcomes | Post-level + channel-level summaries |
| Connections | Manage OAuth | Accounts, expiry, reconnect, permissions |
| Workspace | People & settings | Members, roles, brand, timezone |
| Billing | Manage subscription | Plan, usage, invoices, cancellation |
| Admin | Operate SaaS | Users, workspaces, payments, jobs, audit logs |

## 4. Premium UI/UX direction — non-boxy by design

Must not look like a Bootstrap admin template. No page of twelve identical rounded rectangles. Use composition, rhythm, depth, progressive disclosure.

**Visual character:** warm off-white canvas, near-black type, restrained teal + violet accents · large headlines + generous negative space · hairline dividers / background bands / full-width rails / typography to group before containers · soft radial glows or grain only on marketing surfaces · rounded corners OK for controls/media but boxes are not the hierarchy · motion clarifies state (160–240ms, gentle spring for drawers, no bouncing).

### Design tokens

| Token | Value | Use |
|---|---|---|
| Canvas | `#F7F7F3` | Main background |
| Ink | `#111827` | Headings / primary text |
| Muted | `#667085` | Secondary text |
| Teal | `#0F766E` | Primary action + success |
| Violet | `#6D5CE7` | Schedule / creative accents |
| Line | `#D7DEE8` | Rules / separators |
| Danger | `#B42318` | Destructive / failed states |
| Radius | `12px` / `20px` | Controls / media surfaces |
| Type | Inter or Geist | Product UI |
| Display | Manrope or Sora | Marketing / major headings |

**Core layout patterns:** editorial split (title+guidance left, work surface right) · timeline river (posts flow vertically against quiet date rail) · composer stage (media central canvas, settings as side sheet) · connection constellation (identities on a horizontal rail, not card grid) · usage horizon (thin bar in billing copy, not a tile) · command palette (compose, switch workspace, connect account, open scheduled post).

**Page-specific UX:** see PDF §4 — marketing homepage (kinetic multi-channel hero, scrolling "publish path", before/after strip, editorial proof, pricing as 3 vertical chapters, numbered FAQ disclosure); Home ("Here is what is moving today", cinematic next-post preview, timeline grouped by date, single contextual connection banner); Composer (Create → Adapt → Review, master caption source + per-platform override, live preview by platform/aspect, non-destructive crop, contextual primary action, plain-language readiness summary).

**Responsive:** desktop ≥1280px (rail + stage + context sheet) · tablet 768–1279 (collapsible nav, preview below inputs) · mobile <768 (bottom nav, full-screen composer, sticky final action) · touch targets ≥44px · never require hover · honor reduced-motion · visible focus.

## 5. Functional requirements

### 5.1 Auth & onboarding
- MUST: register email/password, verify email, reset password, sign out all sessions.
- First login: create or join workspace; collect name, primary timezone, use case.
- Trial config MUST come from DB, not hard-coded.
- Onboarding progress SHOULD persist (resumable).
- MUST accept Terms + Privacy with version + timestamp stored.

### 5.2 Workspace & roles

| Role | Permissions |
|---|---|
| Owner | Billing, delete workspace, members, connections, publish, approve |
| Admin | Members (except owner), connections, publish, approve, settings |
| Editor | Create/edit/submit; publish only if allowed |
| Approver | Review, comment, approve/reject; optional publishing |
| Viewer | Read-only: calendar, posts, analytics |

- Every business record MUST include `workspace_id`.
- RLS MUST prevent cross-workspace access.
- Owner transfer MUST require re-authentication.
- Invitations MUST expire and be revocable.

### 5.3 Social account connection
- Official OAuth authorization-code flows. Never request a social password.
- Store: platform account ID, display name, avatar, scopes, expiry, status.
- Encrypt access + refresh tokens with server-only key management.
- After OAuth, let user choose eligible Pages / organizations.
- States: Connected, Expiring, Permission missing, Reconnect required, Revoked.
- Disconnect: revoke remotely when supported + immediately remove local secrets.
- Scheduled post targeting a disconnected account MUST be paused + surfaced.

### 5.4 Composer & content model
- Draft title for internal org (never published).
- Master caption, media sequence, link, first comment (where supported), scheduling intent.
- Each destination stores own override caption, settings, validation, status.
- Validate character limits, media formats, duration, dimensions, destination capability.
- Uploading SHOULD show progress, resumable for large video, server-side scanning.
- Autosave with visible "Saved" state + cross-tab conflict handling.
- Preview is indicative — disclose native rendering may vary.

### 5.5 Scheduling & publishing
- Store `scheduled_at` in UTC; preserve workspace timezone for display.
- One publish job **per destination**, never one all-or-nothing job.
- Idempotency keys so retries cannot duplicate posts.
- Lifecycle: `queued → processing → uploaded/processing_remote → published`, or `retrying → failed`.
- Retry transient failures with exponential backoff + jitter; do NOT retry permanent permission/validation failures.
- Lock job during processing; lease timeout for crashed workers.
- Save remote post ID, permalink, raw error category, safe user message, timestamps.
- Notify (email + in-app) after final failure and before connection expiry affects scheduled work.

### 5.6 Calendar & approvals
- Month / week / list views; filters by member, platform, status.
- Drag-to-reschedule MUST confirm timezone + update only eligible jobs.
- Editors submit drafts for approval; approvers comment / approve / request changes.
- Approved content changes return to draft or require reapproval per workspace policy.
- Record all approval transitions in audit log.

### 5.7 Billing & entitlements
- Razorpay Subscriptions for INR. Stripe Billing MAY be added for international.
- Never trust success redirects — state changes only after verified webhooks / server reconciliation.
- Verify webhook signatures; idempotent handlers.
- Entitlements: `social_accounts_limit`, `members_limit`, `posts_per_cycle`, `storage_bytes`, feature flags.
- At limit: preserve existing content, block only the exceeding action.
- Cancellation defaults to end of billing period. Failed payment → configurable grace period.
- Invoices + payment status visible after cancellation.

### 5.8 Admin console
Search users/workspaces without exposing tokens · view subscription + entitlement state · inspect job history, normalized errors, retry count · suspend workspace with reason + audit · manage plans, coupons, feature flags · review integration health + webhook freshness · impersonation (if ever) time-limited, bannered, audited.

## 6. Social platform integration

**API cost model:** Meta, LinkedIn, TikTok, YouTube, Pinterest generally no per-post fee but access/quotas/app review/scopes apply. X = paid API. Verify current terms before launch.

| Platform | MVP capability | Auth / approval | Product rule |
|---|---|---|---|
| Facebook | Publish to Pages | Meta app, Page permissions, review | No personal profile automation |
| Instagram | Professional feed media | Professional account + Meta auth | Capability-check each media type |
| LinkedIn | Member/company text + media where approved | OAuth scopes; company role validation | Only authorized identities |
| TikTok | Later: direct post / upload draft | Content Posting product, scope, audit | Unaudited behavior restricted |
| YouTube | Later: video upload | Google OAuth + quota | Show quota/processing state |
| Pinterest | Later: Pins | Pinterest developer access | Board selection required |
| X | Later paid add-on | Paid API + user OAuth | Meter usage, protect margin |

### Adapter contract
Business logic never calls platform SDKs directly.

```ts
interface SocialPublisher {
  validate(input, account): ValidationResult
  uploadMedia(input, account): RemoteMedia[]
  publish(input, account, idempotencyKey): PublishResult
  getStatus(remoteId, account): PublishStatus
  refreshToken(account): TokenResult
  revoke(account): void
}
```

- Normalize errors into: `AUTH`, `PERMISSION`, `VALIDATION`, `RATE_LIMIT`, `MEDIA`, `TRANSIENT`, `QUOTA`, `UNKNOWN`.
- Raw provider payload only in restricted logs with retention controls.
- Record provider request/correlation ID when available.
- Webhooks for remote processing completion where supported; otherwise bounded polling.

## 7. System architecture

Baseline: Next.js App Router + TypeScript · Supabase Auth/PostgreSQL · object storage · Redis-backed queue · long-running worker. Web app **enqueues** work; it must not stay open for publishing to finish.

| Component | Responsibility | Recommended |
|---|---|---|
| Web app | Marketing, dashboard, server actions/API | Next.js + TypeScript |
| Identity | Sessions + email verification | Supabase Auth |
| Database | Multi-tenant state | Supabase PostgreSQL + RLS |
| Storage | Original + derived media | Cloudflare R2 / S3 / Supabase Storage |
| Queue | Scheduling, delayed jobs, retries | BullMQ + Redis or managed |
| Worker | Media processing + platform publishing | Node service (Railway/AWS/Render) |
| Billing | Plans + recurring payments | Razorpay; optional Stripe |
| Email | Verification + operational alerts | Resend or SMTP |
| Monitoring | Errors, traces, alerts | Sentry + structured logs |

**Request flow:** browser requests upload session → media uploads direct to storage via short-lived signed URL → server creates post + destination records in a transaction → scheduler enqueues due destination jobs → worker takes a lease, validates entitlement/account, publishes, persists result → webhook/polling finalizes remote video → UI updates via polling or realtime.

## 8. Database schema

| Table | Essential fields |
|---|---|
| `profiles` | id, email, display_name, locale, created_at |
| `workspaces` | id, name, slug, timezone, status, owner_id |
| `workspace_members` | workspace_id, user_id, role, permissions |
| `plans` | id, code, prices, cycle, limits_json, active |
| `subscriptions` | workspace_id, provider, external_ids, status, period dates, grace_until |
| `social_accounts` | workspace_id, platform, external_id, name, encrypted_tokens, scopes, expires_at, status |
| `posts` | workspace_id, author_id, title, master_caption, state, scheduled_at, timezone, version |
| `post_media` | post_id, storage_key, mime, size, width, height, duration, order |
| `post_destinations` | post_id, social_account_id, override_json, state, remote_id, permalink, error fields |
| `publish_jobs` | destination_id, run_at, attempt, lease_until, idempotency_key, state |
| `approvals` | post_id, reviewer_id, decision, comment, version |
| `webhook_events` | provider, external_event_id, payload_hash, processed_at, status |
| `audit_logs` | workspace_id, actor_id, action, entity, entity_id, metadata, ip, created_at |
| `notifications` | user_id, type, title, body, read_at, action_url |

### Required DB rules
- Unique: `workspace_id + platform + external_id` (connected accounts).
- Unique: `provider + external_event_id` (webhook idempotency).
- Unique: `idempotency_key` (publish jobs).
- FKs with deliberate cascade/restrict.
- RLS on all workspace-owned tables.
- Soft-delete / retention policy for auditable records.
- Indexes on `run_at/state`, `workspace_id/created_at`, provider event IDs.

## 9. API surface

| Group | Examples |
|---|---|
| Auth | Supabase + server profile bootstrap |
| Workspaces | `GET/POST /api/workspaces`; members/invitations/roles |
| Connections | `/api/connections/:platform/start`, `callback`, `refresh`, `disconnect` |
| Media | `/api/media/upload-session`, `complete`, `delete` |
| Posts | CRUD `/api/posts`; `validate`; `duplicate`; `submit`; `approve` |
| Publishing | `/api/posts/:id/publish`; `cancel`; `retry-destination` |
| Calendar | `GET /api/calendar?from=&to=&platform=&status=` |
| Billing | `checkout`, `portal`, `usage`; `/api/webhooks/razorpay` |
| Admin | `users`, `workspaces`, `jobs`, `platform-health`, `feature-flags` |

**API standards:** Zod validation at every boundary · consistent response envelope + typed error codes · cursor pagination for unbounded lists · rate limits by IP/user/workspace/action · CSRF protection for cookie-auth mutations · no token/secret/raw payload in client responses · OpenAPI spec maintained alongside routes.

## 10. Security, privacy, compliance

Least-privilege scopes + explain each permission before OAuth redirect · encrypt provider secrets at app level, key outside DB · rotate keys via versioned encryption metadata · verify OAuth state/PKCE + exact redirect URI allowlists · verify every webhook signature against raw body · prevent SSRF (serve only signed URLs from controlled storage/domain) · scan uploads, validate MIME by content, size limits, safe derived previews · secure cookies, CSP, HSTS, origin checks, dependency scanning · provide Privacy Policy, Terms, Data Deletion Instructions, in-product account deletion · define retention for media/audit/payloads/backups · never use browser automation to bypass permissions or review.

**Account deletion workflow:** re-auth → cancel/mark subscription per policy → cancel queued jobs → revoke social tokens → delete encryption material/tokens immediately → schedule content deletion after disclosed recovery window → retain only legally necessary billing/audit → send final confirmation.

## 11. Subscription plans

| Plan | Illustrative price | Entitlements |
|---|---|---|
| Starter | ₹499/mo | 3 accounts, 1 member, 30 destinations/cycle, 2 GB |
| Professional | ₹999/mo | 8 accounts, 3 members, 150 destinations, approvals, 10 GB |
| Agency | ₹2,499/mo | 25 accounts, 10 members, 500 destinations, client workspaces, 50 GB |
| Add-ons | Variable | Extra destinations, storage, X API usage, white-label |

**Count destinations, not master posts** — one master post to 3 platforms = 3 publishing operations. Make this explicit on pricing + usage screens.

**Billing state machine:** `pending → active` (verified payment) · `active → past_due` (failed renewal) · `past_due → active` (recovery) or `→ paused` (after grace) · `active/past_due → cancelled` (period end) · refunded/disputed → manual review · webhook events are the authoritative stream, reconciled periodically.

## 12. Notifications

| Event | Channel | Intent |
|---|---|---|
| Post published | In-app; optional email | Confirm destinations + links |
| Final publishing failure | In-app + email | Explain action: edit / reconnect / retry |
| Token expiring/revoked | In-app + email | Reconnect before affected schedule |
| Approval requested | In-app + email | Open exact post version |
| Payment failed | Email + billing banner | Explain grace window + fix |
| Usage near limit | In-app | Show exact remaining destinations + reset date |

## 13. Accessibility

WCAG 2.2 AA · keyboard-complete workflows + visible focus · semantic landmarks/headings/labels/error summaries · contrast ≥4.5:1 normal text · status by text/icon never color alone · captions/transcript where relevant · plain-language errors naming platform + next action · dates show timezone when scheduling could be ambiguous.

## 14. Performance & reliability targets

| Area | Target |
|---|---|
| Dashboard | Core content interactive within 2.5s on typical broadband |
| Composer autosave | Persist within 1s after debounce; no silent loss |
| API | p95 < 500ms excluding external provider/media work |
| Scheduling | Job starts within 60s of scheduled time (normal operation) |
| Publishing | At-least-once processing with idempotent external behavior |
| Availability | 99.5% MVP target excluding provider outages |
| Recovery | Daily backups; documented restore drill before paid launch |

**Provider outage behavior:** don't mark failed immediately for confirmed outage · pause/backoff within allowed window · show incident banner + affected destinations · keep unrelated platforms processing · after max window, fail with retry action + preserved content.

## 15. Analytics (MVP = operational truth first)

Published destinations by platform/date · success/failure/retry rate · posting volume + plan usage · where approved: impressions, reactions, comments, clicks, video views · store metric name, provider, value, observed_at, metric definition version · label delayed/unavailable provider data honestly.

## 16. Testing strategy

| Layer | Coverage |
|---|---|
| Unit | Validators, entitlement calcs, adapter normalization, retry rules |
| Integration | DB/RLS, billing webhooks, OAuth callbacks, queue lifecycle |
| Contract | Recorded/sandbox provider responses, schema drift checks |
| E2E | signup → subscribe → connect → compose → schedule → publish |
| Security | IDOR/RLS, webhook replay, OAuth state, upload abuse, secret leakage |
| Reliability | Worker crash, duplicate delivery, token expiry, rate limits, outage simulation |
| Visual | Responsive composer, calendar, long text, empty/error/loading states |

## 17. Build roadmap (milestones)

| # | Outcome | Exit criteria |
|---|---|---|
| 0. Foundation | Repo, design system, DB, CI, environments | Preview deploy; migrations + checks pass |
| 1. Identity | Auth, workspace, roles, onboarding | RLS tests prove tenant isolation |
| 2. Billing | Plans, Razorpay checkout/webhooks, entitlements | Replay-safe subscription lifecycle |
| 3. Connections | Meta + LinkedIn OAuth + account health | Connect, refresh, revoke verified |
| 4. Composer | Media, master/override content, validation, drafts | Autosave + previews across responsive sizes |
| 5. Publishing | Queue, worker, adapters, retries, status | Scheduled test publishes with no duplicates |
| 6. Operations | Calendar, notifications, admin, audit | Failure + recovery journeys operable |
| 7. Launch | Policies, monitoring, backups, app reviews | Paid pilot customers onboard safely |

## 18. Definition of done

- New paying customer completes onboarding without developer help.
- Customer connects ≥1 supported account via official OAuth.
- One master post adapted + published to multiple destinations independently.
- Scheduling works when the browser is closed.
- Temporary provider failure retries without duplicate publishing.
- Revoked token produces actionable reconnect state.
- Plan limits enforced server-side + visible before action.
- Tenant isolation, webhook verification, token encryption are tested.
- Mobile + desktop layouts pass visual + keyboard review.
- Admin can identify + resolve a failed customer job without accessing secrets.

## 19. Coding-agent master instruction

> Build the SocialFlow multi-tenant SaaS. Treat MUST requirements + Definition of Done as binding. Before coding, inspect the repo and produce an implementation plan grouped into vertical milestones. Use TypeScript, strict validation, official OAuth/API flows, server-only encrypted token handling, PostgreSQL RLS, idempotent webhooks, durable queue worker. No scraping/browser automation for social posting. Preserve premium editorial non-boxy UI (whitespace, typography, rails, timelines, split layouts, contextual sheets; avoid card grids). Implement one milestone at a time, run tests + type checks, summarize changed files. Don't mark a platform complete until connect, refresh, publish, retry, error, disconnect are verified. Ask only when a missing business decision materially changes data, security, billing or API behavior.

## 20. Environment variables checklist

| Group | Variables / secrets |
|---|---|
| Application | `APP_URL`, `API_URL`, `ENCRYPTION_KEY`, `CRON/WORKER_SECRET` |
| Supabase | URL, anon key, service-role key (server only) |
| Queue | `REDIS_URL` or managed queue credentials |
| Storage | bucket, endpoint, access key, secret, public/verified media domain |
| Meta | app ID, app secret, redirect URI, webhook verify token |
| LinkedIn | client ID, client secret, redirect URI |
| Razorpay | key ID, key secret, webhook secret, plan IDs |
| Email | SMTP/Resend API key, sender domain |
| Monitoring | Sentry DSN, release/environment metadata |

## 21. Product decisions to finalize before public launch

Final brand/domain + support identity · trial length or no-trial · exact plan limits + what counts as a destination · refund/cancellation/grace policy · supported countries/currencies · which Meta post formats pass app review · whether LinkedIn personal posting is included at launch · media retention after cancellation · approval rules for agency workspaces · support SLA + incident channel.

## 22. Official references (recheck during implementation)

- Meta Instagram Content Publishing — https://developers.facebook.com/documentation/instagram-platform/content-publishing
- Meta Pages Posts API — https://developers.facebook.com/documentation/pages-api/posts
- LinkedIn Posts API — https://learn.microsoft.com/en-us/linkedin/marketing/community-management/shares/posts-api
- TikTok Content Posting API — https://developers.tiktok.com/doc/content-posting-api-get-started
- X API pricing — https://docs.x.com/x-api/getting-started/pricing

## Appendix A — UX anti-patterns

No 4 metric cards + 6 feature cards on every page · no form section inside a bordered white rectangle · no gradients behind body copy · no critical publishing errors hidden in disappearing toasts · no generic green success when only some destinations published · no scheduling that depends on an open browser tab · no provider jargon without a plain-language action · don't imitate native network UI so closely users confuse preview with guaranteed rendering.

## Appendix B — Suggested repository structure

```
apps/
  web/                # Next.js product + marketing UI
  worker/             # delayed jobs, media, publishers
packages/
  db/                 # migrations, generated types, RLS tests
  ui/                 # tokens + accessible components
  social-core/        # adapter contract + normalized errors
  social-meta/  social-linkedin/  billing/  validation/
infra/                # deployment + environment docs
docs/                 # API evidence, runbooks, architecture decisions
```
