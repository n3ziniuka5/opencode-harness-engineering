# User Journeys

## Develop The Plugin Locally

1. Install dependencies with `pnpm install`.
2. Edit TypeScript sources under `src/`, tests under `test/`, docs under `docs/`, or guardrails under `scripts/`.
3. Run targeted checks while iterating.
4. Run `pnpm run check` before handoff.
5. Run `pnpm run build` when package artifacts need to be produced under `dist/`.

## Load The Local Plugin In OpenCode

1. OpenCode reads `opencode.json`.
2. The config loads `./src/index.ts`.
3. OpenCode calls the plugin server function.
4. The plugin registers `explore`, `plan`, and `init-harness-engineering` config through returned hooks.

## Create A Human-Reviewed Plan

1. A user delegates planning to the `plan` agent.
2. The agent inspects enough repository context to make a concrete plan.
3. The agent asks a focused question before writing when the requested outcome is materially ambiguous.
4. The agent writes one plan file under `docs/exec-plans/active/YYYY-MM-DD-slug.md` and does not edit implementation files.

## Initialize Harness Documentation In A Target Repository

1. A user runs `/init-harness-engineering` in a repository.
2. The command prompt instructs the active implementation agent to inspect high-signal repository context.
3. The agent creates or updates Markdown scaffold docs from verified facts.
4. The agent migrates useful existing content, removes stale duplicates when safe, and marks unknown facts with `TODO:`.
5. The agent reports created and updated files, migrated content, and unresolved `TODO:` markers.
