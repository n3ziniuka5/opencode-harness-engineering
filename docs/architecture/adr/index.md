# Architecture Decision Records

This directory records durable architecture decisions for the OpenCode harness agents plugin bundle.

## Files

| File | Purpose | Read when |
| ---- | ------- | --------- |
| [`2026-05-09-opencode-server-plugin-bundle.md`](2026-05-09-opencode-server-plugin-bundle.md) | Decision to package this repository as an OpenCode server plugin bundle with config-registered agents and commands. | You are changing package shape, plugin registration, or bundled OpenCode capabilities. |

## ADR Rules

Use file names like `YYYY-MM-DD-short-decision.md`, using the decision date and a short kebab-case slug. Status values are `Proposed`, `Accepted`, `Superseded`, or `Rejected`. Add a new ADR when a decision changes package shape, runtime boundaries, public contracts, security posture, or long-term operating rules.
