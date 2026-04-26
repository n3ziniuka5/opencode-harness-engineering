# Knowledge Base

This directory is the repository system of record. `AGENTS.md` points here so agents can progressively disclose only the context they need.

## Core Docs

- `../README.md`: setup and OpenCode usage.
- `../ARCHITECTURE.md`: package boundaries and runtime design.
- `design-docs/core-beliefs.md`: agent-first principles for this plugin bundle.
- `references/harness-engineering.md`: harness-engineering reference summary.
- `references/opencode-plugin-reference.md`: OpenCode plugin reference extracted from the adjacent repo.

## Operating Docs

- `exec-plans/README.md`: execution-plan process.
- `exec-plans/active/README.md`: active plan index.
- `exec-plans/completed/README.md`: completed plan index.
- `exec-plans/tech-debt-tracker.md`: cleanup queue.
- `QUALITY_SCORE.md`: current quality score and known gaps.
- `RELIABILITY.md`: reliability expectations.
- `SECURITY.md`: security expectations.

## Maintenance

Run `pnpm run docs:check` after changing this map. The check ensures required docs exist and remain linked from `AGENTS.md`.
