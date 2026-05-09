# Execution Plans

Execution plans are task-specific working documents, not reusable process documentation.

Treat files under `docs/exec-plans/active/` as single-task active execution plans named `YYYY-MM-DD-feature-or-fix.md`. Do not create an active execution-plan example file during scaffold initialization. Do not create `docs/exec-plans/active/index.md` or `docs/exec-plans/completed/index.md`.

For most small tasks, delete the active plan after completion once durable docs are updated. Use `docs/exec-plans/completed/` only when execution history has durable debugging, audit, rollout, or handoff value. Completed plans are not the source of truth for current behavior; move lasting decisions into ADRs, feature docs, architecture docs, quality docs, or engineering docs.

Delete rather than archive when:

- the plan was only a temporary checklist
- the work was small
- the PR description already captures enough history
- no future reader needs the execution sequence
- all durable decisions are captured elsewhere
