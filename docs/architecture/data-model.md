# Data Model

This package has no database, persisted application state, or service-owned storage. The relevant data model is the set of OpenCode config objects and scaffold documentation concepts the plugin produces or registers.

## Plugin Options

Plugin options are untrusted `PluginOptions`. No plugin options currently affect behavior.

## Agent Config

`explore` is an OpenCode agent config with description, mode, model, variant, prompt, and permissions. Its invariant is that it is a read-only discovery subagent: mutation tools, shell, nested task delegation, and todowrite are denied, while local read/search and documentation tools are allowed.

`plan` is an OpenCode agent config with description, mode, model, variant, prompt, and permissions. Its invariant is that it can write only active execution plan files, cannot edit implementation files through its agent-level permission policy, and delegates non-trivial discovery to `explore`.

## Command Config

`init-harness-engineering` is an OpenCode command config with a description and template. It intentionally has no fixed agent, model, or subtask value so the active/default implementation agent runs it.

## Documentation Scaffold Concepts

The scaffold organizes durable knowledge into product, feature, architecture, engineering, runbook, generated, execution-plan, quality, and reference docs. Unknown facts should be explicit `TODO:` markers instead of inferred claims.
