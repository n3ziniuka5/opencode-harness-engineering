# OpenAI GPT-6 Prompting Reference

These official references inform the bundled GPT-6 agent configurations:

- GPT-6 model, migration, and prompting guide: https://developers.openai.com/api/docs/guides/latest-model?model=gpt-6-astra
- GPT-6 migration quickstart: https://developers.openai.com/api/docs/guides/latest-model?model=gpt-6-astra#migration-quickstart

## Model Family

- The GPT-6 family includes Astra, Sol, and Luna. This bundle uses `openai/gpt-6-sol` for the primary `ask`, `brainstorm`, and `draft` agents and `openai/gpt-6-luna` for the efficient, high-volume `explore` retrieval subagent.
- All bundled agents use OpenCode variant `high`.
- At reasoning effort other than `none`, GPT-6 does not support `temperature`, `top_p`, or related log-probability parameters. The bundled configs omit the unsupported keys entirely rather than assigning undefined values or falling back to an older model.
- OpenCode owns provider transport. This plugin supplies agent configuration and does not add a separate Responses API integration.

## Prompt Review

- The guide's prompt observations primarily describe GPT-6 Astra and should be evaluated with the selected model and workload before broad prompt changes.
- The existing prompts already define role-appropriate initiative, concise output style, concrete parallel subagent delegation, verification scope, side-effect boundaries, and stop rules.
- The shared primary-agent discovery section adds the guide's narrowly applicable instruction-priority rule: explicit user instructions take precedence over skill guidance without overriding system instructions, developer instructions, or repository permissions.
- When skill guidance makes a primary agent pause or diverge, the agent identifies the skill and relevant instruction instead of silently changing direction.
- Further prompt changes should follow representative evaluations or observed failures rather than migration churn.

## Current Usage

- `src/agents/explore.ts` configures `explore` with `openai/gpt-6-luna` and variant `high`.
- `src/agents/ask.ts`, `src/agents/brainstorm.ts`, and `src/agents/draft.ts` configure their agents with `openai/gpt-6-sol` and variant `high`.
- `test/plugin.test.ts` verifies the exact model/variant pairs, complete absence of unsupported sampling keys, and shared skill-priority prompt sentinels.
