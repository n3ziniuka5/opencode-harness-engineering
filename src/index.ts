import type { Plugin, PluginModule, PluginOptions } from "@opencode-ai/plugin";
import { tool } from "@opencode-ai/plugin";

const PLUGIN_ID = "harness.hello-world";

function optionString(
  options: PluginOptions | undefined,
  key: string,
  fallback: string,
) {
  const value = options?.[key];
  if (typeof value !== "string") return fallback;

  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : fallback;
}

const server: Plugin = async (_input, options) => {
  const greeting = optionString(options, "greeting", "Hello");

  return {
    tool: {
      hello_world: tool({
        description:
          "Return a greeting from the harness-engineering starter plugin.",
        args: {
          name: tool.schema
            .string()
            .trim()
            .min(1)
            .optional()
            .describe("Optional name to greet."),
        },
        async execute(args, context) {
          const target = args.name ?? "world";
          const output = `${greeting}, ${target}!`;

          context.metadata({
            title: `hello ${target}`,
            metadata: {
              plugin: PLUGIN_ID,
              target,
            },
          });

          return {
            output,
            metadata: {
              plugin: PLUGIN_ID,
              target,
            },
          };
        },
      }),
    },
  };
};

const plugin: PluginModule & { id: string } = {
  id: PLUGIN_ID,
  server,
};

export { PLUGIN_ID, server };
export default plugin;
