# Apogix

Multi-tenant social publishing & scheduling SaaS. **Create once. Adapt intentionally. Publish everywhere.**

> Product name is **Apogix**. The PRD PDF says "SocialFlow" — that was a placeholder; treat every occurrence as Apogix. Brand values (name/logo/colors/domain/support email) live in `packages/config`.
> Marketing homepage draft: `marketing/index.html` (alternating light/dark bands, cobalt `#2547E6` accent) — port into `apps/web` marketing route during M0/M7.

## What this is
- Responsive web SaaS. **Not** a PHP/MySQL app — it lives in a WAMP folder only by accident of local path.
- Stack: Next.js (App Router, TS strict) + Supabase (Auth/Postgres/RLS) + BullMQ/Redis worker + R2 storage + Razorpay billing.
- Monorepo: pnpm workspaces + Turborepo. Structure in [docs/BUILD-PLAN.md](docs/BUILD-PLAN.md).

## Source of truth
- [docs/PRD.md](docs/PRD.md) — full product requirements. MUST = binding acceptance criteria.
- [docs/BUILD-PLAN.md](docs/BUILD-PLAN.md) — milestone-by-milestone build steps + progress tracker.
- [docs/DECISIONS.md](docs/DECISIONS.md) — open business decisions + working assumptions.

## Hard rules (never break)
- No access tokens in the browser. All publishing is server-side.
- No scraping / browser automation for social posting — official OAuth + APIs only.
- Every workspace-owned table has `workspace_id` + RLS.
- One publish job **per destination**, idempotency-keyed. Retries never double-post.
- Encrypt provider tokens at app level; `ENCRYPTION_KEY` lives outside the DB.
- Verify every webhook signature against the raw body; handlers are idempotent.
- Preserve the non-boxy editorial UI (PRD §4) — whitespace, rails, timelines, side sheets; avoid card grids.
- Brand name/logo/colors/domain/support email come from `packages/config` — never hard-coded.

## Workflow
- Build one milestone at a time. Each change: `pnpm typecheck && pnpm test && pnpm lint` green, then summarize changed files.
- A platform is not "done" until connect + token refresh + publish + retry + error + disconnect are all tested.
- Ask the user only when a missing decision materially changes data/security/billing/API behavior.

## Web app (`apps/web`)
Next.js 15 (App Router) + React 19 + TypeScript (strict) + Tailwind CSS v4 + `next/font`.
Standalone npm project for now — pnpm workspace / Turborepo comes later. Homepage = `apps/web/app/page.tsx` (+ `components/`, design system in `app/globals.css`).

```
cd apps/web
npm install
npm run dev         # http://localhost:3000
npm run build
npm run typecheck
```

Worker, db package, other milestones: not scaffolded yet.
