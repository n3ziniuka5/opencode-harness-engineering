# Core Beliefs

## Humans Steer, Agents Execute

Humans define outcomes, review tradeoffs, and set taste. Agents should be able to implement, test, document, and clean up changes with repository-local context.

## Agent Legibility First

Future agents should be able to infer package shape, plugin entrypoints, tests, and operating rules from files in this repository. Important context that only exists in chat is treated as missing.

## Progressive Disclosure

Short entry points should point to focused source-of-truth documents. Avoid turning `AGENTS.md` into a long manual.

## Feedback Loops Over Reminders

Rules that matter should eventually become tests, scripts, or CI checks. Documentation is useful, but mechanical checks prevent drift.

## Small, Composable Boundaries

Keep the plugin entrypoint readable. Split code only when a new file clarifies a stable boundary, such as tools, bundled agents, or validation scripts.
