# Quality Scorecard

Last reviewed: 2026-05-31

| Area  | Grade | Confidence | Known issues | Last reviewed |
| --- | --- | --- | --- | --- |
| OpenCode plugin package shape | B | High | No integration smoke test boots OpenCode against the built package. | 2026-05-31 |
| Bundled tool, agent, and command behavior | B | High | Prompt behavior is tested with sentinels, but no real OpenCode CLI smoke test exists. | 2026-05-31 |
| Documentation scaffold and guardrails | B | Medium | Scaffold docs are present; future drift depends on `docs:check` coverage. | 2026-05-31 |
| Release and CI posture | B | High | CI and release automation are configured; the first Trusted Publishing run still needs live proof. | 2026-05-31 |
| Security and reliability posture | B | Medium | Current plugin is side-effect free; future filesystem, shell, or network tools need explicit review. | 2026-05-31 |
