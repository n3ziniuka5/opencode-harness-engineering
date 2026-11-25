# OpenCode Agents for Harness Engineering

This OpenCode server plugin adds agents for exploring, answering questions, brainstorming, and drafting implementation plans. It also provides `/init-harness-engineering` to set up repository documentation for agents.

## What It Adds

| Agent | Use it for | Fixed model |
| ----- | ---------- | ----------- |
| `explore` | Read-only search across code, docs, and the web, with precise citations. | `openai/gpt-6-luna` |
| `ask` | Concise, evidence-backed answers and reviews. | `openai/gpt-6.2-sol` |
| `brainstorm` | Weighing practical options and tradeoffs before implementation. | `openai/gpt-6.2-sol` |
| `draft` | Writing implementation plans for human review in `docs/exec-plans/active/`. | `openai/gpt-6.2-sol` |

All four agents use the `high` reasoning variant.

## Harness-Engineering Posture

The plugin nudges repositories toward the practices described in OpenAI's [Harness engineering](https://openai.com/index/harness-engineering/) article:

- Short `AGENTS.md` maps that route agents to the right durable context.
- Durable documentation as the system of record for product, architecture, engineering rules, and operational knowledge.
- Agent-legible architecture and engineering boundaries that are explicit enough for future agents to follow.
- Agent instructions that scan existing repository documentation before making repo-specific claims or plans, giving agents the best chance to conform to project rules and source-of-truth docs.
- Verifiable feedback loops through tests, scripts, docs checks, and other fast validation commands.

## Install From npm

To install the latest stable 1.x release, add the plugin to `~/.config/opencode/opencode.json`:

```json
{
  "$schema": "https://opencode.ai/config.json",
  "plugin": ["@n3ziniuka5/opencode-harness-engineering@1.x"]
}
```

Use the singular `plugin` key. If the array already exists, append the entry and keep the rest of your configuration unchanged.

Quit and restart OpenCode after adding or upgrading the plugin. OpenCode loads plugin configuration at startup, so a running session keeps using the previously loaded plugin set.

## Using the Plugin

### Choose an agent

New sessions start with `draft`, which replaces OpenCode's native `plan` agent. You can switch to `ask` or `brainstorm` as you would with any primary agent.

Primary agents can delegate search and retrieval to `explore`. The primary agent evaluates the evidence, makes recommendations, and writes the final response.

### Set up repository documentation

Run `/init-harness-engineering` in the target repository to have the active implementation agent create or update a documentation scaffold. The command uses the active agent's model.

Keep the documentation under the repository's `docs/` directory. You can customize its structure and style as long as agents have a way to find the context they need, such as through `index.md` files.

### Configure subagent depth

On OpenCode `1.18.2` and later, the plugin defaults `subagent_depth` to `3` when it is unset. Set `subagent_depth` in your OpenCode config to choose a different limit, or set it to `0` to disable subagent launches. Agent permissions still apply: `explore` cannot launch nested tasks.

Earlier versions can load the plugin but do not support the depth setting. Adding it to their config may fail validation.

## Fixed Model and Prompt Choices

All bundled agents use the OpenAI provider. The plugin exposes no options to change provider, model, variant, sampling, or bundled prompts. Users who need different behavior should fork and change the plugin or choose not to load it.

Agent configs omit sampling parameters that GPT-6 does not support at non-`none` effort.

The prompts are reviewed against OpenAI's public GPT-6 prompting guidance. Primary agents explicitly prioritize user instructions over skill guidance and identify skill instructions that make them pause or diverge; broader prompt changes should follow evaluations or observed failures.

Use OpenCode's normal OpenAI authentication with access to the [models listed above](#what-it-adds). The plugin does not fall back when a configured model is unavailable.

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

Targeted checks while iterating:

- `pnpm run typecheck`
- `pnpm run test`
- `pnpm run docs:check`
- `pnpm run format:check`

## Releases

The npm package is `@n3ziniuka5/opencode-harness-engineering`, and the exported OpenCode plugin id is `n3ziniuka5.opencode-harness-engineering`.

Release Please creates version and changelog PRs from Conventional Commits. After a release PR is merged, the published GitHub release triggers npm publishing through GitHub Actions OIDC and npm Trusted Publishing. The publish workflow does not use `NPM_TOKEN`.

See the [release process](docs/engineering/release-process.md) for setup and operating details.
