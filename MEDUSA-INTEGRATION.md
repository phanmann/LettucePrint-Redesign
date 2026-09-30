# Medusa integration — Railway-backed Preview; Production OFF

## Current release state

The `feat/medusa-integration` branch contains the Medusa-backed sticker quote, persistent
cart, Stripe Elements checkout code, payment-recovery safeguards, and order confirmation.
It is connected to the Railway **staging** backend only in Vercel Preview.

Phase 4 verified the Preview quote-to-cart path against Railway: a 100-sticker quote was
priced at $70, added to a real Medusa cart, and displayed as a $70 cart total. No payment
or checkout submission was attempted. The Railway readiness endpoint and API requests were
healthy during that check.

Production remains on `main` with the legacy commerce path. Medusa is not approved for a
production release, and merging this branch is not authorization to enable it in Production.

## Environment controls

`NEXT_PUBLIC_COMMERCE_BACKEND` is fail-closed: every value other than the exact string
`medusa` uses the legacy commerce path. The following settings belong in Vercel's
**Preview** scope only:

| Variable | Preview value | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_COMMERCE_BACKEND` | `medusa` | Enables the Medusa sticker pilot. |
| `NEXT_PUBLIC_MEDUSA_BACKEND_URL` | Railway staging API URL | Routes browser requests to staging. |
| `NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY` | Railway staging publishable key | Authorizes Store API access; it is browser-visible by design. |

Safety boundaries:

- Do not add these Medusa values to Vercel Production before explicit release approval.
- Keep `NEXT_PUBLIC_MEDUSA_PRIVATE_ARTWORK` unset in hosted Preview and Production. Its
  `dev-private` mode is for controlled local development and is not compatible with the
  current hosted ownership policy.
- Use Stripe **test-mode** keys only for Phase 5 Preview checkout validation. Never place
  Stripe live-mode credentials in Preview.
- Keep Railway `STORE_CORS` restricted to exact approved Vercel origins. Do not replace
  the allowlist with `*`. If the stable branch alias changes, update the exact origin and
  redeploy the Railway API before browser QA.
- All `NEXT_PUBLIC_*` values ship to the browser. Never store a secret in one of them.

## Deployment and CI separation

Vercel's Git integration creates Preview deployments for non-production branches. The
repository CI workflow only installs dependencies, lints, runs deterministic contract and
browser tests, and compiles both `legacy` and `medusa` commerce paths. The Medusa build uses
inert build-only placeholders; CI has no Vercel or Railway credentials and does not deploy,
create carts, submit payments, or alter data. Hosted Medusa browser acceptance remains a
separate Phase 5 staging gate.

Pushes to `main` still trigger the existing Vercel Production integration. Therefore the
storefront pull request must remain a draft until the Phase 5 checkout, webhook,
idempotency, rollback, and release checks pass.

## Local development

Copy `.env.example` to `.env.local`. Leaving `NEXT_PUBLIC_COMMERCE_BACKEND=legacy` exercises
the normal site without Medusa. For controlled local Medusa testing, set it to `medusa`,
point `NEXT_PUBLIC_MEDUSA_BACKEND_URL` at the intended local or staging API, and provide its
matching publishable key. Never commit `.env.local` or real credentials.

## Phase 5 release gate

Before production approval, use test mode to prove that one successful payment produces
exactly one order, webhook retries cannot duplicate orders, declines and authentication
recover safely, server prices remain authoritative, and rollback preserves existing carts.
Private-artwork hosting, rate limits, backup/restore, shipping, tax, and Railway cost/health
checks must also be resolved. If a payment attempt has started, never silently fall back to
the legacy payment path.
