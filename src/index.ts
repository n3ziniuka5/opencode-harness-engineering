import type { Plugin, PluginModule, PluginOptions } from "@opencode-ai/plugin";
import { tool } from "@opencode-ai/plugin";
import {
  HUMAN_PLAN_AGENT_CONFIG,
  HUMAN_PLAN_AGENT_NAME,
} from "./agents/human-plan.js";

const PLUGIN_ID = "harness.hello-world";

type MutableAgentConfig = Record<string, unknown>;
type MutableAgentMap = Record<string, MutableAgentConfig | undefined>;
type MutableConfig = {
  agent?: MutableAgentMap;
};

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

function registerHumanPlanAgent(config: MutableConfig) {
  config.agent ??= {};
  config.agent[HUMAN_PLAN_AGENT_NAME] ??= HUMAN_PLAN_AGENT_CONFIG;
}

const server: Plugin = async (_input, options) => {
  const greeting = optionString(options, "greeting", "Hello");

  return {
    async config(input) {
      registerHumanPlanAgent(input as MutableConfig);
    },
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

export {
  HUMAN_PLAN_AGENT_CONFIG,
  HUMAN_PLAN_AGENT_DESCRIPTION,
  HUMAN_PLAN_AGENT_NAME,
  HUMAN_PLAN_AGENT_PROMPT,
} from "./agents/human-plan.js";
export { PLUGIN_ID, registerHumanPlanAgent, server };
export default plugin;
