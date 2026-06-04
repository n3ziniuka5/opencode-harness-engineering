# Agent Map

This repository is an OpenCode plugin bundle for harness-engineering agents. Keep this file short: it is a table of contents and operating rule map, not the encyclopedia.

## Start Here

- `README.md`: brief user-facing overview, setup, usage, and essential development info; avoid implementation/internal details irrelevant to users.
- `ARCHITECTURE.md`: high-level package shape, runtime boundaries, and key flows.
- `docs/index.md`: full knowledge-base map for product, features, architecture, engineering, quality, and references.

## Operating Rules

- Prefer the smallest correct change that preserves explicit plugin behavior.
- Keep relevant Markdown docs updated when behavior, architecture, product decisions, package entrypoints, agent behavior, or operating rules change.
- Before changing documentation, read `docs/index.md`. For each target doc, read the whole file when it is short; otherwise inspect its purpose, headings/table of contents, the section being changed, and enough surrounding context to edit safely. Also follow any relevant parent/sibling `index.md`, lifecycle, generated-doc, or local instruction guidance.
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

Plugin id `n3ziniuka5.opencode-harness-engineering` exports an OpenCode server plugin from `src/index.ts`, registers the `explore`, `ask`, `brainstorm`, and `draft` agents from `src/agents/`, disables OpenCode's native `plan` agent, and registers `/init-harness-engineering` from `src/commands/init-harness-engineering.ts`.
