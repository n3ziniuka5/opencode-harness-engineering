# Acceptance Criteria

## Repository-Level Done Rules

- The top-level `AGENTS.md` stays short and points to `README.md`, `ARCHITECTURE.md`, and `docs/index.md`.
- Durable product, feature, architecture, engineering, quality, operational, and reference knowledge lives under `docs/`.
- Behavior changes update relevant Markdown docs when they affect user-visible behavior, package contracts, architecture, operating rules, or quality posture.
- Plugin behavior changes include executable tests under `test/` unless the change is documentation-only.
- `pnpm run check` passes before handoff when dependencies are installed.

## Plugin Product Rules

- The package exports an OpenCode server plugin with id `harness.hello-world`.
- The npm package exposes `.` and `./server` to the built plugin entrypoint.
- The plugin does not overwrite user-defined `human_plan` agent or `init-harness-engineering` command config entries.
- Plugin initialization does not perform network, shell, filesystem, or environment reads.
- Plugin options are normalized before use and treated as untrusted input.

## Documentation Scaffold Rules

- `/init-harness-engineering` prompts the active/default agent instead of forcing a special agent, model, or subtask mode.
- The scaffold command instructs agents to inspect real repository context before writing docs.
- Unknown or unsupported facts are documented as explicit `TODO:` markers, not invented claims.
- Legacy docs are migrated into the scaffold when useful and removed when they would become stale duplicates.
- Generated docs are only created when there is a clear source of truth and regeneration command.
