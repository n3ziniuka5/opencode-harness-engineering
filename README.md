# OpenCode Harness Agents

OpenCode plugin bundle for harness-engineering agents, tools, and repository guardrails.

This starter ships one server plugin, `harness.hello-world`, that registers a `hello_world` tool, a `human_plan` agent, and an `/init-harness-engineering` command. The repository is structured so future agents, skills, and checks are easy for OpenCode agents to discover and maintain.

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
  "plugin": [
    [
      "./src/index.ts",
      { "greeting": "Hello from the harness engineering plugin" }
    ]
  ]
}
```

For a built npm package, OpenCode resolves the server plugin from the `./server` export:

```json
{
  "$schema": "https://opencode.ai/config.json",
  "plugin": ["opencode-harness-agents"]
}
```

After loading the plugin, run `/init-harness-engineering` in a target repository to ask the active agent to create or update a harness-engineering documentation scaffold. The command inspects existing repository context, preserves useful docs, and uses `$ARGUMENTS` as optional focus or constraints.

## Repository Map

- `AGENTS.md`: agent-facing entry point and table of contents.
- `ARCHITECTURE.md`: package boundaries and runtime shape.
- `src/index.ts`: OpenCode v1 server plugin module.
- `src/agents/human-plan.ts`: `human_plan` agent prompt and config.
- `src/commands/init-harness-engineering.ts`: `/init-harness-engineering` command prompt and config.
- `test/hello-world.test.ts`: executable contract tests for the starter tool and agent.
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
