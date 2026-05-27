# OpenCode Harness Agents

OpenCode plugin bundle for harness-engineering agents, commands, and repository guardrails.

This package ships one server plugin, `harness.agents`, that registers `explore`, `ask`, `brainstorm`, and `draft` agents plus an `/init-harness-engineering` command. It disables OpenCode's native `plan` agent to avoid native plan-mode reminders conflicting with the bundled planning workflow. The repository is structured so future agents, skills, and checks are easy for OpenCode agents to discover and maintain.

## Quick Start

Requirements:

- Node.js `>=22`
- pnpm `10.33.2` as declared by `packageManager`
- OpenCode `>=1.14.0` when loading the plugin in OpenCode

Install dependencies:

```sh
pnpm install
```

Run all local checks:

```sh
pnpm run check
```

Build the package:

```sh
pnpm run build
```

Run individual checks while iterating:

```sh
pnpm run typecheck
pnpm run test
pnpm run docs:check
pnpm run format:check
```

## OpenCode Usage

This repository includes `opencode.json` that loads the local TypeScript plugin:

```json
{
  "$schema": "https://opencode.ai/config.json",
  "plugin": ["./src/index.ts"]
}
```

For a built npm package, OpenCode resolves the server plugin from the `./server` export:

```json
{
  "$schema": "https://opencode.ai/config.json",
  "plugin": ["opencode-harness-agents"]
}
```

After loading or upgrading the plugin, restart OpenCode so config-time agent and command definitions are reloaded. Then run `/init-harness-engineering` in a target repository to ask the active agent to create or update a harness-engineering documentation scaffold. The command inspects existing repository context, preserves useful docs, and uses `$ARGUMENTS` as optional focus or constraints.

The plugin configures `explore` as a cheap, high-volume read-only discovery subagent, `ask` as a precise answer agent, `brainstorm` as a creative option-generation agent, and `draft` as the human-reviewed planning agent. `ask`, `brainstorm`, and `draft` delegate non-trivial discovery to parallel `explore` subagents. Bundled agents ship explicit sampling controls (`explore.temperature = 0.5`, `ask.temperature = 0.1`, `brainstorm.temperature = 0.8`, `draft.temperature = 0.2`, shared `top_p = 0.97`) and their agent entries are assigned directly so the bundled config overrides same-named user entries while the plugin is loaded. The native `plan` entry is set to `{ disable: true }`, and `default_agent: "plan"` is rewritten to `"draft"`; after upgrading, restart OpenCode and select `draft` for implementation-plan drafting.

## Repository Map

- `AGENTS.md`: agent-facing entry point and table of contents.
- `ARCHITECTURE.md`: package boundaries and runtime shape.
- `src/index.ts`: OpenCode v1 server plugin module.
- `src/agents/ask.ts`: `ask` primary answer agent prompt, sampling, and config.
- `src/agents/brainstorm.ts`: `brainstorm` primary ideation agent prompt, sampling, and config.
- `src/agents/discovery.ts`: shared discovery prompt section used by GPT-5.5 agents.
- `src/agents/explore.ts`: `explore` subagent prompt, sampling, and read-only config.
- `src/agents/draft.ts`: `draft` agent prompt, sampling, and config.
- `src/agents/sampling.ts`: shared sampling constants for bundled agents.
- `src/commands/init-harness-engineering.ts`: `/init-harness-engineering` command prompt and config.
- `test/plugin.test.ts`: executable contract tests for the plugin and bundled agents.
- `test/init-harness-engineering-command.test.ts`: executable contract tests for the documentation scaffold command.
- `docs/index.md`: scaffolded knowledge-base index for product, feature, architecture, engineering, quality, and reference docs.
- `scripts/check-docs.ts`: mechanical check that required scaffold docs exist and index tables stay valid.

## Package Scripts

| Script                  | Purpose                                                            |
| ----------------------- | ------------------------------------------------------------------ |
| `pnpm run build`        | Remove `dist/` and compile TypeScript declarations and ESM output. |
| `pnpm run check`        | Run typecheck, test, and docs validation.                          |
| `pnpm run clean`        | Remove build output.                                               |
| `pnpm run docs:check`   | Verify required scaffold docs and index tables.                    |
| `pnpm run format`       | Format the repository with Prettier.                               |
| `pnpm run format:check` | Check Prettier formatting without writing changes.                 |
| `pnpm run prepack`      | Build before packaging.                                            |
| `pnpm run test`         | Run Node test files through `tsx`.                                 |
| `pnpm run typecheck`    | Typecheck source, tests, and scripts with no emit.                 |

## Harness-Engineering Posture

This repo follows the harness-engineering principles summarized in `docs/references/harness-engineering.md`:

- Keep `AGENTS.md` short and use it as a map, not a manual.
- Store durable project knowledge in versioned docs.
- Prefer agent-legible code, predictable boundaries, and explicit package entrypoints.
- Encode important rules as tests or scripts so future agents receive fast feedback.
