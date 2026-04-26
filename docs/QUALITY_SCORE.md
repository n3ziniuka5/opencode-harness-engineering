# Quality Score

Current score: 7/10.

## What Is Good

- Plugin entrypoint follows OpenCode v1 package shape.
- Starter behavior has executable tests.
- Repository knowledge is mapped through `AGENTS.md` and `docs/`.
- Documentation structure has a mechanical guardrail via `scripts/check-docs.ts`.

## Gaps

- CI is not configured yet.
- There is no real bundled agent catalog beyond the starter tool.
- No integration test currently boots OpenCode against this plugin.

## Next Quality Moves

- Add CI for `pnpm run check` and `pnpm run build`.
- Add an OpenCode integration smoke test once a stable CLI invocation is chosen.
- Add quality scoring per bundled agent when the catalog grows.
