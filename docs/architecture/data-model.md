# Data Model

This package has no database, persisted application state, or service-owned storage. The relevant data model is the set of OpenCode config objects and scaffold documentation concepts the plugin produces or registers.

## Plugin Options

Plugin options are untrusted `PluginOptions`. No plugin options currently affect behavior.

## Agent Config

`explore` is an OpenCode agent config with description, mode, model, variant, temperature, `top_p`, prompt, and permissions. Its invariant is that it is a read-only discovery subagent: mutation tools, shell, nested task delegation, and todowrite are denied, while local read/search and documentation tools are allowed.

`ask` is an OpenCode agent config with description, mode, model, variant, temperature, `top_p`, prompt, and permissions. Its invariant is that it is a selectable primary answer agent that cannot edit files, can ask focused questions, can use common discovery tools, and can delegate only to `explore` for substantial research.

`brainstorm` is an OpenCode agent config with description, mode, model, variant, temperature, `top_p`, prompt, and permissions. Its invariant is that it is a selectable primary ideation agent that cannot edit files, can ask focused questions, can use common discovery tools, and can delegate only to `explore` before making repo-specific claims.

`draft` is an OpenCode agent config with description, mode, model, variant, temperature, `top_p`, prompt, and permissions. Its invariant is that it can write only active execution plan files, cannot edit implementation files through its agent-level permission policy, and delegates non-trivial discovery to `explore`. Native `plan` is represented only as `{ disable: true }` in the plugin-mutated config.

All bundled agents use shared `top_p: 0.97` from `src/agents/sampling.ts`; their temperatures are agent-specific (`0.5` for `explore`, `0.1` for `ask`, `0.8` for `brainstorm`, and `0.2` for `draft`).

## Command Config

`init-harness-engineering` is an OpenCode command config with a description and template. It intentionally has no fixed agent, model, or subtask value so the active/default implementation agent runs it.

## Documentation Scaffold Concepts

The scaffold organizes durable knowledge into product, feature, architecture, engineering, runbook, generated, execution-plan, quality, and reference docs. Unknown facts should be explicit `TODO:` markers instead of inferred claims.
