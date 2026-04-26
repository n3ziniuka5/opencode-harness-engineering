# Security

## Plugin Security Rules

- Treat plugin options as untrusted input.
- Do not read secrets unless a tool explicitly documents why it needs them.
- Do not log secrets, tokens, or raw environment dumps.
- Avoid installing dependencies with lifecycle scripts in automation unless explicitly required.
- Keep filesystem and shell access behind explicit tools with narrow arguments.

## Current Posture

The plugin registers an in-memory greeting tool and a `human_plan` agent config. Plugin initialization does not access the network, shell, filesystem, or environment.

The `human_plan` agent denies bash permissions by default, allows edits only to dated active plan files under `docs/exec-plans/active/`, allows narrow user questions, and only allows task delegation to the read-oriented `explore` agent.
