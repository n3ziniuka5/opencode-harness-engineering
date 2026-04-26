import { describe, it } from "node:test";
import assert from "node:assert/strict";

import plugin, { PLUGIN_ID } from "../src/index.js";

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
