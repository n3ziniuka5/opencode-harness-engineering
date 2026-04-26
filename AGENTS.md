# Agent Map

This repository is an OpenCode plugin bundle for harness-engineering agents. Keep this file short: it is the table of contents, not the encyclopedia.

## Start Here

- `README.md`: setup, local checks, and OpenCode usage.
- `ARCHITECTURE.md`: runtime shape, package exports, and boundaries.
- `docs/index.md`: full knowledge-base map.
- `docs/references/harness-engineering.md`: local summary of the OpenAI harness-engineering article and how this repo applies it.
- `docs/references/opencode-plugin-reference.md`: OpenCode plugin contract discovered from `../opencode`.
- `docs/references/openai-gpt-5.5-prompting.md`: GPT-5.5 model and prompting references used for bundled agent prompts.

## Engineering Rules

- Prefer the smallest correct change.
- Keep plugin behavior explicit and easy for future agents to inspect.
- Add or update tests when plugin behavior changes.
- Update docs when architecture, package entrypoints, agent behavior, or operating rules change.
- Run `pnpm run check` before handing off when dependencies are installed.

## Knowledge Base

- `docs/design-docs/core-beliefs.md`: project beliefs for agent-first development.
- `docs/exec-plans/README.md`: how to write execution plans.
- `docs/exec-plans/active/README.md`: index for active plans.
- `docs/exec-plans/completed/README.md`: index for completed plans.
- `docs/exec-plans/tech-debt-tracker.md`: known debt and cleanup queue.
- `docs/references/openai-gpt-5.5-prompting.md`: source links and local rules for GPT-5.5 prompts.
- `docs/QUALITY_SCORE.md`: current quality rubric and gaps.
- `docs/RELIABILITY.md`: reliability expectations for plugins and tools.
- `docs/SECURITY.md`: security expectations for plugin development.

## Current Plugin

- Plugin id: `harness.hello-world`
- Source: `src/index.ts`
- OpenCode package export: `./server`
- Tool id: `hello_world`
- Agent id: `human_plan`
- Agent source: `src/agents/human-plan.ts`
- Local config: `opencode.json`
