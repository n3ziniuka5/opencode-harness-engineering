# `explore` Agent

## Intent

`explore` is a cheap, high-volume, read-only subagent for codebase exploration and online search. Its description is intentionally detailed because OpenCode surfaces subagent descriptions in the Task tool definition that parent agents see before choosing a subagent.

## Source Of Truth

- Agent config: `src/agents/explore.ts`
- Shared sampling constant: `src/agents/sampling.ts`
- Registration: `src/index.ts`
- Tests: `test/plugin.test.ts`
- Prompt references: `docs/references/openai-gpt-5.4-prompting.md`

## Behavior

- Agent id is `explore`.
- Model is `openai/gpt-5.4-mini` with variant `low`.
- Sampling is explicit: `temperature` is `0.5` and `top_p` is the shared bundled-agent value `0.97`.
- Mode is `subagent`.
- Registration assigns `config.agent.explore` directly so this bundled config overrides OpenCode's default `explore` agent.
- Because OpenCode has a native `explore` agent, this bundled config replaces the native key when present and still registers a normal subagent if a runtime lacks the native agent.
- The description includes short examples such as finding where behavior is handled, similar commands, affected files, relevant docs, official API docs, and the source of an error.
- The description tells parent agents to pass concrete search leads such as file names, symbols, keywords, error text, packages, APIs, URLs, or library/framework names.
- The description tells parent agents to ask for precise sources, line ranges, URLs, and limitations, and to launch multiple `explore` tasks in parallel for independent questions.
- Parent-agent rules for trusting completed `explore` results and requesting focused follow-up tasks live in the shared discovery section used by `ask`, `brainstorm`, and `draft`; they do not change this subagent's read-only search and output contract.
- The agent searches local files with `glob`, `grep`, `read`, and `list`.
- The agent can use `bash` only when the task requires it after preferred tools are insufficient. Bash commands must be read-only and must not modify files or add/change git-tracked files.
- The agent uses `webfetch`, `websearch`, and `context7_*` for official external/library documentation when appropriate and reports limitations when docs or tools are unavailable.
- The agent should cite precise paths, line ranges, and URLs instead of summarizing a whole repository by default.

## Output Contracts

For direct answers, the response starts with `Answer:`, followed by `Evidence:` and optional `Confidence/limitations:`.

For implementation-agent context gathering, the response starts with `Sources to read:`, followed by precise sources and `Constraints/open questions:` for only important blockers.

## Permission Contract

- Wildcard access is denied.
- `edit`, nested `task`, and `todowrite` are denied.
- `glob`, `grep`, `read`, `list`, `bash`, `webfetch`, `websearch`, and `context7_*` are allowed.
- `external_directory` is ask-gated.

## Non-Obvious Constraints

- Do not add mutation permissions to this bundled config without a product decision; the agent's purpose is discovery, not implementation.
- Keep the prompt compact and explicit because it targets `gpt-5.4-mini`.
- Keep `top_p` sourced from `DEFAULT_AGENT_TOP_P` rather than duplicating the numeric literal in the agent config.
- If the user changes agent config files or plugin code, they must restart OpenCode for the loaded agent config to change.
