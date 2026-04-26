# Architecture

This package is a TypeScript OpenCode server plugin. It uses pnpm for reproducible local development and emits ESM JavaScript into `dist/`.

## Package Shape

- `src/index.ts` default-exports an OpenCode v1 plugin module: `{ id, server }`.
- `package.json` exposes both `.` and `./server` to `dist/index.js`.
- OpenCode npm plugin loading prefers `exports["./server"]` for server plugins.
- `main` remains pointed at `dist/index.js` as a fallback for loaders that inspect package main.

## Runtime Boundary

- The plugin imports only `@opencode-ai/plugin` at runtime.
- The server function returns OpenCode hooks and custom tools.
- Tool implementations should return structured metadata when useful so agent runs are easier to inspect.
- Plugin options are treated as untrusted input and normalized before use.

## Source Layout

- `src/index.ts`: starter plugin and exports.
- `test/`: executable plugin contract tests.
- `scripts/`: repository guardrails that agents and CI can run.
- `docs/`: durable project knowledge and harness-engineering operating docs.

## Growth Path

Future bundled agents should keep a predictable shape:

- Add reusable agent definitions under `src/agents/` only when there is more than one implementation.
- Add tools under `src/tools/` when a tool grows large enough to obscure the plugin entrypoint.
- Add harness or validation scripts under `scripts/` and wire them into `pnpm run check`.
- Promote repeated review feedback into docs first, then into mechanical checks when the rule is stable.
