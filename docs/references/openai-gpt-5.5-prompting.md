# OpenAI GPT-5.5 Prompting References

These references are the source material for bundled agent prompts that target GPT-5.5:

- Using GPT-5.5: https://developers.openai.com/api/docs/guides/latest-model
- GPT-5.5 prompting guide: https://developers.openai.com/api/docs/guides/prompt-guidance?model=gpt-5.5

## Local Prompting Rules

- Prefer outcome-first prompts that define the goal, success criteria, constraints, output shape, and stop rules.
- Keep static prompt content stable and put dynamic task context in user messages or tool results.
- Use `reasoning` effort intentionally. This bundle uses GPT-5.5 `high` only for the `human_plan` agent because its job is complex planning with codebase discovery and contract analysis.
- Avoid process-heavy prompts unless the exact process is part of the product contract.
- For planning prompts, require traceable implementation plans with an intended outcome, immediate proposal that starts with external contract changes when they exist, named files or systems, validation, relevant failure/security/rollout considerations, and a bottom decision log. Require clarifying questions before writing when ambiguity would change the implementation.
- For planning prompts that persist files, state the exact output path, allowed write scope, and completion/archive behavior.
- For tool-capable agents, include side-effect constraints and stopping rules so the agent does not keep searching after it has enough evidence.

## Current Usage

- `src/agents/human-plan.ts` defines the `human_plan` agent using `openai/gpt-5.5` with the `high` variant.
- The `human_plan` prompt follows the guide's suggested structure: role, personality, goal, success criteria, constraints, output, and stop rules. It also names the active plan path and archive behavior because file persistence is part of the agent contract.
