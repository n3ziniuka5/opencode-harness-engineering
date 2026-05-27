# API Contracts

## NPM Package Contract

Source of truth: `package.json`.

The package name is `opencode-harness-agents`. It is ESM (`type: module`) and exposes TypeScript declarations plus JavaScript output from `dist/`. The public exports are `.` and `./server`, both resolving to `dist/index.js` with declarations at `dist/index.d.ts`.

## OpenCode Plugin Contract

Source of truth: `src/index.ts`.

The default export is a plugin module with explicit id `harness.agents` and a `server` function. The server returns a config hook.

## Agent Contract

Source of truth: `src/agents/explore.ts`, `src/agents/ask.ts`, `src/agents/brainstorm.ts`, `src/agents/draft.ts`, and the matching files under `docs/features/opencode-plugin/`.

`explore` is assigned to `config.agent.explore`. It is a read-only subagent using `openai/gpt-5.4-mini` with variant `low`, `temperature: 0.5`, and shared `top_p: 0.97`; its permissions deny wildcard access, edits, nested tasks, and todowrite, while allowing local read/search tools, read-only bash when needed, and documentation tools. Because OpenCode also has a native `explore` agent, this config replaces the native key when present.

`ask` is assigned to `config.agent.ask`. It is a primary answer agent using `openai/gpt-5.5` with variant `xhigh`, `temperature: 0.1`, and shared `top_p: 0.97`. Its permissions deny edits, explicitly allow common local and web discovery tools plus focused questions and skills, and allow only `task.explore` delegation. Unspecified non-edit tools are left unset for OpenCode's default ask behavior.

`brainstorm` is assigned to `config.agent.brainstorm`. It is a primary ideation agent using `openai/gpt-5.5` with variant `xhigh`, `temperature: 0.8`, and shared `top_p: 0.97`. Its permissions match `ask` except for its brainstorming-specific prompt, description, and sampling temperature.

`draft` is assigned to `config.agent.draft`. It uses `openai/gpt-5.5` with variant `high`, `temperature: 0.2`, and shared `top_p: 0.97`. Its prompt requirements include the shared `# Discovery` section tailored to generated plans for repository context and durable docs, identifying documentation files for implementers to revisit, and conforming generated plans to relevant repository documentation and local instructions discovered during planning. Changes to id, mode, model, variant, temperature, `top_p`, prompt requirements, permissions, or active plan path are user-visible behavior changes. Deprecated `PLAN_AGENT_*` package exports remain aliases of the corresponding `DRAFT_AGENT_*` values for compatibility.

The plugin assigns all bundled agent configs directly, so a preexisting `agent.explore`, `agent.ask`, `agent.brainstorm`, or `agent.draft` entry is replaced while the plugin is loaded. The plugin also assigns `config.agent.plan = { disable: true }`, intentionally replacing any native or user-defined `agent.plan` entry so users do not accidentally select OpenCode's native `plan` agent and trigger native plan-mode reminders. If incoming config has `default_agent: "plan"`, the plugin rewrites it to `"draft"`; other default-agent values are preserved. Users need to restart OpenCode after installing or upgrading the plugin for new config-time definitions to take effect.

## Command Contract

Source of truth: `src/commands/init-harness-engineering.ts` and `docs/features/opencode-plugin/init-harness-engineering-command.md`.

`init-harness-engineering` is registered through `config.command["init-harness-engineering"] ??=` and is surfaced as `/init-harness-engineering`. The command template includes `$ARGUMENTS` and intentionally leaves `agent`, `model`, and `subtask` unset.

## Local Development Config Contract

Source of truth: `opencode.json`.

Local OpenCode usage loads `./src/index.ts` without plugin options.

## Documentation Scaffold Contract

Source of truth: `src/commands/init-harness-engineering.ts`, this `docs/` scaffold, and `scripts/check-docs.ts` for this repository.

The scaffold requires concise index tables for documentation directories, execution-plan lifecycle rules without child plan indexes, and generated documentation headers when generated references are created.
