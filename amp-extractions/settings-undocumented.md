# Undocumented and Internal Amp Settings

- Build: `0.0.1777185893-gae6d40`
- Source bundle: `npm-packages/0.0.1777185893-gae6d40/node_modules/@sourcegraph/amp/dist/main.js`
- Public comparison source: `https://ampcode.com/manual`

This file is the simple settings guide: it lists settings found in the bundle that are not documented in the public Owner's Manual. Use `config/settings.md` for the full raw registry table and `config/settings-verification-status.md` for extraction confidence.

## Summary

- Public manual settings matched: **18**
- Bundle settings not documented in the public manual: **34**
- Registry-backed undocumented settings: **25**
- Runtime-only undocumented candidates: **9**

## Undocumented Settings

| Setting | Source | Visible | Default | Static Reads | Description |
| --- | --- | --- | --- | --- | --- |
| `amp.agent.showUsageDebugInfo` | runtime-only | false | `(unknown)` | 2 | Read at runtime but absent from the extracted settings registry. |
| `amp.agent.skipTitleGenerationIfMessageContains` | registry | false | `[]` | 0 | List of strings that, if present in a message, will skip title generation |
| `amp.anthropic.interleavedThinking.enabled` | registry | false | `false` | 0 | Enable interleaved thinking for Claude 4 models (allows reasoning between tool calls) |
| `amp.anthropic.provider` | registry | false | `"anthropic"` | 0 | Which provider to use for Anthropic Claude inference: "anthropic" or "vertex" |
| `amp.anthropic.speed` | registry | false | `(undefined)` | 5 | Fast speed toggle for smart mode (Anthropic fast mode) |
| `amp.anthropic.temperature` | registry | false | `1` | 2 | Temperature setting for Anthropic models (0.0 = deterministic, 1.0 = creative). Note: Only takes effect when thinking is disabled. Internal use only. |
| `amp.console.level` | runtime-only | false | `(unknown)` | 1 | Read at runtime but absent from the extracted settings registry. |
| `amp.console.lock` | runtime-only | false | `(unknown)` | 1 | Read at runtime but absent from the extracted settings registry. |
| `amp.dangerouslyAllowAll` | registry | true | `false` | 3 | Disable all command confirmation prompts (agent will execute all commands without asking) |
| `amp.experimental.cli.commandTelemetry.enabled` | runtime-only | false | `(unknown)` | 1 | Read at runtime but absent from the extracted settings registry. |
| `amp.experimental.cli.nativeSecretsStorage.enabled` | registry | false | `false` | 1 | Use native secret storage instead of the plain-text secrets configuration file |
| `amp.experimental.modes` | registry | true | `[]` | 0 | Enable experimental agent modes by name. Available modes: deep |
| `amp.experimental.tools` | registry | false | `[]` | 0 | Enable experimental tools by name |
| `amp.gemini.thinkingLevel` | registry | false | `(undefined)` | 1 | Thinking level for Gemini models (minimal, low, medium, high, or undefined) |
| `amp.guardedFiles.allowlist` | registry | true | `[]` | 1 | Array of file glob patterns that are allowed to be accessed without confirmation. Takes precedence over the built-in denylist. |
| `amp.hooks` | registry | false | `[]` | 3 | Custom hooks for extending Amp functionality |
| `amp.internal.cli.showSkillsCountInPromptBar` | runtime-only | false | `(unknown)` | 3 | Read at runtime but absent from the extracted settings registry. |
| `amp.internal.fireworks.directRouting` | runtime-only | false | `(unknown)` | 1 | Read at runtime but absent from the extracted settings registry. |
| `amp.internal.kimi.reasoning` | runtime-only | false | `(unknown)` | 2 | Read at runtime but absent from the extracted settings registry. |
| `amp.internal.scaffoldCustomizationFile` | runtime-only | false | `(unknown)` | 1 | Read at runtime but absent from the extracted settings registry. |
| `amp.jetbrains.skipInstall` | registry | false | `false` | 1 | Skip JetBrains plugin installation |
| `amp.network.timeout` | registry | true | `30` | 1 | How many seconds to wait for network requests to the Amp server before timing out |
| `amp.notifications.system.enabled` | registry | true | `true` | 2 | Enable system notifications when terminal is not focused |
| `amp.openai.speed` | registry | false | `(undefined)` | 7 | Fast speed toggle for deep/internal modes (OpenAI priority tier) |
| `amp.openrouter.apiKey` | runtime-only | false | `(unknown)` | 1 | Read at runtime but absent from the extracted settings registry. |
| `amp.proxy` | registry | true | `(undefined)` | 1 | Proxy URL used for both HTTP and HTTPS requests to the Amp server |
| `amp.submitOnEnter` | registry | false | `true` | 0 | Whether to submit messages on Enter (true) or require Ctrl+Enter (false) |
| `amp.systemPrompt` | registry | false | `(undefined)` | 0 | Custom system prompt text to append (SDK use only) |
| `amp.terminal.animation` | registry | true | `true` | 1 | Set to false to disable terminal animations (or use the equivalent NO_ANIMATION=1 env var) |
| `amp.terminal.theme` | registry | true | `"terminal"` | 2 | Color theme for the CLI. Built-in: terminal, dark, light, catppuccin-mocha, solarized-dark, solarized-light, gruvbox-dark-hard, nord. Custom themes: ~/.config/amp/themes/<name>/colors.toml |
| `amp.toolbox.path` | registry | true | `(undefined)` | 1 | Path to the directory containing toolbox scripts. Supports colon-separated paths. |
| `amp.tools.enable` | registry | true | `(undefined)` | 0 | Array of tool name patterns to enable. Supports glob patterns (e.g., 'mcp__metabase__*'). If not set, all tools are enabled. If set, only matching tools are enabled. |
| `amp.tools.inactivityTimeout` | registry | false | `300` | 1 | How many seconds of no output to wait before canceling bash commands |
| `amp.url` | registry | false | `"https://ampcode.com"` | 4 | The Amp server URL to connect to |

