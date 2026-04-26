# Execution Plans

Use checked-in execution plans for work that spans multiple files, changes architecture, or requires staged validation.

## Plan Format

- File name: `docs/exec-plans/active/YYYY-MM-DD-slug.md` while active.
- Goal: user-visible outcome.
- Context: links to relevant code and docs.
- Steps: concrete implementation sequence.
- Validation: commands, tests, or manual checks.
- Decisions: tradeoffs made while executing.
- Completion archive instructions: how to rewrite and move the plan after implementation.
- Status: active, blocked, completed, or cancelled.

Small changes do not need a plan. If a change creates lasting architecture or process knowledge, update the relevant docs before finishing.

When implementation finishes, move the active plan to `docs/exec-plans/completed/YYYY-MM-DD-slug.md` only after heavily rewriting it. The completed version should preserve the original intent, the most important decisions taken, and the reasoning future agents should remember. Remove transient implementation checklists, raw file-by-file steps, answered questions, and status noise.
