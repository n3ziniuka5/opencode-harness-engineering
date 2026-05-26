# `plan` Agent

## Intent

`plan` creates human-reviewed implementation plans and intentionally overrides OpenCode's built-in planning agent.

## Source Of Truth

- Agent config: `src/agents/plan.ts`
- Shared sampling constant: `src/agents/sampling.ts`
- Registration: `src/index.ts`
- Tests: `test/plugin.test.ts`
- Prompt references: `docs/references/openai-gpt-5.5-prompting.md`
- Discovery dependency: `docs/features/opencode-plugin/explore-agent.md`

## Behavior

- Agent id is `plan`.
- Model is `openai/gpt-5.5` with variant `high`.
- Sampling is explicit: `temperature` is `0.2` and `top_p` is the shared bundled-agent value `0.97`.
- Mode is `all`.
- Registration assigns `config.agent.plan` directly so this bundled config overrides OpenCode's default `plan` agent.
- The prompt is outcome-first and tailored for implementation plans that a human can critique before code is written.
- The prompt includes a plan-specific `# Discovery` section for planning rules: inspect enough repository context, decide the exploration subjects that matter for the request, decompose independent subjects into focused `explore` questions, search durable docs and local instructions, gather similar implementation patterns, apply relevant guidance to the plan, and name documentation updates when docs and implementation patterns conflict.
- Generic guidance for when and how parent agents should invoke `explore` lives in the `explore` agent description, because OpenCode surfaces allowed subagent descriptions through the Task tool definition.
- The agent should launch parallel `explore` subagents when at least two independent discovery questions can be answered separately, and should avoid one broad repo-discovery prompt when separable subjects exist.
- The agent must ask a focused question before writing when materially different valid outcomes remain.
- The agent may include `mermaid` diagrams only when they materially clarify larger plans, such as module dependencies or complex flows; routine or small plans should not include diagrams.
- The agent writes active plan files under `docs/exec-plans/active/YYYY-MM-DD-slug.md`.
- The agent must not implement the plan or edit files outside the active plan path.
- Completion instructions tell implementers that finishing implementation includes resolving the active plan's lifecycle. They must follow repo-specific execution-plan lifecycle rules when available, otherwise update long-term docs from the final implementation before deleting or briefly archiving only valuable remaining execution history.

## Permission Contract

- Edits are denied by default.
- Edits are allowed only for `docs/exec-plans/active/????-??-??-*.md`.
- The agent can use read-oriented repository discovery tools, `webfetch`, `websearch`, `skill`, `todowrite`, and narrow user questions.
- Delegation is limited to the read-only `explore` subagent registered by this plugin.

## Non-Obvious Constraints

- Keep this agent registered as `plan` so it overrides OpenCode's native planning agent.
- Keep `top_p` sourced from `DEFAULT_AGENT_TOP_P` rather than duplicating the numeric literal in the agent config.
- Keep external contract changes first in the implementation plan when they are added, removed, or behaviorally changed.
- The `Documentation updates` list is for implementation follow-up and does not replace conforming to scanned documentation and local instructions while planning.
- Avoid generic omnibus sections for compatibility, auth, error handling, retries, observability, privacy, or migration unless those details materially affect implementation.
