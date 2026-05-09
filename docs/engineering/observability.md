# Observability

## Current Posture

The package does not run a service and has no dashboards, metrics backend, tracing pipeline, or alerting configuration. The current observability surface is OpenCode tool metadata.

## Tool Metadata

- `hello_world` calls `context.metadata` with a human-readable title and structured metadata.
- Tool metadata should include the plugin id and relevant target when useful for agent trace legibility.
- Do not put secrets, raw environment values, tokens, or credentials in metadata.

## Logs, Metrics, And Traces

- Do not add noisy logging for deterministic in-memory behavior.
- If future tools perform filesystem, network, shell, or long-running work, define metadata and error reporting expectations before implementation.
- TODO: choose an observability standard before adding production-facing remote operations.
