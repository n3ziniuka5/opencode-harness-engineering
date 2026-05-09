# Data Model

This package has no database, persisted application state, or service-owned storage. The relevant data model is the set of OpenCode config objects, tool payloads, and scaffold documentation concepts the plugin produces or registers.

## Plugin Options

Plugin options are untrusted `PluginOptions`. The current `greeting` option is accepted only when it is a non-empty string after trimming; otherwise the plugin uses `Hello`.

## Tool Payload

`hello_world` accepts an optional trimmed non-empty `name`. The derived target defaults to `world`. The output contains a human-readable greeting and metadata with the plugin id and target.

## Agent Config

`human_plan` is an OpenCode agent config with description, mode, model, variant, prompt, and permissions. Its invariant is that it can write only active execution plan files and cannot edit implementation files through its agent-level permission policy.

## Command Config

`init-harness-engineering` is an OpenCode command config with a description and template. It intentionally has no fixed agent, model, or subtask value so the active/default implementation agent runs it.

## Documentation Scaffold Concepts

The scaffold organizes durable knowledge into product, feature, architecture, engineering, runbook, generated, execution-plan, quality, and reference docs. Unknown facts should be explicit `TODO:` markers instead of inferred claims.
