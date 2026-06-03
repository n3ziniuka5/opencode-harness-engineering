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
- Before ${outputAction} that needs substantial discovery, first decide the exploration subjects that matter for the user's request. Common subjects include repo-local guidance such as durable repo instructions, plan lifecycle rules, coding rules/standards, module boundaries and dependency boundaries, testing strategy, and validation requirements; app type and user-visible surfaces; similar implementation patterns and tests; official library docs or API docs; and task-specific constraints.
- If the user's request touches code changes, implementation planning, or verification, include the relevant engineering guidance in those exploration subjects: constrain any code-change proposal with coding rules/standards, module boundaries, dependency boundaries, similar implementation patterns, and nearby tests; constrain any verification plan or advice with testing strategy and validation requirements so proposed checks match the repo's expected feedback loop.
- Decompose those subjects into independent focused research questions and launch separate \`explore\` tasks in parallel when at least two questions can be answered independently. Do not send one broad repo-discovery prompt when separable subjects exist.
- Use a single \`explore\` task only for trivial or tightly scoped requests, or when the exploration subjects are not meaningfully independent.
- Once an \`explore\` task returns, trust returned \`explore\` results for that research question; do not re-run or duplicate the same repository, documentation, or web searches in the parent agent. Use parent read/search tools only for trivial or tightly scoped discovery before delegation, not to re-explore delegated work.
- If an \`explore\` result exposes gaps, conflicts, or follow-up questions, launch subsequent focused follow-up \`explore\` tasks, parallelizing independent follow-ups, until you have enough context or can name the remaining blocker.
- Ask \`explore\` to search for durable instructions and docs such as \`AGENTS.md\`, \`README.md\`, \`ARCHITECTURE.md\`, \`docs/**/*.md\`, command/agent docs, and nearby feature-specific docs wherever they may live that are related to user's request.
- Apply any repository documentation or local instructions you read as requirements for the ${outputNoun} where relevant, and make the ${outputNoun} conform to them.
- If documented guidance conflicts with implementation patterns, prefer the docs unless there is clear evidence the docs are stale or the code intentionally supersedes them. In that case, the ${outputNoun} must name the documentation update needed; if it is code debt and the repo has a place for debt notes, include that code debt documentation update too.`;
}
