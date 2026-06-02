import type { Plugin, PluginModule } from "@opencode-ai/plugin";
import { ASK_AGENT_CONFIG, ASK_AGENT_NAME } from "./agents/ask.js";
import {
  BRAINSTORM_AGENT_CONFIG,
  BRAINSTORM_AGENT_NAME,
} from "./agents/brainstorm.js";
import { DRAFT_AGENT_CONFIG, DRAFT_AGENT_NAME } from "./agents/draft.js";
import { EXPLORE_AGENT_CONFIG, EXPLORE_AGENT_NAME } from "./agents/explore.js";
import {
  INIT_HARNESS_ENGINEERING_COMMAND_CONFIG,
  INIT_HARNESS_ENGINEERING_COMMAND_NAME,
} from "./commands/init-harness-engineering.js";

const PLUGIN_ID = "n3ziniuka5.opencode-harness-engineering";
const NATIVE_PLAN_AGENT_NAME = "plan";

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
  default_agent?: string;
};

function agentMap(config: MutableConfig) {
  if (!config.agent) {
    config.agent = {};
  }

  return config.agent;
}

function disableNativePlanAgent(config: MutableConfig) {
  agentMap(config)[NATIVE_PLAN_AGENT_NAME] = { disable: true };
  if (config.default_agent === NATIVE_PLAN_AGENT_NAME) {
    config.default_agent = DRAFT_AGENT_NAME;
  }
}

function registerDraftAgent(config: MutableConfig) {
  agentMap(config)[DRAFT_AGENT_NAME] = DRAFT_AGENT_CONFIG;
}

function registerExploreAgent(config: MutableConfig) {
  agentMap(config)[EXPLORE_AGENT_NAME] = EXPLORE_AGENT_CONFIG;
}

function registerAskAgent(config: MutableConfig) {
  agentMap(config)[ASK_AGENT_NAME] = ASK_AGENT_CONFIG;
}

function registerBrainstormAgent(config: MutableConfig) {
  agentMap(config)[BRAINSTORM_AGENT_NAME] = BRAINSTORM_AGENT_CONFIG;
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
      registerAskAgent(mutableConfig);
      registerBrainstormAgent(mutableConfig);
      registerDraftAgent(mutableConfig);
      disableNativePlanAgent(mutableConfig);
      registerInitHarnessEngineeringCommand(mutableConfig);
    },
  };
};

const plugin: PluginModule & { id: string } = {
  id: PLUGIN_ID,
  server,
};

export {
  ASK_AGENT_CONFIG,
  ASK_AGENT_DESCRIPTION,
  ASK_AGENT_NAME,
  ASK_AGENT_PROMPT,
} from "./agents/ask.js";
export {
  BRAINSTORM_AGENT_CONFIG,
  BRAINSTORM_AGENT_DESCRIPTION,
  BRAINSTORM_AGENT_NAME,
  BRAINSTORM_AGENT_PROMPT,
} from "./agents/brainstorm.js";
export {
  EXPLORE_AGENT_CONFIG,
  EXPLORE_AGENT_DESCRIPTION,
  EXPLORE_AGENT_NAME,
  EXPLORE_AGENT_PROMPT,
} from "./agents/explore.js";
export {
  DRAFT_AGENT_CONFIG,
  DRAFT_AGENT_DESCRIPTION,
  DRAFT_AGENT_NAME,
  DRAFT_AGENT_PROMPT,
  PLAN_AGENT_CONFIG,
  PLAN_AGENT_DESCRIPTION,
  PLAN_AGENT_NAME,
} from "./agents/draft.js";
export {
  INIT_HARNESS_ENGINEERING_COMMAND_CONFIG,
  INIT_HARNESS_ENGINEERING_COMMAND_DESCRIPTION,
  INIT_HARNESS_ENGINEERING_COMMAND_NAME,
  INIT_HARNESS_ENGINEERING_COMMAND_TEMPLATE,
} from "./commands/init-harness-engineering.js";
export {
  PLUGIN_ID,
  disableNativePlanAgent,
  registerAskAgent,
  registerBrainstormAgent,
  registerDraftAgent,
  registerExploreAgent,
  registerInitHarnessEngineeringCommand,
  server,
};
export default plugin;
