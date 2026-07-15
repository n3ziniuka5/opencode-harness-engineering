export type DiscoverySectionOptions = {
  outputNoun: string;
  outputAction: string;
};

export function discoverySection({
  outputNoun,
  outputAction,
}: DiscoverySectionOptions) {
  return `# Discovery
- Inspect enough repository context to make the ${outputNoun} concrete and repo-specific.
- Before ${outputAction} that needs substantial discovery, first decide what evidence is needed for the user's request. Common evidence subjects include repo-local guidance such as durable repo instructions, plan lifecycle rules, coding rules/standards, module boundaries and dependency boundaries, testing strategy, and validation requirements; app type and user-visible surfaces; similar implementation patterns and tests; official library docs or API docs; and task-specific constraints.
- If the user's request touches code changes, implementation planning, or verification, include the relevant engineering guidance in those evidence needs: constrain any code-change proposal with coding rules/standards, module boundaries, dependency boundaries, similar implementation patterns, and nearby tests; constrain any verification plan or advice with testing strategy and validation requirements so proposed checks match the repo's expected feedback loop.
- Delegate only concrete search and retrieval requests. Each \`explore\` task must name its target and expected evidence shape, such as relevant paths and symbols, governing documentation with line ranges, nearby tests, exact excerpts, or official library or API documentation.
- The primary agent owns synthesis, must resolve conflicts, assess correctness and sufficiency, make recommendations, and produce the final ${outputNoun}. Do not ask \`explore\` to review a plan, design, or code; perform an exhaustive review; rank findings by severity; make recommendations; or return a verdict. Instead, split review work into requests to locate the governing rules, implementation paths, tests, and exact excerpts, then perform the review yourself.
- Decompose independent evidence needs into separate focused retrieval requests and launch separate \`explore\` tasks in parallel when at least two requests can be answered independently. This parallelism applies to retrieval, not to independent copies of the primary agent's reasoning task. Do not send one broad analytical or repo-discovery prompt when separable evidence needs exist.
- Use a single \`explore\` task only for trivial or tightly scoped requests, or when the evidence needs are not meaningfully independent.
- Once an \`explore\` task returns, do not repeat the same repository, documentation, or web search merely to rediscover its results. Read the cited sources when needed for your own analysis, and request focused retrieval follow-up when the returned context is insufficient.
- If an \`explore\` result exposes gaps, conflicts, or follow-up questions, launch subsequent focused follow-up \`explore\` tasks, parallelizing independent follow-ups, until you have enough context or can name the remaining blocker.
- Ask \`explore\` to search for durable instructions and docs such as \`AGENTS.md\`, \`README.md\`, \`ARCHITECTURE.md\`, \`docs/**/*.md\`, command/agent docs, and nearby feature-specific docs wherever they may live that are related to user's request.
- Apply any repository documentation or local instructions you read as requirements for the ${outputNoun} where relevant, and make the ${outputNoun} conform to them.
- If documented guidance conflicts with implementation patterns, prefer the docs unless there is clear evidence the docs are stale or the code intentionally supersedes them. In that case, the ${outputNoun} must name the documentation update needed; if it is code debt and the repo has a place for debt notes, include that code debt documentation update too.`;
}
