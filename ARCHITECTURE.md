# Architecture

This package is a TypeScript OpenCode server plugin. It uses pnpm for reproducible local development and emits ESM JavaScript into `dist/`.

See `docs/architecture/index.md` for detailed boundaries, dependency rules, API contracts, data-model notes, and ADRs.

## Package Shape

- `src/index.ts` default-exports an OpenCode v1 plugin module: `{ id, server }`.
- `package.json` exposes both `.` and `./server` to `dist/index.js`.
- OpenCode npm plugin loading prefers `exports["./server"]` for server plugins.
- `main` remains pointed at `dist/index.js` as a fallback for loaders that inspect package main.
- The server plugin registers bundled OpenCode agents and commands through the `config` hook by mutating `config.agent` and `config.command` before OpenCode resolves them.

## Runtime Boundary

- The plugin imports only `@opencode-ai/plugin` at runtime.
- The server function returns OpenCode hooks, bundled agent/command configuration, and custom tools.
- Tool implementations should return structured metadata when useful so agent runs are easier to inspect.
- Agent definitions should keep prompts and static config in `src/agents/` once the prompt is large enough to obscure the plugin entrypoint.
- Command definitions should keep prompts and static config in `src/commands/` once the prompt is large enough to obscure the plugin entrypoint.
- Plugin options are treated as untrusted input and normalized before use.

## Key Flows

- Local OpenCode loading uses `opencode.json`, which points to `./src/index.ts` and passes a `greeting` option.
- Package consumers load the built package through `exports["./server"]`, which resolves to `dist/index.js`.
- During plugin initialization, OpenCode calls `server(input, options)`, the plugin normalizes the `greeting` option, and the returned hooks expose the tool and config mutation hook.
- During config resolution, the plugin uses `??=` to register `human_plan` and `init-harness-engineering` without overwriting user-defined config entries.

## Source Layout

- `src/index.ts`: plugin entrypoint, config-hook registration, tool registration, and exports.
- `src/agents/human-plan.ts`: `human_plan` agent prompt and OpenCode agent config.
- `src/commands/init-harness-engineering.ts`: `/init-harness-engineering` command prompt and OpenCode command config.
- `test/`: executable plugin contract tests.
- `scripts/`: repository guardrails that agents and CI can run.
- `docs/`: durable project knowledge and harness-engineering operating docs.

## Bundled Agents

- `human_plan`: non-native planning agent for human-reviewed implementation plans. It is named to avoid clashing with OpenCode's built-in `plan` agent.
- `human_plan` uses `openai/gpt-5.5` with the `high` variant and an outcome-first prompt shaped by the OpenAI GPT-5.5 prompting references.
- `human_plan` denies edits by default except dated active plan files under `docs/exec-plans/active/`, allows read-oriented discovery tools, `webfetch`, `skill`, `todowrite`, narrow user questions, and only allows task delegation to the read-oriented `explore` agent. It does not explicitly grant bash through an agent-level permission override, but bash is still available as a tool and can be used if the agent chooses to use it.

## Bundled Commands

- `/init-harness-engineering`: config command registered as `config.command["init-harness-engineering"]`.
- The command leaves `agent`, `model`, and `subtask` unset so it runs with the user's current/default implementation agent and normal file-edit permissions.
- The command prompt is static and does not access the filesystem during plugin initialization. It instructs the active agent to inspect high-signal repository context, preserve useful existing documentation, and create or update a Markdown harness-engineering scaffold.
- Registration uses `??=` so a user-defined `init-harness-engineering` command in local config is preserved.

## Growth Path

Future bundled agents should keep a predictable shape:

- Keep bundled agent definitions under `src/agents/` when their prompt or config is too large for the plugin entrypoint.
- Keep bundled command definitions under `src/commands/` when their prompt or config is too large for the plugin entrypoint.
- Add tools under `src/tools/` when a tool grows large enough to obscure the plugin entrypoint.
- Add harness or validation scripts under `scripts/` and wire them into `pnpm run check`.
- Promote repeated review feedback into docs first, then into mechanical checks when the rule is stable.
