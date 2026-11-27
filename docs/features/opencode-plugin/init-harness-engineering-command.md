# `/init-harness-engineering` Command

## Intent

`/init-harness-engineering` initializes or updates a Markdown documentation scaffold in the current repository so people and agents can work from durable, versioned project knowledge. For manual adoption, see the [scaffold adoption guide](../../guides/adopt-the-documentation-scaffold.md).

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
- On creation and updates, the prompt requires the top-level `AGENTS.md` to tell agents to keep it short, put durable details in `docs/`, and prefer mechanical checks for important rules. Reruns preserve or consolidate equivalent guidance. No new tooling is required to adopt the scaffold.
- Top-level `AGENTS.md` gets two additional rules even when the repository has no skills or guides: keep repository-owned skills thin at `.agents/skills/<name>/SKILL.md` with direct links to canonical guides or runbooks for shared procedures; keep durable docs usable without a coding agent and put agent-specific instructions in skills.
- `README.md` should include a concise `## Harness-Engineering Posture` section when a repository adopts this scaffold.
- The scaffold includes product, feature, architecture, engineering, guide, runbook, generated, execution-plan, quality, and reference documentation areas when appropriate for the target repository.
- Every scaffold `index.md` except `docs/exec-plans/index.md` must include a short purpose and a `## Files` table with columns `File`, `Purpose`, and `Read when`.
- The execution-plan scaffold includes only `docs/exec-plans/index.md` and `docs/exec-plans/active/`, with no child plan indexes or completed-plan directory.
- `AGENTS.md` is the scaffold's instruction entrypoint. The prompt treats existing `CLAUDE.md` files only as migration inputs. Preserve useful guidance at its original scope in `AGENTS.md` or durable docs and update affected references before removing obsolete files.
- Optional sibling repository maps belong in `docs/references/sibling-repositories.md` only when sibling repository context is relevant or explicitly requested. Contracts, runtime/package boundaries, and feature behavior discovered from sibling relationships still belong in the corresponding architecture or feature docs.
- Optional generated and reference docs are created only when relevant and supported by a clear source of truth.
- The testing-strategy baseline combines entrypoint-first coverage, valuable unit tests, minimal mocking, observable assertions, determinism, and isolation with coverage reuse: extend suitable tests cohesively or add focused cases when needed, avoiding duplicate coverage and tautological or edit-mirroring assertions. Instruction-only changes use review and relevant existing checks; absence assertions remain valid for required public contracts.
- Bug verification prefers meaningful automated fail-before/pass-after reproduction. If infeasible, the baseline requires concrete alternatives, expected evidence, reasons, limitations, and disclosure of absent automated regression protection under repository requirements, surfacing unmet mandatory gates.

## Non-Obvious Constraints

- The command may decisively migrate or delete stale docs after preserving useful content.
- Scaffold updates replace legacy lifecycle guidance without bulk-deleting existing plan files.
- Agents must ask before adding non-Markdown placeholders, deleting useful content that cannot be migrated confidently, or making unsupported product or security claims.
- Durable knowledge from tool-specific instruction files should move into the docs knowledge base instead of being duplicated across instruction files.
- User-global skills and loader configuration are out of scope. If a legacy skill cannot move without breaking discovery or references, the prompt calls for leaving it in place and reporting the blocker.
- Upgrading the plugin does not rewrite existing scaffolds. Restart OpenCode and rerun the bundled command to update a scaffold.
