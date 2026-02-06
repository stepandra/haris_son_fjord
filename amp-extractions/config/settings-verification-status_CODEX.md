# AMP CLI Settings Verification Status (CODEX)

- Source bundle: `npm-packages/0.0.1770366910-g1852ef/node_modules/@sourcegraph/amp/dist/main.js`
- Build version: `0.0.1770366910-g1852ef`
- Method: static schema extraction + static runtime-read scan (`settings["..."]`, `.get("...")`)
- Generated at: `2026-02-06T09:30:38.714Z`

## Status Model
- `SCHEMA+READ`: present in the schema block and read at least once in code.
- `SCHEMA-ONLY`: present in schema block but no direct static read found.
- `READ-ONLY`: read in code but not present in schema block.

## Totals
- `SCHEMA+READ`: 15
- `SCHEMA-ONLY`: 21
- `READ-ONLY`: 20

## SCHEMA+READ (15)
- `amp.anthropic.effort`
- `amp.anthropic.thinking.enabled`
- `amp.bitbucket.enterprise.connections`
- `amp.experimental.compaction`
- `amp.fuzzy.alwaysIncludePaths`
- `amp.git.commit.ampThread.enabled`
- `amp.git.commit.coauthor.enabled`
- `amp.guardedFiles.allowlist`
- `amp.network.timeout`
- `amp.notifications.enabled`
- `amp.terminal.commands.nodeSpawn.loadProfile`
- `amp.toolbox.path`
- `amp.tools.disable`
- `amp.tools.inactivityTimeout`
- `amp.tools.stopTimeout`

## SCHEMA-ONLY (21)
- `amp.dangerouslyAllowAll`
- `amp.debug.logReview`
- `amp.debugLogs`
- `amp.experimental.modes`
- `amp.experimental.promptAutocomplete.verboseLogging`
- `amp.experimental.reviewSubagent`
- `amp.experimental.tools`
- `amp.hooks`
- `amp.mcpPermissions`
- `amp.mcpServers`
- `amp.mcpTrustedServers`
- `amp.model.sonnet`
- `amp.permissions`
- `amp.review.separatePanel`
- `amp.showCosts`
- `amp.skills.path`
- `amp.submitOnEnter`
- `amp.ui.zoomLevel`
- `amp.url`
- `amp.workerUrl`
- `amp.workspaces`

## READ-ONLY (20)
- `amp.agent.showUsageDebugInfo`
- `amp.agent.skipTitleGenerationIfMessageContains`
- `amp.anthropic.temperature`
- `amp.console.level`
- `amp.console.lock`
- `amp.experimental.autoSnapshot`
- `amp.experimental.cli.commandTelemetry.enabled`
- `amp.gemini.thinkingLevel`
- `amp.internal.cli.logViewer`
- `amp.internal.deepReasoningEffort`
- `amp.internal.fireworks.directRouting`
- `amp.internal.kimi.reasoning`
- `amp.internal.scaffoldCustomizationFile`
- `amp.jetbrains.skipInstall`
- `amp.notifications.system.enabled`
- `amp.openrouter.apiKey`
- `amp.terminal.animation`
- `amp.terminal.theme`
- `amp.tools.enable`
- `amp.updates.mode`

## Caveat
This classification is static analysis only. A key can still be active through indirect access patterns even if it appears in `SCHEMA-ONLY`.
