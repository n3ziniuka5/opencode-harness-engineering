# Architecture

This package is a TypeScript OpenCode server plugin published as `@n3ziniuka5/opencode-harness-engineering`. It uses pnpm for reproducible local development and emits ESM JavaScript into `dist/`.

See `docs/architecture/index.md` for detailed boundaries, dependency rules, API contracts, data-model notes, and ADRs.

## Package Shape

- `src/index.ts` default-exports an OpenCode v1 plugin module: `{ id, server }`.
- The plugin id is `n3ziniuka5.opencode-harness-engineering`.
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
- During config resolution, the plugin assigns `explore`, `ask`, `brainstorm`, and `draft` directly so they override same-named user agent entries, preserves the built-in `build` agent config while forcing `color: "secondary"`, disables OpenCode's native `plan` agent, and always sets `default_agent: "draft"`. `/init-harness-engineering` still uses `??=` to preserve user-defined command config.

## Source Layout

- `src/index.ts`: plugin entrypoint, config-hook registration, and exports.
- `src/agents/ask.ts`: `ask` primary answer agent prompt, model, permissions, and OpenCode agent config.
- `src/agents/brainstorm.ts`: `brainstorm` primary ideation agent prompt, model, permissions, and OpenCode agent config.
- `src/agents/discovery.ts`: shared GPT-5.6 discovery prompt section used by `ask`, `brainstorm`, and `draft`.
- `src/agents/explore.ts`: `explore` subagent prompt, model, read-only permissions, and OpenCode agent config.
- `src/agents/draft.ts`: `draft` agent prompt and OpenCode agent config.
- `src/agents/sampling.ts`: shared sampling constants for bundled agents.
- `src/commands/init-harness-engineering.ts`: `/init-harness-engineering` command prompt and OpenCode command config.
- `test/`: executable plugin contract tests.
- `scripts/`: repository guardrails that agents and CI can run.
- `docs/`: durable project knowledge and harness-engineering operating docs.

## Bundled Agents

- `explore`: read-only discovery subagent registered as `config.agent.explore`. The same key customizes OpenCode's native `explore` agent when present and creates a normal subagent on runtimes without a native one.
- `explore` uses `openai/gpt-5.6-luna` with the `low` variant, `temperature: 0.5`, and shared `top_p: 0.97` for cheap, high-volume source location and retrieval. It denies wildcard access plus edit, nested task, and todowrite, while allowing local read/search tools, read-only bash when needed, `webfetch`, `websearch`, `context7_*`, and ask-gated external directory reads.
- `ask`: primary answer agent registered as `config.agent.ask` for concise, evidence-backed answers rather than implementation. It uses `openai/gpt-5.6-sol` with the `high` variant, `color: "accent"`, `temperature: 0.1`, shared `top_p: 0.97`, denies edits, explicitly allows common discovery and coordination tools, and allows only `task.explore` delegation while leaving unspecified tools to OpenCode's default ask behavior.
- `brainstorm`: primary ideation agent registered as `config.agent.brainstorm` for creative option generation, tradeoffs, and convergence before implementation. It uses `openai/gpt-5.6-sol` with the `high` variant, `color: "success"`, `temperature: 0.8`, shared `top_p: 0.97`, and the same edit-denying discovery permission posture as `ask`.
- `draft`: planning agent for human-reviewed implementation plans, registered as `config.agent.draft`; the plugin also disables native `config.agent.plan` so OpenCode does not inject native plan-mode reminders, and always sets `default_agent: "draft"` while loaded.
- `draft` uses `openai/gpt-5.6-sol` with the `high` variant, `color: "primary"`, `temperature: 0.2`, shared `top_p: 0.97`, and an outcome-first prompt reviewed against the OpenAI GPT-5.6 prompting reference.
- `build`: the plugin does not replace the built-in `build` agent config; it only forces `config.agent.build.color = "secondary"` and preserves any other incoming `agent.build` fields.
- `ask`, `brainstorm`, and `draft` share a static `# Discovery` section for repository context, parallel decomposition into concrete `explore` retrieval requests, durable docs, and doc/code conflict handling. The primary agents own synthesis, conflict resolution, correctness and sufficiency judgments, recommendations, and final output; the Task-visible `explore` description and runtime prompt reject general review or reasoning delegation.
- `draft` denies edits by default except dated active plan files under `docs/exec-plans/active/`, allows read-oriented discovery tools, `webfetch`, `websearch`, `skill`, `todowrite`, narrow user questions, and only allows task delegation to `explore`.

## Bundled Commands

- `/init-harness-engineering`: config command registered as `config.command["init-harness-engineering"]`.
- The command leaves `agent`, `model`, and `subtask` unset so it runs with the user's current/default implementation agent and normal file-edit permissions.
- The command prompt is static and does not access the filesystem during plugin initialization. It instructs the active agent to inspect high-signal repository context, preserve useful existing documentation, and create or update a Markdown harness-engineering scaffold.
- Registration uses `??=` so a user-defined `init-harness-engineering` command in local config is preserved.

## Growth Path

Future bundled agents should keep a predictable shape:

- Keep bundled agent definitions under `src/agents/` when their prompt or config is too large for the plugin entrypoint.
- Import `DEFAULT_AGENT_TOP_P` from `src/agents/sampling.ts` for bundled agents that should follow the shared nucleus sampling default.
- Keep bundled command definitions under `src/commands/` when their prompt or config is too large for the plugin entrypoint.
- Add tools under `src/tools/` when a tool grows large enough to obscure the plugin entrypoint.
- Add harness or validation scripts under `scripts/` and wire them into `pnpm run check`.
- Promote repeated review feedback into docs first, then into mechanical checks when the rule is stable.
