# JOJA Capital — Website

Next.js 14 (App Router) site for JOJA Capital, deployed on Cloudflare Pages with Cloudflare D1 (content) and R2 (image uploads). All public content (hero, about, services, deals, team, contact, footer) is editable from the hidden admin panel at `/studio`.

## Local development

```bash
npm install
npm run db:migrate:local   # creates the local D1 schema (one-time, or after new migrations)
npm run dev
```

Local dev uses `@cloudflare/next-on-pages`'s dev-platform shim, so D1 and R2 bindings are emulated locally via Miniflare — no live Cloudflare account needed to develop. The admin password for local dev comes from `.dev.vars` (gitignored; see `.dev.vars.example`).

Visit `/studio` for the admin login.

## Building

```bash
npm run build          # plain `next build` — the correctness gate
npm run pages:build # `@cloudflare/next-on-pages@1.13.6` transform for Cloudflare Pages (Linux/WSL only — the underlying Vercel CLI needs bash and does not run natively on Windows)
```

## Deploying

Push to `main` — Cloudflare Pages is configured to auto-build and deploy on push (see project owner for the exact dashboard setup steps).

**`vercel` is pinned as a devDependency (`39.1.2`)** — `@cloudflare/next-on-pages` internally shells out to `npx vercel build` to convert Next's output into the Vercel Build Output API format it then adapts for Cloudflare. Since `next-on-pages`'s peer dependency on `vercel` has no upper bound (`>=30.0.0`), an unpinned `npx vercel build` drifts to whatever the latest `vercel` release is. Newer `vercel` releases (confirmed with `56.2.0`) produce a build manifest where the root path `/` is incorrectly mapped as a static override to Next's internal `not-found.txt` placeholder instead of the actual homepage function — every other route is unaffected, only `/`. Pinning `vercel` to the version current when this `next-on-pages` release shipped avoids the regression. If `next-on-pages` is ever upgraded, re-verify this pin (or drop it if the issue's been fixed upstream).

## Content model

All editable content lives in one D1 table, `content(key, value, updated_at)`, one JSON blob per section (`hero`, `about`, `services`, `deals`, `team`, `contact`, `footer`). See [lib/types.ts](lib/types.ts) for shapes and [lib/defaults.ts](lib/defaults.ts) for placeholder content shown until an admin edits a section.

Images are uploaded to the `IMAGES` R2 bucket via `/studio/api/upload` and served back publicly through `/api/images/[key]`.
