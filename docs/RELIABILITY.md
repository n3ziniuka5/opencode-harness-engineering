# Reliability

## Expectations

- Plugin initialization should not perform network or filesystem side effects unless the behavior is explicit and tested.
- Tool outputs should be deterministic for the same inputs.
- Tool metadata should identify the plugin and relevant target so agent traces are legible.
- Validation commands should be runnable from a clean checkout after `pnpm install`.

## Current Validation

- `pnpm run typecheck`: typechecks source, tests, and scripts.
- `pnpm run test`: verifies the starter plugin contract and tool behavior.
- `pnpm run docs:check`: verifies required knowledge files and `AGENTS.md` links.
- `pnpm run build`: emits the npm package artifact.
