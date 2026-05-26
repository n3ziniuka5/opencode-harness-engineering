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

This plugin uses that hook to assign `config.agent.explore` and `config.agent.plan`. Both keys intentionally replace OpenCode's native agents when present. It also adds `config.command["init-harness-engineering"]` so OpenCode surfaces `/init-harness-engineering`.

```ts
return {
  async config(input) {
    if (!input.agent) input.agent = {};
    input.agent.explore = {
      mode: "subagent",
      model: "openai/gpt-5.4-mini",
      variant: "low",
      permission: { "*": "deny", read: "allow", grep: "allow" },
      prompt: "...",
    };
    input.agent.plan = {
      mode: "all",
      model: "openai/gpt-5.5",
      variant: "high",
      prompt: "...",
    };
  },
};
```

Agent config supports fields such as `description`, `mode`, `model`, `variant`, `prompt`, `permission`, and `options`. The `variant` field maps to provider-specific model variants such as OpenAI reasoning effort `low` or `high` when the selected model exposes that variant. This plugin assigns agent configs directly so the bundled `explore` and `plan` definitions override OpenCode defaults.

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
