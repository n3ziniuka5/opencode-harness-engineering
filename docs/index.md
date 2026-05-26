# Documentation Index

This directory is the repository system of record for durable product, feature, architecture, engineering, quality, operational, and reference knowledge.

## Files

| File | Purpose | Read when |
| ---- | ------- | --------- |
| [`../README.md`](../README.md) | Human-facing project overview, setup, usage, and package scripts. | You need to install dependencies, run checks, build, or load the plugin. |
| [`../ARCHITECTURE.md`](../ARCHITECTURE.md) | High-level package shape, runtime boundaries, and key flows. | You need the shortest architecture overview before deeper docs. |
| [`product/index.md`](product/index.md) | Product intent, users, journeys, and done rules. | You need to understand who the plugin serves and what success means. |
| [`features/index.md`](features/index.md) | Durable behavior notes for bundled plugin capabilities. | You are changing a tool, agent, command, or user-visible feature. |
| [`architecture/index.md`](architecture/index.md) | Detailed architecture boundaries, contracts, dependency rules, and ADRs. | You are changing package shape, public seams, or dependencies. |
| [`engineering/index.md`](engineering/index.md) | Coding, testing, security, reliability, performance, release, and validation rules. | You are implementing or reviewing code changes. |
| [`generated/index.md`](generated/index.md) | Generated or source-derived documentation map. | You need to know what generated references exist and how to refresh them. |
| [`exec-plans/index.md`](exec-plans/index.md) | Lifecycle rules for task-specific execution plans. | A task needs a checked-in plan or a completed-plan archive decision. |
| [`quality/index.md`](quality/index.md) | Quality scorecard, debt tracker, and cleanup process. | You are assessing risk, prioritizing cleanup, or updating quality posture. |
| [`references/index.md`](references/index.md) | Repo-specific external and vendor references. | You need source links or local notes for OpenCode, GPT prompting, or harness engineering. |

Run `pnpm run docs:check` after changing this map or any scaffold index.
