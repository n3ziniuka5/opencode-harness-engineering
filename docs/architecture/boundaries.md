# Boundaries

## Package Boundary

The package is an OpenCode server plugin bundle. `package.json` exposes the built ESM entrypoint through both `.` and `./server`, with TypeScript declarations in `dist/index.d.ts`.

## Runtime Boundary

`src/index.ts` is the runtime entrypoint. It imports the bundled agent config and bundled command config. It returns OpenCode hooks from the `server` function and does not perform filesystem, shell, network, or environment side effects during initialization.

## Agent Boundary

Bundled agent prompts and static config live under `src/agents/` when they are too large for the entrypoint. `src/agents/explore.ts` owns the `explore` description, prompt, model, variant, mode, and read-only permissions. `src/agents/plan.ts` owns the `plan` prompt, model, variant, mode, planning permissions, and planning-specific discovery guidance.

## Command Boundary

Bundled command prompts and static config live under `src/commands/` when they are too large for the entrypoint. `src/commands/init-harness-engineering.ts` owns the slash-command template and description.

## Tool Boundary

No bundled tools currently exist. Move future larger tools under `src/tools/` when they would obscure the entrypoint.

## Validation Boundary

Executable plugin contract tests live under `test/`. Repository guardrail scripts live under `scripts/` and should be wired into `pnpm run check` when they protect durable behavior.

## Documentation Boundary

`AGENTS.md` is only a short map. Durable product, feature, architecture, engineering, quality, runbook, generated, and reference knowledge belongs under `docs/`.
