# Medusa integration — blocked, default OFF

This branch contains a **dormant quote client only**, not an integrated cart or checkout.
No existing calculator, cart context, checkout, webhook or customer-facing page changed.
`NEXT_PUBLIC_COMMERCE_BACKEND` defaults to `legacy`; `medusa` does not yet switch customer flows.
Do not enable or deploy this as a functional Medusa integration.

The builder's actual Docker runtime has no Node/npm/Postgres and cannot resolve the npm
registry or nodejs.org. Thus SDK installation, lint, builds (both flags), legacy tests,
HTTP integration, browser checkout and admin evidence could not run. No Stripe keys loaded.

Next: repair the authorized runtime externally, verify pinned installed Medusa docs, finish
backend routes and completion protection, install @medusajs/js-sdk at a verified compatible
version, then wire calculator → persistent Medusa cart → Stripe Elements → order confirmation.
Keep legacy checkout default. Never silently fall back to legacy payment after a Medusa
payment has started. Bind product/variant identity, enforce one job per line, revalidate
server prices at completion and preserve all line-item artwork and production metadata.
