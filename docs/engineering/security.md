# Security

## Plugin Security Rules

- Treat plugin options as untrusted input.
- Do not read secrets unless a tool explicitly documents why it needs them.
- Do not log secrets, tokens, raw environment dumps, or credentials in tool metadata.
- Avoid installing dependencies with lifecycle scripts in automation unless explicitly required.
- Keep filesystem, network, and shell access behind explicit tools with narrow arguments.

## Current Posture

The plugin registers `explore`, `ask`, `brainstorm`, and `draft` agent configs, disables native `plan`, and registers an `init-harness-engineering` command config. Plugin initialization does not access the network, shell, filesystem, or environment.

The `explore` agent denies wildcard access, edits, nested task delegation, and todowrite. It allows local read/search tools, `webfetch`, `websearch`, `context7_*`, ask-gated external directory reads, and bash only for read-only commands that do not modify files or add/change git-tracked files. Its prompt separately limits recursive search roots to the active workspace or an exact external repository or dependency cache.

The `ask` and `brainstorm` agents deny edits, explicitly allow common discovery and coordination tools, and allow task delegation only to `explore`. They leave unspecified non-edit tools unset so OpenCode can apply its default ask behavior.

The `draft` agent denies edits by default except dated active plan files under `docs/exec-plans/active/`, allows read-oriented discovery tools, `webfetch`, `websearch`, `skill`, `todowrite`, narrow user questions, and allows task delegation only to `explore`. Native `plan` is disabled so OpenCode's native plan-mode reminder cannot override the bundled write allowance for active plan files.

## Dependency Review

- Runtime dependency additions need a clear package-level benefit and should be reflected in `package.json` intentionally.
- Development dependency additions should support tests, builds, docs, or formatting and should be covered by repository scripts when practical.