## Publicly Documented Settings Found in Bundle

| Setting | Source | Visible | Default | Static Reads |
| --- | --- | --- | --- | --- |
| `amp.agent.deepReasoningEffort` | registry | true | `"high"` | 0 |
| `amp.anthropic.effort` | registry | false | `"high"` | 0 |
| `amp.anthropic.thinking.enabled` | registry | false | `false` | 1 |
| `amp.bitbucketToken` | registry | true | `(undefined)` | 0 |
| `amp.defaultVisibility` | registry | true | `{"github.com/sourcegraph/amp":"workspace"}` | 2 |
| `amp.fuzzy.alwaysIncludePaths` | registry | true | `[]` | 1 |
| `amp.git.commit.ampThread.enabled` | registry | true | `true` | 1 |
| `amp.git.commit.coauthor.enabled` | registry | true | `true` | 1 |
| `amp.mcpServers` | registry | true | `{"filesystem":{"command":"npx","args":["@modelcontextprotocol/server-filesystem","/path/to/allowed/dir"]}}` | 6 |
| `amp.notifications.enabled` | registry | true | `true` | 2 |
| `amp.permissions` | registry | true | `[{"tool":"Bash","action":"ask","matches":{"cmd":["git push*","git commit*","git branch -D*","git checkout HEAD*"]}}]` | 6 |
| `amp.showCosts` | registry | true | `true` | 0 |
| `amp.skills.disableClaudeCodeSkills` | registry | true | `false` | 0 |
| `amp.skills.path` | registry | true | `(undefined)` | 0 |
| `amp.terminal.commands.nodeSpawn.loadProfile` | registry | false | `"daily"` | 1 |
| `amp.tools.disable` | registry | true | `["browser_navigate","builtin:edit_file"]` | 1 |
| `amp.tools.stopTimeout` | registry | false | `300` | 2 |
| `amp.updates.mode` | registry | true | `"auto"` | 1 |
