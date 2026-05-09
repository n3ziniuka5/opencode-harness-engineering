# Performance

## Current Posture

This package does not serve requests or maintain a long-running process of its own. Performance concerns are plugin initialization cost, tool execution latency, prompt/config size, test speed, and TypeScript build time.

## Expectations

- Keep plugin initialization synchronous-light and free of filesystem, network, shell, or environment reads.
- Keep the `hello_world` tool deterministic and effectively constant-time.
- Keep large prompts in dedicated modules so entrypoint inspection remains fast for humans and agents.
- Prefer focused tests that exercise public contracts without starting unnecessary external processes.

## Known Bottlenecks

- No runtime bottlenecks are known.
- TODO: define startup or execution budgets if the plugin adds remote calls, heavy generated references, or many bundled capabilities.
