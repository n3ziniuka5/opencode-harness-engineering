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
- The server function returns OpenCode hooks and bundled agent/command configuration.
- Agent definitions should keep prompts and static config in `src/agents/` once the prompt is large enough to obscure the plugin entrypoint.
- Command definitions should keep prompts and static config in `src/commands/` once the prompt is large enough to obscure the plugin entrypoint.
- Plugin options are treated as untrusted input and normalized before use.

## Key Flows

- Local OpenCode loading uses `opencode.json`, which points to `./src/index.ts`.
- Package consumers load the built package through `exports["./server"]`, which resolves to `dist/index.js`.
- During plugin initialization, OpenCode calls `server(input, options)`, and the returned hooks expose the config mutation hook.
- During config resolution, the plugin assigns `explore` and `plan` directly so they override OpenCode defaults, while `/init-harness-engineering` still uses `??=` to preserve user-defined command config.

## Source Layout

- `src/index.ts`: plugin entrypoint, config-hook registration, and exports.
- `src/agents/explore.ts`: `explore` subagent prompt, model, read-only permissions, and OpenCode agent config.
- `src/agents/plan.ts`: `plan` agent prompt and OpenCode agent config.
- `src/commands/init-harness-engineering.ts`: `/init-harness-engineering` command prompt and OpenCode command config.
- `test/`: executable plugin contract tests.
- `scripts/`: repository guardrails that agents and CI can run.
- `docs/`: durable project knowledge and harness-engineering operating docs.

## Bundled Agents

- `explore`: read-only discovery subagent registered as `config.agent.explore`. The same key customizes OpenCode's native `explore` agent when present and creates a normal subagent on runtimes without a native one.
- `explore` uses `openai/gpt-5.4-mini` with the `low` variant for cheap, high-volume codebase exploration and online search. It denies wildcard access plus edit, nested task, and todowrite, while allowing local read/search tools, read-only bash when needed, `webfetch`, `websearch`, `context7_*`, and ask-gated external directory reads.
- `plan`: planning agent for human-reviewed implementation plans, registered under OpenCode's native planning key so the bundled config overrides the default.
- `plan` uses `openai/gpt-5.5` with the `high` variant and an outcome-first prompt shaped by the OpenAI GPT-5.5 prompting references.
- `plan` denies edits by default except dated active plan files under `docs/exec-plans/active/`, allows read-oriented discovery tools, `webfetch`, `websearch`, `skill`, `todowrite`, narrow user questions, and only allows task delegation to `explore`. Its prompt includes a plan-specific `# Discovery` section for repository context, durable docs, and doc/code conflict handling before writing a plan; generic `explore` handoff guidance lives in the `explore` agent description surfaced by the Task tool.

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
