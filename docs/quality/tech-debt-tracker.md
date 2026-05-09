# Technical Debt Tracker

## Current Debt

| Debt                                                                      | Priority | Cleanup plan                                                                                              |
| ------------------------------------------------------------------------- | -------- | --------------------------------------------------------------------------------------------------------- |
| No CI workflow exists yet.                                                | High     | Add CI that runs `pnpm run check` and `pnpm run build` once the repository is connected to a remote host. |
| No OpenCode integration smoke test boots the plugin through the real CLI. | Medium   | Choose a stable CLI invocation, then verify the package exposes the expected tool, agent, and command.    |
| Release responsibility and npm publishing process are undefined.          | Medium   | Define release responsibility, publish credentials, changelog expectations, and rollback process.         |

## Cleanup Rule

When a repeated issue appears in review, add a targeted debt item here. When the fix becomes clear and stable, encode it as a test, script, or CI check.

Track in-progress half-migrations, dead code, unused configs, stale feature flags, abandoned TODOs, deprecated endpoints, and similar cleanup work here while it remains active.
