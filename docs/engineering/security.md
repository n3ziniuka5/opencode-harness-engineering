# Security

## Plugin Security Rules

- Treat plugin options as untrusted input.
- Do not read secrets unless a tool explicitly documents why it needs them.
- Do not log secrets, tokens, raw environment dumps, or credentials in tool metadata.
- Avoid installing dependencies with lifecycle scripts in automation unless explicitly required.
- Keep filesystem, network, and shell access behind explicit tools with narrow arguments.

## Current Posture

The plugin registers an in-memory greeting tool, a `human_plan` agent config, and an `init-harness-engineering` command config. Plugin initialization does not access the network, shell, filesystem, or environment.

The `human_plan` agent denies edits by default except dated active plan files under `docs/exec-plans/active/`, allows read-oriented discovery tools, `webfetch`, `skill`, `todowrite`, narrow user questions, and allows task delegation to the read-oriented `explore` agent. It does not grant bash through an agent-level permission override.

## Dependency Review

- Runtime dependency additions need a clear package-level benefit and should be reflected in `package.json` intentionally.
- Development dependency additions should support tests, builds, docs, or formatting and should be covered by repository scripts when practical.
