# `human_plan` Agent

## Intent

`human_plan` creates human-reviewed implementation plans without clashing with OpenCode's built-in `plan` agent.

## Source Of Truth

- Agent config: `src/agents/human-plan.ts`
- Registration: `src/index.ts`
- Tests: `test/hello-world.test.ts`
- Prompt references: `docs/references/openai-gpt-5.5-prompting.md`

## Behavior

- Agent id is `human_plan`.
- Model is `openai/gpt-5.5` with variant `high`.
- Mode is `all`.
- The prompt is outcome-first and tailored for implementation plans that a human can critique before code is written.
- The agent must inspect enough repository context to make the plan concrete.
- The agent must ask a focused question before writing when materially different valid outcomes remain.
- The agent writes active plan files under `docs/exec-plans/active/YYYY-MM-DD-slug.md`.
- The agent must not implement the plan or edit files outside the active plan path.
- Completion instructions tell implementers to heavily rewrite plans before archiving or delete temporary plans when no durable history is needed.

## Permission Contract

- Edits are denied by default.
- Edits are allowed only for `docs/exec-plans/active/????-??-??-*.md`.
- The agent can use read-oriented repository discovery tools, `webfetch`, `skill`, `todowrite`, and narrow user questions.
- Delegation is limited to the read-oriented `explore` subagent.

## Non-Obvious Constraints

- Do not rename this agent to `plan`; that name conflicts with OpenCode's native planning agent.
- Keep external contract changes first in the implementation plan when they are added, removed, or behaviorally changed.
- Avoid generic omnibus sections for compatibility, auth, error handling, retries, observability, privacy, or migration unless those details materially affect implementation.
