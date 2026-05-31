# ADR: npm Release Automation and Package Identity

Status: Accepted

## Context

The repository is being prepared for first public npm publication. The package, GitHub repository, npm Trusted Publisher settings, and OpenCode plugin id need a consistent public identity before any published version exists.

Release automation must create version and changelog changes from Conventional Commits, publish GitHub releases, and publish npm packages without a long-lived npm automation token.

## Decision

Publish the package as `@n3ziniuka5/opencode-harness-engineering` and use OpenCode plugin id `n3ziniuka5.opencode-harness-engineering`. Keep the package ESM exports `.` and `./server` pointing to `dist/index.js` with declarations at `dist/index.d.ts`.

Use Release Please for version and changelog release PRs. Configure plain `vX.Y.Z` tags for this single-package repository through `release-please-config.json` and `.release-please-manifest.json`.

Keep npm publishing in a separate GitHub Actions workflow triggered by `release.published`. The publish workflow checks out the release tag, validates and builds the package, verifies the tag equals `v${package.json.version}`, and runs `npm publish --access public`.

Use npm Trusted Publishing/OIDC for npm auth. Do not configure `NPM_TOKEN` for the publish workflow.

## Tradeoffs

- Aligning the npm package, GitHub repository, and plugin id before first publish avoids migration and deprecation work.
- A separate publish workflow keeps Release Please responsible only for release PR and GitHub release creation.
- `RELEASE_PLEASE_TOKEN` is required instead of the default `GITHUB_TOKEN` so a GitHub release can trigger the separate publish workflow.
- npm Trusted Publishing removes long-lived npm publish tokens but requires exact npm package Trusted Publisher settings and GitHub-hosted runners.
- Plain `vX.Y.Z` tags are simpler than component-prefixed tags for this single-package repository.

## Consequences

- Current public contracts include npm package `@n3ziniuka5/opencode-harness-engineering`, plugin id `n3ziniuka5.opencode-harness-engineering`, and package exports `.` and `./server`.
- External setup must configure npm Trusted Publishing for owner/user `n3ziniuka5`, repository `opencode-harness-engineering`, workflow filename `publish-npm.yml`, and allowed action `npm publish`.
- GitHub must provide `RELEASE_PLEASE_TOKEN` with enough repository permissions to open release PRs and create releases.
- If the npm package cannot be configured for Trusted Publishing before it exists, the first version may require a one-time manual bootstrap publish, followed immediately by Trusted Publisher setup.
