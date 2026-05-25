# Harness Engineering Reference

Source: https://openai.com/index/harness-engineering/

This is a local summary of the harness-engineering practices relevant to this repository. It is not a copy of the article.

## Relevant Practices

- Start from an empty repository with explicit scaffolding, formatting, package management, tests, and docs.
- Treat repository knowledge as the system of record.
- Use `AGENTS.md` as a compact table of contents and put durable knowledge in structured docs.
- Optimize for agent legibility: code, docs, scripts, schemas, and plans should be inspectable in the repo.
- Prefer progressive disclosure over one large instruction manual.
- Encode architecture and taste as invariants, tests, scripts, and mechanical checks where possible.
- Build feedback loops that let agents verify their work without relying on human memory.
- Track entropy and run regular cleanup through explicit debt docs and targeted checks.

## How This Repo Applies It

- `AGENTS.md` maps agents to the relevant docs instead of duplicating every rule.
- `docs/` is the durable knowledge base.
- `scripts/check-docs.ts` mechanically verifies the required documentation map.
- `test/plugin.test.ts` verifies the plugin contract and bundled agent behavior.
- `ARCHITECTURE.md` records the OpenCode package shape so future agents do not guess entrypoints.
- `docs/exec-plans/` is ready for checked-in plans when tasks grow beyond a small change.

## Vocabulary

- Agent legibility: making code and operations understandable to an agent from repository-local artifacts.
- Progressive disclosure: starting with a small map and following links to deeper context only when needed.
- Feedback loops: tests, scripts, local harnesses, logs, and docs checks that let agents inspect outcomes.
- Mechanical checks: executable validation that enforces repository invariants.
