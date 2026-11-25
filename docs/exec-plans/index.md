# Execution Plans

Execution plans are temporary, single-task coordination documents. They help agents and maintainers track complex work while it is active, but they are not the source of truth for current product behavior, architecture, operations, or engineering rules.

## Active Plans

- Treat files under `docs/exec-plans/active/` as single-task active execution plans, not reusable process documentation.
- Name active plans `YYYY-MM-DD-feature-or-fix.md`.
- Keep active plans focused on the work being executed now: goal, constraints, verified context, implementation steps, validation, and open decisions.
- Do not create `docs/exec-plans/active/index.md`.
- Do not list or link to individual plans in this index.
- Do not use active plans to replace durable documentation in product, feature, architecture, engineering, runbook, quality, generated, or reference docs.

## On Completion

Update relevant durable docs based on the final implementation and verification, then delete the active plan before reporting done. Do not archive it or leave any remnant under `docs/exec-plans/completed/`, including a rewritten summary, redirect, or placeholder.

## Where Durable Knowledge Belongs

- Use ADRs for durable architecture decisions and tradeoffs.
- Use feature docs for durable behavior, edge cases, responsibility splits, and source-of-truth code pointers.
- Use architecture docs for boundaries, dependency rules, data model intent, and public contracts.
- Use engineering docs for coding, testing, validation, security, reliability, performance, observability, and release rules.
- Use runbooks for recurring operational procedures, incident response, recovery workflows, or manual maintenance.
- Use quality docs for active debt, scorecards, risk posture, and cleanup plans.
