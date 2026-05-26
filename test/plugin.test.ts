import { describe, it } from "node:test";
import assert from "node:assert/strict";

import plugin, {
  EXPLORE_AGENT_CONFIG,
  EXPLORE_AGENT_DESCRIPTION,
  EXPLORE_AGENT_NAME,
  PLAN_AGENT_CONFIG,
  PLAN_AGENT_NAME,
  PLUGIN_ID,
} from "../src/index.js";

describe("harness agents plugin", () => {
  const previousPlanAgentName = ["human", "plan"].join("_");
  const removedPromptScope = ["in an OpenCode", "plugin bundle"].join(" ");

  it("exports an OpenCode v1 server plugin", async () => {
    assert.equal(plugin.id, PLUGIN_ID);
    assert.equal(PLUGIN_ID, "harness.agents");
    assert.equal(typeof plugin.server, "function");

    const hooks = await plugin.server({} as never, {});
    assert.equal(hooks.tool, undefined);
  });

  it("registers the plan agent", async () => {
    const hooks = await plugin.server({} as never, {});
    assert.ok(hooks.config);

    const config: {
      agent?: Record<string, Record<string, unknown> | undefined>;
    } = {};
    await hooks.config(config as never);

    assert.equal(PLAN_AGENT_NAME, "plan");
    assert.equal(config.agent?.[previousPlanAgentName], undefined);

    const agent = config.agent?.[PLAN_AGENT_NAME];
    assert.ok(agent);
    assert.equal(agent.model, "openai/gpt-5.5");
    assert.equal(agent.variant, "high");
    assert.equal(agent.mode, "all");
    const permission = agent.permission as Record<string, unknown> | undefined;
    assert.ok(permission);
    assert.equal(permission.websearch, "allow");
    assert.match(String(agent.description), /human-reviewed/);
    assert.match(String(agent.prompt), /Role: You are the plan agent/);
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
      /documentation updates list is for handing off to the implementation agent; you must still apply relevant docs and local instructions while drafting the plan/i,
    );
    assert.doesNotMatch(String(agent.prompt), /# Delegation/);
    assert.match(String(agent.prompt), /# Discovery/);
    assert.match(String(agent.prompt), /substantial discovery/i);
    assert.match(String(agent.prompt), /repo-local guidance/i);
    assert.match(String(agent.prompt), /coding standards/i);
    assert.match(String(agent.prompt), /official library docs/i);
    assert.match(String(agent.prompt), /similar implementation patterns/i);
    assert.match(String(agent.prompt), /documented guidance conflicts/i);
    assert.match(String(agent.prompt), /clear evidence the docs are stale/i);
    assert.match(String(agent.prompt), /documentation update needed/i);
    assert.match(String(agent.prompt), /code debt documentation/i);
  });

  it("registers a read-only explore subagent", async () => {
    const hooks = await plugin.server({} as never, {});
    assert.ok(hooks.config);

    const config: {
      agent?: Record<string, Record<string, unknown> | undefined>;
    } = {};
    await hooks.config(config as never);

    const agent = config.agent?.[EXPLORE_AGENT_NAME];
    assert.ok(agent);
    assert.equal(agent.mode, "subagent");
    assert.equal(agent.model, "openai/gpt-5.4-mini");
    assert.equal(agent.variant, "low");
    assert.equal(agent.description, EXPLORE_AGENT_DESCRIPTION);
    assert.match(String(agent.description), /cheap/i);
    assert.match(String(agent.description), /high-volume/i);
    assert.match(String(agent.description), /read-only/i);
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

    const prompt = String(agent.prompt);
    assert.match(prompt, /Role: You are the explore subagent/);
    assert.doesNotMatch(prompt, new RegExp(removedPromptScope));
    assert.match(prompt, /direct question/i);
    assert.match(prompt, /gathering context/i);
    assert.match(prompt, /concise answer/i);
    assert.match(prompt, /Evidence/);
    assert.match(prompt, /Confidence\/limitations/);
    assert.match(prompt, /files\/URLs/i);
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

  it("overrides existing plan and explore agent entries", async () => {
    const hooks = await plugin.server({} as never, {});
    assert.ok(hooks.config);

    const existingExplore = {
      description: "custom explore",
      mode: "subagent",
    };
    const existingPlan = {
      description: "custom plan",
      mode: "all",
    };
    const config = {
      agent: {
        [EXPLORE_AGENT_NAME]: existingExplore,
        [PLAN_AGENT_NAME]: existingPlan,
      },
    };

    await hooks.config(config as never);

    assert.equal(config.agent[EXPLORE_AGENT_NAME], EXPLORE_AGENT_CONFIG);
    assert.equal(config.agent[PLAN_AGENT_NAME], PLAN_AGENT_CONFIG);
  });
});
