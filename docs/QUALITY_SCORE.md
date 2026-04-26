# Quality Score

Current score: 7/10.

## What Is Good

- Plugin entrypoint follows OpenCode v1 package shape.
- Starter behavior has executable tests.
- The bundle now includes a tested `human_plan` agent configuration.
- Repository knowledge is mapped through `AGENTS.md` and `docs/`.
- Documentation structure has a mechanical guardrail via `scripts/check-docs.ts`.

## Gaps

- CI is not configured yet.
- The bundled agent catalog is still small and has no OpenCode integration smoke test.
- No integration test currently boots OpenCode against this plugin.

## Next Quality Moves

- Add CI for `pnpm run check` and `pnpm run build`.
- Add an OpenCode integration smoke test once a stable CLI invocation is chosen.
- Add quality scoring per bundled agent when more agents are added.
