# AMP CLI Settings Verification Status (Audited)

- Source bundle: `npm-packages/0.0.1777185893-gae6d40/node_modules/@sourcegraph/amp/dist/main.js`
- Build version: `0.0.1777185893-gae6d40`
- Generated: `2026-04-26T07:37:19.914Z`
- Extraction artifact: `amp-extractions/meta/extraction-artifacts.json`

## Classification Model
- `CLI-SCHEMA+READ`: key exists in `z86` and has at least one static runtime read.
- `CLI-SCHEMA-ONLY`: key exists in `z86` with no static runtime read hit.
- `RUNTIME-ONLY-CANDIDATE`: likely Amp setting key read at runtime but absent from `z86`.
- No VS Code extension settings contribution block was found in this CLI bundle, so verification is based on the CLI registry and runtime reads.

## Totals
- `CLI-SCHEMA+READ`: **29**
- `CLI-SCHEMA-ONLY`: **14**
- `RUNTIME-ONLY-CANDIDATE`: **9**

## CLI-SCHEMA+READ
- `amp.anthropic.speed` (reads: 5)
- `amp.anthropic.temperature` (reads: 2)
- `amp.anthropic.thinking.enabled` (reads: 1)
- `amp.dangerouslyAllowAll` (reads: 3)
- `amp.defaultVisibility` (reads: 2)
- `amp.experimental.cli.nativeSecretsStorage.enabled` (reads: 1)
- `amp.fuzzy.alwaysIncludePaths` (reads: 1)
- `amp.gemini.thinkingLevel` (reads: 1)
- `amp.git.commit.ampThread.enabled` (reads: 1)
- `amp.git.commit.coauthor.enabled` (reads: 1)
- `amp.guardedFiles.allowlist` (reads: 1)
- `amp.hooks` (reads: 3)
- `amp.jetbrains.skipInstall` (reads: 1)
- `amp.mcpServers` (reads: 6)
- `amp.network.timeout` (reads: 1)
- `amp.notifications.enabled` (reads: 2)
- `amp.notifications.system.enabled` (reads: 2)
- `amp.openai.speed` (reads: 7)
- `amp.permissions` (reads: 6)
- `amp.proxy` (reads: 1)
- `amp.terminal.animation` (reads: 1)
- `amp.terminal.commands.nodeSpawn.loadProfile` (reads: 1)
- `amp.terminal.theme` (reads: 2)
- `amp.toolbox.path` (reads: 1)
- `amp.tools.disable` (reads: 1)
- `amp.tools.inactivityTimeout` (reads: 1)
- `amp.tools.stopTimeout` (reads: 2)
- `amp.updates.mode` (reads: 1)
- `amp.url` (reads: 4)

## CLI-SCHEMA-ONLY
- `amp.agent.deepReasoningEffort` (reads: 0)
- `amp.agent.skipTitleGenerationIfMessageContains` (reads: 0)
- `amp.anthropic.effort` (reads: 0)
- `amp.anthropic.interleavedThinking.enabled` (reads: 0)
- `amp.anthropic.provider` (reads: 0)
- `amp.bitbucketToken` (reads: 0)
- `amp.experimental.modes` (reads: 0)
- `amp.experimental.tools` (reads: 0)
- `amp.showCosts` (reads: 0)
- `amp.skills.disableClaudeCodeSkills` (reads: 0)
- `amp.skills.path` (reads: 0)
- `amp.submitOnEnter` (reads: 0)
- `amp.systemPrompt` (reads: 0)
- `amp.tools.enable` (reads: 0)

## RUNTIME-ONLY-CANDIDATE
- `amp.agent.showUsageDebugInfo` (reads: 2)
- `amp.console.level` (reads: 1)
- `amp.console.lock` (reads: 1)
- `amp.experimental.cli.commandTelemetry.enabled` (reads: 1)
- `amp.internal.cli.showSkillsCountInPromptBar` (reads: 3)
- `amp.internal.fireworks.directRouting` (reads: 1)
- `amp.internal.kimi.reasoning` (reads: 2)
- `amp.internal.scaffoldCustomizationFile` (reads: 1)
- `amp.openrouter.apiKey` (reads: 1)

## Caveat
- This is static analysis evidence. Dynamic key construction and indirect config plumbing can hide real runtime usage.
