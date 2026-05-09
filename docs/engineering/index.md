# Engineering Documentation

This directory records repo-specific engineering rules for implementing, validating, and operating the OpenCode plugin bundle.

## Files

| File | Purpose | Read when |
| ---- | ------- | --------- |
| [`coding-standards.md`](coding-standards.md) | TypeScript, package, prompt, and repository coding conventions. | You are editing source, scripts, tests, or prompt config. |
| [`testing-strategy.md`](testing-strategy.md) | What to test and how to keep tests behavior-focused and deterministic. | You are adding behavior or choosing test coverage. |
| [`observability.md`](observability.md) | Tool metadata, logs, traces, metrics, and alerting expectations. | You are changing agent/tool outputs or adding side-effecting behavior. |
| [`reliability.md`](reliability.md) | Failure modes, determinism, idempotency, and recovery expectations. | You are changing initialization, tool execution, or config registration. |
| [`security.md`](security.md) | Secrets, permissions, plugin options, and dependency security rules. | You are adding inputs, filesystem access, shell access, network access, or dependencies. |
| [`performance.md`](performance.md) | Startup, runtime, prompt-size, and build performance posture. | You are adding work to plugin initialization or large prompt/config payloads. |
| [`release-process.md`](release-process.md) | Versioning, packaging, publishing, and rollback notes. | You are preparing a release or changing package metadata. |
| [`validation.md`](validation.md) | Final local checks and validation command meanings. | You are ready to hand off a change. |
