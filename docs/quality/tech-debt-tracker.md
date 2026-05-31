# Technical Debt Tracker

## Current Debt

| Debt | Priority | Cleanup plan |
| --- | --- | --- |
| No OpenCode integration smoke test boots the plugin through the real CLI. | Medium | Choose a stable CLI invocation, then verify the package exposes the expected tool, agent, and command. |
| First npm Trusted Publishing run is not yet proven in production. | Medium | Validate the first Release Please release and npm publish workflow after repository secrets are set. |

## Cleanup Rule

When a repeated issue appears in review, add a targeted debt item here. When the fix becomes clear and stable, encode it as a test, script, or CI check.

Track in-progress half-migrations, dead code, unused configs, stale feature flags, abandoned TODOs, deprecated endpoints, and similar cleanup work here while it remains active.
