# OpenCode Harness Agents

OpenCode plugin bundle for harness-engineering agents, tools, and repository guardrails.

This starter ships one server plugin, `harness.hello-world`, that registers a `hello_world` tool and a `human_plan` agent. The repository is structured so future agents, skills, and checks are easy for OpenCode agents to discover and maintain.

## Quick Start

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

## Repository Map

- `AGENTS.md`: agent-facing entry point and table of contents.
- `ARCHITECTURE.md`: package boundaries and runtime shape.
- `src/index.ts`: OpenCode v1 server plugin module.
- `src/agents/human-plan.ts`: `human_plan` agent prompt and config.
- `test/hello-world.test.ts`: executable contract tests for the starter plugin.
- `docs/index.md`: knowledge-base index for harness-engineering documentation.
- `scripts/check-docs.ts`: mechanical check that required knowledge files exist and are linked.

## Harness-Engineering Posture

This repo follows the harness-engineering principles summarized in `docs/references/harness-engineering.md`:

- Keep `AGENTS.md` short and use it as a map, not a manual.
- Store durable project knowledge in versioned docs.
- Prefer agent-legible code, predictable boundaries, and explicit package entrypoints.
- Encode important rules as tests or scripts so future agents receive fast feedback.
