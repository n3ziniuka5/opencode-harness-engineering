# Testing Strategy

## Entry Points First

Target application entrypoints, not internals. For this package, the main entrypoints are the package exports, default OpenCode plugin module, `server` hook, config-registered agents, and config-registered command. Tests that drive these surfaces verify real behavior and survive internal refactors.

## Coverage Selection

Inspect relevant existing tests first and identify the files/cases and observable behavior they protect. Run existing coverage unchanged when sufficient. When coverage must change, prefer extending a suitable existing test if the scenario remains cohesive; otherwise add a focused test. Avoid duplicate coverage, not separate test cases as such. Do not append unrelated scenarios or assertions to a broad test merely to avoid a separate case, or add tests simply because a file, config value, or implementation detail changed.

## Bug Verification

For bug fixes, plan verification first and prefer meaningful automated reproduction that fails before the fix and passes afterward. Reuse, modify, or add coverage as appropriate.

If the available harness cannot supply meaningful automated reproduction, document the concrete alternative check, expected evidence, why it is necessary, and its limitations, including what automated regression protection remains absent. Alternatives must satisfy repository verification requirements; surface any unmet mandatory gate rather than silently waiving it or claiming completion. Do not fabricate a textual or self-confirming test to satisfy a reproduction rule.

## Current Test Scope

- `test/plugin.test.ts` verifies the plugin id, server export, absence of bundled tools, GPT-6 model and effort assignments, absence of unsupported sampling keys, `explore` registration, retrieval-only boundary, worktree-bounded and non-Git guidance sentinels, recursive search-root sentinels across preferred tools and Bash fallbacks, self-identified sibling and exact external/cache target exceptions, `ask`, `brainstorm`, and `draft` caller-owned reasoning and skill-priority sentinels, colors, permissions, native `plan` disablement, unconditional `default_agent: "draft"` behavior, global `subagent_depth` default and explicit-value preservation (including `0`), partial native `build` color override behavior, and direct overriding of existing bundled agent entries.
- `test/init-harness-engineering-command.test.ts` verifies slash-command registration, stable prompt sentinels, and preservation of user-defined command config.
- `scripts/check-docs.ts` validates the repository documentation scaffold and acts as a docs guardrail through `pnpm run docs:check`.

## Unit Tests

Unit tests are fine for small, self-contained functions where they add value, such as parsers, pure logic, option normalization, and algorithms. Use property-based testing only if the repository already supports the infrastructure.

## Mocking

Minimize mocking. Mocking whole classes, traits, or modules couples tests to implementation and hides real bugs. For infrastructure dependencies such as Kafka, Postgres, Redis, etc. use testcontainers or the repo-standard equivalent and run the real service against throwaway state. For third-party HTTP APIs, mock at the protocol boundary with tools such as wiremock so serialization, headers, retries, and error handling are still exercised.

## Assertions

Assert behavior, not implementation. Assert observable outputs such as package exports, OpenCode hook shape, tool output, metadata, command config, CLI output, emitted messages, or package API results. Avoid tests that primarily re-test framework or library guarantees; exercise those dependencies when verifying application-specific behavior or integration contracts. Do not assert on log lines, internal method calls, or private struct shapes unless the repo has a documented reason.

Reject tautological tests: expected outcomes must come from an independently specified observable contract, not restate the implementation, derive expectations from the same code under test, or merely confirm an edit occurred. This applies to new assertions in existing tests as well as new cases or files. Config removal alone does not justify an absence-only regression assertion; an absence assertion is meaningful when absence is itself a required public output or config contract.

For instruction-wording and documentation-only changes, review the instructions and run relevant existing checks rather than adding text-presence/absence assertions just to confirm the edit. Existing registration and prompt checks do not evaluate an agent's test-selection decisions: instruction review establishes coherent policy, not guaranteed future model behavior. Registration, permissions, config handling, and other executable contracts still need meaningful behavioral verification even when adjacent to prompts.

## Determinism

Keep tests deterministic. Avoid real sleeps, wall-clock `now()`, and unseeded randomness. Use the repo's virtual time, injected clocks, seeded RNGs, or equivalent deterministic mechanisms when time or randomness becomes necessary.

## Isolation

Maintain test isolation. Each test owns setup and teardown and must not depend on ordering or shared state. When sharing testcontainers for speed, each test still needs fresh data, such as a fresh DB schema or transaction, unique topic, or equivalent isolated state.
