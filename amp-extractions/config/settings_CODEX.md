# AMP CLI Settings Reference (CODEX)

- Source bundle: `npm-packages/0.0.1770366910-g1852ef/node_modules/@sourcegraph/amp/dist/main.js`
- Build version: `0.0.1770366910-g1852ef`
- Build timestamp literal in bundle: `2026-02-06T08:40:14.971Z`
- Generated at: `2026-02-06T09:30:38.714Z`

## Summary
- Schema settings discovered: **36**
- Schema settings with at least one static runtime read: **15**
- Runtime-only keys (read in code but not in schema block): **20**
- AMP-related environment variables discovered: **21**

## Settings Table
| Key | Type | Default | Scope | Runtime Read Count |
| --- | --- | --- | --- | --- |
| `amp.anthropic.effort` | `string` | `high` | `application` | `1` |
| `amp.anthropic.thinking.enabled` | `boolean` | `true` | `application` | `2` |
| `amp.bitbucket.enterprise.connections` | `array` | `[]` | `application` | `3` |
| `amp.dangerouslyAllowAll` | `boolean` | `false` | `window` | `0` |
| `amp.debug.logReview` | `boolean` | `false` | `application` | `0` |
| `amp.debugLogs` | `boolean` | `false` | `application` | `0` |
| `amp.experimental.compaction` | `boolean | number` | `false` | `window` | `1` |
| `amp.experimental.modes` | `array` | `[]` | `application` | `0` |
| `amp.experimental.promptAutocomplete.verboseLogging` | `boolean` | `false` | `application` | `0` |
| `amp.experimental.reviewSubagent` | `boolean` | `false` | `window` | `0` |
| `amp.experimental.tools` | `array` | `[]` | `application` | `0` |
| `amp.fuzzy.alwaysIncludePaths` | `array` | `[]` | `window` | `1` |
| `amp.git.commit.ampThread.enabled` | `boolean` | `true` | `window` | `1` |
| `amp.git.commit.coauthor.enabled` | `boolean` | `true` | `window` | `1` |
| `amp.guardedFiles.allowlist` | `array` | `[]` | `window` | `1` |
| `amp.hooks` | `array` | `[]` | `window` | `0` |
| `amp.mcpPermissions` | `array` | `[]` | `application` | `0` |
| `amp.mcpServers` | `object` | (none) | `(none)` | `0` |
| `amp.mcpTrustedServers` | `array` | (none) | `application` | `0` |
| `amp.model.sonnet` | `boolean` | `false` | `window` | `0` |
| `amp.network.timeout` | `number` | `30` | `application` | `1` |
| `amp.notifications.enabled` | `boolean` | `true` | `window` | `1` |
| `amp.permissions` | `(none)` | `[]` | `(none)` | `0` |
| `amp.review.separatePanel` | `boolean` | `false` | `window` | `0` |
| `amp.showCosts` | `boolean` | `true` | `application` | `0` |
| `amp.skills.path` | `string` | (none) | `window` | `0` |
| `amp.submitOnEnter` | `boolean` | `false` | `application` | `0` |
| `amp.terminal.commands.nodeSpawn.loadProfile` | `string` | `always` | `application` | `1` |
| `amp.toolbox.path` | `string` | (none) | `window` | `1` |
| `amp.tools.disable` | `array` | `[]` | `(none)` | `2` |
| `amp.tools.inactivityTimeout` | `number` | `300` | `workspace` | `1` |
| `amp.tools.stopTimeout` | `number` | `300` | `application` | `2` |
| `amp.ui.zoomLevel` | `number` | `1` | `application` | `0` |
| `amp.url` | `string` | (none) | `application` | `0` |
| `amp.workerUrl` | `string` | (none) | `application` | `0` |
| `amp.workspaces` | `array` | (none) | `application` | `0` |

## Runtime-Only Keys (Not In Schema Block)
| Key | Read Count |
| --- | --- |
| `amp.agent.showUsageDebugInfo` | `2` |
| `amp.agent.skipTitleGenerationIfMessageContains` | `1` |
| `amp.anthropic.temperature` | `2` |
| `amp.console.level` | `1` |
| `amp.console.lock` | `1` |
| `amp.experimental.autoSnapshot` | `3` |
| `amp.experimental.cli.commandTelemetry.enabled` | `1` |
| `amp.gemini.thinkingLevel` | `1` |
| `amp.internal.cli.logViewer` | `1` |
| `amp.internal.deepReasoningEffort` | `5` |
| `amp.internal.fireworks.directRouting` | `1` |
| `amp.internal.kimi.reasoning` | `2` |
| `amp.internal.scaffoldCustomizationFile` | `1` |
| `amp.jetbrains.skipInstall` | `1` |
| `amp.notifications.system.enabled` | `1` |
| `amp.openrouter.apiKey` | `1` |
| `amp.terminal.animation` | `1` |
| `amp.terminal.theme` | `1` |
| `amp.tools.enable` | `1` |
| `amp.updates.mode` | `1` |

## AMP Environment Variables
- `AMP_API_KEY`
- `AMP_CLI_STDOUT_DEBUG`
- `AMP_DEBUG`
- `AMP_ENABLE_TRACING`
- `AMP_HEADLESS_OAUTH`
- `AMP_HOME`
- `AMP_INSPECTOR_ENABLED`
- `AMP_LOG_FILE`
- `AMP_LOG_LEVEL`
- `AMP_PWD`
- `AMP_RESUME_OTHER_USER_THREADS_INSECURE`
- `AMP_RIPGREP_PATH`
- `AMP_SDK_VERSION`
- `AMP_SETTINGS_FILE`
- `AMP_SKIP_UPDATE_CHECK`
- `AMP_TEST_UPDATE_STATUS`
- `AMP_TOOLBOX`
- `AMP_URL`
- `AMP_VERSION`
- `AMP_WORKER_URL`
- `OPENROUTER_API_KEY`

## Notes
- Runtime-read counts are static string-match evidence (`settings["..."]` and `.get("...")`) and may undercount dynamic access patterns.
- The schema block currently exposes `amp.anthropic.thinking.enabled` with default `true` and includes both `amp.tools.inactivityTimeout` and `amp.tools.stopTimeout` defaults of `300`.