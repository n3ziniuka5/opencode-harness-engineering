# API Contracts

## NPM Package Contract

Source of truth: `package.json`.

The package name is `@n3ziniuka5/opencode-harness-engineering`. It is ESM (`type: module`) and exposes TypeScript declarations plus JavaScript output from `dist/`. The public exports are `.` and `./server`, both resolving to `dist/index.js` with declarations at `dist/index.d.ts`. The package publishes publicly to npm with `publishConfig.access: "public"`.

## OpenCode Plugin Contract

Source of truth: `src/index.ts`.

The default export is a plugin module with explicit id `n3ziniuka5.opencode-harness-engineering` and a `server` function. The server returns a config hook.

## Agent Contract

Source of truth: `src/agents/explore.ts`, `src/agents/ask.ts`, `src/agents/brainstorm.ts`, `src/agents/draft.ts`, and the matching files under `docs/features/opencode-plugin/`.

`explore` is assigned to `config.agent.explore`. It is a read-only subagent using `openai/gpt-5.6-luna` with variant `low`, `temperature: 0.5`, and shared `top_p: 0.97`; its permissions deny wildcard access, edits, nested tasks, and todowrite, while allowing local read/search tools, read-only bash when needed, and documentation tools. Its Task-visible description and runtime prompt accept source location, retrieval, excerpts, and short factual relevance notes, but reject general reviews, analytical conclusions, recommendations, and verdicts. Over-broad requests return source matches, search limitations, and a scope handoff to the caller. Because OpenCode also has a native `explore` agent, this config replaces the native key when present.

`ask` is assigned to `config.agent.ask`. It is a primary answer agent using `openai/gpt-5.6-sol` with variant `high`, `color: "accent"`, `temperature: 0.1`, and shared `top_p: 0.97`. Its permissions deny edits, explicitly allow common local and web discovery tools plus focused questions and skills, and allow only `task.explore` delegation. Unspecified non-edit tools are left unset for OpenCode's default ask behavior.

`brainstorm` is assigned to `config.agent.brainstorm`. It is a primary ideation agent using `openai/gpt-5.6-sol` with variant `high`, `color: "success"`, `temperature: 0.8`, and shared `top_p: 0.97`. Its permissions match `ask` except for its brainstorming-specific prompt, description, and sampling temperature.

`draft` is assigned to `config.agent.draft`. It uses `openai/gpt-5.6-sol` with variant `high`, `color: "primary"`, `temperature: 0.2`, and shared `top_p: 0.97`. Its prompt requirements include the shared `# Discovery` section tailored to generated plans for repository context and durable docs, identifying documentation governance for implementers to read first, identifying candidate documentation touchpoints for implementers to evaluate, and conforming generated plans to relevant repository documentation and local instructions discovered during planning. Candidate documentation touchpoints are not direct edit instructions; generated plans must tell implementers to follow governing docs and local instructions before deciding the correct documentation action. The shared discovery prompt used by `ask`, `brainstorm`, and `draft` permits parallel `explore` delegation only for concrete, independent retrieval requests with expected evidence shapes. Primary agents avoid duplicate rediscovery but may read cited sources and request focused retrieval follow-ups; they retain synthesis, conflict resolution, correctness and sufficiency assessment, recommendations, and final outputs. Changes to id, mode, model, variant, color, temperature, `top_p`, prompt requirements, permissions, or active plan path are user-visible behavior changes. Deprecated `PLAN_AGENT_NAME`, `PLAN_AGENT_DESCRIPTION`, and `PLAN_AGENT_CONFIG` package exports remain aliases of the corresponding `DRAFT_AGENT_*` values for compatibility; `PLAN_AGENT_PROMPT` is intentionally not exported, and consumers should use `DRAFT_AGENT_PROMPT`.

The plugin assigns all bundled agent configs directly, so a preexisting `agent.explore`, `agent.ask`, `agent.brainstorm`, or `agent.draft` entry is replaced while the plugin is loaded. The plugin also assigns `config.agent.plan = { disable: true }`, intentionally replacing any native or user-defined `agent.plan` entry so users do not accidentally select OpenCode's native `plan` agent and trigger native plan-mode reminders. The built-in `build` override is partial: the plugin preserves any incoming `agent.build` fields and only forces `color: "secondary"`. Every config-hook run sets `default_agent: "draft"`, including when the incoming default is unset or names another agent. Users need to restart OpenCode after installing or upgrading the plugin for new config-time definitions to take effect.

## Command Contract

Source of truth: `src/commands/init-harness-engineering.ts` and `docs/features/opencode-plugin/init-harness-engineering-command.md`.

`init-harness-engineering` is registered through `config.command["init-harness-engineering"] ??=` and is surfaced as `/init-harness-engineering`. The command template includes `$ARGUMENTS`, tells scaffolded top-level `AGENTS.md` files to include a minimal documentation preflight rule, treats an existing `CLAUDE.md` only as optional Claude-tooling compatibility, and intentionally leaves `agent`, `model`, and `subtask` unset.

## Local Development Config Contract

Source of truth: `opencode.json`.

Local OpenCode usage loads `./src/index.ts` without plugin options.

## Documentation Scaffold Contract

Source of truth: `src/commands/init-harness-engineering.ts`, this `docs/` scaffold, and `scripts/check-docs.ts` for this repository.

The scaffold requires concise index tables for documentation directories, a top-level `AGENTS.md` documentation preflight rule, execution-plan lifecycle rules without child plan indexes, and generated documentation headers when generated references are created. The prompt contract does not introduce `CLAUDE.md` into directories that did not already have one, preserves existing Claude compatibility after durable content is migrated, requires same-directory `AGENTS.md` for any remaining `CLAUDE.md`, and forbids `CLAUDE.md` files that point to parent or ancestor `AGENTS.md` files. Relevant sibling repository maps belong in optional `docs/references/sibling-repositories.md`; sibling relationships that define contracts, runtime/package boundaries, or feature behavior are still documented in the matching architecture or feature docs.
