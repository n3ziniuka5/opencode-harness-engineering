# ADR: OpenCode Server Plugin Bundle

Status: Superseded by [ADR: npm Release Automation and Package Identity](2026-05-31-npm-release-automation-and-package-identity.md)

## Context

The repository needs to ship harness-engineering behavior to OpenCode users as reusable agents, commands, and guardrails. The package also needs local development ergonomics and a stable npm package shape.

## Decision

Package the repository as an OpenCode v1 server plugin bundle with explicit plugin id `harness.agents`. Expose the built entrypoint through `package.json` exports `.` and `./server`. Register bundled agents and commands by mutating OpenCode config in the plugin config hook. Assign bundled agent configs directly so bundled agents override OpenCode defaults or same-named user entries; use `??=` only for command registration so local user command config wins.

## Tradeoffs

- A single plugin bundle keeps setup simple and makes tests target one package entrypoint.
- Config-hook registration lets the package ship agents and slash commands before OpenCode has a separate plugin API for every bundled capability.
- Direct agent assignment ensures bundled agent behavior replaces OpenCode defaults or same-named user entries while the plugin is loaded.
- Command registration still uses `??=` to avoid surprising users with local slash-command overrides.
- Keeping prompt-heavy definitions in `src/agents/` and `src/commands/` adds files but preserves a readable plugin entrypoint.

## Consequences

- Public contracts include package exports, plugin id, registered agent ids, and command id.
- Tests should verify behaviorally important registration and prompt sentinels without snapshotting full prompts.
- Future agents, commands, and larger tools should follow the same source layout unless a later ADR supersedes this decision.
