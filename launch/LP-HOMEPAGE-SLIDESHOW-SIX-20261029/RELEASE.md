# Six-gallery homepage slideshow — release handoff

Status: prepared for review; **not approved for production and not deployed**.

- Request: Sean, #lp-website message `1565476864779096145` (reported by LP Website; production approval has not been established for this new request).
- Base: released GitHub `main` commit `4ed3f76e03caffd1de960364ea9d2390b16a5f61` (previous CMS-only image release).
- Candidate: branch `feat/home-slideshow-six-20261029`, exact branch tip to be verified before any release.
- Scope: add three entries to `src/components/sections/HeroSlideshow.tsx`, after Roll Labels, Stickers, and Spot UV: Standard Mylar Bags, Standard Retractable Banners, SEG 10×8 Backdrops. No other product/CMS logic or content changes.
- Why Standard Mylar path: the aggregate `/services/packaging/mylar-bags` gallery has zero published images and would render a placeholder. `/services/packaging/mylar-bags/standard` is the published product gallery for Mylar Bags and has one image. No local fallback restored.
- Live read-only gallery API counts at preparation: Roll Labels 3, Stickers 2, Spot UV 2, Standard Mylar Bags 1, Standard Retractable Banners 2, SEG 10×8 Backdrops 1. Published content can change before release; recheck at release time.
- Local QA on isolated worktree: `git diff --check` pass; focused ESLint pass; `npm run build` pass (TypeScript and 124 static pages); local production server `/` returned HTTP 200 and initial HTML contained Sanity-sourced images for all six slide paths. Server stopped.
- Exclusions: unrelated dirty files/caches in the LP Website source worktree and the historical shared `projects/lettuceprint` checkout are excluded. This branch starts from the clean released main commit.
- Release gate: obtain explicit exact-scope go-live approval from Steve or Sean; verify immutable sender ID and message ID; check the final branch diff, Preview and desktop/mobile visual behavior; merge/deploy only after that approval and QA. `www.lettuceprint.com` remains a separate site from this Vercel project.
