# Testing Strategy

## Entry Points First

Target application entrypoints, not internals. For this package, the main entrypoints are the package exports, default OpenCode plugin module, `server` hook, config-registered agents, and config-registered command. Tests that drive these surfaces verify real behavior and survive internal refactors.

## Current Test Scope

- `test/plugin.test.ts` verifies the plugin id, server export, absence of bundled tools, `explore` registration and permission sentinels, `plan` registration sentinels, and direct overriding of existing agent entries.
- `test/init-harness-engineering-command.test.ts` verifies slash-command registration, stable prompt sentinels, and preservation of user-defined command config.
- `scripts/check-docs.ts` validates the repository documentation scaffold and acts as a docs guardrail through `pnpm run docs:check`.

## Unit Tests

Unit tests are fine for small, self-contained functions where they add value, such as parsers, pure logic, option normalization, and algorithms. Use property-based testing only if the repository already supports the infrastructure.

## Mocking

Minimize mocking. Mocking whole classes, traits, or modules couples tests to implementation and hides real bugs. For infrastructure dependencies such as Kafka, Postgres, Restate, or Redis, use testcontainers or the repo-standard equivalent and run the real service against throwaway state. For third-party HTTP APIs, mock at the protocol boundary with tools such as wiremock so serialization, headers, retries, and error handling are still exercised.

## Assertions

Assert behavior, not implementation. Assert observable outputs such as package exports, OpenCode hook shape, tool output, metadata, command config, CLI output, emitted messages, or package API results. Do not assert on log lines, internal method calls, or private struct shapes unless the repo has a documented reason.

## Determinism

Keep tests deterministic. Avoid real sleeps, wall-clock `now()`, and unseeded randomness. Use the repo's virtual time, injected clocks, seeded RNGs, or equivalent deterministic mechanisms when time or randomness becomes necessary.

## Isolation

Maintain test isolation. Each test owns setup and teardown and must not depend on ordering or shared state. When sharing testcontainers for speed, each test still needs fresh data, such as a fresh DB schema or transaction, unique topic, unique Restate key, or equivalent isolated state.
