# `draft` Agent

## Intent

`draft` creates human-reviewed implementation plans while avoiding OpenCode's native `plan` agent reminder path.

## Source Of Truth

- Agent config: `src/agents/draft.ts`
- Shared discovery section: `src/agents/discovery.ts`
- Shared sampling constant: `src/agents/sampling.ts`
- Registration: `src/index.ts`
- Tests: `test/plugin.test.ts`
- Prompt references: `docs/references/openai-gpt-5.5-prompting.md`
- Discovery dependency: `docs/features/opencode-plugin/explore-agent.md`

## Behavior

- Agent id is `draft`.
- Model is `openai/gpt-5.5` with variant `high`.
- Sampling is explicit: `temperature` is `0.2` and `top_p` is the shared bundled-agent value `0.97`.
- Mode is `all`.
- Registration assigns `config.agent.draft` directly so the bundled config overrides same-named user entries while the plugin is loaded.
- Registration also assigns `config.agent.plan = { disable: true }` so OpenCode's native `plan` agent is hidden and cannot inject native plan-mode reminders.
- If incoming config has `default_agent: "plan"`, the plugin rewrites it to `default_agent: "draft"`; other default agents are preserved.
- The prompt is outcome-first and tailored for implementation plans that a human can critique before code is written.
- The prompt includes the shared `# Discovery` section tailored to a generated plan: inspect enough repository context, decide the exploration subjects that matter for the request, decompose independent subjects into focused `explore` questions, search durable docs and local instructions, gather similar implementation patterns, apply relevant guidance to the plan, and name documentation updates when docs and implementation patterns conflict.
- For implementation-plan work, the shared discovery rules explicitly include both implementation constraints and verification constraints before writing: coding rules/standards, module boundaries, dependency boundaries, similar implementation patterns, nearby tests, testing strategy, and validation requirements.
- Draft-specific success criteria require proposed code changes to conform to discovered engineering guidance, require the Verification plan to conform to discovered testing strategy and validation requirements, and require the documentation handoff to distinguish governance the implementer should read first from candidate documentation touchpoints that may need updates.
- The shared discovery rules tell the agent to launch parallel `explore` subagents when at least two independent discovery questions can be answered separately, trust completed `explore` results for delegated questions instead of re-running the same searches, and launch focused follow-up `explore` tasks for gaps, conflicts, or follow-up questions until enough context exists or the remaining blocker can be named.
- The agent must ask a focused question before writing when materially different valid outcomes remain.
- The agent may include `mermaid` diagrams only when they materially clarify larger plans, such as module dependencies or complex flows; routine or small plans should not include diagrams.
- The agent writes active plan files under `docs/exec-plans/active/YYYY-MM-DD-slug.md`.
- The agent must not implement the plan or edit files outside the active plan path.
- Completion instructions tell implementers that finishing implementation includes resolving the active plan's lifecycle. They must follow repo-specific execution-plan lifecycle rules when available, otherwise update long-term docs from the final implementation before deleting or briefly archiving only valuable remaining execution history.
- Users must restart OpenCode after installing or upgrading the plugin before a running session sees changed agent definitions.

## Permission Contract

- Edits are denied by default.
- Edits are allowed only for `docs/exec-plans/active/????-??-??-*.md`.
- The agent can use read-oriented repository discovery tools, `webfetch`, `websearch`, `skill`, `todowrite`, and narrow user questions.
- Delegation is limited to the read-only `explore` subagent registered by this plugin.

## Non-Obvious Constraints

- Keep this workflow registered as `draft`, not `plan`, so OpenCode does not inject native read-only plan reminders.
- Keep native `config.agent.plan` disabled while this plugin is loaded; otherwise users can accidentally select native `plan` and re-enter the reminder conflict.
- Keep `top_p` sourced from `DEFAULT_AGENT_TOP_P` rather than duplicating the numeric literal in the agent config.
- Keep external contract changes first in the implementation plan when they are added, removed, or behaviorally changed.
- The `Documentation updates` handoff is for implementation follow-up and does not replace conforming to scanned documentation and local instructions while drafting.
- Generated plans split the handoff into `Documentation governance to read first:` and `Candidate documentation touchpoints:` so implementers evaluate candidate files after reading governing indexes, lifecycle notes, generated-document rules, local instructions, or other nearby guidance.
- Candidate documentation touchpoints are files to evaluate, not direct edit instructions; governing documentation may require creating a different file, replacing or superseding content elsewhere, regenerating an artifact, archiving/deleting temporary documentation, or leaving a candidate unchanged.
- Avoid generic omnibus sections for compatibility, auth, error handling, retries, observability, privacy, or migration unless those details materially affect implementation.
- Keep parent-agent `explore` trust and follow-up delegation behavior centralized in `src/agents/discovery.ts` instead of duplicating agent-specific copies.
