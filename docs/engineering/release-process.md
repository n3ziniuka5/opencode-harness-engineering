# Release Process

## Current Package Shape

- Version is stored in `package.json`.
- Package manager is `pnpm@10.33.2`.
- Runtime support is Node.js `>=22` and OpenCode `>=1.14.0`.
- `prepack` runs `pnpm run build`.
- Published files are limited by `package.json` `files` to `dist` and `README.md`.

## Local Release Checks

1. Run `pnpm install` if dependencies are missing or stale.
2. Run `pnpm run check`.
3. Run `pnpm run build`.
4. Inspect package metadata in `package.json` before publishing.

## Gaps

- TODO: define the release owner.
- TODO: define npm publishing credentials and release approval flow.
- TODO: add CI before relying on automated release gates.
- TODO: define changelog or release-note expectations.

## Rollback

No deployment rollback workflow is configured. For published npm package regressions, publish a fixed version or deprecate the affected version according to the package registry process once ownership is defined.
