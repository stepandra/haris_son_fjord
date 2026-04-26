# AMP CLI Settings Reference (Audited)

- Source bundle: `npm-packages/0.0.1777185893-gae6d40/node_modules/@sourcegraph/amp/dist/main.js`
- Build version: `0.0.1777185893-gae6d40`
- Generated: `2026-04-26T07:37:19.914Z`
- Extraction artifact: `amp-extractions/meta/extraction-artifacts.json`
- Source anchors:
  - settings registry object at byte offset `6470000`

## Summary
- CLI settings registry entries (`z86`): **43**
- Distinct runtime reads (broad static scan): **123**
- Distinct runtime reads (likely Amp settings): **38**
- Amp-relevant environment variables: **25**

## Method
- CLI registry extracted from object literal `z86`.
- Runtime reads extracted from static patterns `settings["..."]`, `.get("...")`, and `settings?.prop`.
- Runtime metrics are static evidence and can undercount dynamic key construction.
- No VS Code extension `contributes.configuration.properties` settings block was found in this CLI bundle.

## CLI Registry (`z86`)
| Key | Type | Default | Visible | Runtime Reads | Description |
| --- | --- | --- | --- | --- | --- |
| `amp.agent.deepReasoningEffort` | `string` | `"high"` | true | 0 | Default reasoning effort for new deep-mode threads (medium, high, xhigh). |
| `amp.agent.skipTitleGenerationIfMessageContains` | `array` | `[]` | false | 0 | List of strings that, if present in a message, will skip title generation |
| `amp.anthropic.effort` | `string` | `"high"` | false | 0 | Effort level for Anthropic models that support auto-thinking (low, medium, high, xhigh, max). Higher effort means more thinking and better performance. |
| `amp.anthropic.interleavedThinking.enabled` | `boolean` | `false` | false | 0 | Enable interleaved thinking for Claude 4 models (allows reasoning between tool calls) |
| `amp.anthropic.provider` | `string` | `"anthropic"` | false | 0 | Which provider to use for Anthropic Claude inference: "anthropic" or "vertex" |
| `amp.anthropic.speed` | `undefined` | `(undefined)` | false | 5 | Fast speed toggle for smart mode (Anthropic fast mode) |
| `amp.anthropic.temperature` | `number` | `1` | false | 2 | Temperature setting for Anthropic models (0.0 = deterministic, 1.0 = creative). Note: Only takes effect when thinking is disabled. Internal use only. |
| `amp.anthropic.thinking.enabled` | `boolean` | `false` | false | 1 | Enable Claude thinking process output for debugging |
| `amp.bitbucketToken` | `undefined` | `(undefined)` | true | 0 | Personal access token for Bitbucket Enterprise. Used with a workspace-level Bitbucket connection configured by an admin. |
| `amp.dangerouslyAllowAll` | `boolean` | `false` | true | 3 | Disable all command confirmation prompts (agent will execute all commands without asking) |
| `amp.defaultVisibility` | `object` | `{"github.com/sourcegraph/amp":"workspace"}` | true | 2 | Define default thread visibility per repository origin using mappings like "github.com/org/repo": "workspace". Values: private, public, workspace, group. |
| `amp.experimental.cli.nativeSecretsStorage.enabled` | `boolean` | `false` | false | 1 | Use native secret storage instead of the plain-text secrets configuration file |
| `amp.experimental.modes` | `array` | `[]` | true | 0 | Enable experimental agent modes by name. Available modes: deep |
| `amp.experimental.tools` | `array` | `[]` | false | 0 | Enable experimental tools by name |
| `amp.fuzzy.alwaysIncludePaths` | `array` | `[]` | true | 1 | Glob patterns for paths that should always be included in fuzzy file search, even if gitignored |
| `amp.gemini.thinkingLevel` | `undefined` | `(undefined)` | false | 1 | Thinking level for Gemini models (minimal, low, medium, high, or undefined) |
| `amp.git.commit.ampThread.enabled` | `boolean` | `true` | true | 1 | Enable adding Amp-Thread trailer in git commits |
| `amp.git.commit.coauthor.enabled` | `boolean` | `true` | true | 1 | Enable adding Amp as co-author in git commits |
| `amp.guardedFiles.allowlist` | `array` | `[]` | true | 1 | Array of file glob patterns that are allowed to be accessed without confirmation. Takes precedence over the built-in denylist. |
| `amp.hooks` | `array` | `[]` | false | 3 | Custom hooks for extending Amp functionality |
| `amp.jetbrains.skipInstall` | `boolean` | `false` | false | 1 | Skip JetBrains plugin installation |
| `amp.mcpServers` | `object` | `{"filesystem":{"command":"npx","args":["@modelcontextprotocol/server-filesystem","/path/to/allowed/dir"]}}` | true | 6 | Model Context Protocol servers to connect to for additional tools |
| `amp.network.timeout` | `number` | `30` | true | 1 | How many seconds to wait for network requests to the Amp server before timing out |
| `amp.notifications.enabled` | `boolean` | `true` | true | 2 | Enable notification alerts when the agent completes tasks. Over SSH, this sends a terminal bell. |
| `amp.notifications.system.enabled` | `boolean` | `true` | true | 2 | Enable system notifications when terminal is not focused |
| `amp.openai.speed` | `undefined` | `(undefined)` | false | 7 | Fast speed toggle for deep/internal modes (OpenAI priority tier) |
| `amp.permissions` | `array` | `[{"tool":"Bash","action":"ask","matches":{"cmd":["git push*","git commit*","git branch -D*","git checkout HEAD*"]}}]` | true | 6 | Permission rules for tool calls. See amp permissions --help |
| `amp.proxy` | `undefined` | `(undefined)` | true | 1 | Proxy URL used for both HTTP and HTTPS requests to the Amp server |
| `amp.showCosts` | `boolean` | `true` | true | 0 | Set to false to hide costs while working on a thread |
| `amp.skills.disableClaudeCodeSkills` | `boolean` | `false` | true | 0 | Disable loading skills from Claude Code directories (.claude/skills/, ~/.claude/skills/, ~/.claude/plugins/cache/). Amp-native skill directories are not affected. |
| `amp.skills.path` | `undefined` | `(undefined)` | true | 0 | Path to additional directories containing skills. Supports colon-separated paths (semicolon on Windows). Use ~ for home directory. |
| `amp.submitOnEnter` | `boolean` | `true` | false | 0 | Whether to submit messages on Enter (true) or require Ctrl+Enter (false) |
| `amp.systemPrompt` | `undefined` | `(undefined)` | false | 0 | Custom system prompt text to append (SDK use only) |
| `amp.terminal.animation` | `boolean` | `true` | true | 1 | Set to false to disable terminal animations (or use the equivalent NO_ANIMATION=1 env var) |
| `amp.terminal.commands.nodeSpawn.loadProfile` | `string` | `"daily"` | false | 1 | How often to load shell profile in node-spawn mode (always, daily, never) |
| `amp.terminal.theme` | `string` | `"terminal"` | true | 2 | Color theme for the CLI. Built-in: terminal, dark, light, catppuccin-mocha, solarized-dark, solarized-light, gruvbox-dark-hard, nord. Custom themes: ~/.config/amp/themes/<name>/colors.toml |
| `amp.toolbox.path` | `undefined` | `(undefined)` | true | 1 | Path to the directory containing toolbox scripts. Supports colon-separated paths. |
| `amp.tools.disable` | `array` | `["browser_navigate","builtin:edit_file"]` | true | 1 | Array of tool names to disable. Use 'builtin:toolname' to disable only the builtin tool with that name (allowing an MCP server to provide a tool by that name). |
| `amp.tools.enable` | `undefined` | `(undefined)` | true | 0 | Array of tool name patterns to enable. Supports glob patterns (e.g., 'mcp__metabase__*'). If not set, all tools are enabled. If set, only matching tools are enabled. |
| `amp.tools.inactivityTimeout` | `number` | `300` | false | 1 | How many seconds of no output to wait before canceling bash commands |
| `amp.tools.stopTimeout` | `number` | `300` | false | 2 | Timeout for stopping tools |
| `amp.updates.mode` | `string` | `"auto"` | true | 1 | Control update checking behavior: "warn" shows update notifications, "disabled" turns off checking, "auto" automatically runs update. |
| `amp.url` | `string` | `"https://ampcode.com"` | false | 4 | The Amp server URL to connect to |

