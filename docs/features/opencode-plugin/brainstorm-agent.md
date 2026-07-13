# `brainstorm` Agent

## Intent

`brainstorm` is a primary OpenCode agent for creative, practical option generation before implementation. It is for product, UX, architecture, implementation, naming, migration, and strategy brainstorming where multiple plausible directions are valuable.

## Source Of Truth

- Agent config: `src/agents/brainstorm.ts`
- Shared discovery section: `src/agents/discovery.ts`
- Shared sampling constant: `src/agents/sampling.ts`
- Registration: `src/index.ts`
- Tests: `test/plugin.test.ts`
- Prompt references: `docs/references/openai-gpt-5.6-prompting.md`
- Discovery dependency: `docs/features/opencode-plugin/explore-agent.md`

## Behavior

- Agent id is `brainstorm`.
- Model is `openai/gpt-5.6-sol` with variant `high`.
- Sampling is explicit: `temperature` is `0.8` and `top_p` is the shared bundled-agent value `0.97`.
- Color is `success`.
- Mode is `primary` so users can select it directly without surfacing it as a subagent.
- Registration assigns `config.agent.brainstorm` directly so this bundled config replaces a preexisting same-named agent entry while the plugin is loaded.
- The prompt starts with `Role: You are the brainstorm agent.` and uses outcome-first GPT-5.6-reviewed sections for personality, goal, discovery, success criteria, constraints, output, and stop rules.
- The agent expands the option space, groups useful directions, names tradeoffs and risks, and recommends a starting point when enough context exists.
- The shared `# Discovery` section tells the agent to inspect enough context, decompose independent research questions, launch parallel `explore` tasks for separable discovery, trust completed `explore` results for delegated questions instead of re-running the same searches, launch focused follow-up `explore` tasks for gaps or conflicts until enough context exists, read durable docs and local instructions, and name documentation updates when docs and implementation patterns conflict.
- When brainstorming options that touch code changes, implementation planning, or verification, shared discovery stays conditional on that request and adds the relevant engineering guidance categories: coding rules/standards, module boundaries, dependency boundaries, similar implementation patterns, nearby tests, testing strategy, and validation requirements.
- The agent must ask a focused question when the objective or constraints would materially change the option set.
- If the user confirms an idea and asks for implementation, the agent asks them to switch to `draft` for an implementation plan or `build` for code changes instead of implementing directly.
- Users must restart OpenCode after installing or upgrading the plugin before a running session sees changed agent definitions.

## Output Contracts

Responses provide concise framing, grouped options, tradeoffs and risks, a recommended direction when appropriate, and next questions or experiments.

## Permission Contract

- `edit` is explicitly denied.
- `question`, `skill`, `webfetch`, `websearch`, `glob`, `grep`, `read`, and `list` are explicitly allowed.
- `task.explore` is explicitly allowed for discovery delegation.
- No wildcard deny is configured, and non-edit tools that are not explicitly allowed are left unset so OpenCode can apply its default ask behavior.

## Non-Obvious Constraints

- Keep this agent ideation-oriented. Do not add file-write permissions or implementation instructions without a product decision.
- Keep speculative ideas clearly separate from established repository behavior.
- Keep `top_p` sourced from `DEFAULT_AGENT_TOP_P` rather than duplicating the numeric literal in the agent config.
