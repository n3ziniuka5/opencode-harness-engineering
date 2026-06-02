# OpenAI GPT-5.5 Prompting References

These references are the source material for bundled agent prompts that target GPT-5.5:

- Using GPT-5.5: https://developers.openai.com/api/docs/guides/latest-model
- GPT-5.5 prompting guide: https://developers.openai.com/api/docs/guides/prompt-guidance?model=gpt-5.5

## Local Prompting Rules

- Prefer outcome-first prompts that define the goal, success criteria, constraints, output shape, and stop rules.
- Keep static prompt content stable and put dynamic task context in user messages or tool results.
- Use `reasoning` effort intentionally. This bundle uses GPT-5.5 `xhigh` for `ask` and `brainstorm` because they are explicitly requested as high-reasoning answer and ideation agents, and `high` for `draft` because its job is complex planning with codebase discovery and contract analysis.
- Avoid process-heavy prompts unless the exact process is part of the product contract.
- For planning prompts, require traceable implementation plans with an intended outcome, immediate proposal that starts with external contract changes when they exist, named files or systems, validation, relevant failure/security/rollout considerations, and a bottom decision log. Require clarifying questions before writing when ambiguity would change the implementation.
- For answer prompts, require direct answers first, evidence and limitations when sources matter, and a clear boundary between facts and recommendations.
- For brainstorming prompts, require divergent options first, then tradeoffs, risks, and convergence guidance when enough context exists.
- For planning prompts that persist files, state the exact output path, allowed write scope, and completion/archive behavior.
- For tool-capable agents, include side-effect constraints and stopping rules so the agent does not keep searching after it has enough evidence.
- For shared discovery prompts, keep guidance repository-agnostic but explicit enough that requests touching code changes, implementation planning, or verification discover the relevant implementation and verification constraints.

## Current Usage

- `src/agents/ask.ts` defines the `ask` agent using `openai/gpt-5.5` with the `xhigh` variant, `temperature: 0.1`, and shared `top_p: 0.97`.
- `src/agents/brainstorm.ts` defines the `brainstorm` agent using `openai/gpt-5.5` with the `xhigh` variant, `temperature: 0.8`, and shared `top_p: 0.97`.
- `src/agents/draft.ts` defines the `draft` agent using `openai/gpt-5.5` with the `high` variant, `temperature: 0.2`, and shared `top_p: 0.97`.
- `ask`, `brainstorm`, and `draft` prompts follow the guide's suggested structure: role, personality, goal, discovery, success criteria, constraints, output, and stop rules. Their shared discovery section explicitly includes repo-local implementation and verification guidance categories when relevant, without naming repository-specific doc paths. `draft` also names the active plan path and archive behavior because file persistence is part of the agent contract.