## Runtime-Only Candidates
These keys are likely read at runtime but are not present in `z86`.

| Presented Key | Bare Key | Read Count | In z86 |
| --- | --- | --- | --- |
| `amp.agent.showUsageDebugInfo` | `agent.showUsageDebugInfo` | 2 | no |
| `amp.console.level` | `console.level` | 1 | no |
| `amp.console.lock` | `console.lock` | 1 | no |
| `amp.experimental.cli.commandTelemetry.enabled` | `experimental.cli.commandTelemetry.enabled` | 1 | no |
| `amp.internal.cli.showSkillsCountInPromptBar` | `internal.cli.showSkillsCountInPromptBar` | 3 | no |
| `amp.internal.fireworks.directRouting` | `internal.fireworks.directRouting` | 1 | no |
| `amp.internal.kimi.reasoning` | `internal.kimi.reasoning` | 2 | no |
| `amp.internal.scaffoldCustomizationFile` | `internal.scaffoldCustomizationFile` | 1 | no |
| `amp.openrouter.apiKey` | `openrouter.apiKey` | 1 | no |

## Environment Variables (Amp-Relevant)
- `AMP_API_KEY`
- `AMP_CLI_STDOUT_DEBUG`
- `AMP_DEBUG`
- `AMP_DEBUG_THREAD_VIEW`
- `AMP_DISABLE_AMP_COAUTHOR_TRAILER`
- `AMP_ENABLE_TRACING`
- `AMP_EXECUTOR`
- `AMP_HEADLESS_OAUTH`
- `AMP_HOME`
- `AMP_LOG_FILE`
- `AMP_LOG_LEVEL`
- `AMP_MAX_LOG_FILE_SIZE`
- `AMP_PWD`
- `AMP_RESUME_OTHER_USER_THREADS_INSECURE`
- `AMP_RIPGREP_PATH`
- `AMP_SDK_VERSION`
- `AMP_SETTINGS_FILE`
- `AMP_SKIP_UPDATE_CHECK`
- `AMP_TOOLBOX`
- `AMP_URL`
- `AMP_USE_NATIVE_WEBSOCKET`
- `AMP_VERSION`
- `NO_ANIMATION`
- `OPENROUTER_API_KEY`
- `TOOLBOX_ACTION`

## Notes
- The CLI settings registry currently contains **43** keys in this build.
- IDE integration still exists in Amp, but this CLI bundle does not include a VS Code extension settings contribution schema.
