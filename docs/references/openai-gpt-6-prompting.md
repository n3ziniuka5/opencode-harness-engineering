# OpenAI GPT-6 Prompting Reference

These official references inform the bundled GPT-6 agent configurations:

- [GPT-6.2 Sol model reference](https://developers.openai.com/api/docs/models/gpt-6.2-sol)
- [Prompting GPT-6.2 in Codex](https://learn.chatgpt.com/guides/prompting-gpt-6-2-astra) (covers both Astra and Sol)

## Model Constraints

- At reasoning effort other than `none`, GPT-6 does not support `temperature`, `top_p`, or related log-probability parameters. The bundled configs use `high` and omit these keys rather than assigning undefined values.
- OpenCode owns provider transport. This plugin supplies agent configuration and does not add a separate Responses API integration.

## Prompt Review

- The primary prompts follow the GPT-6.2 guide by defining success criteria and stop rules and delegating independent retrieval to `explore` in parallel.
- The shared primary-agent discovery section gives explicit user instructions priority over skill guidance without overriding system instructions, developer instructions, or repository permissions.
- When skill guidance makes a primary agent pause or diverge, the agent identifies the skill and relevant instruction instead of silently changing direction.
- Further prompt changes should follow representative evaluations or observed failures rather than migration churn.
