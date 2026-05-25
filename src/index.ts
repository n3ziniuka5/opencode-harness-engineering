import type { Plugin, PluginModule } from "@opencode-ai/plugin";
import { EXPLORE_AGENT_CONFIG, EXPLORE_AGENT_NAME } from "./agents/explore.js";
import { PLAN_AGENT_CONFIG, PLAN_AGENT_NAME } from "./agents/plan.js";
import {
  INIT_HARNESS_ENGINEERING_COMMAND_CONFIG,
  INIT_HARNESS_ENGINEERING_COMMAND_NAME,
} from "./commands/init-harness-engineering.js";

const PLUGIN_ID = "harness.agents";

type MutableAgentConfig = Record<string, unknown>;
type MutableAgentMap = Record<string, MutableAgentConfig | undefined>;
type MutableCommandConfig = {
  template: string;
  description?: string;
  agent?: string;
  model?: string;
  subtask?: boolean;
};
type MutableCommandMap = Record<string, MutableCommandConfig | undefined>;
type MutableConfig = {
  agent?: MutableAgentMap;
  command?: MutableCommandMap;
};

function agentMap(config: MutableConfig) {
  if (!config.agent) {
    config.agent = {};
  }

  return config.agent;
}

function registerPlanAgent(config: MutableConfig) {
  agentMap(config)[PLAN_AGENT_NAME] = PLAN_AGENT_CONFIG;
}

function registerExploreAgent(config: MutableConfig) {
  agentMap(config)[EXPLORE_AGENT_NAME] = EXPLORE_AGENT_CONFIG;
}

function registerInitHarnessEngineeringCommand(config: MutableConfig) {
  config.command ??= {};
  config.command[INIT_HARNESS_ENGINEERING_COMMAND_NAME] ??=
    INIT_HARNESS_ENGINEERING_COMMAND_CONFIG;
}

const server: Plugin = async () => {
  return {
    async config(input) {
      const mutableConfig = input as MutableConfig;
      registerExploreAgent(mutableConfig);
      registerPlanAgent(mutableConfig);
      registerInitHarnessEngineeringCommand(mutableConfig);
    },
  };
};

const plugin: PluginModule & { id: string } = {
  id: PLUGIN_ID,
  server,
};

export {
  EXPLORE_AGENT_CONFIG,
  EXPLORE_AGENT_DESCRIPTION,
  EXPLORE_AGENT_NAME,
  EXPLORE_AGENT_PROMPT,
} from "./agents/explore.js";
export {
  PLAN_AGENT_CONFIG,
  PLAN_AGENT_DESCRIPTION,
  PLAN_AGENT_NAME,
  PLAN_AGENT_PROMPT,
} from "./agents/plan.js";
export {
  INIT_HARNESS_ENGINEERING_COMMAND_CONFIG,
  INIT_HARNESS_ENGINEERING_COMMAND_DESCRIPTION,
  INIT_HARNESS_ENGINEERING_COMMAND_NAME,
  INIT_HARNESS_ENGINEERING_COMMAND_TEMPLATE,
} from "./commands/init-harness-engineering.js";
export {
  PLUGIN_ID,
  registerExploreAgent,
  registerPlanAgent,
  registerInitHarnessEngineeringCommand,
  server,
};
export default plugin;
