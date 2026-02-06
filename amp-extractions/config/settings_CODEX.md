# AMP CLI Settings Reference (CODEX, Audited)

- Source bundle: `npm-packages/0.0.1770366910-g1852ef/node_modules/@sourcegraph/amp/dist/main.js`
- Build version: `0.0.1770366910-g1852ef`
- Generated: `2026-02-06T10:15:24.179Z`
- Extraction artifact: `amp-extractions/meta/extraction-artifacts_CODEX.json`
- Source anchors:
  - `var z86={` at byte offset `6666840`
  - `properties:{"amp.url"` at byte offset `1392246`

## Summary
- CLI settings registry entries (`z86`): **40**
- VS Code `amp.*` settings entries: **36**
- Distinct runtime reads (broad static scan): **107**
- Distinct runtime reads (likely Amp settings): **39**
- Amp-relevant environment variables: **23**

## Method
- CLI registry extracted from object literal `z86`.
- VS Code settings extracted from `contributes.configuration.properties` block.
- Runtime reads extracted from static patterns `settings["..."]`, `.get("...")`, and `settings?.prop`.
- Runtime metrics are static evidence and can undercount dynamic key construction.

## CLI Registry (`z86`)
| Key | Type | Default | Visible | Runtime Reads | Description |
| --- | --- | --- | --- | --- | --- |
| `amp.agent.skipTitleGenerationIfMessageContains` | `array` | `[]` | false | 0 | List of strings that, if present in a message, will skip title generation |
| `amp.anthropic.effort` | `string` | `"high"` | false | 1 | Effort level for Anthropic models that support auto-thinking (low, medium, high, max). Higher effort means more thinking and better performance. |
| `amp.anthropic.interleavedThinking.enabled` | `boolean` | `false` | false | 0 | Enable interleaved thinking for Claude 4 models (allows reasoning between tool calls) |
| `amp.anthropic.provider` | `string` | `"anthropic"` | false | 0 | Which provider to use for Anthropic Claude inference: "anthropic" or "vertex" |
| `amp.anthropic.temperature` | `number` | `1` | false | 2 | Temperature setting for Anthropic models (0.0 = deterministic, 1.0 = creative). Note: Only takes effect when thinking is disabled. Internal use only. |
| `amp.anthropic.thinking.enabled` | `boolean` | `false` | false | 2 | Enable Claude thinking process output for debugging |
| `amp.dangerouslyAllowAll` | `boolean` | `false` | true | 4 | Disable all command confirmation prompts (agent will execute all commands without asking) |
| `amp.debugLogs` | `boolean` | `false` | false | 0 | Enable debug logging output |
| `amp.experimental.cli.nativeSecretsStorage.enabled` | `boolean` | `false` | false | 1 | Use native secret storage instead of the plain-text secrets configuration file |
| `amp.experimental.modes` | `array` | `[]` | true | 0 | Enable experimental agent modes by name. Available modes: deep |
| `amp.experimental.tools` | `array` | `[]` | false | 0 | Enable experimental tools by name |
| `amp.fuzzy.alwaysIncludePaths` | `array` | `[]` | true | 1 | Glob patterns for paths that should always be included in fuzzy file search, even if gitignored |
| `amp.gemini.thinkingLevel` | `undefined` | `(undefined)` | false | 1 | Thinking level for Gemini models (minimal, low, medium, high, or undefined) |
| `amp.git.commit.ampThread.enabled` | `boolean` | `true` | true | 1 | Enable adding Amp-Thread trailer in git commits |
| `amp.git.commit.coauthor.enabled` | `boolean` | `true` | true | 1 | Enable adding Amp as co-author in git commits |
| `amp.guardedFiles.allowlist` | `array` | `[]` | true | 1 | Array of file glob patterns that are allowed to be accessed without confirmation. Takes precedence over the built-in denylist. |
| `amp.hooks` | `array` | `[]` | false | 3 | Custom hooks for extending Amp functionality |
| `amp.internal.deepReasoningEffort` | `string` | `"medium"` | false | 5 | Reasoning effort override for GPT-5.2 Codex in deep mode (medium, high, xhigh) |
| `amp.jetbrains.skipInstall` | `boolean` | `false` | false | 1 | Skip JetBrains plugin installation |
| `amp.mcpServers` | `object` | `{"filesystem":{"command":"npx","args":["@modelcontextprotocol/server-filesystem","/path/to/allowed/dir"]}}` | true | 6 | Model Context Protocol servers to connect to for additional tools |
| `amp.network.timeout` | `number` | `30` | true | 1 | How many seconds to wait for network requests to the Amp server before timing out |
| `amp.notifications.enabled` | `boolean` | `true` | true | 1 | Enable system sound notifications when agent completes tasks |
| `amp.notifications.system.enabled` | `boolean` | `true` | true | 1 | Enable system notifications when terminal is not focused |
| `amp.permissions` | `array` | `[{"tool":"Bash","action":"ask","matches":{"cmd":["git push*","git commit*","git branch -D*","git checkout HEAD*"]}}]` | true | 6 | Permission rules for tool calls. See amp permissions --help |
| `amp.proxy` | `undefined` | `(undefined)` | true | 0 | Proxy URL used for both HTTP and HTTPS requests to the Amp server |
| `amp.showCosts` | `boolean` | `true` | true | 0 | Set to false to hide costs while working on a thread |
| `amp.skills.path` | `undefined` | `(undefined)` | true | 0 | Path to additional directories containing skills. Supports colon-separated paths (semicolon on Windows). Use ~ for home directory. |
| `amp.submitOnEnter` | `boolean` | `true` | false | 0 | Whether to submit messages on Enter (true) or require Ctrl+Enter (false) |
| `amp.systemPrompt` | `undefined` | `(undefined)` | false | 0 | Custom system prompt text to append (SDK use only) |
| `amp.terminal.animation` | `boolean` | `true` | true | 1 | Set to false to disable terminal animations (or use the equivalent NO_ANIMATION=1 env var) |
| `amp.terminal.commands.nodeSpawn.loadProfile` | `string` | `"daily"` | false | 1 | How often to load shell profile in node-spawn mode (always, daily, never) |
| `amp.terminal.theme` | `string` | `"terminal"` | true | 1 | Color theme for the CLI. Built-in: terminal, dark, light, catppuccin-mocha, solarized-dark, solarized-light, gruvbox-dark-hard, nord. Custom themes: ~/.config/amp/themes/<name>/colors.toml |
| `amp.toolbox.path` | `undefined` | `(undefined)` | true | 1 | Path to the directory containing toolbox scripts. Supports colon-separated paths. |
| `amp.tools.disable` | `array` | `["browser_navigate","builtin:edit_file"]` | true | 1 | Array of tool names to disable. Use 'builtin:toolname' to disable only the builtin tool with that name (allowing an MCP server to provide a tool by that name). |
| `amp.tools.enable` | `undefined` | `(undefined)` | true | 0 | Array of tool name patterns to enable. Supports glob patterns (e.g., 'mcp__metabase__*'). If not set, all tools are enabled. If set, only matching tools are enabled. |
| `amp.tools.inactivityTimeout` | `number` | `300` | false | 1 | How many seconds of no output to wait before canceling bash commands |
| `amp.tools.stopTimeout` | `number` | `300` | false | 2 | Timeout for stopping tools |
| `amp.updates.mode` | `string` | `"auto"` | true | 1 | Control update checking behavior: "warn" shows update notifications, "disabled" turns off checking, "auto" automatically runs update. |
| `amp.url` | `string` | `"https://ampcode.com"` | false | 3 | The Amp server URL to connect to |
| `amp.workerUrl` | `string` | `"http://localhost:8787"` | false | 0 | URL to the Cloudflare Worker for agent loop operations |

