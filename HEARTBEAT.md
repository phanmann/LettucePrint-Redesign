# Heartbeat Tasks

These tasks run on a schedule via OpenClaw's cron system. One task per line, blank lines ignored, comments start with `#`.

## Weekly Self-Audit (Sundays 2am)
- Run memory review, check for stale todos, verify active projects
- Schedule: `0 2 * * 0` (Sunday 2am ET)

## Daily Memory Consolidation (Daily 11pm)
- Check if a memory file exists for today; if not, create a stub
- Schedule: `0 23 * * *` (11pm ET)

## Project Health Check (Mondays 9am)
- Verify Vercel deployments, check for uncommitted changes, review open tasks
- Schedule: `0 9 * * 1` (Monday 9am ET)
