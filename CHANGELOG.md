# Changelog

## [1.3.0](https://github.com/n3ziniuka5/opencode-harness-engineering/compare/v1.2.1...v1.3.0) (2026-07-15)


### Features

* switch to GPT-5.6 family models ([#18](https://github.com/n3ziniuka5/opencode-harness-engineering/issues/18)) ([99a435e](https://github.com/n3ziniuka5/opencode-harness-engineering/commit/99a435e03862580faf9ef4b21f15e0b9ddba58ba))


### Bug Fixes

* guardrail the explore agent against expensive grep/glob operations in parent directories ([#20](https://github.com/n3ziniuka5/opencode-harness-engineering/issues/20)) ([4cdb21d](https://github.com/n3ziniuka5/opencode-harness-engineering/commit/4cdb21d6f6f55e9acf92a88c1cc8a7c75b9a1a3d))
* guardrail the explore agent so that it's only used for discovery, and not for complex reasoning ([#19](https://github.com/n3ziniuka5/opencode-harness-engineering/issues/19)) ([d132293](https://github.com/n3ziniuka5/opencode-harness-engineering/commit/d1322932cfd079871cd2b676d836de6af53dd12e))

## [1.2.1](https://github.com/n3ziniuka5/opencode-harness-engineering/compare/v1.2.0...v1.2.1) (2026-06-04)


### Bug Fixes

* clarify how to handle CLAUDE.md files while initializing the docs ([#15](https://github.com/n3ziniuka5/opencode-harness-engineering/issues/15)) ([1d3152d](https://github.com/n3ziniuka5/opencode-harness-engineering/commit/1d3152da3609414f0166e0a8a17c0743d9e41280))
* set Draft agent as the default and set agent colors explicitly so they don't depend on agent definition order ([#17](https://github.com/n3ziniuka5/opencode-harness-engineering/issues/17)) ([0f6e191](https://github.com/n3ziniuka5/opencode-harness-engineering/commit/0f6e1916fa84a305b50ef4cbffe300e60e897a7c))

## [1.2.0](https://github.com/n3ziniuka5/opencode-harness-engineering/compare/v1.1.0...v1.2.0) (2026-06-03)


### Features

* draft agent discovers governing documentation for more accurate doc updates ([#13](https://github.com/n3ziniuka5/opencode-harness-engineering/issues/13)) ([6bb3700](https://github.com/n3ziniuka5/opencode-harness-engineering/commit/6bb3700660f39e22101b310050c219e9c4373525))

## [1.1.0](https://github.com/n3ziniuka5/opencode-harness-engineering/compare/v1.0.0...v1.1.0) (2026-06-03)


### Features

* spawn subsequent explore agents when follow-up from an initial pass is needed ([#10](https://github.com/n3ziniuka5/opencode-harness-engineering/issues/10)) ([99eec38](https://github.com/n3ziniuka5/opencode-harness-engineering/commit/99eec387391127c11bf50d7177f285ff4daa687e))


### Bug Fixes

* improve discovery section to explicitly mention module boundaries, testing strategy, and verification ([#11](https://github.com/n3ziniuka5/opencode-harness-engineering/issues/11)) ([4e0f938](https://github.com/n3ziniuka5/opencode-harness-engineering/commit/4e0f9385b62559a9780c5eb1d057f8b639e3e470))

## 1.0.0 (2026-05-31)


### Features

* add brainstorm and ask agents ([#6](https://github.com/n3ziniuka5/opencode-harness-engineering/issues/6)) ([4dba096](https://github.com/n3ziniuka5/opencode-harness-engineering/commit/4dba096cbdd6f4e7556d9b5066bc5a5a1bfd7d17))
* command to initialize `docs` for harness engineering ([#1](https://github.com/n3ziniuka5/opencode-harness-engineering/issues/1)) ([e16a3dd](https://github.com/n3ziniuka5/opencode-harness-engineering/commit/e16a3dd9b9ec828a30ceeb28dceef2c63a491598))
* different temperatures for agents, and top_p settings ([#5](https://github.com/n3ziniuka5/opencode-harness-engineering/issues/5)) ([9951150](https://github.com/n3ziniuka5/opencode-harness-engineering/commit/9951150f76b179b530843d2459512ac711243f34))
* explore subagent ([#4](https://github.com/n3ziniuka5/opencode-harness-engineering/issues/4)) ([951bb86](https://github.com/n3ziniuka5/opencode-harness-engineering/commit/951bb869deb799af4e4ee961b8426fdf1417b711))
* mermaid diagrams in plans and plan archival clarifications ([#2](https://github.com/n3ziniuka5/opencode-harness-engineering/issues/2)) ([10df495](https://github.com/n3ziniuka5/opencode-harness-engineering/commit/10df495141d9e333b831d061827509e7612d5965))
* output more brief plans ([35a444e](https://github.com/n3ziniuka5/opencode-harness-engineering/commit/35a444e5ece16738fe87afd181d18a4e5a421e02))
* plan agent ([b30b9f9](https://github.com/n3ziniuka5/opencode-harness-engineering/commit/b30b9f9f1f23b80e6d86e10b97f9b57e44813ae7))
* publish npm package ([#8](https://github.com/n3ziniuka5/opencode-harness-engineering/issues/8)) ([6213905](https://github.com/n3ziniuka5/opencode-harness-engineering/commit/6213905018a8a2a6dcb9eefebccb5ba2ab4e60ea))


### Bug Fixes

* stricter plan archival instructions ([#3](https://github.com/n3ziniuka5/opencode-harness-engineering/issues/3)) ([22fd466](https://github.com/n3ziniuka5/opencode-harness-engineering/commit/22fd4664a4668b9c80df09f7389a58d645b862cf))
