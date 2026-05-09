import { readFile } from "node:fs/promises";

const requiredFiles = [
  "AGENTS.md",
  "ARCHITECTURE.md",
  "README.md",
  "docs/index.md",
  "docs/product/index.md",
  "docs/product/personas.md",
  "docs/product/user-journeys.md",
  "docs/product/acceptance-criteria.md",
  "docs/features/index.md",
  "docs/features/opencode-plugin/index.md",
  "docs/features/opencode-plugin/hello-world-tool.md",
  "docs/features/opencode-plugin/human-plan-agent.md",
  "docs/features/opencode-plugin/init-harness-engineering-command.md",
  "docs/architecture/index.md",
  "docs/architecture/boundaries.md",
  "docs/architecture/dependency-rules.md",
  "docs/architecture/data-model.md",
  "docs/architecture/api-contracts.md",
  "docs/architecture/adr/index.md",
  "docs/architecture/adr/2026-05-09-opencode-server-plugin-bundle.md",
  "docs/engineering/index.md",
  "docs/engineering/coding-standards.md",
  "docs/engineering/testing-strategy.md",
  "docs/engineering/observability.md",
  "docs/engineering/reliability.md",
  "docs/engineering/security.md",
  "docs/engineering/performance.md",
  "docs/engineering/release-process.md",
  "docs/engineering/validation.md",
  "docs/generated/index.md",
  "docs/exec-plans/index.md",
  "docs/quality/index.md",
  "docs/quality/scorecard.md",
  "docs/quality/tech-debt-tracker.md",
  "docs/references/index.md",
  "docs/references/harness-engineering.md",
  "docs/references/opencode-plugin-reference.md",
  "docs/references/openai-gpt-5.5-prompting.md",
];

const requiredIndexFiles = [
  "docs/index.md",
  "docs/product/index.md",
  "docs/features/index.md",
  "docs/features/opencode-plugin/index.md",
  "docs/architecture/index.md",
  "docs/architecture/adr/index.md",
  "docs/engineering/index.md",
  "docs/generated/index.md",
  "docs/quality/index.md",
  "docs/references/index.md",
];

const obsoleteFiles = [
  "docs/design-docs/core-beliefs.md",
  "docs/exec-plans/README.md",
  "docs/exec-plans/active/README.md",
  "docs/exec-plans/completed/README.md",
  "docs/exec-plans/completed/2026-05-09-init-harness-engineering-command.md",
  "docs/exec-plans/tech-debt-tracker.md",
  "docs/QUALITY_SCORE.md",
  "docs/RELIABILITY.md",
  "docs/SECURITY.md",
  "docs/quality/garbage-collection.md",
];

const indexHeaderPattern = /\|\s*File\s*\|\s*Purpose\s*\|\s*Read when\s*\|/;
const indexSeparatorPattern = /\|\s*-+\s*\|\s*-+\s*\|\s*-+\s*\|/;
const tablePaddingPattern = /\|\s{2,}|\s{2,}\|/;

async function read(path: string) {
  try {
    return await readFile(path, "utf8");
  } catch (error) {
    throw new Error(`Missing required repository knowledge file: ${path}`, {
      cause: error,
    });
  }
}

const agentMap = await read("AGENTS.md");
for (const path of requiredFiles) {
  await read(path);
}

for (const phrase of [
  "README.md",
  "ARCHITECTURE.md",
  "docs/index.md",
  "Do not create or update docs for",
]) {
  if (!agentMap.includes(phrase)) {
    throw new Error(`AGENTS.md must include ${phrase}`);
  }
}

for (const path of requiredIndexFiles) {
  const content = await read(path);
  if (!content.includes("## Files")) {
    throw new Error(`${path} must include a ## Files section`);
  }
  if (!indexHeaderPattern.test(content)) {
    throw new Error(`${path} must include File, Purpose, Read when columns`);
  }
  if (!indexSeparatorPattern.test(content)) {
    throw new Error(`${path} must include a Markdown table separator row`);
  }

  for (const line of content.split("\n")) {
    if (line.startsWith("|") && tablePaddingPattern.test(line)) {
      throw new Error(`${path} must use compact Markdown table spacing`);
    }
  }
}

const execPlanIndex = await read("docs/exec-plans/index.md");
if (indexHeaderPattern.test(execPlanIndex)) {
  throw new Error("docs/exec-plans/index.md must not list child files");
}

for (const path of obsoleteFiles) {
  try {
    await readFile(path, "utf8");
  } catch {
    continue;
  }

  throw new Error(
    `Obsolete knowledge file should be migrated or removed: ${path}`,
  );
}

const harnessReference = await read("docs/references/harness-engineering.md");
for (const phrase of [
  "agent legibility",
  "progressive disclosure",
  "feedback loops",
  "mechanical checks",
]) {
  if (!harnessReference.toLowerCase().includes(phrase)) {
    throw new Error(`Harness reference must cover ${phrase}`);
  }
}
