export const INIT_HARNESS_ENGINEERING_COMMAND_NAME = "init-harness-engineering";

export const INIT_HARNESS_ENGINEERING_COMMAND_DESCRIPTION =
  "initialize harness-engineering documentation scaffold";

export const INIT_HARNESS_ENGINEERING_COMMAND_TEMPLATE = `You are running /init-harness-engineering. Initialize or update a harness-engineering documentation scaffold in the current repository.

# User Focus Or Constraints

Treat this text as user-provided focus, constraints, or requested emphasis:

$ARGUMENTS

# Goal

Create or update agent-readable Markdown documentation that captures product intent, durable feature behavior, architecture, engineering rules, execution planning, quality posture, and repo-specific references. The scaffold should make future agent work safer by preserving durable project knowledge in versioned docs.

# Required Files And Directories

Create or update this Markdown-focused structure when appropriate for the repository:

\`\`\`text
.
|-- AGENTS.md
|-- ARCHITECTURE.md
|-- README.md
+-- docs/
    |-- index.md
    +-- product/
    |   |-- index.md
    |   |-- personas.md
    |   |-- user-journeys.md
    |   |-- acceptance-criteria.md
    +-- features/
    |   |-- index.md
    |   +-- <area>/
    |       |-- index.md
    |       |-- <feature>.md
    +-- architecture/
    |   |-- index.md
    |   |-- boundaries.md
    |   |-- dependency-rules.md
    |   |-- data-model.md
    |   |-- api-contracts.md
    |   +-- adr/
    |       |-- index.md
    |       |-- YYYY-MM-DD-<decision>.md
    +-- engineering/
    |   |-- index.md
    |   |-- coding-standards.md
    |   |-- testing-strategy.md
    |   |-- observability.md
    |   |-- reliability.md
    |   |-- security.md
    |   |-- performance.md
    |   |-- release-process.md
    |   |-- validation.md
    +-- runbooks/
    |   |-- index.md
    |   |-- <operational-task>.md
    +-- generated/
    |   |-- index.md
    |   |-- <generated-reference>.md
    +-- exec-plans/
    |   |-- index.md
    |   +-- active/
    |   +-- completed/
    +-- quality/
    |   |-- index.md
    |   |-- scorecard.md
    |   |-- tech-debt-tracker.md
    +-- references/
        |-- index.md
        |-- <repo-specific-reference>.md
\`\`\`

Only create repo-specific reference files when they are relevant to the repository or explicitly requested by the user.

- \`docs/references/sibling-repositories.md\`: optional reference map for adjacent repositories that are developed, released, deployed, or debugged together with this repository. Create it only when sibling repositories are relevant or explicitly requested. Include verified repository names, paths or URLs, relationship, when to consult each sibling, and source-of-truth ownership notes. If a sibling relationship defines an API/package/CLI/event/config contract, record the contract in \`docs/architecture/api-contracts.md\`; if it defines a runtime or package boundary, record that in \`docs/architecture/boundaries.md\`; if it affects one feature, capture durable behavior in that feature doc. Do not invent sibling relationships or record secrets, credentials, or personal-only local paths.

# Repository Discovery

Start by scanning high-signal repository context before writing files:

- \`README*\`, root manifests, lockfiles, build/test/lint/typecheck/codegen configs, and package manager files.
- CI workflows and release/deployment configs.
- Existing agent instruction analogs such as \`AGENTS.md\`, \`CLAUDE.md\`, \`GEMINI.md\`, tool-specific rule files, and local OpenCode config.
- Existing docs, design notes, ADRs, plans, quality/security/reliability docs, and reference notes.
- Representative entrypoints only when docs and configs do not explain the architecture.

If the repository is non-empty, populate each Markdown file from verified status-quo facts: actual setup commands, package boundaries, entrypoints, public APIs, data stores, test strategy, deployment/release flow, known vendors, current reliability/security posture, and existing roadmap or product signals. If the repository is empty or a fact cannot be inferred, create concise scaffolding with explicit \`TODO:\` markers for the missing decision instead of inventing facts.

# Preservation Rules

- Transform existing documentation decisively when moving the repository to this scaffold. It is okay to rewrite, move, or delete old docs when useful durable content has been migrated or the old content is stale.
- Do not keep legacy pointers, redirect stubs, or duplicate index links to old file locations after moving content. Update references to the new paths and remove obsolete files instead.
- Ask the user before adding non-Markdown placeholders such as \`.gitkeep\`, deleting useful content that cannot be migrated confidently, or making product/security claims the repo cannot support.
- \`CLAUDE.md\` is only a compatibility file for Claude-style tooling, not an independent instruction source. Do not introduce \`CLAUDE.md\` into directories that did not already have one. When a directory already has \`CLAUDE.md\`, preserve Claude compatibility: migrate verified durable content into the same-directory \`AGENTS.md\` and/or the appropriate \`docs/\` files, create or update the same-directory \`AGENTS.md\` first if \`CLAUDE.md\` will remain, then make \`CLAUDE.md\` a relative symlink or concise pointer to that same-directory \`AGENTS.md\`. \`CLAUDE.md\` cannot exist without \`AGENTS.md\` in the same directory. If no same-directory \`AGENTS.md\` exists or will be created, remove \`CLAUDE.md\` after preserving any unique durable content. Do not create or keep \`CLAUDE.md\` files that link to a parent or ancestor \`AGENTS.md\`.
- Durable knowledge from tool-specific rule files should generally move into the \`docs/\` knowledge base instead of becoming more duplicated instruction files.
- Keep \`AGENTS.md\` short as a table of contents and operational rule map. Push durable details into \`docs/\`.

# What Not To Document

Add this anti-bloat rule to the target repository's top-level \`AGENTS.md\`.

Do not create or update docs for:

- trivial implementation details obvious from code
- temporary debugging notes
- one-off plans after completion unless they preserve durable decisions
- generated facts that should come from source or tooling
- speculative future ideas without a committed direction

# Index Requirements

For every \`index.md\` except \`docs/exec-plans/index.md\`, include a short directory purpose and a \`## Files\` table with exactly these columns:

| File | Purpose | Read when |
| ---- | ------- | --------- |

Keep index tables practical and repo-specific. Link to nearby files with relative links.

Exception: \`docs/exec-plans/index.md\` should explain execution-plan lifecycle rules without linking to or listing child files.

# File Purpose Catalog

Use these meanings so generated docs and index tables stay consistent:

- \`AGENTS.md\`: links to \`docs/index.md\` and \`ARCHITECTURE.md\`, and explicit instructions to keep relevant Markdown docs updated when behavior, architecture, product decisions, or operating rules change. Include a minimal documentation preflight rule: Before changing documentation, read \`docs/index.md\`. For each target doc, read the whole file when it is short; otherwise inspect its purpose, headings/table of contents, the section being changed, and enough surrounding context to edit safely. Also follow any relevant parent/sibling \`index.md\`, lifecycle, generated-doc, or local instruction guidance. We want to keep this file as brief as possible to not overload the agent context. Child AGENTS.md files can contain instructions specific to that directory, but the top-level one should be brief. If AGENTS.md file already exists, clean it up according to these rules.
- \`ARCHITECTURE.md\`: high-level system/package shape, runtime boundaries, and key flows.
- \`README.md\`: human-facing setup, usage, project overview, and repository tooling details such as how to run the app, run checks, regenerate code, build artifacts, and perform common local development workflows. Include a concise \`## Harness-Engineering Posture\` section when the repository adopts this scaffold. That section should summarize repo-specific principles: keep \`AGENTS.md\` short, store durable knowledge in \`docs/\`, keep code/config/docs agent-legible, and encode important rules as tests, scripts, or other mechanical checks.
- \`docs/index.md\`: top-level documentation map and progressive-disclosure entrypoint.
- \`docs/product/index.md\`: product documentation map.
- \`docs/product/personas.md\`: users, operators, admins, and other stakeholders.
- \`docs/product/user-journeys.md\`: important end-to-end user workflows.
- \`docs/product/acceptance-criteria.md\`: product-level done/acceptance rules.
- \`docs/features/index.md\`: feature documentation map for durable, repo-specific behavior notes that do not fit cleanly into product, architecture, or engineering. Prefer feature docs over child \`AGENTS.md\` files for feature-specific knowledge because features usually span multiple layers and files, and often do not have a single common parent directory that is not too top-level.
- \`docs/features/<area>/index.md\`: documentation map for a feature area or domain area.
- \`docs/features/<area>/<feature>.md\`: durable notes for a specific feature/capability, including intended behavior, responsibility splits, edge cases, source-of-truth code pointers, external mappings, and non-obvious constraints.
- \`docs/architecture/index.md\`: architecture documentation map.
- \`docs/architecture/boundaries.md\`: module/service responsibilities, public seams, and where one subsystem hands work to another.
- \`docs/architecture/dependency-rules.md\`: dependency direction, forbidden imports, and layering rules.
- \`docs/architecture/data-model.md\`: core domain objects, why they exist, lifecycle, invariants, and intent that cannot be inferred from source code; avoid a one-to-one clone of schemas or model structs.
- \`docs/architecture/api-contracts.md\`: inventory of public HTTP/RPC/CLI/event/package/config contracts, where each source of truth lives, responsibility expectations, compatibility expectations, and intent notes that cannot be inferred from the contract source itself.
- \`docs/architecture/adr/index.md\`: ADR index with naming rules, status meanings, and guidance on when to record a decision.
- \`docs/architecture/adr/YYYY-MM-DD-<decision>.md\`: decision record for a concrete architecture choice, including decision context, decision, tradeoffs, and consequences.
- \`docs/engineering/index.md\`: engineering documentation map.
- \`docs/engineering/coding-standards.md\`: repo-specific coding conventions.
- \`docs/engineering/testing-strategy.md\`: what to test and how to test it; exact validation commands belong in \`docs/engineering/validation.md\` unless they materially explain the strategy.
- \`docs/engineering/observability.md\`: logs, metrics, traces, dashboards, and alerting expectations.
- \`docs/engineering/reliability.md\`: failure modes, retry/idempotency behavior, SLOs, and recovery expectations.
- \`docs/engineering/security.md\`: secrets, auth, permissions, data handling, and dependency/security review rules.
- \`docs/engineering/performance.md\`: latency/throughput budgets, profiling, and known bottlenecks.
- \`docs/engineering/release-process.md\`: versioning, changelog, deployment, rollback, and release process.
- \`docs/engineering/validation.md\`: final checks before considering changes complete.
- \`docs/runbooks/index.md\`: runbook documentation map for operational tasks.
- \`docs/runbooks/<operational-task>.md\`: step-by-step operational procedure for a recurring task, incident response, recovery workflow, or manual maintenance action.
- \`docs/generated/index.md\`: generated documentation map that explains which files are generated, where their source of truth lives, how to regenerate them, and which generated references are present for this repository.
- \`docs/generated/<generated-reference>.md\`: optional generated or source-derived reference selected from actual repository tooling. Generated references are useful when understanding current state from many source files would be slower or more error-prone than reading a regenerated summary. Examples include \`db-schema.md\`, \`dependency-graph.md\`, \`openapi.md\`, \`graphql-schema.md\`, \`protobuf.md\`, \`event-catalog.md\`, \`cli-reference.md\`, \`config-reference.md\`, \`env-vars.md\`, \`permissions-matrix.md\`, \`feature-flags.md\`, \`route-map.md\`, or package dependency references. Only create generated docs that can be regenerated from a clear source of truth.
- \`docs/exec-plans/index.md\`: execution-plan lifecycle rules for when to create, complete, delete, or archive task-specific plans. Do not include references to child files.
- \`docs/exec-plans/active/\`: temporary home for active execution plans named \`YYYY-MM-DD-feature-or-fix.md\`. Active plans must be moved, summarized, or deleted when the task completes.
- \`docs/exec-plans/completed/\`: optional archive for completed execution summaries when the remaining execution history has durable debugging, audit, rollout, or handoff value. Do not use completed plans as the source of truth for current behavior.
- \`docs/quality/index.md\`: quality documentation map.
- \`docs/quality/scorecard.md\`: quality rubric with area, grade, confidence, known issues, and last-reviewed columns.
- \`docs/quality/tech-debt-tracker.md\`: known debt, priority, and cleanup plan. If a line exists in this file, the debt is still active. Track in-progress half-migrations, dead code, unused configs, stale feature flags, abandoned TODOs, deprecated endpoints, and similar cleanup work here while it remains active.
- \`docs/references/index.md\`: repo-specific external/vendor/reference documentation map.
- \`docs/references/<topic>.md\`: repo-specific external/vendor/reference notes selected from actual repository context. Examples might include \`stripe.md\`, \`auth0.md\`, \`aws.md\`, \`kafka.md\`, \`datadog.md\`, or \`openapi.md\`, but only create reference files that are relevant to the repository or explicitly requested by the user.

# Generated Documentation Rules

Every generated or source-derived doc under \`docs/generated/\` should include a short header with:

- source of truth
- regeneration command
- whether the file is safe to edit manually; usually no

# ADR Decision Rules

- Preserve existing ADRs as decision history instead of rewriting old decisions to look current.
- When an existing decision is outdated, mark its status as \`Superseded\` and add a link or explicit reference to the newer decision file.
- New ADRs should explain the context, decision, tradeoffs, and consequences that are not obvious from code or config.

# Testing Strategy Baseline

Prefill \`docs/engineering/testing-strategy.md\` with these baseline instructions, adapting examples to the target repository's language and runtime:

- **Target application entrypoints, not internals.** The majority of tests should exercise HTTP servers, gRPC servers, Kafka consumers, CLI commands, package exports, or whatever public surface the application exposes. Tests that drive the entrypoint verify real behavior end-to-end and stay valid when internals are refactored. What counts as an entrypoint depends on the specific application.
- **Unit tests are fine for small, self-contained functions** where they add value, such as parsers, pure logic, and algorithms. Use property-based testing when the repository already supports it.
- **Minimize mocking.** Mocking whole classes, traits, or modules couples tests to implementation and hides real bugs. For infrastructure dependencies such as Kafka, Postgres, Redis, etc. use testcontainers or the repo-standard equivalent and run the real service against throwaway state. For third-party HTTP APIs, mock at the protocol boundary with tools such as wiremock so serialization, headers, retries, and error handling are still exercised.
- **Assert behavior, not implementation.** Assert observable outputs such as HTTP responses, emitted messages, DB rows, produced Kafka records, CLI output, or package API results. Do not assert on log lines, internal method calls, or private struct shapes unless the repo has a documented reason.
- **Keep tests deterministic.** Avoid real sleeps, wall-clock \`now()\`, and unseeded randomness. Use the repo's virtual time, injected clocks, seeded RNGs, or equivalent deterministic mechanisms.
- **Maintain test isolation.** Each test owns setup and teardown and must not depend on ordering or shared state. When sharing testcontainers for speed, each test still needs fresh data, such as a fresh DB schema/transaction, unique topic, or equivalent isolated state.

# Quality Scorecard Baseline

Prefill \`docs/quality/scorecard.md\` with a repository-specific table. Replace example areas with inferred repository areas when possible, and use today's date from the active OpenCode environment:

\`\`\`markdown
# Quality Scorecard

Last reviewed: YYYY-MM-DD

| Area | Grade | Confidence | Known issues | Last reviewed |
| ---- | ----: | ---------: | ------------ | ------------- |
| TODO: repository area | TODO | TODO | TODO: known issue or None known | YYYY-MM-DD |
\`\`\`

# Execution Plan Guidance

Explain these lifecycle rules in \`docs/exec-plans/index.md\`:

- Treat files under \`docs/exec-plans/active/\` as single-task active execution plans, not reusable process documentation.
- Do not create \`docs/exec-plans/active/index.md\` or \`docs/exec-plans/completed/index.md\`.
- Do not include references to child files in \`docs/exec-plans/index.md\`; keep it focused on lifecycle rules.
- Do not use completed plans as the source of truth for current behavior.

Then add an archival rule explaining:

- Completing implementation includes resolving the active plan's lifecycle before reporting the task done.
- Before deleting or archiving an active plan, update the appropriate long-term repo documentation to reflect what was actually built, changed, verified, and decided, such as ADRs, feature docs, architecture docs, runbooks, quality docs, or engineering docs. Use the completed implementation and final code/tests as the source of truth; do not mechanically copy or move stale plan text.
- For most small tasks, delete the active plan after completion once durable docs are updated.
- Use \`docs/exec-plans/completed/\` only when the remaining execution history has durable debugging, audit, rollout, or handoff value.
- If archiving, heavily rewrite the plan to preserve only the remaining information that is crucial to remember long-term, and keep it brief.

Delete rather than archive when:

- the plan was only a temporary checklist
- the work was small
- the PR description already captures enough history
- no future reader needs the execution sequence
- all durable decisions are captured elsewhere

# Completion Report

End by summarizing created and updated files, preserved or merged existing content, and any unresolved \`TODO:\` markers. If you skipped a file because it was not relevant or because user confirmation is needed, say so clearly.`;

export const INIT_HARNESS_ENGINEERING_COMMAND_CONFIG = {
  description: INIT_HARNESS_ENGINEERING_COMMAND_DESCRIPTION,
  template: INIT_HARNESS_ENGINEERING_COMMAND_TEMPLATE,
} as const;
