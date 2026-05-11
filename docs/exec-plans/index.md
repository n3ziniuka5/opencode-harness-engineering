# Execution Plans

Execution plans are temporary, single-task coordination documents. They help agents and maintainers track complex work while it is active, but they are not the source of truth for current product behavior, architecture, operations, or engineering rules.

## Active Plans

- Treat files under `docs/exec-plans/active/` as single-task active execution plans, not reusable process documentation.
- Name active plans `YYYY-MM-DD-feature-or-fix.md`.
- Keep active plans focused on the work being executed now: goal, constraints, verified context, implementation steps, validation, and open decisions.
- Do not create `docs/exec-plans/active/index.md`.
- Do not use active plans to replace durable documentation in product, feature, architecture, engineering, runbook, quality, generated, or reference docs.

## Completion Rules

- Before deleting or archiving an active plan, move every still-useful fact, decision, contract, and operational note into the appropriate long-term repository documentation.
- Use ADRs for durable architecture decisions and tradeoffs.
- Use feature docs for durable behavior, edge cases, responsibility splits, and source-of-truth code pointers.
- Use architecture docs for boundaries, dependency rules, data model intent, and public contracts.
- Use engineering docs for coding, testing, validation, security, reliability, performance, observability, and release rules.
- Use runbooks for recurring operational procedures, incident response, recovery workflows, or manual maintenance.
- Use quality docs for active debt, scorecards, risk posture, and cleanup plans.

## Delete By Default

Delete the active plan after completion when:

- the plan was only a temporary checklist
- the work was small
- the PR description already captures enough history
- no future reader needs the execution sequence
- all durable decisions are captured elsewhere

For most small tasks, delete the active plan after completion once durable docs are updated.

## Archive Sparingly

Use `docs/exec-plans/completed/` only when the remaining execution history has durable debugging, audit, rollout, or handoff value.

If archiving:

- heavily rewrite the plan to preserve only information that is crucial to remember long-term
- keep the archived summary brief
- remove transient checklist noise, stale assumptions, and implementation chatter
- do not use completed plans as the source of truth for current behavior
- do not create `docs/exec-plans/completed/index.md`

## Current Behavior Source Of Truth

Current behavior belongs in the long-term documentation areas and in source-controlled code, tests, and configuration. Completed execution plans may explain how work happened, but they must not be required reading to understand how the repository behaves now.
