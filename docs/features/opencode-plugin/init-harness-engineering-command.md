# `/init-harness-engineering` Command

## Intent

`/init-harness-engineering` initializes or updates a Markdown documentation scaffold in the current repository so future agents can work from durable, versioned project knowledge.

## Source Of Truth

- Command config: `src/commands/init-harness-engineering.ts`
- Registration: `src/index.ts`
- Tests: `test/init-harness-engineering-command.test.ts`
- Scaffold validation for this repository: `scripts/check-docs.ts`

## Behavior

- Command id is `init-harness-engineering` and OpenCode surfaces it as `/init-harness-engineering`.
- The command is registered through the plugin config hook with `??=`, preserving a user-defined command with the same id.
- The command leaves `agent`, `model`, and `subtask` unset so it runs with the user's current/default implementation agent and normal file-edit permissions.
- The command template includes `$ARGUMENTS` as user-provided focus, constraints, or requested emphasis.
- The command is prompt-only; plugin initialization performs no filesystem inspection or writes.
- The prompt requires scanning high-signal repository context before writing docs.
- The prompt requires verified facts, explicit `TODO:` markers for unknowns, concise scaffold docs, and a completion report.

## Scaffold Contract

- Required top-level docs are `AGENTS.md`, `ARCHITECTURE.md`, `README.md`, and `docs/index.md`.
- Top-level `AGENTS.md` should include a minimal documentation preflight rule: before changing documentation, read `docs/index.md`. For each target doc, read the whole file when it is short; otherwise inspect its purpose, headings/table of contents, the section being changed, and enough surrounding context to edit safely. Also follow any relevant parent/sibling `index.md`, lifecycle, generated-doc, or local instruction guidance.
- `README.md` should include a concise `## Harness-Engineering Posture` section when a repository adopts this scaffold.
- The scaffold includes product, feature, architecture, engineering, runbook, generated, execution-plan, quality, and reference documentation areas when appropriate for the target repository.
- Every scaffold `index.md` except `docs/exec-plans/index.md` must include a short purpose and a `## Files` table with columns `File`, `Purpose`, and `Read when`.
- `docs/exec-plans/index.md` explains lifecycle rules, separates archival rules from source-of-truth rules, and must not list child plan files.
- Optional generated and reference docs are created only when relevant and supported by a clear source of truth.

## Non-Obvious Constraints

- The command may decisively migrate or delete stale docs after preserving useful content.
- Agents must ask before adding non-Markdown placeholders, deleting useful content that cannot be migrated confidently, or making unsupported product or security claims.
- Durable knowledge from tool-specific instruction files should move into the docs knowledge base instead of being duplicated across instruction files.
