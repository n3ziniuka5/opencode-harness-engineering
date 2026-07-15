# `explore` Agent

## Intent

`explore` is a cheap, high-volume, read-only subagent for finding, locating, and retrieving repository or public-source evidence. Its description is intentionally detailed because OpenCode surfaces subagent descriptions in the Task tool definition that parent agents see before choosing a subagent.

## Source Of Truth

- Agent config: `src/agents/explore.ts`
- Shared sampling constant: `src/agents/sampling.ts`
- Registration: `src/index.ts`
- Tests: `test/plugin.test.ts`
- Prompt references: `docs/references/openai-gpt-5.6-prompting.md`

## Behavior

- Agent id is `explore`.
- Model is `openai/gpt-5.6-luna` with variant `low`.
- Sampling is explicit: `temperature` is `0.5` and `top_p` is the shared bundled-agent value `0.97`.
- Mode is `subagent`.
- Registration assigns `config.agent.explore` directly so this bundled config overrides OpenCode's default `explore` agent.
- Because OpenCode has a native `explore` agent, this bundled config replaces the native key when present and still registers a normal subagent if a runtime lacks the native agent.
- The description includes short examples such as finding where behavior is handled, similar commands, affected files, relevant docs, official API docs, and the source of an error.
- The description tells parent agents to pass concrete search leads such as file names, symbols, keywords, error text, packages, APIs, URLs, or library/framework names.
- The description tells parent agents to name the intended repository or directory when known and states that retrieval outside the active workspace is scoped to an exact target rather than its parent.
- The description tells parent agents to ask for precise sources, line ranges, URLs, and limitations, and to launch multiple `explore` tasks in parallel for independent questions.
- The description explicitly says `explore` is not a general-purpose reviewer or reasoning delegate. It may extract facts, excerpts, and short factual relevance notes, but it must not assess correctness or sufficiency, perform exhaustive reviews, evaluate options, infer root cause or intent, rank severity, recommend implementations, design changes, or return final verdicts.
- Parent-agent rules for avoiding duplicate searches, reading cited sources for analysis, and requesting focused retrieval follow-ups live in the shared discovery section used by `ask`, `brainstorm`, and `draft`.
- The agent searches local files with `glob`, `grep`, `read`, and `list`.
- Recursive file and content searches default to the active workspace or current working directory. `grep`, `glob`, and recursive Bash equivalents must not use `..` itself, an ancestor, home directory, multi-project collection directory, or common parent as their search root, regardless of whether that broad root is relative or absolute.
- For a specifically requested sibling or external target, the agent may use one shallow, non-recursive parent listing to identify the exact child, then must root recursive searches at that child. A target written as `../other-repo` is normalized to the child's exact absolute repository root before recursive search; it is not treated as a search rooted at `..`. If the agent cannot resolve the exact target, it reports the attempted resolution under `Missing evidence/search limitations:` instead of guessing or broadening the search.
- A known pnpm, npm, Yarn, Bun, Cargo, Go module, similar package-manager, or downloaded-source cache is an allowed exact recursive search target for dependency sources or metadata. The cache may be supplied by the caller, use a standard manager-specific path, or be resolved by a read-only package-manager command, but the search must not broaden to the cache parent or home directory.
- A caller-supplied exact external file remains readable.
- The agent can use `bash` only when the task requires it after preferred tools are insufficient. Bash commands must be read-only and must not modify files or add/change git-tracked files.
- The agent uses `webfetch`, `websearch`, and `context7_*` for official external/library documentation when appropriate and reports limitations when docs or tools are unavailable.
- The agent should cite precise paths, line ranges, and URLs instead of summarizing a whole repository by default.
- When a request mixes retrieval with analysis, the agent retrieves the most directly requested sources within its search budget, identifies the analytical portion that belongs to the caller, and stops.

## Output Contracts

Responses use one compact source-retrieval shape: `Source matches:` with paths or URLs, line ranges, excerpts, and factual relevance notes; `Missing evidence/search limitations:` when relevant; and `Scope handoff:` when an analytical request belongs to the caller.

## Permission Contract

- Wildcard access is denied.
- `edit`, nested `task`, and `todowrite` are denied.
- `glob`, `grep`, `read`, `list`, `bash`, `webfetch`, `websearch`, and `context7_*` are allowed.
- `external_directory` is ask-gated.

## Non-Obvious Constraints

- Do not add mutation permissions to this bundled config without a product decision; the agent's purpose is discovery, not implementation.
- Keep the prompt compact and explicit because it targets an efficient, low-reasoning model tier.
- Keep `top_p` sourced from `DEFAULT_AGENT_TOP_P` rather than duplicating the numeric literal in the agent config.
- If the user changes agent config files or plugin code, they must restart OpenCode for the loaded agent config to change.
