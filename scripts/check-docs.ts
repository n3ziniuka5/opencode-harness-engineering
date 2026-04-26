import { readFile } from "node:fs/promises";

const requiredFiles = [
  "AGENTS.md",
  "ARCHITECTURE.md",
  "README.md",
  "docs/index.md",
  "docs/design-docs/core-beliefs.md",
  "docs/exec-plans/README.md",
  "docs/exec-plans/active/README.md",
  "docs/exec-plans/completed/README.md",
  "docs/exec-plans/tech-debt-tracker.md",
  "docs/references/harness-engineering.md",
  "docs/references/opencode-plugin-reference.md",
  "docs/references/openai-gpt-5.5-prompting.md",
  "docs/QUALITY_SCORE.md",
  "docs/RELIABILITY.md",
  "docs/SECURITY.md",
];

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
  if (path !== "AGENTS.md" && !agentMap.includes(path)) {
    throw new Error(`AGENTS.md must link to ${path}`);
  }
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
