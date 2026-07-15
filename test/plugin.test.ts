import { describe, it } from "node:test";
import assert from "node:assert/strict";

import plugin, {
  ASK_AGENT_CONFIG,
  ASK_AGENT_DESCRIPTION,
  ASK_AGENT_NAME,
  BRAINSTORM_AGENT_CONFIG,
  BRAINSTORM_AGENT_DESCRIPTION,
  BRAINSTORM_AGENT_NAME,
  DRAFT_AGENT_CONFIG,
  DRAFT_AGENT_DESCRIPTION,
  DRAFT_AGENT_NAME,
  EXPLORE_AGENT_CONFIG,
  EXPLORE_AGENT_DESCRIPTION,
  EXPLORE_AGENT_NAME,
  PLAN_AGENT_CONFIG,
  PLAN_AGENT_NAME,
  PLUGIN_ID,
} from "../src/index.js";
import * as pluginExports from "../src/index.js";
import { DEFAULT_AGENT_TOP_P } from "../src/agents/sampling.js";

type AgentConfig = Record<string, unknown>;
type PluginConfig = {
  agent?: Record<string, AgentConfig | undefined>;
  default_agent?: string;
};

async function configuredAgents() {
  const hooks = await plugin.server({} as never, {});
  assert.ok(hooks.config);

  const config: PluginConfig = {};
  await hooks.config(config as never);

  return config.agent ?? {};
}

