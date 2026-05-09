# Agent Map

This repository is an OpenCode plugin bundle for harness-engineering agents. Keep this file short: it is a table of contents and operating rule map, not the encyclopedia.

## Start Here

- `README.md`: human setup, local development, usage, and package scripts.
- `ARCHITECTURE.md`: high-level package shape, runtime boundaries, and key flows.
- `docs/index.md`: full knowledge-base map for product, features, architecture, engineering, quality, and references.

## Operating Rules

- Prefer the smallest correct change that preserves explicit plugin behavior.
- Keep relevant Markdown docs updated when behavior, architecture, product decisions, package entrypoints, agent behavior, or operating rules change.
- Add or update tests when plugin behavior changes.
- Run `pnpm run check` before handing off when dependencies are installed.

## Anti-Bloat Rule

Do not create or update docs for:

- trivial implementation details obvious from code
- temporary debugging notes
- one-off plans after completion unless they preserve durable decisions
- generated facts that should come from source or tooling
- speculative future ideas without an owner

## Current Plugin

Plugin id `harness.hello-world` exports an OpenCode server plugin from `src/index.ts`, registers the `hello_world` tool, registers the `human_plan` agent from `src/agents/human-plan.ts`, and registers `/init-harness-engineering` from `src/commands/init-harness-engineering.ts`.