## VS Code Settings (`amp.*`)
| Key | Type | Default | Scope | Runtime Reads | Description |
| --- | --- | --- | --- | --- | --- |
| `amp.anthropic.effort` | `string` | `"high"` | `application` | 0 | Effort level for Anthropic models that support auto-thinking. Higher effort means more thinking and better performance. |
| `amp.anthropic.thinking.enabled` | `boolean` | `true` | `application` | 0 | Enable Claude's extended thinking capabilities |
| `amp.bitbucket.enterprise.connections` | `array` | `[]` | `application` | 0 | Local Bitbucket Enterprise connections for librarian tools. |
| `amp.dangerouslyAllowAll` | `boolean` | `false` | `window` | 0 | If true, never ask for confirmation when running commands |
| `amp.debug.logReview` | `boolean` | `false` | `application` | 0 | Enable debug logging for review git operations |
| `amp.debugLogs` | `boolean` | `false` | `application` | 0 | Enable debug logging in the Amp output channel |
| `amp.experimental.compaction` | `boolean,number` | `false` | `window` | 0 |  |
| `amp.experimental.modes` | `array` | `[]` | `application` | 0 | Enable experimental agent modes by name. |
| `amp.experimental.promptAutocomplete.verboseLogging` | `boolean` | `false` | `application` | 0 |  |
| `amp.experimental.reviewSubagent` | `boolean` | `false` | `window` | 0 | Enable the review subagent as a tool for use by the main agent in smart mode. |
| `amp.experimental.tools` | `array` | `[]` | `application` | 0 | Enable experimental tools by name |
| `amp.fuzzy.alwaysIncludePaths` | `array` | `[]` | `window` | 0 |  |
| `amp.git.commit.ampThread.enabled` | `boolean` | `true` | `window` | 0 | Enable adding Amp-Thread trailer in git commits |
| `amp.git.commit.coauthor.enabled` | `boolean` | `true` | `window` | 0 | Enable adding Amp as co-author in git commits |
| `amp.guardedFiles.allowlist` | `array` | `[]` | `window` | 0 | Glob patterns for files that should bypass guarded file protection. Files matching these patterns can be modified without user confirmation. |
| `amp.hooks` | `array` | `[]` | `window` | 0 | [Experimental] Hooks are event handlers that can react to specific conditions. |
| `amp.mcpPermissions` | `array` | `[]` | `application` | 0 | Permissions for Model Context Protocol (MCP) servers. Controls which MCP servers can be used. |
| `amp.mcpServers` | `object` | `(none)` | `(none)` | 0 | Model Context Protocol servers that expose tools |
| `amp.mcpTrustedServers` | `array` | `(none)` | `application` | 0 |  |
| `amp.model.sonnet` | `boolean` | `false` | `window` | 0 | (Deprecated) Use large mode instead. See https://ampcode.com/news/large-mode |
| `amp.network.timeout` | `number` | `30` | `application` | 0 | How many seconds to wait for network requests to the Amp server before timing out. Increase this value if you have a slow network connection. |
| `amp.notifications.enabled` | `boolean` | `true` | `window` | 0 | Play notification sound when done or blocked |
| `amp.permissions` | `(none)` | `[]` | `(none)` | 0 | Entries checked in sequence to configure tool permissions |
| `amp.review.separatePanel` | `boolean` | `false` | `window` | 0 | Show the review panel as a separate container that's independently draggable to a different sidebar location. |
| `amp.showCosts` | `boolean` | `true` | `application` | 0 | Show cost information for threads |
| `amp.skills.path` | `string` | `(none)` | `window` | 0 |  |
| `amp.submitOnEnter` | `boolean` | `false` | `application` | 0 |  |
| `amp.terminal.commands.nodeSpawn.loadProfile` | `string` | `"always"` | `application` | 0 | Before running commands (including MCP servers), whether to load environment variables from the user's profile (.bashrc, .zshrc, .envrc) as visible from the workspace root directory. |
| `amp.toolbox.path` | `string` | `(none)` | `window` | 0 |  |
| `amp.tools.disable` | `array` | `[]` | `(none)` | 0 |  |
| `amp.tools.inactivityTimeout` | `number` | `300` | `workspace` | 0 | How many seconds of no output to wait before canceling bash commands. |
| `amp.tools.stopTimeout` | `number` | `300` | `application` | 0 | How many seconds to wait before canceling a running tool. |
| `amp.ui.zoomLevel` | `number` | `1` | `application` | 0 | Zoom level for the Amp UI |
| `amp.url` | `string` | `(none)` | `application` | 0 | URL to the Amp server, usually https://ampcode.com/ |
| `amp.workerUrl` | `string` | `(none)` | `application` | 0 | URL to the Cloudflare Worker for agent loop operations. Defaults to http://localhost:8787 for local development. |
| `amp.workspaces` | `array` | `(none)` | `application` | 0 |  |

