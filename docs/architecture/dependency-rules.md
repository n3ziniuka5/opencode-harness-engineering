# Dependency Rules

## Runtime Dependencies

- Runtime code imports `@opencode-ai/plugin` and local source modules.
- Keep runtime dependencies minimal; adding a dependency changes package install risk and should be justified in docs or tests.
- Plugin initialization must not require dev-only packages.

## Source Direction

- `src/index.ts` may import from `src/agents/` and `src/commands/`.
- `src/agents/` and `src/commands/` should not import from `src/index.ts`.
- Future `src/tools/` modules may be imported by `src/index.ts` and should not depend on tests, scripts, or docs.
- Tests may import public exports from `src/index.ts` and focused source modules when needed to verify package contracts.
- Scripts may read repository files but should avoid importing runtime plugin modules unless the script is intentionally validating runtime exports.

## Forbidden Coupling

- Do not make docs or scripts the source of truth for runtime behavior when code or tests can express the invariant.
- Do not snapshot the entire long command or agent prompt in tests; assert stable sentinels and behaviorally important clauses.
- Do not add hidden coupling to local OpenCode checkout paths. Repo-specific references may describe discovered behavior, but runtime code should use package APIs.
