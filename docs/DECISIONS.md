# Open Decisions — finalize before public launch

From PRD §21. Status: **OPEN** until the user confirms. Coding continues with the "working assumption" until then.

| # | Decision | Working assumption | Blocks |
|---|---|---|---|
| 1 | Final domain / support identity | Product name = **Apogix** (confirmed). `support@` on chosen domain; all via `packages/config` | Launch, emails, OAuth app names |
| 2 | Trial length or no-trial | 14-day trial, config in DB (`plans.trial_days`) | M1 onboarding, M2 billing |
| 3 | Exact plan limits + what counts as a destination | PRD §11 numbers; destination = one publish operation to one account | M2 entitlements |
| 4 | Refund / cancellation / grace policy | Cancel at period end; 7-day grace on failed payment; refunds manual | M2 billing state machine |
| 5 | Supported countries / currencies | India + INR only at MVP (Razorpay) | M2 billing |
| 6 | Which Meta post formats pass app review | Image + text only for MVP; video/carousel = V1 pending review | M3/M4 capability checks |
| 7 | LinkedIn personal posting at launch? | Company pages only at MVP; personal behind flag | M3 LinkedIn adapter |
| 8 | Media retention after cancellation | 30-day recovery window, then delete | M7 retention jobs |
| 9 | Approval rules for agency workspaces | Optional per-workspace policy: "reapproval on edit" toggle | M6 approvals |
| 10 | Support SLA + incident communication channel | Email support, status page for incidents | M7 launch |

## Decision log

_Record confirmed decisions here with date + who._

- **2026-08-31** — Product name is **Apogix** (was placeholder "SocialFlow"). Still centralized in `packages/config`.
- **2026-08-31** — Marketing homepage: alternating light/dark editorial bands, cobalt accent. Draft at `marketing/index.html`, later ported into `apps/web`.
