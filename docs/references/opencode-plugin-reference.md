# OpenCode Plugin Reference

This reference was derived from `../opencode` during project initialization.

## Server Plugin Module

OpenCode v1 server plugins default-export an object with this shape:

```ts
import type { PluginModule } from "@opencode-ai/plugin";

const plugin: PluginModule & { id: string } = {
  id: "example.plugin",
  server: async (input, options) => {
    return {};
  },
};

export default plugin;
```

For file/path plugins, OpenCode requires a non-empty `id`. For npm plugins, OpenCode can fall back to the package name, but this repo still exports an explicit id for clarity.

## Package Entrypoints

For npm packages, OpenCode resolves server plugins from `package.json` in this order:

- `exports["./server"]`
- `main`, only when no server export is available

This package exposes `./server` and `.` to the same built file.

## Config Hooks, Agents, And Commands

OpenCode server plugins can also return a `config` hook. The hook receives the resolved OpenCode config object and may mutate it before OpenCode builds its agent registry.

This plugin uses that hook to assign `config.agent.explore`, `config.agent.ask`, `config.agent.brainstorm`, and `config.agent.draft`. It also assigns `config.agent.plan = { disable: true }` so OpenCode's native `plan` agent is unavailable while the plugin is loaded, sets `config.default_agent = "draft"`, partially overrides `config.agent.build.color`, and adds `config.command["init-harness-engineering"]` so OpenCode surfaces `/init-harness-engineering`.

```ts
return {
  async config(input) {
    if (!input.agent) input.agent = {};
    input.agent.explore = {
      mode: "subagent",
      model: "openai/gpt-5.4-mini",
      variant: "low",
      temperature: 0.5,
      top_p: 0.97,
      permission: { "*": "deny", read: "allow", grep: "allow" },
      prompt: "...",
    };
    input.agent.ask = {
      mode: "primary",
      model: "openai/gpt-5.5",
      variant: "xhigh",
      color: "accent",
      temperature: 0.1,
      top_p: 0.97,
      permission: { edit: "deny", task: { explore: "allow" } },
      prompt: "...",
    };
    input.agent.brainstorm = {
      mode: "primary",
      model: "openai/gpt-5.5",
      variant: "xhigh",
      color: "success",
      temperature: 0.8,
      top_p: 0.97,
      permission: { edit: "deny", task: { explore: "allow" } },
      prompt: "...",
    };
    input.agent.draft = {
      mode: "all",
      model: "openai/gpt-5.5",
      variant: "high",
      color: "primary",
      temperature: 0.2,
      top_p: 0.97,
      prompt: "...",
    };
    input.agent.build ??= {};
    input.agent.build.color = "secondary";
    input.agent.plan = { disable: true };
    input.default_agent = "draft";
  },
};
```

Agent config supports fields such as `description`, `mode`, `model`, `variant`, `color`, `temperature`, `top_p`, `prompt`, `permission`, `disable`, and `options`. The `variant` field maps to provider-specific model variants such as OpenAI reasoning effort `low`, `high`, or `xhigh` when the selected model exposes that variant. This plugin assigns agent configs directly so the bundled `explore`, `ask`, `brainstorm`, and `draft` definitions override same-named user entries. The native `plan` key is intentionally disabled to avoid native plan-mode reminders, the native `build` config is preserved except for forced `color: "secondary"`, and every config-hook run sets `default_agent: "draft"`. OpenCode loads plugin config at startup, so users must restart OpenCode after installing or upgrading the plugin.

Command config supports a `template` prompt and optional fields such as `description`, `agent`, `model`, and `subtask`. This plugin intentionally leaves `agent`, `model`, and `subtask` unset for `/init-harness-engineering` so the command runs with the user's current/default implementation agent and normal file-edit permissions. Registration uses `??=` so local user commands with the same name are not overwritten.

## Local Development

`opencode.json` can load a local file plugin:

```json
{
  "$schema": "https://opencode.ai/config.json",
  "plugin": ["./src/index.ts"]
}
```

OpenCode also supports tuple options as `[spec, options]` for plugins that need options.
