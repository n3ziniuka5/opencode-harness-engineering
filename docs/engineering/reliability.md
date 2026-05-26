# Reliability

## Expectations

- Plugin initialization should not perform network, shell, filesystem, or environment side effects unless the behavior is explicit, necessary, and tested.
- Bundled `explore` and `plan` agent registration should overwrite default config entries.
- Bundled command registration should preserve user-defined config entries.
- Validation commands should be runnable from a clean checkout after `pnpm install`.

## Current Validation

- `pnpm run typecheck` typechecks source, tests, and scripts.
- `pnpm run test` verifies the plugin contract, bundled agent registration, and command registration.
- `pnpm run docs:check` verifies required knowledge files and scaffold index tables.
- `pnpm run build` emits the npm package artifact.

## Failure Modes

- Existing `explore` and `plan` agent entries are overwritten by bundled config.
- Existing user-defined `init-harness-engineering` config entries are preserved by `??=` registration.
- Long prompt regressions are guarded by sentinel tests instead of brittle full snapshots.
