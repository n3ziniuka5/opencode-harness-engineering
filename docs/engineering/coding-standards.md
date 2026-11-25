# Coding Standards

## TypeScript

- Use ESM imports and NodeNext module resolution.
- Preserve strict TypeScript settings from `tsconfig.json`, including `strict`, `exactOptionalPropertyTypes`, and `noUncheckedIndexedAccess`.
- Export stable constants from source modules when tests or downstream package users need to assert public behavior.
- Keep runtime code compatible with Node.js `>=22`.

## Formatting

- Follow `.editorconfig`: UTF-8, LF line endings, 2-space indentation, final newline, and trimmed trailing whitespace.
- Use Prettier through `pnpm run format` or `pnpm run format:check` for repository-wide formatting.

## Plugin Structure

- Keep `src/index.ts` readable as the plugin entrypoint.
- Put large bundled agent prompts under `src/agents/`.
- Check provider constraints before adding model parameters; omit unsupported fields entirely rather than storing `undefined` compatibility values.
- Put large bundled command prompts under `src/commands/`.
- Move future larger tools under `src/tools/` when keeping them in the entrypoint would obscure plugin registration.
- Assign bundled agent configs directly when they intentionally override OpenCode defaults; use `??=` only for config entries that should preserve local user definitions, such as slash commands.

## Prompt And Documentation Style

- Keep prompts outcome-first with explicit success criteria, constraints, output shape, and stop rules.
- Avoid snapshot-driven tests for long prompts. Review instruction wording and test actual behavior where meaningful coverage exists, reusing sufficient existing checks.
- Reject text-presence/absence assertions that merely confirm an instruction edit, including assertions added inside existing tests; do not prescribe a sentinel for each newly written rule.
- Keep `AGENTS.md` brief and move durable details into focused docs.
- Do not add backward-compatibility code unless persisted data, shipped behavior, external consumers, or explicit requirements justify it.
