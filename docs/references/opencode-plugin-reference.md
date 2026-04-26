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

## Hooks And Tools

The server function returns hooks from `@opencode-ai/plugin`. The starter plugin uses the `tool` hook:

```ts
import { tool } from "@opencode-ai/plugin";

return {
  tool: {
    hello_world: tool({
      description: "Return a greeting.",
      args: {
        name: tool.schema.string().optional(),
      },
      async execute(args, context) {
        context.metadata({ title: "hello" });
        return "Hello world!";
      },
    }),
  },
};
```

## Local Development

`opencode.json` can load a local file plugin:

```json
{
  "$schema": "https://opencode.ai/config.json",
  "plugin": [["./src/index.ts", { "greeting": "Hello" }]]
}
```

OpenCode supports tuple options as `[spec, options]`; the starter plugin reads a `greeting` option.
