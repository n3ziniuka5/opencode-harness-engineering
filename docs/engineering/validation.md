# Validation

## Default Handoff Check

Run the full repository check before handoff when dependencies are installed:

```sh
pnpm run check
```

## Individual Checks

| Command                 | Purpose                                                                            |
| ----------------------- | ---------------------------------------------------------------------------------- |
| `pnpm run typecheck`    | Typecheck source, tests, and scripts with no emit.                                 |
| `pnpm run test`         | Run Node test files through `tsx`.                                                 |
| `pnpm run docs:check`   | Verify required scaffold docs, index tables, references, and obsolete-doc cleanup. |
| `pnpm run format:check` | Check Prettier formatting without writing changes.                                 |
| `pnpm run build`        | Compile the package into `dist/` after removing previous build output.             |

## When To Run More

- Run `pnpm run build` when package exports, TypeScript config, or emitted declarations could change.
- Run `pnpm run format:check` when Markdown, TypeScript, JSON, or config formatting changed.
- Run targeted tests first while iterating, then run `pnpm run check` before final handoff.
