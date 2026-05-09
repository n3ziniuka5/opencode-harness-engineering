# ADR: OpenCode Server Plugin Bundle

Status: Accepted

## Context

The repository needs to ship harness-engineering behavior to OpenCode users as reusable tools, agents, commands, and guardrails. The package also needs local development ergonomics and a stable npm package shape.

## Decision

Package the repository as an OpenCode v1 server plugin bundle with explicit plugin id `harness.hello-world`. Expose the built entrypoint through `package.json` exports `.` and `./server`. Register bundled agents and commands by mutating OpenCode config in the plugin config hook with `??=` so local user config wins.

## Tradeoffs

- A single plugin bundle keeps setup simple and makes tests target one package entrypoint.
- Config-hook registration lets the package ship agents and slash commands before OpenCode has a separate plugin API for every bundled capability.
- Using `??=` avoids surprising users but means local config can intentionally bypass bundled defaults.
- Keeping prompt-heavy definitions in `src/agents/` and `src/commands/` adds files but preserves a readable plugin entrypoint.

## Consequences

- Public contracts include package exports, plugin id, registered tool id, agent id, and command id.
- Tests should verify behaviorally important registration and prompt sentinels without snapshotting full prompts.
- Future agents, commands, and larger tools should follow the same source layout unless a later ADR supersedes this decision.
