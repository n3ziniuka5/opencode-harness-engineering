# OpenCode Agents for Harness Engineering

This is an OpenCode server plugin for users who want a harness-engineering workflow in their OpenCode setup.

When loaded, it registers `explore`, `ask`, `brainstorm`, and `draft` (replaces the native `plan` agent), makes `draft` the default agent, and registers `/init-harness-engineering`. The bundle is designed around the harness-engineering ideas in OpenAI's [Harness engineering](https://openai.com/index/harness-engineering/) article.

## What It Adds

All bundled agents use `top_p: 0.97`. The table lists each agent's fixed model, OpenCode `variant`/effort value, and temperature.

| Entry | What it adds | Fixed model and settings |
| --- | --- | --- |
| `explore` | Read-only, cheap/high-volume subagent for locating and retrieving codebase, documentation, and web sources with precise citations. It does not perform reviews or recommendations. | `openai/gpt-5.6-luna`; variant `low`; temperature `0.5`. |
| `ask` | Primary answer agent for concise, evidence-backed answers. Uses `explore` for source retrieval while retaining analysis, reviews, and verdicts. | `openai/gpt-5.6-sol`; variant `high`; temperature `0.1`. |
| `brainstorm` | Primary ideation agent for practical options, tradeoffs, and convergence before implementation. Uses `explore` for source retrieval while retaining option generation and recommendations. | `openai/gpt-5.6-sol`; variant `high`; temperature `0.8`. |
| `draft` | Planning agent that writes human-reviewed implementation plans under `docs/exec-plans/active/`. Replaces the native `plan` workflow in this bundle and is forced as the default agent while the plugin is loaded. | `openai/gpt-5.6-sol`; variant `high`; temperature `0.2`. |
| `/init-harness-engineering` | Slash command that asks the active implementation agent to create or update an agent-legible documentation scaffold in the current repository when run. | Runs through the active agent when invoked; it does not configure a standalone model. |

## Harness-Engineering Posture

The plugin nudges repositories toward the practices described in OpenAI's [Harness engineering](https://openai.com/index/harness-engineering/) article:

- Short `AGENTS.md` maps that route agents to the right durable context.
- Durable documentation as the system of record for product, architecture, engineering rules, and operational knowledge.
- Agent-legible architecture and engineering boundaries that are explicit enough for future agents to follow.
- Agent instructions that scan existing repository documentation before making repo-specific claims or plans, giving agents the best chance to conform to project rules and source-of-truth docs.
- Verifiable feedback loops through tests, scripts, docs checks, and other fast validation commands.

## Install From npm

Add the plugin to `~/.config/opencode/opencode.json`:

```json
{
  "$schema": "https://opencode.ai/config.json",
  "plugin": ["@n3ziniuka5/opencode-harness-engineering"]
}
```

Use OpenCode's singular `plugin` key. If you already have an OpenCode config, append `@n3ziniuka5/opencode-harness-engineering` to the existing `plugin` array and preserve the rest of your configuration.

Quit and restart OpenCode after adding or upgrading the plugin. OpenCode loads plugin configuration at startup, so a running session keeps using the previously loaded plugin set.

## Using The Plugin

After restarting OpenCode, new sessions start with `draft` because the plugin sets `default_agent: "draft"` during config resolution. Use `ask`, `brainstorm`, or `draft` as primary agents the same way you use other OpenCode agents. `explore` is intended for delegated search and retrieval; the primary agent remains responsible for synthesis, correctness judgments, recommendations, and final output.

Run `/init-harness-engineering` in a target repository when you want to create or update a harness-engineering documentation scaffold. All the docs will be under `/docs` and that's a requirement, but other than that you can modify the resulting scaffold as you wish, the added agents don't have a bias toward any particular documentation style or structure as long as they are under `/docs` and contain the necessary context for agents to navigate the docs, e.g. with index.md files.

## Fixed Model And Prompt Choices

All bundled agents are hardcoded to the OpenAI provider: `explore` uses `openai/gpt-5.6-luna`, while `ask`, `brainstorm`, and `draft` use `openai/gpt-5.6-sol`.

The plugin exposes no options to change provider, model, variant, sampling, or bundled prompts. Users who need different behavior should fork and change the plugin or choose not to load it.

The prompts are reviewed against OpenAI's public GPT-5.6 prompting guidance. The initial model migration leaves them unchanged; future prompt changes should follow evaluations or observed failures.

Because the provider is fixed, you need OpenCode's normal OpenAI provider and authentication setup with access to `gpt-5.6-luna` and `gpt-5.6-sol` before the bundled agents can run.

## Developing This Repository

Requirements:

- Node.js `>=22`
- pnpm `10.33.2`
- OpenCode `>=1.14.0`

Core contributor commands:

```sh
pnpm install --frozen-lockfile
pnpm run check
pnpm run build
```

Targeted checks while iterating: `pnpm run typecheck`, `pnpm run test`,
`pnpm run docs:check`, and `pnpm run format:check`.

## Releases

The npm package is `@n3ziniuka5/opencode-harness-engineering`, and the exported OpenCode plugin id is `n3ziniuka5.opencode-harness-engineering`.

Release Please owns version and changelog PRs from Conventional Commits. After a release PR is merged, the published GitHub release triggers npm publishing through GitHub Actions OIDC and npm Trusted Publishing. The publish workflow does not use `NPM_TOKEN`.

See `docs/engineering/release-process.md` for release setup and operating details.
