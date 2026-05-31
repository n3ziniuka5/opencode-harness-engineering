# Architecture Decision Records

ADR files preserve durable decisions, context, tradeoffs, and consequences. Do not rewrite old ADRs to make them look current; mark outdated decisions as `Superseded` and link to the replacement.

## Files

| File | Purpose | Read when |
| ---- | ------- | --------- |
| [`2026-05-09-opencode-server-plugin-bundle.md`](2026-05-09-opencode-server-plugin-bundle.md) | Superseded decision to package this repository as an OpenCode server plugin bundle with config-registered agents and commands. | You need historical context for the original package shape and plugin id. |
| [`2026-05-31-npm-release-automation-and-package-identity.md`](2026-05-31-npm-release-automation-and-package-identity.md) | Current decision for npm package identity, plugin id, Release Please, and npm Trusted Publishing. | You are changing package identity, release automation, or publishing setup. |

## Naming

Use `YYYY-MM-DD-short-decision.md` with lowercase words separated by hyphens.

## Status Values

- `Proposed`: under discussion and not yet the source of truth.
- `Accepted`: current decision.
- `Superseded`: replaced by a newer decision; include a link to the replacement.
- `Rejected`: considered and intentionally not adopted.

## When To Add An ADR

Add an ADR when a decision changes architecture shape, responsibility boundaries, persistence, public contracts, deployment topology, major dependencies, or durable engineering process. Do not add ADRs for routine implementation details.
