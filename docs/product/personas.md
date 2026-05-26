# Personas

## Plugin Maintainer

Maintains the package, reviews changes, and keeps the OpenCode plugin contract stable. Needs predictable package entrypoints, concise docs, fast local validation, and tests that catch behavior regressions.

## OpenCode User

Loads the plugin in OpenCode and expects the bundled `explore` and `plan` agents plus `/init-harness-engineering` command to be discoverable and safe to run in target repositories.

## Plan Reviewer

Reads plans produced by `plan` before implementation starts. Needs concise, implementation-ready plans that name external contracts, files, validation, risks, and open decisions without generic filler.

## Future Agent

Works in this repository later and needs durable, versioned context instead of relying on chat history. Needs short entrypoints, focused docs, explicit source pointers, and mechanical checks.

## Target Repository Maintainer

Runs `/init-harness-engineering` in another repository to create or update a documentation scaffold. Needs the generated instructions to preserve real repository facts, avoid invented claims, and mark missing decisions with `TODO:`.
