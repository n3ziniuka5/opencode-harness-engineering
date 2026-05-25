# OpenAI GPT-5.4 Prompting References

These references are the source material for bundled agent prompts that target GPT-5.4:

- GPT-5.4 prompting guide: https://developers.openai.com/api/docs/guides/prompt-guidance?model=gpt-5.4
- Using the latest model guide: https://developers.openai.com/api/docs/guides/latest-model

## Local Prompting Rules

- GPT-5.4 prompts should define the output contract, tool-use expectations, evidence requirements, and completion criteria explicitly.
- Keep outputs compact and structured. Use exact section names when the caller or product contract needs stable handoff artifacts.
- For tool-heavy discovery, include a retrieval budget, retry rules for empty or partial results, and a clear stop rule once enough evidence exists.
- For grounded answers, require precise citations and describe missing-evidence behavior so the agent reports limitations instead of fabricating support.
- For `gpt-5.4-mini`, use small-model scaffolding: compact sections, literal tool routing rules, explicit side-effect constraints, and examples of the required output shape.
- Use lower reasoning effort for cheap discovery agents when the task is bounded by retrieval and citation rather than deep planning.

## Current Usage

- `src/agents/explore.ts` defines the `explore` subagent using `openai/gpt-5.4-mini` with the `low` variant.
- The `explore` prompt follows the GPT-5.4 guidance by specifying read-only constraints, allowed discovery tools, search budgets, evidence rules, output contracts, and stop rules.
