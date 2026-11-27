# Adopt the documentation scaffold

Use this walkthrough to adopt or update the scaffold in an existing repository. You need an editable Git working copy and access to the repository's build and CI configuration, if any. No coding agent is required.

## 1. Inventory what exists

Run `git status --short` to identify work already in progress. Read the repository's README, architecture overview, documentation index, and applicable `AGENTS.md` files if present. Inventory the docs and repository-owned skills you might change. Search for each path you might move in docs, skills, configs, and scripts.

Verify commands in manifests and scripts, required checks in CI workflows, behavior in source and tests, and operational steps in release or deployment configuration. Set aside conflicts and unverified details for maintainer review.

## 2. Give each topic one home

Create or update `README.md` for project setup and usage, `ARCHITECTURE.md` for the system overview, and `AGENTS.md` for links and short repository rules. Link from `AGENTS.md` to `docs/index.md`, the map to durable detail. Choose destinations based on what a reader needs:

| Reader need | Destination |
| ----------- | ----------- |
| Understand a feature's behavior or edge cases | `docs/features/` |
| Understand a boundary, contract, or architecture decision | `docs/architecture/` |
| Look up engineering rules or required checks | `docs/engineering/` |
| Learn a task or troubleshoot a local problem | `docs/guides/<task>.md` |
| Follow an established operational, incident response, recovery, or maintenance procedure | `docs/runbooks/<operational-task>.md` |

Reuse the canonical page when one exists. For example, replace release recovery steps duplicated in a skill with a direct link to the runbook. If the skill is the only source for a shared procedure, move the verified prerequisites, steps, and success checks to the appropriate guide or runbook.

Add both rules to the target's top-level `AGENTS.md`:

- Keep repository-owned skills thin in `.agents/skills/<name>/SKILL.md`: keep the trigger and agent-specific instructions in the skill, and link directly to the shared procedure.
- Keep durable docs usable without a coding agent. Put agent-specific instructions in skills.

## 3. Preserve useful content and fix navigation

Carry forward unique prerequisites, exceptions, examples, and local rules at the right scope. Keep historical ADRs and follow the target repo's regeneration process for generated docs. Update incoming links and references before retiring the old page.

Leave user-global skills and loader settings alone. If you cannot verify a legacy skill will still be discovered after a move, leave it in place and record what needs to be resolved.

List guides in `docs/guides/index.md` and operational procedures in `docs/runbooks/index.md`. Link the area indexes from `docs/index.md`. Give each index a short purpose and a compact `## Files` table with `File`, `Purpose`, and `Read when` columns. Use relative links.

## 4. Review and validate in the target repository

- Review `git diff` and any new files listed by `git status --short`. Confirm that moves preserve unique material and remove duplicates.
- Follow links from `docs/index.md` and any changed skills. Confirm that each changed procedure gives readers enough information to start, complete the task, and recognize success.
- Run the target repository's documented checks, including any docs or link checks. Record the results, checks you could not run, and decisions or `TODO:` items that need maintainer input.
