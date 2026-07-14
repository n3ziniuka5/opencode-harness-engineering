# `ask` Agent

## Intent

`ask` is a primary OpenCode agent for concise, evidence-backed answers. It is for codebase, architecture, product, process, library, and troubleshooting questions where the user wants an answer rather than code changes or an implementation plan.

## Source Of Truth

- Agent config: `src/agents/ask.ts`
- Shared discovery section: `src/agents/discovery.ts`
- Shared sampling constant: `src/agents/sampling.ts`
- Registration: `src/index.ts`
- Tests: `test/plugin.test.ts`
- Prompt references: `docs/references/openai-gpt-5.6-prompting.md`
- Discovery dependency: `docs/features/opencode-plugin/explore-agent.md`

## Behavior

- Agent id is `ask`.
- Model is `openai/gpt-5.6-sol` with variant `high`.
- Sampling is explicit: `temperature` is `0.1` and `top_p` is the shared bundled-agent value `0.97`.
- Color is `accent`.
- Mode is `primary` so users can select it directly without surfacing it as a subagent.
- Registration assigns `config.agent.ask` directly so this bundled config replaces a preexisting same-named agent entry while the plugin is loaded.
- The prompt starts with `Role: You are the ask agent.` and uses outcome-first GPT-5.6-reviewed sections for personality, goal, discovery, success criteria, constraints, output, and stop rules.
- The agent answers directly, prefers repository/source-backed evidence over speculation, cites local files/line ranges or URLs when sources matter, and states limitations.
- When the user asks for judgment or next steps, the agent labels recommendations as recommendations and keeps them evidence-based.
- When asked to assess a plan, code, or proposal, `ask` retrieves evidence as needed and performs the correctness, sufficiency, and goal-achievement assessment itself.
- When the user asks how to implement something and needs options, tradeoffs, or creative approaches, the agent recommends switching to `brainstorm`.
- The shared `# Discovery` section tells the agent to inspect enough context, turn evidence needs into concrete retrieval requests with expected source shapes, launch parallel `explore` tasks for independent retrieval, avoid repeating completed searches merely to rediscover results, read cited sources for its own analysis, launch focused follow-up retrieval for gaps or conflicts, read durable docs and local instructions, and name documentation updates when docs and implementation patterns conflict.
- The shared boundary reserves synthesis, conflict resolution, correctness and sufficiency assessment, recommendations, and the final answer for `ask`. It prohibits delegating reviews, severity ranking, recommendations, or verdicts to `explore`.
- When the question touches code changes, implementation planning, or verification, shared discovery stays conditional on that request and adds the relevant engineering guidance categories: coding rules/standards, module boundaries, dependency boundaries, similar implementation patterns, nearby tests, testing strategy, and validation requirements.
- The agent must ask a focused question when ambiguity materially changes the answer.
- Users must restart OpenCode after installing or upgrading the plugin before a running session sees changed agent definitions.

## Output Contracts

Responses start with the answer, then concise supporting evidence. Caveats and next steps appear only when useful.

## Permission Contract

- `edit` is explicitly denied.
- `question`, `skill`, `webfetch`, `websearch`, `glob`, `grep`, `read`, and `list` are explicitly allowed.
- `task.explore` is explicitly allowed for discovery delegation.
- No wildcard deny is configured, and non-edit tools that are not explicitly allowed are left unset so OpenCode can apply its default ask behavior.

## Non-Obvious Constraints

- Keep this agent answer-oriented. Do not add file-write permissions or implementation instructions without a product decision.
- Keep `top_p` sourced from `DEFAULT_AGENT_TOP_P` rather than duplicating the numeric literal in the agent config.
- Use official/public web references instead of sending proprietary snippets externally.
