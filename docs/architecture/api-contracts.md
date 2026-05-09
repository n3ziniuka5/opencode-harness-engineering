# API Contracts

## NPM Package Contract

Source of truth: `package.json`.

The package name is `opencode-harness-agents`. It is ESM (`type: module`) and exposes TypeScript declarations plus JavaScript output from `dist/`. The public exports are `.` and `./server`, both resolving to `dist/index.js` with declarations at `dist/index.d.ts`.

## OpenCode Plugin Contract

Source of truth: `src/index.ts`.

The default export is a plugin module with explicit id `harness.hello-world` and a `server` function. The server returns a config hook and a `tool` map.

## Tool Contract

Source of truth: `src/index.ts` and `docs/features/opencode-plugin/hello-world-tool.md`.

`hello_world` accepts optional `name`, returns `{ output, metadata }`, and records OpenCode tool metadata. Changes to arg shape, return shape, metadata, or default greeting behavior are public behavior changes and need tests.

## Agent Contract

Source of truth: `src/agents/human-plan.ts` and `docs/features/opencode-plugin/human-plan-agent.md`.

`human_plan` is registered through `config.agent.human_plan ??=`. Changes to id, mode, model, variant, prompt requirements, permissions, or active plan path are user-visible behavior changes.

## Command Contract

Source of truth: `src/commands/init-harness-engineering.ts` and `docs/features/opencode-plugin/init-harness-engineering-command.md`.

`init-harness-engineering` is registered through `config.command["init-harness-engineering"] ??=` and is surfaced as `/init-harness-engineering`. The command template includes `$ARGUMENTS` and intentionally leaves `agent`, `model`, and `subtask` unset.

## Local Development Config Contract

Source of truth: `opencode.json`.

Local OpenCode usage loads `./src/index.ts` and passes the `greeting` option `Hello from the harness engineering plugin`.

## Documentation Scaffold Contract

Source of truth: `src/commands/init-harness-engineering.ts`, this `docs/` scaffold, and `scripts/check-docs.ts` for this repository.

The scaffold requires concise index tables for documentation directories, execution-plan lifecycle rules without child plan indexes, and generated documentation headers when generated references are created.
