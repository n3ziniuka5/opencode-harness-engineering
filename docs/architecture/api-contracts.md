# API Contracts

## NPM Package Contract

Source of truth: `package.json`.

The package name is `opencode-harness-agents`. It is ESM (`type: module`) and exposes TypeScript declarations plus JavaScript output from `dist/`. The public exports are `.` and `./server`, both resolving to `dist/index.js` with declarations at `dist/index.d.ts`.

## OpenCode Plugin Contract

Source of truth: `src/index.ts`.

The default export is a plugin module with explicit id `harness.agents` and a `server` function. The server returns a config hook.

## Agent Contract

Source of truth: `src/agents/explore.ts`, `src/agents/plan.ts`, `docs/features/opencode-plugin/explore-agent.md`, and `docs/features/opencode-plugin/plan-agent.md`.

`explore` is assigned to `config.agent.explore`. It is a read-only subagent using `openai/gpt-5.4-mini` with variant `low`; its permissions deny wildcard access, edits, nested tasks, and todowrite, while allowing local read/search tools, read-only bash when needed, and documentation tools. Because OpenCode also has a native `explore` agent, this config replaces the native key when present.

`plan` is assigned to `config.agent.plan`. Its prompt requirements include a plan-specific `# Discovery` section for repository context and durable docs, identifying documentation files for implementers to revisit, and conforming generated plans to relevant repository documentation and local instructions discovered during planning. Changes to id, mode, model, variant, prompt requirements, permissions, or active plan path are user-visible behavior changes.

## Command Contract

Source of truth: `src/commands/init-harness-engineering.ts` and `docs/features/opencode-plugin/init-harness-engineering-command.md`.

`init-harness-engineering` is registered through `config.command["init-harness-engineering"] ??=` and is surfaced as `/init-harness-engineering`. The command template includes `$ARGUMENTS` and intentionally leaves `agent`, `model`, and `subtask` unset.

## Local Development Config Contract

Source of truth: `opencode.json`.

Local OpenCode usage loads `./src/index.ts` without plugin options.

## Documentation Scaffold Contract

Source of truth: `src/commands/init-harness-engineering.ts`, this `docs/` scaffold, and `scripts/check-docs.ts` for this repository.

The scaffold requires concise index tables for documentation directories, execution-plan lifecycle rules without child plan indexes, and generated documentation headers when generated references are created.