function assertDiscoverySentinels(prompt: string) {
  assert.match(prompt, /# Discovery/);
  assert.match(prompt, /substantial discovery/i);
  assert.match(prompt, /first decide .* evidence .* needed/i);
  assert.match(prompt, /durable repo instructions/i);
  assert.match(prompt, /coding rules\/standards/i);
  assert.match(prompt, /module boundaries/i);
  assert.match(prompt, /dependency boundaries/i);
  assert.match(prompt, /testing strategy/i);
  assert.match(prompt, /validation requirements/i);
  assert.match(prompt, /app type and user-visible surfaces/i);
  assert.match(
    prompt,
    /request touches code changes, implementation planning, or verification/i,
  );
  assert.match(
    prompt,
    /any code-change proposal .* coding rules\/standards.*module boundaries.*dependency boundaries.*similar implementation patterns.*nearby tests/i,
  );
  assert.match(
    prompt,
    /any verification plan or advice .* testing strategy .* validation requirements/i,
  );
  assert.match(prompt, /concrete search and retrieval requests/i);
  assert.match(prompt, /target and expected evidence shape/i);
  assert.match(prompt, /relevant paths and symbols/i);
  assert.match(prompt, /governing documentation .* line ranges/i);
  assert.match(prompt, /nearby tests/i);
  assert.match(prompt, /official .* API documentation/i);
  assert.match(prompt, /Decompose .* evidence needs/i);
  assert.match(prompt, /separate `explore` tasks in parallel/i);
  assert.match(prompt, /parallelism applies to retrieval/i);
  assert.match(prompt, /not .* copies .* reasoning/i);
  assert.match(prompt, /Do not send one broad .* prompt/i);
  assert.match(
    prompt,
    /Use a single `explore` task only for trivial or tightly scoped requests/i,
  );
  assert.match(prompt, /primary agent owns synthesis/i);
  assert.match(prompt, /resolve conflicts/i);
  assert.match(prompt, /correctness and sufficiency/i);
  assert.match(prompt, /recommendations/i);
  assert.match(prompt, /final (answer|option set|generated plan)/i);
  assert.match(prompt, /Do not ask `explore` to review/i);
  assert.match(prompt, /exhaustive review/i);
  assert.match(prompt, /rank .* severity/i);
  assert.match(prompt, /return a verdict/i);
  assert.match(prompt, /do not repeat .* search .* rediscover/i);
  assert.match(prompt, /read the cited sources .* analysis/i);
  assert.match(prompt, /follow-up .* `explore` tasks/i);
  assert.match(prompt, /until .* enough context/i);
  assert.match(prompt, /AGENTS\.md/);
  assert.match(prompt, /README\.md/);
  assert.match(prompt, /ARCHITECTURE\.md/);
  assert.match(prompt, /docs\/\*\*\/\*\.md/);
  assert.match(prompt, /repository documentation or local instructions/i);
  assert.match(prompt, /documented guidance conflicts/i);
  assert.match(prompt, /clear evidence the docs are stale/i);
  assert.match(prompt, /documentation update needed/i);
  assert.match(prompt, /code debt documentation/i);
}

function assertPrimaryReadOnlyPermissions(permission: Record<string, unknown>) {
  assert.equal(permission.edit, "deny");
  assert.equal(permission.question, "allow");
  assert.equal(permission.skill, "allow");
  assert.equal(permission.webfetch, "allow");
  assert.equal(permission.websearch, "allow");
  assert.equal(permission.glob, "allow");
  assert.equal(permission.grep, "allow");
  assert.equal(permission.read, "allow");
  assert.equal(permission.list, "allow");
  assert.deepEqual(permission.task, { explore: "allow" });
  assert.equal(permission["*"], undefined);
  assert.equal(permission.bash, undefined);
  assert.equal(permission.todowrite, undefined);
  assert.equal(permission.external_directory, undefined);
  assert.equal(permission["context7_*"], undefined);

  const explicitDenies = Object.entries(permission)
    .filter(([, value]) => value === "deny")
    .map(([tool]) => tool);
  assert.deepEqual(explicitDenies, ["edit"]);
}

describe("harness agents plugin", () => {
  const previousPlanAgentName = ["human", "plan"].join("_");
  const removedPromptScope = ["in an OpenCode", "plugin bundle"].join(" ");

  it("exports an OpenCode v1 server plugin", async () => {
    assert.equal(plugin.id, PLUGIN_ID);
    assert.equal(PLUGIN_ID, "n3ziniuka5.opencode-harness-engineering");
    assert.equal(typeof plugin.server, "function");

    const hooks = await plugin.server({} as never, {});
    assert.equal(hooks.tool, undefined);
  });

  it("registers the draft agent and disables native plan", async () => {
    const agents = await configuredAgents();

    assert.equal(DRAFT_AGENT_NAME, "draft");
    assert.equal(PLAN_AGENT_NAME, DRAFT_AGENT_NAME);
    assert.equal(PLAN_AGENT_CONFIG, DRAFT_AGENT_CONFIG);
    assert.equal("PLAN_AGENT_PROMPT" in pluginExports, false);
    assert.equal(agents[previousPlanAgentName], undefined);
    assert.deepEqual(agents.plan, { disable: true });

    const agent = agents[DRAFT_AGENT_NAME];
    assert.ok(agent);
    assert.equal(agent.model, "openai/gpt-5.6-sol");
    assert.equal(agent.variant, "high");
    assert.equal(agent.temperature, 0.2);
    assert.equal(agent.top_p, DEFAULT_AGENT_TOP_P);
    assert.equal(agent.mode, "all");
    assert.equal(agent.color, "primary");
    assert.equal(agent.description, DRAFT_AGENT_DESCRIPTION);
    const permission = agent.permission as Record<string, unknown> | undefined;
    assert.ok(permission);
    assert.equal(permission.websearch, "allow");
    assert.match(String(agent.description), /human-reviewed/);
    assert.match(String(agent.prompt), /Role: You are the draft agent/);
    assert.doesNotMatch(String(agent.prompt), new RegExp(removedPromptScope));
    assert.doesNotMatch(
      String(agent.prompt),
      new RegExp(previousPlanAgentName),
    );
    assert.match(String(agent.prompt), /external contracts/i);
    assert.match(
      String(agent.prompt),
      /added, removed, or behaviorally changed/,
    );
    assert.match(String(agent.prompt), /External contract changes/);
    assert.match(String(agent.prompt), /omit that subsection completely/);
    assert.doesNotMatch(String(agent.prompt), /\bmeat\b/i);
    assert.match(String(agent.prompt), /Implementation plan/);
    assert.match(String(agent.prompt), /Verification plan/);
    assert.match(
      String(agent.prompt),
      /Decision log and alternatives considered/,
    );
    assert.match(
      String(agent.prompt),
      /Do not write assumptions into the plan/,
    );
    assert.match(String(agent.prompt), /question tool/);
    assert.match(String(agent.prompt), /broad, subjective, taste-driven/);
    assert.match(
      String(agent.prompt),
      /Extensive discovery has been performed according to the Discovery section/,
    );
    assert.match(
      String(agent.prompt),
      /Proposed code changes conform to discovered repository engineering guidance/,
    );
    assert.match(
      String(agent.prompt),
      /coding rules\/standards, module boundaries, dependency boundaries, similar implementation patterns, and nearby test structure/,
    );
    assert.match(
      String(agent.prompt),
      /The Verification plan conforms to discovered testing strategy and validation requirements/,
    );
    assert.match(
      String(agent.prompt),
      /proposed checks match the repository's expected feedback loop/,
    );
    assert.ok(
      String(agent.prompt).indexOf("# Discovery") <
        String(agent.prompt).indexOf("# Success Criteria"),
    );
    assert.match(String(agent.prompt), /standalone current-state section/);
    assert.match(String(agent.prompt), /generic omnibus section/);
    assert.match(String(agent.prompt), /`mermaid` diagrams only when/);
    assert.match(String(agent.prompt), /module dependency graph/);
    assert.match(String(agent.prompt), /complex flow diagram/);
    assert.match(String(agent.prompt), /\(Recommended\)/);
    assert.match(
      String(agent.prompt),
      /docs\/exec-plans\/active\/YYYY-MM-DD-slug\.md/,
    );
    assert.match(String(agent.prompt), /Completion archive instructions/);
    assert.match(
      String(agent.prompt),
      /Use repository-specific execution-plan lifecycle or completion\/archive instructions/,
    );
    assert.match(
      String(agent.prompt),
      /If the repository has no such instructions/,
    );
    assert.match(
      String(agent.prompt),
      /completing the implementation includes resolving the active plan's lifecycle/,
    );
    assert.match(
      String(agent.prompt),
      /update the appropriate long-term repository documentation to reflect what was actually built, changed, verified, and decided/,
    );
    assert.match(
      String(agent.prompt),
      /do not mechanically copy or move stale plan text/,
    );
    assert.match(
      String(agent.prompt),
      /delete the active plan unless the remaining execution history itself still has durable debugging, audit, rollout, or handoff value/,
    );
    assert.match(
      String(agent.prompt),
      /If there is still long-term value in the remaining plan content, move it to docs\/exec-plans\/completed\/YYYY-MM-DD-slug\.md/,
    );
    assert.match(
      String(agent.prompt),
      /Delete rather than archive when the plan was only a temporary checklist/,
    );
    assert.doesNotMatch(
      String(agent.prompt),
      /Do not use completed plans as the source of truth for current behavior/,
    );
    assert.doesNotMatch(String(agent.prompt), /repo-derived requirements/);
    assert.doesNotMatch(String(agent.prompt), /## Review Request/);
    assert.doesNotMatch(String(agent.prompt), /## Feedback Wanted/);
    assert.match(String(agent.prompt), /AGENTS\.md/);
    assert.match(String(agent.prompt), /ARCHITECTURE\.md/);
    assert.match(String(agent.prompt), /docs\//);
    assert.match(
      String(agent.prompt),
      /repository documentation or local instructions .* as requirements for the generated plan/i,
    );
    assert.match(
      String(agent.prompt),
      /Documentation governance to read first/,
    );
    assert.match(String(agent.prompt), /Candidate documentation touchpoints/);
    assert.match(
      String(agent.prompt),
      /candidate documentation touchpoints.*not direct edit instructions/is,
    );
    assert.match(String(agent.prompt), /governing documentation/i);
    assert.match(
      String(agent.prompt),
      /parent\/sibling indexes|parent or sibling indexes/i,
    );
    assert.match(String(agent.prompt), /leave .*candidate.*unchanged/i);
    assert.doesNotMatch(String(agent.prompt), /# Delegation/);
    assertDiscoverySentinels(String(agent.prompt));
  });

  it("registers a read-only explore subagent", async () => {
    const agents = await configuredAgents();

    const agent = agents[EXPLORE_AGENT_NAME];
    assert.ok(agent);
    assert.equal(agent.mode, "subagent");
    assert.equal(agent.model, "openai/gpt-5.6-luna");
    assert.equal(agent.variant, "low");
    assert.equal(agent.temperature, 0.5);
    assert.equal(agent.top_p, DEFAULT_AGENT_TOP_P);
    assert.equal(agent.description, EXPLORE_AGENT_DESCRIPTION);
    assert.match(String(agent.description), /cheap/i);
    assert.match(String(agent.description), /high-volume/i);
    assert.match(String(agent.description), /read-only/i);
    assert.match(String(agent.description), /find, locate, and retrieve/i);
    assert.match(String(agent.description), /codebase exploration/i);
    assert.match(String(agent.description), /online search/i);
    assert.match(String(agent.description), /where is auth handled/);
    assert.match(String(agent.description), /find similar commands/);
    assert.match(String(agent.description), /which files touch billing/);
    assert.match(String(agent.description), /what docs explain agents/);
    assert.match(String(agent.description), /look up React useEffectEvent/);
    assert.match(String(agent.description), /find the source of this error/);
    assert.match(String(agent.description), /official API docs/);
    assert.match(String(agent.description), /file names, symbols, keywords/i);
    assert.match(
      String(agent.description),
      /error text, packages, APIs, URLs/i,
    );
    assert.match(String(agent.description), /library\/framework names/i);
    assert.match(String(agent.description), /precise sources/i);
    assert.match(String(agent.description), /line ranges/i);
    assert.match(String(agent.description), /URLs/i);
    assert.match(String(agent.description), /limitations/i);
    assert.match(String(agent.description), /parallel/i);
    assert.match(String(agent.description), /not a general-purpose reviewer/i);
    assert.match(String(agent.description), /reasoning delegate/i);

    const prompt = String(agent.prompt);
    assert.match(prompt, /Role: You are the explore subagent/);
    assert.doesNotMatch(prompt, new RegExp(removedPromptScope));
    assert.match(prompt, /locate concrete .* evidence/i);
    assert.match(prompt, /where .* which source/i);
    assert.match(prompt, /not open-ended analytical questions/i);
    assert.match(prompt, /# Task Boundary/);
    assert.match(prompt, /plan or code correctness/i);
    assert.match(prompt, /sufficiency judgments/i);
    assert.match(prompt, /option evaluation/i);
    assert.match(prompt, /root-cause conclusions/i);
    assert.match(prompt, /recommendations/i);
    assert.match(prompt, /severity ranking/i);
    assert.match(prompt, /implementation design/i);
    assert.match(prompt, /final verdicts/i);
    assert.match(prompt, /factual extraction/i);
    assert.match(prompt, /short .* what a source contains/i);
    assert.match(prompt, /Source matches/);
    assert.match(prompt, /factual relevance/i);
    assert.match(prompt, /Missing evidence\/search limitations/);
    assert.match(prompt, /Scope handoff/);
    assert.match(prompt, /analytical .* belongs to the caller/i);
    assert.match(prompt, /most directly requested sources/i);
    assert.match(prompt, /line ranges/i);
    assert.match(prompt, /Use glob for file patterns/);
    assert.match(prompt, /grep for content search/);
    assert.match(prompt, /read for specific files/);
    assert.match(prompt, /list for directories/);
    assert.match(prompt, /Use bash only if the task requires it/);
    assert.match(prompt, /preferred tools are insufficient/);
    assert.match(prompt, /read-only/);
    assert.match(prompt, /must not add or change git-tracked files/);
    assert.match(prompt, /webfetch/);
    assert.match(prompt, /websearch/);
    assert.match(prompt, /context7/);
    assert.match(prompt, /Do not edit/);
    assert.match(prompt, /Do not use edit, task, or todowrite/);
    assert.match(prompt, /Do not summarize the whole repository by default/);
    assert.doesNotMatch(prompt, /AGENTS\.md/);
    assert.doesNotMatch(prompt, /ARCHITECTURE\.md/);
    assert.doesNotMatch(prompt, /docs\/\*\*\/\*\.md/);

    const permission = agent.permission as Record<string, unknown> | undefined;
    assert.ok(permission);
    assert.equal(permission["*"], "deny");
    assert.equal(permission.glob, "allow");
    assert.equal(permission.grep, "allow");
    assert.equal(permission.read, "allow");
    assert.equal(permission.list, "allow");
    assert.equal(permission.bash, "allow");
    assert.equal(permission.webfetch, "allow");
    assert.equal(permission.websearch, "allow");
    assert.equal(permission["context7_*"], "allow");
    assert.equal(permission.external_directory, "ask");
  });

  it("registers the ask primary answer agent", async () => {
    const agents = await configuredAgents();

    assert.equal(ASK_AGENT_NAME, "ask");

    const agent = agents[ASK_AGENT_NAME];
    assert.ok(agent);
    assert.equal(agent.mode, "primary");
    assert.equal(agent.model, "openai/gpt-5.6-sol");
    assert.equal(agent.variant, "high");
    assert.equal(agent.temperature, 0.1);
    assert.equal(agent.top_p, DEFAULT_AGENT_TOP_P);
    assert.equal(agent.color, "accent");
    assert.equal(agent.description, ASK_AGENT_DESCRIPTION);
    assert.match(String(agent.description), /Answers user questions/i);
    assert.match(String(agent.description), /evidence-backed/i);
    assert.match(String(agent.description), /answer rather than code changes/i);
    assert.match(String(agent.description), /parallel source retrieval/i);
    assert.match(String(agent.description), /cites sources and limitations/i);

    const prompt = String(agent.prompt);
    assert.match(prompt, /Role: You are the ask agent\./);
    assert.match(prompt, /# Personality/);
    assert.match(prompt, /# Goal/);
    assert.match(prompt, /# Success Criteria/);
    assert.match(prompt, /# Constraints/);
    assert.match(prompt, /# Output/);
    assert.match(prompt, /# Stop Rules/);
    assert.ok(prompt.indexOf("# Goal") < prompt.indexOf("# Discovery"));
    assert.ok(
      prompt.indexOf("# Discovery") < prompt.indexOf("# Success Criteria"),
    );
    assertDiscoverySentinels(prompt);
    assert.match(prompt, /answer the user's question accurately and directly/i);
    assert.match(prompt, /prefer repository\/source-backed evidence/i);
    assert.match(prompt, /ask a focused question/i);
    assert.match(prompt, /ambiguity materially changes the answer/i);
    assert.match(prompt, /local files\/line ranges or URLs/i);
    assert.match(prompt, /state limitations/i);
    assert.match(prompt, /asks for judgment or next steps/i);
    assert.match(prompt, /label recommendations as recommendations/i);
    assert.match(prompt, /keep them evidence-based/i);
    assert.match(
      prompt,
      /assess a plan, code, or proposal.*gathers evidence.*performs the assessment itself/i,
    );
    assert.match(prompt, /asks how to implement something/i);
    assert.match(prompt, /options, tradeoffs, or creative approaches/i);
    assert.match(prompt, /switching to `brainstorm`/i);
    assert.match(prompt, /Do not edit, create, move, delete, or format files/i);
    assert.match(prompt, /do not implement requested changes/i);
    assert.match(prompt, /official\/public references/i);
    assert.match(prompt, /delegate substantial source retrieval to `explore`/i);
    assert.match(prompt, /Start with the answer/i);
    assert.match(prompt, /supporting evidence/i);
    assert.match(prompt, /caveats\/next steps/i);
    assert.match(prompt, /stop when the question is answered/i);
    assert.match(prompt, /Do not keep searching/i);

    const permission = agent.permission as Record<string, unknown> | undefined;
    assert.ok(permission);
    assertPrimaryReadOnlyPermissions(permission);
  });

  it("registers the brainstorm primary ideation agent", async () => {
    const agents = await configuredAgents();

    assert.equal(BRAINSTORM_AGENT_NAME, "brainstorm");

    const agent = agents[BRAINSTORM_AGENT_NAME];
    assert.ok(agent);
    assert.equal(agent.mode, "primary");
    assert.equal(agent.model, "openai/gpt-5.6-sol");
    assert.equal(agent.variant, "high");
    assert.equal(agent.temperature, 0.8);
    assert.equal(agent.top_p, DEFAULT_AGENT_TOP_P);
    assert.equal(agent.color, "success");
    assert.equal(agent.description, BRAINSTORM_AGENT_DESCRIPTION);
    assert.match(String(agent.description), /creative, practical options/i);
    assert.match(String(agent.description), /tradeoffs before implementation/i);
    assert.match(String(agent.description), /multiple plausible directions/i);
    assert.match(String(agent.description), /parallel source retrieval/i);
    assert.match(String(agent.description), /recommendations/i);

    const prompt = String(agent.prompt);
    assert.match(prompt, /Role: You are the brainstorm agent\./);
    assert.match(prompt, /# Personality/);
    assert.match(prompt, /# Goal/);
    assert.match(prompt, /# Success Criteria/);
    assert.match(prompt, /# Constraints/);
    assert.match(prompt, /# Output/);
    assert.match(prompt, /# Stop Rules/);
    assert.ok(prompt.indexOf("# Goal") < prompt.indexOf("# Discovery"));
    assert.ok(
      prompt.indexOf("# Discovery") < prompt.indexOf("# Success Criteria"),
    );
    assertDiscoverySentinels(prompt);
    assert.match(prompt, /generate several useful directions/i);
    assert.match(prompt, /help the user converge/i);
    assert.match(prompt, /tradeoffs, risks, and a recommended starting point/i);
    assert.match(prompt, /explore the solution space broadly enough/i);
    assert.match(prompt, /repo\/product constraints/i);
    assert.match(prompt, /ask a focused question/i);
    assert.match(prompt, /separate divergent ideas from convergence/i);
    assert.match(prompt, /confirms an idea and asks you to implement it/i);
    assert.match(prompt, /switch to the `draft` agent/i);
    assert.match(prompt, /`build` agent for code changes/i);
    assert.match(prompt, /Do not edit, create, move, delete, or format files/i);
    assert.match(prompt, /do not implement/i);
    assert.match(
      prompt,
      /Do not present speculative ideas as established repo behavior/i,
    );
    assert.match(prompt, /public\/official context/i);
    assert.match(prompt, /retrieve facts and examples/i);
    assert.match(prompt, /option generation, tradeoff analysis, convergence/i);
    assert.match(prompt, /remain .* responsibility/i);
    assert.match(prompt, /grouped options/i);
    assert.match(prompt, /tradeoffs\/risks/i);
    assert.match(prompt, /recommended direction/i);
    assert.match(prompt, /next questions or experiments/i);
    assert.match(prompt, /stop after a useful option set/i);
    assert.match(prompt, /Do not over-research/i);

    const permission = agent.permission as Record<string, unknown> | undefined;
    assert.ok(permission);
    assertPrimaryReadOnlyPermissions(permission);
  });

  it("overrides existing bundled agent entries", async () => {
    const hooks = await plugin.server({} as never, {});
    assert.ok(hooks.config);

    const existingExplore = {
      description: "custom explore",
      mode: "subagent",
    };
    const existingDraft = {
      description: "custom draft",
      mode: "all",
    };
    const existingPlan = {
      description: "custom plan",
      mode: "primary",
    };
    const existingAsk = {
      description: "custom ask",
      mode: "primary",
    };
    const existingBrainstorm = {
      description: "custom brainstorm",
      mode: "primary",
    };
    const config = {
      agent: {
        [ASK_AGENT_NAME]: existingAsk,
        [BRAINSTORM_AGENT_NAME]: existingBrainstorm,
        [EXPLORE_AGENT_NAME]: existingExplore,
        [DRAFT_AGENT_NAME]: existingDraft,
        plan: existingPlan,
      },
    };

    await hooks.config(config as never);

    assert.equal(config.agent[ASK_AGENT_NAME], ASK_AGENT_CONFIG);
    assert.equal(config.agent[BRAINSTORM_AGENT_NAME], BRAINSTORM_AGENT_CONFIG);
    assert.equal(config.agent[EXPLORE_AGENT_NAME], EXPLORE_AGENT_CONFIG);
    assert.equal(config.agent[DRAFT_AGENT_NAME], DRAFT_AGENT_CONFIG);
    assert.deepEqual(config.agent.plan, { disable: true });
  });

  it("sets draft as default_agent for incoming plan", async () => {
    const hooks = await plugin.server({} as never, {});
    assert.ok(hooks.config);

    const config: PluginConfig = { default_agent: "plan" };

    await hooks.config(config as never);

    assert.equal(config.default_agent, DRAFT_AGENT_NAME);
  });

  it("sets draft as default_agent when unset", async () => {
    const hooks = await plugin.server({} as never, {});
    assert.ok(hooks.config);

    const config: PluginConfig = {};

    await hooks.config(config as never);

    assert.equal(config.default_agent, DRAFT_AGENT_NAME);
  });

  it("overwrites non-plan default_agent with draft", async () => {
    const hooks = await plugin.server({} as never, {});
    assert.ok(hooks.config);

    const config: PluginConfig = { default_agent: ASK_AGENT_NAME };

    await hooks.config(config as never);

    assert.equal(config.default_agent, DRAFT_AGENT_NAME);
  });

  it("registers secondary color for native build without existing config", async () => {
    const hooks = await plugin.server({} as never, {});
    assert.ok(hooks.config);

    const config: PluginConfig = {};

    await hooks.config(config as never);

    assert.deepEqual(config.agent?.build, { color: "secondary" });
  });

  it("preserves native build config while forcing secondary color", async () => {
    const hooks = await plugin.server({} as never, {});
    assert.ok(hooks.config);

    const existingBuild = {
      mode: "primary",
      description: "custom build",
      permission: { edit: "allow" },
      disable: false,
      color: "warning",
    };
    const config: PluginConfig = { agent: { build: existingBuild } };

    await hooks.config(config as never);

    assert.equal(config.agent?.build, existingBuild);
    assert.deepEqual(config.agent?.build, {
      mode: "primary",
      description: "custom build",
      permission: { edit: "allow" },
      disable: false,
      color: "secondary",
    });
  });
});
