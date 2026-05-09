# `hello_world` Tool

## Intent

`hello_world` is the starter tool that proves the plugin can register OpenCode tools and return structured metadata.

## Source Of Truth

- Implementation: `src/index.ts`
- Tests: `test/hello-world.test.ts`
- Package plugin id: `harness.hello-world`

## Behavior

- Tool id is `hello_world`.
- Description mentions the harness-engineering starter plugin.
- Optional `name` argument is a trimmed non-empty string.
- Missing `name` defaults the target to `world`.
- Output string is `${greeting}, ${target}!` where `greeting` comes from normalized plugin options.
- Returned value is `{ output, metadata }` with `metadata.plugin` and `metadata.target`.
- The tool also calls `context.metadata` with title `hello ${target}` and the same plugin and target metadata.

## Non-Obvious Constraints

- The `greeting` plugin option is normalized by `optionString`; non-string, blank, or whitespace-only values fall back to `Hello`.
- Keep this tool small unless it becomes a real reusable capability. Move larger tools under `src/tools/`.
