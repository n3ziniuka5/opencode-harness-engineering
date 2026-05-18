import { describe, it } from "node:test";
import assert from "node:assert/strict";

import plugin, {
  INIT_HARNESS_ENGINEERING_COMMAND_DESCRIPTION,
  INIT_HARNESS_ENGINEERING_COMMAND_NAME,
} from "../src/index.js";

type CommandConfig = {
  template: string;
  description?: string;
  agent?: string;
  model?: string;
  subtask?: boolean;
};

describe("init-harness-engineering command", () => {
  it("registers the slash command config", async () => {
    const hooks = await plugin.server({} as never, {});
    assert.ok(hooks.config);

    const config: {
      command?: Record<string, CommandConfig | undefined>;
    } = {};
    await hooks.config(config as never);

    const command = config.command?.[INIT_HARNESS_ENGINEERING_COMMAND_NAME];
    assert.ok(command);
    assert.equal(
      command.description,
      INIT_HARNESS_ENGINEERING_COMMAND_DESCRIPTION,
    );
    assert.equal(typeof command.template, "string");
    assert.match(command.template, /init-harness-engineering/);
    assert.match(command.template, /\$ARGUMENTS/);
    assert.match(command.template, /## Harness-Engineering Posture/);
    assert.match(command.template, /keep code\/config\/docs agent-legible/);
    assert.match(command.template, /mechanical checks/);
    assert.match(command.template, /Then add an archival rule explaining/);
    assert.match(
      command.template,
      /Completing implementation includes resolving the active plan's lifecycle before reporting the task done/,
    );
    assert.match(
      command.template,
      /update the appropriate long-term repo documentation to reflect what was actually built, changed, verified, and decided/,
    );
    assert.match(
      command.template,
      /do not mechanically copy or move stale plan text/,
    );
    assert.match(
      command.template,
      /Use `docs\/exec-plans\/completed\/` only when the remaining execution history has durable debugging, audit, rollout, or handoff value/,
    );
    assert.match(command.template, /Delete rather than archive when/);
    assert.doesNotMatch(command.template, /product requirement/i);
    assert.doesNotMatch(command.template, /\bprd\b/i);
    assert.equal(command.agent, undefined);
    assert.equal(command.model, undefined);
    assert.equal(command.subtask, undefined);
  });

  it("preserves an existing user-defined command", async () => {
    const hooks = await plugin.server({} as never, {});
    assert.ok(hooks.config);

    const existingCommand = {
      description: "custom local command",
      template: "use my local workflow",
      agent: "custom-agent",
    };
    const config: {
      command: Record<string, CommandConfig | undefined>;
    } = {
      command: {
        [INIT_HARNESS_ENGINEERING_COMMAND_NAME]: existingCommand,
      },
    };

    await hooks.config(config as never);

    assert.equal(
      config.command[INIT_HARNESS_ENGINEERING_COMMAND_NAME],
      existingCommand,
    );
  });
});
