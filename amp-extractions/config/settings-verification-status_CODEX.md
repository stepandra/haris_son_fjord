# AMP CLI Settings Verification Status (CODEX, Audited)

- Source bundle: `npm-packages/0.0.1770366910-g1852ef/node_modules/@sourcegraph/amp/dist/main.js`
- Build version: `0.0.1770366910-g1852ef`
- Generated: `2026-02-06T10:15:24.179Z`
- Extraction artifact: `amp-extractions/meta/extraction-artifacts_CODEX.json`

## Classification Model
- `CLI-SCHEMA+READ`: key exists in `z86` and has at least one static runtime read.
- `CLI-SCHEMA-ONLY`: key exists in `z86` with no static runtime read hit.
- `VSCODE-SCHEMA+READ`: key exists in VS Code `amp.*` schema and is read by direct `amp.*` key.
- `VSCODE-SCHEMA-ONLY`: key exists in VS Code `amp.*` schema with no direct `amp.*` static read hit.
- `RUNTIME-ONLY-CANDIDATE`: likely Amp setting key read at runtime but absent from `z86`.

## Totals
- `CLI-SCHEMA+READ`: **27**
- `CLI-SCHEMA-ONLY`: **13**
- `VSCODE-SCHEMA+READ`: **0**
- `VSCODE-SCHEMA-ONLY`: **36**
- `RUNTIME-ONLY-CANDIDATE`: **12**

## CLI-SCHEMA+READ
- `amp.url` (reads: 3)
- `amp.anthropic.thinking.enabled` (reads: 2)
- `amp.anthropic.temperature` (reads: 2)
- `amp.anthropic.effort` (reads: 1)
- `amp.internal.deepReasoningEffort` (reads: 5)
- `amp.gemini.thinkingLevel` (reads: 1)
- `amp.notifications.enabled` (reads: 1)
- `amp.notifications.system.enabled` (reads: 1)
- `amp.mcpServers` (reads: 6)
- `amp.tools.disable` (reads: 1)
- `amp.tools.inactivityTimeout` (reads: 1)
- `amp.tools.stopTimeout` (reads: 2)
- `amp.network.timeout` (reads: 1)
- `amp.permissions` (reads: 6)
- `amp.guardedFiles.allowlist` (reads: 1)
- `amp.dangerouslyAllowAll` (reads: 4)
- `amp.terminal.commands.nodeSpawn.loadProfile` (reads: 1)
- `amp.terminal.animation` (reads: 1)
- `amp.terminal.theme` (reads: 1)
- `amp.hooks` (reads: 3)
- `amp.experimental.cli.nativeSecretsStorage.enabled` (reads: 1)
- `amp.fuzzy.alwaysIncludePaths` (reads: 1)
- `amp.toolbox.path` (reads: 1)
- `amp.git.commit.coauthor.enabled` (reads: 1)
- `amp.git.commit.ampThread.enabled` (reads: 1)
- `amp.jetbrains.skipInstall` (reads: 1)
- `amp.updates.mode` (reads: 1)

## CLI-SCHEMA-ONLY
- `amp.workerUrl` (reads: 0)
- `amp.anthropic.interleavedThinking.enabled` (reads: 0)
- `amp.agent.skipTitleGenerationIfMessageContains` (reads: 0)
- `amp.tools.enable` (reads: 0)
- `amp.submitOnEnter` (reads: 0)
- `amp.debugLogs` (reads: 0)
- `amp.anthropic.provider` (reads: 0)
- `amp.experimental.tools` (reads: 0)
- `amp.experimental.modes` (reads: 0)
- `amp.systemPrompt` (reads: 0)
- `amp.skills.path` (reads: 0)
- `amp.proxy` (reads: 0)
- `amp.showCosts` (reads: 0)

## VSCODE-SCHEMA+READ
- (none)

## VSCODE-SCHEMA-ONLY
- `amp.anthropic.effort` (reads: 0)
- `amp.anthropic.thinking.enabled` (reads: 0)
- `amp.bitbucket.enterprise.connections` (reads: 0)
- `amp.dangerouslyAllowAll` (reads: 0)
- `amp.debug.logReview` (reads: 0)
- `amp.debugLogs` (reads: 0)
- `amp.experimental.compaction` (reads: 0)
- `amp.experimental.modes` (reads: 0)
- `amp.experimental.promptAutocomplete.verboseLogging` (reads: 0)
- `amp.experimental.reviewSubagent` (reads: 0)
- `amp.experimental.tools` (reads: 0)
- `amp.fuzzy.alwaysIncludePaths` (reads: 0)
- `amp.git.commit.ampThread.enabled` (reads: 0)
- `amp.git.commit.coauthor.enabled` (reads: 0)
- `amp.guardedFiles.allowlist` (reads: 0)
- `amp.hooks` (reads: 0)
- `amp.mcpPermissions` (reads: 0)
- `amp.mcpServers` (reads: 0)
- `amp.mcpTrustedServers` (reads: 0)
- `amp.model.sonnet` (reads: 0)
- `amp.network.timeout` (reads: 0)
- `amp.notifications.enabled` (reads: 0)
- `amp.permissions` (reads: 0)
- `amp.review.separatePanel` (reads: 0)
- `amp.showCosts` (reads: 0)
- `amp.skills.path` (reads: 0)
- `amp.submitOnEnter` (reads: 0)
- `amp.terminal.commands.nodeSpawn.loadProfile` (reads: 0)
- `amp.toolbox.path` (reads: 0)
- `amp.tools.disable` (reads: 0)
- `amp.tools.inactivityTimeout` (reads: 0)
- `amp.tools.stopTimeout` (reads: 0)
- `amp.ui.zoomLevel` (reads: 0)
- `amp.url` (reads: 0)
- `amp.workerUrl` (reads: 0)
- `amp.workspaces` (reads: 0)

## RUNTIME-ONLY-CANDIDATE
- `amp.agent.showUsageDebugInfo` (reads: 2)
- `amp.bitbucket.enterprise.connections` (reads: 3)
- `amp.console.level` (reads: 1)
- `amp.console.lock` (reads: 1)
- `amp.experimental.autoSnapshot` (reads: 3)
- `amp.experimental.cli.commandTelemetry.enabled` (reads: 1)
- `amp.experimental.compaction` (reads: 1)
- `amp.internal.cli.logViewer` (reads: 1)
- `amp.internal.fireworks.directRouting` (reads: 1)
- `amp.internal.kimi.reasoning` (reads: 2)
- `amp.internal.scaffoldCustomizationFile` (reads: 1)
- `amp.openrouter.apiKey` (reads: 1)

## Caveat
- This is static analysis evidence. Dynamic key construction and indirect config plumbing can hide real runtime usage.
