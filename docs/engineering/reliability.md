# Reliability

## Expectations

- Plugin initialization should not perform network, shell, filesystem, or environment side effects unless the behavior is explicit, necessary, and tested.
- Tool outputs should be deterministic for the same inputs.
- Tool metadata should identify the plugin and relevant target so agent traces are legible.
- Bundled agent and command registration should preserve user-defined config entries.
- Validation commands should be runnable from a clean checkout after `pnpm install`.

## Current Validation

- `pnpm run typecheck` typechecks source, tests, and scripts.
- `pnpm run test` verifies the starter plugin contract, tool behavior, bundled agent registration, and command registration.
- `pnpm run docs:check` verifies required knowledge files and scaffold index tables.
- `pnpm run build` emits the npm package artifact.

## Failure Modes

- Invalid or blank `greeting` options fall back to `Hello`.
- Existing user-defined `human_plan` or `init-harness-engineering` config entries are preserved by `??=` registration.
- Long prompt regressions are guarded by sentinel tests instead of brittle full snapshots.
