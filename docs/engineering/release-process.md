# Release Process

## Current Package Shape

- npm package name is `@n3ziniuka5/opencode-harness-engineering`.
- OpenCode plugin id is `n3ziniuka5.opencode-harness-engineering`.
- Version is stored in `package.json`.
- Package manager is `pnpm@10.33.2`.
- Runtime support is Node.js `>=22` and OpenCode `>=1.14.0`.
- `prepack` runs `pnpm run build`.
- Published files are limited by `package.json` `files` to `dist` and `README.md`, plus npm's automatic package metadata and license files.
- Public package visibility is enforced by `publishConfig.access: "public"` and `npm publish --access public`.

## Automation

- `.github/workflows/ci.yml` runs on pull requests and pushes to `main` across Node.js `22` and `24`, then runs `pnpm install --frozen-lockfile`, `pnpm run check`, and `pnpm run build`.
- `release-please-config.json` and `.release-please-manifest.json` configure Release Please for this single Node package with plain `vX.Y.Z` tags.
- `.github/workflows/release-please.yml` runs on pushes to `main`, uses `googleapis/release-please-action@v4`, opens or updates release PRs from Conventional Commits, and creates the GitHub release after a release PR is merged.
- `.github/workflows/publish-npm.yml` runs on `release.published`, skips prereleases, checks out the release tag, validates the package, verifies the tag equals `v${package.json.version}`, and publishes to npm.
- The publish workflow relies on npm Trusted Publishing/OIDC with `permissions.id-token: write`; it must not use `NPM_TOKEN` or `NODE_AUTH_TOKEN`.

## Required External Setup

- Configure the npm package `@n3ziniuka5/opencode-harness-engineering` for Trusted Publishing with owner/user `n3ziniuka5`, repository `opencode-harness-engineering`, workflow filename `publish-npm.yml`, allowed action `npm publish`, and no environment name unless the workflow later adds one.
- If npm requires the package to exist before Trusted Publisher settings are available, bootstrap the first public version from a clean tagged checkout with `npm publish --access public`, then configure Trusted Publishing immediately and revoke any temporary publish token.
- Add GitHub repository secret `RELEASE_PLEASE_TOKEN`. Prefer a fine-grained PAT or GitHub App token that can read repository metadata and write contents, pull requests, and issues. It does not need npm permissions.
- Ensure branch protection requires the `CI` workflow before merging release PRs.
- Use Conventional Commits such as `fix:`, `feat:`, and `feat!:` or `BREAKING CHANGE:` for commits intended to drive SemVer and release notes.

## Local Release Checks

1. Run `pnpm install --frozen-lockfile` if dependencies are missing or stale.
2. Run `pnpm run check`.
3. Run `pnpm run build`.
4. Run `pnpm run format:check` after Markdown, JSON, TypeScript, or workflow edits.
5. Run `npm pack --dry-run` before release-sensitive package changes and confirm the tarball metadata and contents are intentional.
6. Run `pnpm dlx actionlint ".github/workflows/*.yml"` when workflow validation is available; otherwise manually review workflow syntax and GitHub expressions.

## Publish Validation

- After merging a Release Please PR, confirm it creates a GitHub release with tag `vX.Y.Z`.
- Confirm the `publish-npm` workflow starts from the published release and uses OIDC, not token-based npm auth.
- After successful publish, run `npm view @n3ziniuka5/opencode-harness-engineering version repository dist-tags.latest` and verify npm matches the GitHub release.
- If Trusted Publishing is misconfigured, fix npm/GitHub settings and rerun the failed workflow for the same release. If the version already exists on npm, publish a new fixed version rather than overwriting.

## Rollback

For published npm package regressions, publish a fixed version or deprecate the affected version according to npm registry policy. Do not overwrite an existing npm version.
