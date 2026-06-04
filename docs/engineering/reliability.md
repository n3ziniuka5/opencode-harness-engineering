# Reliability

## Expectations

- Plugin initialization should not perform network, shell, filesystem, or environment side effects unless the behavior is explicit, necessary, and tested.
- Bundled agent registration should overwrite same-named config entries.
- Bundled command registration should preserve user-defined config entries.
- Validation commands should be runnable from a clean checkout after `pnpm install`.

## Current Validation

- `pnpm run typecheck` typechecks source, tests, and scripts.
- `pnpm run test` verifies the plugin contract, bundled agent registration, and command registration.
- `pnpm run docs:check` verifies required knowledge files and scaffold index tables.
- `pnpm run build` emits the npm package artifact.

## Failure Modes

- Existing `explore`, `ask`, `brainstorm`, and `draft` agent entries are overwritten by bundled config.
- Existing native or user-defined `plan` entries are overwritten with `{ disable: true }` so native plan-mode reminders cannot conflict with the bundled `draft` workflow.
- Existing `agent.build` entries are preserved except `color`, which is forced to `secondary`.
- Existing `default_agent` config is always set to `"draft"`, including when it was unset or named another agent.
- Existing user-defined `init-harness-engineering` config entries are preserved by `??=` registration.
- Long prompt regressions are guarded by sentinel tests instead of brittle full snapshots.
