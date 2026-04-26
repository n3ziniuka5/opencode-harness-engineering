# Security

## Plugin Security Rules

- Treat plugin options as untrusted input.
- Do not read secrets unless a tool explicitly documents why it needs them.
- Do not log secrets, tokens, or raw environment dumps.
- Avoid installing dependencies with lifecycle scripts in automation unless explicitly required.
- Keep filesystem and shell access behind explicit tools with narrow arguments.

## Current Posture

The starter plugin only registers an in-memory greeting tool. It does not access the network, shell, filesystem, or environment.
