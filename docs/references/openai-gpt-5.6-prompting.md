# OpenAI GPT-5.6 Prompting Reference

These references inform the bundled GPT-5.6-family agent configurations:

- Latest model guide: https://developers.openai.com/api/docs/guides/latest-model
- GPT-5.6 prompting guide: https://developers.openai.com/api/docs/guides/prompt-guidance?model=gpt-5.6

## Model Family

- Official GPT-5.6 model IDs are `gpt-5.6`, `gpt-5.6-sol`, `gpt-5.6-terra`, and `gpt-5.6-luna`.
- `gpt-5.6` is an alias for the Sol model. This bundle uses the explicit `gpt-5.6-sol` ID for main agents so its tier is unambiguous.
- The official guide does not list a `gpt-5.6-lina` model.
- This bundle uses `gpt-5.6-sol` for the main `ask`, `brainstorm`, and `draft` agents, each with the `high` reasoning variant.
- This bundle uses the efficient `gpt-5.6-luna` tier with the `low` reasoning variant for the high-volume `explore` retrieval subagent.

## Prompt Review

- GPT-5.6 prompts should state the goal, success criteria, tool and side-effect boundaries, output contract, and stop rules explicitly.
- Keep dynamic task context in user messages and tool results rather than expanding static prompts without an observed need.
- Use reasoning variants deliberately: this bundle defaults Sol agents to `high` and Luna discovery to `low`.
- The initial GPT-5.6 migration does not rewrite source prompts. Existing prompts already provide the explicit goals, approval and write boundaries, tool-use constraints, evidence requirements, output contracts, and stop rules the guide calls for.
- Future prompt changes should be driven by evaluations or observed failures, not migration churn.

## Current Usage

- `src/agents/explore.ts` configures `explore` with `openai/gpt-5.6-luna`, variant `low`, `temperature: 0.5`, and shared `top_p: 0.97`.
- `src/agents/ask.ts`, `src/agents/brainstorm.ts`, and `src/agents/draft.ts` configure their agents with `openai/gpt-5.6-sol`, variant `high`, agent-specific temperatures, and shared `top_p: 0.97`.
