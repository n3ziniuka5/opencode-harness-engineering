import { describe, it } from "node:test";
import assert from "node:assert/strict";

import plugin, { HUMAN_PLAN_AGENT_NAME, PLUGIN_ID } from "../src/index.js";

describe("hello-world plugin", () => {
  it("exports an OpenCode v1 server plugin", () => {
    assert.equal(plugin.id, PLUGIN_ID);
    assert.equal(typeof plugin.server, "function");
  });

  it("registers a hello_world tool", async () => {
    const hooks = await plugin.server({} as never, { greeting: "Hello" });

    assert.ok(hooks.tool?.hello_world);
    assert.match(hooks.tool.hello_world.description, /harness-engineering/);
  });

  it("registers a non-conflicting human plan agent", async () => {
    const hooks = await plugin.server({} as never, { greeting: "Hello" });
    assert.ok(hooks.config);

    const config: {
      agent?: Record<string, Record<string, unknown> | undefined>;
    } = {};
    await hooks.config(config as never);

    const agent = config.agent?.[HUMAN_PLAN_AGENT_NAME];
    assert.ok(agent);
    assert.notEqual(HUMAN_PLAN_AGENT_NAME, "plan");
    assert.equal(agent.model, "openai/gpt-5.5");
    assert.equal(agent.variant, "high");
    assert.equal(agent.mode, "all");
    assert.match(String(agent.description), /human-reviewed/);
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
    assert.match(String(agent.prompt), /standalone current-state section/);
    assert.match(String(agent.prompt), /generic omnibus section/);
    assert.match(String(agent.prompt), /\(Recommended\)/);
    assert.match(
      String(agent.prompt),
      /docs\/exec-plans\/active\/YYYY-MM-DD-slug\.md/,
    );
    assert.match(String(agent.prompt), /Completion archive instructions/);
    assert.match(
      String(agent.prompt),
      /docs\/exec-plans\/completed\/YYYY-MM-DD-slug\.md/,
    );
    assert.doesNotMatch(String(agent.prompt), /repo-derived requirements/);
    assert.doesNotMatch(String(agent.prompt), /## Review Request/);
    assert.doesNotMatch(String(agent.prompt), /## Feedback Wanted/);
    assert.match(String(agent.prompt), /AGENTS\.md/);
    assert.match(String(agent.prompt), /ARCHITECTURE\.md/);
    assert.match(String(agent.prompt), /docs\//);
  });

  it("returns a greeting and structured metadata", async () => {
    const hooks = await plugin.server({} as never, { greeting: "Hello" });
    const helloWorld = hooks.tool?.hello_world;
    assert.ok(helloWorld);

    const metadataCalls: unknown[] = [];
    const result = await helloWorld.execute({ name: "Harness" }, {
      metadata(input: unknown) {
        metadataCalls.push(input);
      },
    } as never);

    assert.deepEqual(result, {
      output: "Hello, Harness!",
      metadata: {
        plugin: PLUGIN_ID,
        target: "Harness",
      },
    });
    assert.deepEqual(metadataCalls, [
      {
        title: "hello Harness",
        metadata: {
          plugin: PLUGIN_ID,
          target: "Harness",
        },
      },
    ]);
  });
});
