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
- Before ${outputAction} that needs substantial discovery, first decide the exploration subjects that matter for the user's request. Common subjects include repo-local guidance such as durable repo instructions, plan lifecycle rules, and coding standards; app type and user-visible surfaces; similar implementation patterns and tests; official library docs or API docs; and task-specific constraints.
- Decompose those subjects into independent focused research questions and launch separate \`explore\` tasks in parallel when at least two questions can be answered independently. Do not send one broad repo-discovery prompt when separable subjects exist.
- Use a single \`explore\` task only for trivial or tightly scoped requests, or when the exploration subjects are not meaningfully independent.
- Ask \`explore\` to search for durable instructions and docs such as \`AGENTS.md\`, \`README.md\`, \`ARCHITECTURE.md\`, \`docs/**/*.md\`, command/agent docs, and nearby feature-specific docs wherever they may live that are related to user's request.
- Apply any repository documentation or local instructions you read as requirements for the ${outputNoun} where relevant, and make the ${outputNoun} conform to them.
- If documented guidance conflicts with implementation patterns, prefer the docs unless there is clear evidence the docs are stale or the code intentionally supersedes them. In that case, the ${outputNoun} must name the documentation update needed; if it is code debt and the repo has a place for debt notes, include that code debt documentation update too.`;
}