## Runtime-Only Candidates
These keys are likely read at runtime but are not present in `z86` (and for `amp.*` keys, not present in the VS Code properties list either).

| Presented Key | Bare Key | Read Count | In z86 | In VSCode amp.* |
| --- | --- | --- | --- | --- |
| `amp.agent.showUsageDebugInfo` | `agent.showUsageDebugInfo` | 2 | no | no |
| `amp.bitbucket.enterprise.connections` | `bitbucket.enterprise.connections` | 3 | no | no |
| `amp.console.level` | `console.level` | 1 | no | no |
| `amp.console.lock` | `console.lock` | 1 | no | no |
| `amp.experimental.autoSnapshot` | `experimental.autoSnapshot` | 3 | no | no |
| `amp.experimental.cli.commandTelemetry.enabled` | `experimental.cli.commandTelemetry.enabled` | 1 | no | no |
| `amp.experimental.compaction` | `experimental.compaction` | 1 | no | no |
| `amp.internal.cli.logViewer` | `internal.cli.logViewer` | 1 | no | no |
| `amp.internal.fireworks.directRouting` | `internal.fireworks.directRouting` | 1 | no | no |
| `amp.internal.kimi.reasoning` | `internal.kimi.reasoning` | 2 | no | no |
| `amp.internal.scaffoldCustomizationFile` | `internal.scaffoldCustomizationFile` | 1 | no | no |
| `amp.openrouter.apiKey` | `openrouter.apiKey` | 1 | no | no |

