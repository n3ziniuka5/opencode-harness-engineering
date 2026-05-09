# Architecture Documentation

This directory records detailed architecture rules for the OpenCode plugin package beyond the top-level overview in `../ARCHITECTURE.md`.

## Files

| File | Purpose | Read when |
| ---- | ------- | --------- |
| [`boundaries.md`](boundaries.md) | Module responsibilities, public seams, and handoff points. | You are moving code, adding tools, or changing runtime registration. |
| [`dependency-rules.md`](dependency-rules.md) | Dependency direction, allowed imports, and layering rules. | You are adding imports, dependencies, or new source directories. |
| [`data-model.md`](data-model.md) | Core domain objects and invariants that are not obvious from types alone. | You are changing plugin options, tool payloads, agent config, command config, or docs scaffold concepts. |
| [`api-contracts.md`](api-contracts.md) | Public package, OpenCode, CLI-like, and documentation contracts. | You are changing exported symbols, package entrypoints, tool args, command names, or docs layout. |
| [`adr/index.md`](adr/index.md) | Architecture decision records and naming rules. | You need decision history or are making a durable architecture choice. |