## Schema Crosswalk
### In `z86` but not in VS Code `amp.*` block
- `amp.anthropic.interleavedThinking.enabled`
- `amp.anthropic.temperature`
- `amp.internal.deepReasoningEffort`
- `amp.gemini.thinkingLevel`
- `amp.notifications.system.enabled`
- `amp.agent.skipTitleGenerationIfMessageContains`
- `amp.tools.enable`
- `amp.terminal.animation`
- `amp.terminal.theme`
- `amp.anthropic.provider`
- `amp.experimental.cli.nativeSecretsStorage.enabled`
- `amp.systemPrompt`
- `amp.jetbrains.skipInstall`
- `amp.proxy`
- `amp.updates.mode`

### In VS Code `amp.*` block but not in `z86`
- `amp.bitbucket.enterprise.connections`
- `amp.debug.logReview`
- `amp.experimental.compaction`
- `amp.experimental.promptAutocomplete.verboseLogging`
- `amp.experimental.reviewSubagent`
- `amp.mcpPermissions`
- `amp.mcpTrustedServers`
- `amp.model.sonnet`
- `amp.review.separatePanel`
- `amp.ui.zoomLevel`
- `amp.workspaces`

## Environment Variables (Amp-Relevant)
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
- `NO_ANIMATION`
- `OPENROUTER_API_KEY`
- `TOOLBOX_ACTION`

## Notes
- `z86` currently contains **40** keys in this build.
- VS Code `amp.*` properties currently contain **36** keys in this build.
- This resolves prior drift where some docs claimed 42/35 for these counts.
