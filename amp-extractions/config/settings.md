# AMP CLI Settings Reference

**Version:** 0.0.1770366910-g1852ef
**Source:** `node_modules/@sourcegraph/amp/dist/main.js`
**Settings Registry Variable:** `z86` (line 7713)
**Last Updated:** 2026-02-06
**Analysis Method:** Extraction from minified main.js bundle

---

## Table of Contents

1. [Overview](#overview)
2. [CLI Settings Registry (z86)](#cli-settings-registry-z86)
3. [VS Code Extension Settings](#vs-code-extension-settings)
4. [Runtime-Only Settings](#runtime-only-settings)
5. [Deprecated / Removed Settings](#deprecated--removed-settings)
6. [Environment Variables](#environment-variables)
7. [Changes from Previous Version (0.0.1766908883-g25743d)](#changes-from-previous-version-00017669088830-g25743d)
8. [Summary Statistics](#summary-statistics)

---

## Overview

This document provides a comprehensive reference of ALL settings in Amp CLI version 0.0.1770366910-g1852ef. Settings are organized into four categories:

- **CLI Settings Registry (z86)**: Settings formally defined in the CLI settings registry object. All use the `amp.` prefix when accessed by users (e.g., `amp.url`).
- **VS Code Extension Settings**: Settings defined in the VS Code extension's `package.json` contributes.configuration section. Some overlap with CLI registry settings but may have different defaults or additional metadata.
- **Runtime-Only Settings**: Settings accessed at runtime via `settings["key"]` or `configService.get("key")` but not present in the main CLI registry.
- **Environment Variables**: `AMP_*` and other relevant environment variables.

### Configuration File

Settings are stored in a JSON or JSONC file, typically at:
- `~/.amp/settings.json` (default)
- Custom path via `AMP_SETTINGS_FILE` environment variable

### Setting Keys

All settings use the `amp.` prefix when stored in the configuration file:

```json
{
  "amp.notifications.enabled": true,
  "amp.anthropic.thinking.enabled": false
}
```

The prefix is stripped when the CLI loads settings internally.

---

## CLI Settings Registry (z86)

These are the 42 settings defined in the CLI settings registry object `z86`. All settings use the `amp.` prefix when accessed by users. Settings marked **NEW** were not present in the previous version (0.0.1766908883-g25743d).

---

### amp.url

- **Type:** string
- **Default:** `"https://ampcode.com"`
- **Visible:** false (hidden)
- **Description:** The Amp server URL to connect to

---

### amp.workerUrl

- **Type:** string
- **Default:** `"http://localhost:8787"`
- **Visible:** false (hidden)
- **Description:** URL to the Cloudflare Worker for agent loop operations
- **NEW in this version**

---

### amp.anthropic.thinking.enabled

- **Type:** boolean
- **Default:** `false`
- **Visible:** false (hidden)
- **Description:** Enable Claude thinking process output for debugging

---

### amp.anthropic.interleavedThinking.enabled

- **Type:** boolean
- **Default:** `false`
- **Visible:** false (hidden)
- **Description:** Enable interleaved thinking for Claude 4 models (allows reasoning between tool calls)

---

### amp.anthropic.temperature

- **Type:** number
- **Default:** `1`
- **Visible:** false (hidden)
- **Description:** Temperature setting for Anthropic models (0.0 = deterministic, 1.0 = creative). Note: Only takes effect when thinking is disabled. Internal use only.

---

### amp.anthropic.effort

- **Type:** string
- **Default:** `"high"`
- **Visible:** false (hidden)
- **Description:** Effort level for Anthropic models that support auto-thinking (low, medium, high, max). Higher effort means more thinking and better performance.
- **NEW in this version**

---

### amp.internal.deepReasoningEffort

- **Type:** string
- **Default:** `"medium"`
- **Visible:** false (hidden)
- **Description:** Reasoning effort override for GPT-5.2 Codex in deep mode (medium, high, xhigh)
- **NEW in this version**

---

### amp.gemini.thinkingLevel

- **Type:** undefined (string when set)
- **Default:** `undefined`
- **Visible:** false (hidden)
- **Description:** Thinking level for Gemini models (minimal, low, medium, high, or undefined)
- **NEW in this version**

---

### amp.notifications.enabled

- **Type:** boolean
- **Default:** `true`
- **Visible:** true
- **Description:** Enable system sound notifications when agent completes tasks

---

### amp.notifications.system.enabled

- **Type:** boolean
- **Default:** `true`
- **Visible:** true
- **Description:** Enable system notifications when terminal is not focused

---

### amp.agent.skipTitleGenerationIfMessageContains

- **Type:** array (of strings)
- **Default:** `[]`
- **Visible:** false (hidden)
- **Description:** List of strings that, if present in a message, will skip title generation
- **NEW in this version**

---

### amp.mcpServers

- **Type:** object
- **Default:** `{ filesystem: { command: "npx", args: ["@modelcontextprotocol/server-filesystem", "/path/to/allowed/dir"] } }`
- **Visible:** true
- **Description:** Model Context Protocol servers to connect to for additional tools

---

### amp.tools.disable

- **Type:** array (of strings)
- **Default:** `["browser_navigate", "builtin:edit_file"]`
- **Visible:** true
- **Description:** Array of tool names to disable. Use 'builtin:toolname' to disable only the builtin tool with that name (allowing an MCP server to provide a tool by that name).

---

### amp.tools.enable

- **Type:** array (of strings) or undefined
- **Default:** `undefined`
- **Visible:** true
- **Description:** Array of tool name patterns to enable. Supports glob patterns (e.g., 'mcp__metabase__*'). If not set, all tools are enabled. If set, only matching tools are enabled.
- **NEW in this version**

---

### amp.tools.inactivityTimeout

- **Type:** number
- **Default:** `300`
- **Visible:** false (hidden)
- **Description:** How many seconds of no output to wait before canceling bash commands

---

### amp.tools.stopTimeout

- **Type:** number
- **Default:** `300`
- **Visible:** false (hidden)
- **Description:** Timeout for stopping tools
- **NEW in this version**

---

### amp.network.timeout

- **Type:** number
- **Default:** `30`
- **Visible:** true
- **Description:** How many seconds to wait for network requests to the Amp server before timing out
- **NEW in this version**

---

### amp.permissions

- **Type:** array (of permission rule objects)
- **Default:** `[{ tool: "Bash", action: "ask", matches: { cmd: ["git push*", "git commit*", "git branch -D*", "git checkout HEAD*"] } }]`
- **Visible:** true
- **Description:** Permission rules for tool calls. See amp permissions --help

---

### amp.guardedFiles.allowlist

- **Type:** array (of strings)
- **Default:** `[]`
- **Visible:** true
- **Description:** Array of file glob patterns that are allowed to be accessed without confirmation. Takes precedence over the built-in denylist.
- **NEW in this version**

---

### amp.dangerouslyAllowAll

- **Type:** boolean
- **Default:** `false`
- **Visible:** true
- **Description:** Disable all command confirmation prompts (agent will execute all commands without asking)

---

### amp.submitOnEnter

- **Type:** boolean
- **Default:** `true`
- **Visible:** false (hidden)
- **Description:** Whether to submit messages on Enter (true) or require Ctrl+Enter (false)
- **NEW in this version**

---

### amp.terminal.commands.nodeSpawn.loadProfile

- **Type:** string
- **Default:** `"daily"`
- **Visible:** false (hidden)
- **Description:** How often to load shell profile in node-spawn mode (always, daily, never)

---

### amp.terminal.animation

- **Type:** boolean
- **Default:** `true`
- **Visible:** true
- **Description:** Set to false to disable terminal animations (or use the equivalent NO_ANIMATION=1 env var)
- **NEW in this version**

---

### amp.terminal.theme

- **Type:** string
- **Default:** `"terminal"`
- **Visible:** true
- **Description:** Color theme for the CLI. Built-in: terminal, dark, light, catppuccin-mocha, solarized-dark, solarized-light, gruvbox-dark-hard, nord. Custom themes: ~/.config/amp/themes/<name>/colors.toml
- **NEW in this version**

---

### amp.debugLogs

- **Type:** boolean
- **Default:** `false`
- **Visible:** false (hidden)
- **Description:** Enable debug logging output

---

### amp.hooks

- **Type:** array (of hook objects)
- **Default:** `[]`
- **Visible:** false (hidden)
- **Description:** Custom hooks for extending Amp functionality
- **NEW in this version**

---

### amp.anthropic.provider

- **Type:** string
- **Default:** `"anthropic"`
- **Visible:** false (hidden)
- **Description:** Which provider to use for Anthropic Claude inference: "anthropic" or "vertex"
- **NEW in this version**

---

### amp.experimental.cli.nativeSecretsStorage.enabled

- **Type:** boolean
- **Default:** `false`
- **Visible:** false (hidden)
- **Description:** Use native secret storage instead of the plain-text secrets configuration file

---

### amp.experimental.tools

- **Type:** array (of strings)
- **Default:** `[]`
- **Visible:** false (hidden)
- **Description:** Enable experimental tools by name
- **NEW in this version**

---

### amp.experimental.modes

- **Type:** array (of strings)
- **Default:** `[]`
- **Visible:** true
- **Description:** Enable experimental agent modes by name. Available modes: deep
- **NEW in this version**

---

### amp.fuzzy.alwaysIncludePaths

- **Type:** array (of strings)
- **Default:** `[]`
- **Visible:** true
- **Description:** Glob patterns for paths that should always be included in fuzzy file search, even if gitignored
- **NEW in this version**

---

### amp.systemPrompt

- **Type:** string or undefined
- **Default:** `undefined`
- **Visible:** false (hidden)
- **Description:** Custom system prompt text to append (SDK use only)
- **NEW in this version**

---

### amp.skills.path

- **Type:** string or undefined
- **Default:** `undefined`
- **Visible:** true
- **Description:** Path to additional directories containing skills. Supports colon-separated paths (semicolon on Windows). Use ~ for home directory.
- **NEW in this version**

---

### amp.toolbox.path

- **Type:** string or undefined
- **Default:** `undefined`
- **Visible:** true
- **Description:** Path to the directory containing toolbox scripts. Supports colon-separated paths.
- **NEW in this version**

---

### amp.git.commit.coauthor.enabled

- **Type:** boolean
- **Default:** `true`
- **Visible:** true
- **Description:** Enable adding Amp as co-author in git commits

---

### amp.git.commit.ampThread.enabled

- **Type:** boolean
- **Default:** `true`
- **Visible:** true
- **Description:** Enable adding Amp-Thread trailer in git commits

---

### amp.jetbrains.skipInstall

- **Type:** boolean
- **Default:** `false`
- **Visible:** false (hidden)
- **Description:** Skip JetBrains plugin installation

---

### amp.proxy

- **Type:** string or undefined
- **Default:** `undefined`
- **Visible:** true
- **Description:** Proxy URL used for both HTTP and HTTPS requests to the Amp server
- **NEW in this version**

---

### amp.updates.mode

- **Type:** string
- **Default:** `"auto"`
- **Visible:** true
- **Description:** Control update checking behavior: "warn" shows update notifications, "disabled" turns off checking, "auto" automatically runs update.

---

### amp.showCosts

- **Type:** boolean
- **Default:** `true`
- **Visible:** true
- **Description:** Set to false to hide costs while working on a thread
- **NEW in this version**

---

## VS Code Extension Settings

These are the 35 settings defined in the VS Code extension's `package.json` contributes.configuration section. Some overlap with CLI registry settings but may have different defaults or additional metadata.

---

### amp.url

- **Type:** string
- **Examples:** `["https://ampcode.com/"]`
- **Description:** URL to the Amp server, usually https://ampcode.com/
- **Scope:** application

---

### amp.workerUrl

- **Type:** string
- **Examples:** `["http://localhost:8787"]`
- **Description:** URL to the Cloudflare Worker for agent loop operations. Defaults to http://localhost:8787 for local development.
- **Scope:** application

---

### amp.notifications.enabled

- **Type:** boolean
- **Default:** true
- **Description:** Play notification sound when done or blocked
- **Scope:** window

---

### amp.network.timeout

- **Type:** number
- **Default:** 30
- **Minimum:** 5
- **Maximum:** 600
- **Description:** How many seconds to wait for network requests to the Amp server before timing out. Increase this value if you have a slow network connection.
- **Scope:** application

---

### amp.mcpServers

- **Type:** object
- **Description:** Model Context Protocol servers that expose tools
- **Supports:** command+args objects and URL-based server definitions (with OAuth support)

---

### amp.mcpPermissions

- **Type:** array
- **Default:** `[]`
- **Description:** Permissions for Model Context Protocol (MCP) servers. Controls which MCP servers can be used.
- **Scope:** application
- **Items:** Objects with `matches` and `action` ("allow"/"reject") properties

---

### amp.mcpTrustedServers

- **Type:** array
- **Description:** MCP server trust decisions. Security Note: This setting is only read from user settings, never workspace settings, to prevent malicious repositories from auto-approving their own servers.

---

### amp.workspaces

- **Type:** array
- **Description:** Workspace-level configuration. This setting is only read from user settings, never workspace settings.
- **Scope:** application
- **Items:** Objects with `path` (string), `allowAllMcpServers` (boolean)

---

### amp.bitbucket.enterprise.connections

- **Type:** array
- **Default:** `[]`
- **Description:** Local Bitbucket Enterprise connections for librarian tools.
- **Scope:** application
- **Items:** Objects with `instanceUrl` (string), `accessToken` (string)

---

### amp.permissions

- **Type:** Uses JSON schema reference `https://static.ampcode.com/schemas/permissions.schema.json`
- **Default:** `[]`
- **Description:** Entries checked in sequence to configure tool permissions

---

### amp.experimental.compaction

- **Type:** boolean or number
- **Default:** false
- **Description:** Enable auto-compaction when context window is nearly full. Set to `true` for 90% threshold, or a number 0-100 for custom percentage.
- **Scope:** window

---

### amp.experimental.tools

- **Type:** array of strings
- **Description:** Enable experimental tools by name

---

### amp.experimental.modes

- **Type:** array of strings
- **Description:** Enable experimental agent modes by name.

---

### amp.experimental.promptAutocomplete.verboseLogging

- **Type:** boolean
- **Default:** false
- **Description:** Enable verbose logging for prompt autocomplete.
- **Scope:** application

---

### amp.experimental.reviewSubagent

- **Type:** boolean
- **Default:** false
- **Description:** Enable the review subagent as a tool for use by the main agent in smart mode.
- **Scope:** window

---

### amp.tools.disable

- **Type:** array of strings
- **Description:** Disable specific tools by name. Glob patterns using * are supported. Examples: Disable edit_file: `["builtin:edit_file"]`, Disable all playwright tab tools: `["mcp__playwright__browser_tab*"]`

---

### amp.tools.inactivityTimeout

- **Type:** number
- **Default:** 300
- **Minimum:** 1
- **Maximum:** 3600
- **Description:** How many seconds of no output to wait before canceling bash commands.
- **Scope:** workspace

---

### amp.tools.stopTimeout

- **Type:** number
- **Default:** 300
- **Description:** How many seconds to wait before canceling a running tool.
- **Scope:** application

---

### amp.skills.path

- **Type:** string
- **Description:** Path to additional directories containing skills. Supports colon-separated paths (semicolon on Windows). Use `~` for home directory.
- **Scope:** window

---

### amp.toolbox.path

- **Type:** string
- **Description:** Path to the directory containing toolbox scripts. Supports colon-separated paths.
- **Scope:** window

---

### amp.dangerouslyAllowAll

- **Type:** boolean
- **Default:** false
- **Description:** If true, never ask for confirmation when running commands
- **Scope:** window

---

### amp.anthropic.thinking.enabled

- **Type:** boolean
- **Default:** true (NOTE: VS Code default differs from CLI default of false)
- **Description:** Enable Claude's extended thinking capabilities
- **Scope:** application

---

### amp.anthropic.effort

- **Type:** string
- **Enum:** `["low", "medium", "high", "max"]`
- **Default:** "high"
- **Description:** Effort level for Anthropic models that support auto-thinking. Higher effort means more thinking and better performance.
- **Scope:** application

---

### amp.hooks

- **Type:** array
- **Default:** `[]`
- **Scope:** window
- **Description:** [Experimental] Hooks are event handlers that can react to specific conditions.
- **Items:** Objects with `compatibilityDate` (const "2025-05-13"), `id`, `on`, `action` required

---

### amp.git.commit.coauthor.enabled

- **Type:** boolean
- **Default:** true
- **Description:** Enable adding Amp as co-author in git commits
- **Scope:** window

---

### amp.git.commit.ampThread.enabled

- **Type:** boolean
- **Default:** true
- **Description:** Enable adding Amp-Thread trailer in git commits
- **Scope:** window

---

### amp.showCosts

- **Type:** boolean
- **Default:** true
- **Description:** Show cost information for threads
- **Scope:** application

---

### amp.submitOnEnter

- **Type:** boolean
- **Default:** false (NOTE: VS Code default differs from CLI default of true)
- **Description:** Submit messages with Enter instead of Cmd+Enter (macOS) or Ctrl+Enter (Windows/Linux).
- **Scope:** application

---

### amp.debug.logReview

- **Type:** boolean
- **Default:** false
- **Description:** Enable debug logging for review git operations
- **Scope:** application

---

### amp.debugLogs

- **Type:** boolean
- **Default:** false
- **Description:** Enable debug logging in the Amp output channel
- **Scope:** application

---

### amp.ui.zoomLevel

- **Type:** number
- **Default:** 1
- **Description:** Zoom level for the Amp UI
- **Scope:** application

---

### amp.review.separatePanel

- **Type:** boolean
- **Default:** false
- **Description:** Show the review panel as a separate container that's independently draggable to a different sidebar location.
- **Scope:** window

---

### amp.model.sonnet (DEPRECATED)

- **Type:** boolean
- **Default:** false
- **Description:** (Deprecated) Use large mode instead. See https://ampcode.com/news/large-mode
- **Deprecation message:** This setting has been removed. Use large mode instead: set amp.experimental.agentMode to 'large'.
- **Scope:** window

---

### amp.terminal.commands.nodeSpawn.loadProfile

- **Type:** string
- **Enum:** `["always", "never", "daily"]`
- **Default:** "always" (NOTE: VS Code default differs from CLI default of "daily")
- **Description:** Before running commands (including MCP servers), whether to load environment variables from the user's profile (.bashrc, .zshrc, etc.)

---

### amp.guardedFiles.allowlist

- **Type:** array
- **Description:** Glob patterns for files that should bypass guarded file protection

---

### amp.fuzzy.alwaysIncludePaths

- **Type:** array
- **Description:** Glob patterns for paths that should always be included in fuzzy file search, even if gitignored. Dotfiles and directories starting with `.` are supported.
- **Scope:** window

---

## Runtime-Only Settings

These 7 settings are accessed at runtime via `settings["key"]` or `configService.get("key")` but do not appear in the main CLI registry `z86`. They may be set through other configuration mechanisms.

---

### openrouter.apiKey

- **Type:** string
- **Used at:** `settings["openrouter.apiKey"]` / also reads `OPENROUTER_API_KEY` env var
- **Description:** API key for OpenRouter. Used when connecting to OpenRouter models (e.g., openrouter/sonoma-sky-alpha). Error message: "Please set amp.openrouter.apiKey setting or OPENROUTER_API_KEY environment variable."

---

### experimental.autoSnapshot

- **Type:** boolean
- **Default:** false
- **Used at:** `settings["experimental.autoSnapshot"]`
- **Description:** Controls automatic snapshot behavior before agent operations

---

### experimental.cli.commandTelemetry.enabled

- **Type:** boolean
- **Default:** false (inferred)
- **Used at:** `settings["experimental.cli.commandTelemetry.enabled"]`
- **Description:** Enables CLI command telemetry submission

---

### agent.showUsageDebugInfo

- **Type:** boolean
- **Default:** false
- **Used at:** `settings["agent.showUsageDebugInfo"]`
- **Description:** Shows detailed usage/cost debug info (only visible to dogfooding users with @sourcegraph.com or @ampcode.com emails)

---

### internal.scaffoldCustomizationFile

- **Type:** string
- **Default:** undefined
- **Used at:** `settings["internal.scaffoldCustomizationFile"]`
- **Description:** Path to a scaffold customization file for system prompt construction

---

### internal.fireworks.directRouting

- **Type:** boolean (inferred)
- **Used at:** `settings["internal.fireworks.directRouting"]`
- **Description:** Enables direct routing for Fireworks AI models

---

### internal.kimi.reasoning

- **Type:** string
- **Default:** `"medium"`
- **Used at:** `settings["internal.kimi.reasoning"]`
- **Description:** Reasoning effort level for Kimi models. Set to "none" to disable reasoning (reduces temperature from 1.0 to 0.6 for Kimi models)

---

### internal.cli.logViewer

- **Type:** string
- **Default:** undefined (falls back to $PAGER)
- **Used at:** `configService.get("internal.cli.logViewer")`
- **Description:** Command to use for viewing CLI log files

---

### experimental.compaction

- **Type:** boolean or number
- **Default:** false
- **Used at:** `settings["experimental.compaction"]`
- **Description:** Enables auto-compaction. Shows "Enable amp.experimental.compaction to use this feature" when disabled.

---

### bitbucket.enterprise.connections

- **Type:** array
- **Used at:** `settings["bitbucket.enterprise.connections"]`
- **Description:** Bitbucket Enterprise server connections for librarian tools

---

### experimental.agentMode

- **Type:** string
- **Default:** `"smart"` (via `in4()` function which returns `"smart"` as default)
- **Used at:** CLI option `--mode`, mapped to `experimental.agentMode`
- **Description:** Agent execution mode. Known values: "smart", "large", "deep", "rush", "free"

---

## Deprecated / Removed Settings

### amp.model.sonnet (DEPRECATED)

- **Status:** Deprecated in VS Code extension
- **Deprecation message:** "This setting has been removed. Use large mode instead: set amp.experimental.agentMode to 'large'. See https://ampcode.com/news/large-mode"

---

### amp.tab.enabled (REMOVED)

- **Status:** Completely removed from this version
- **Was in previous version:** Yes

---

### amp.todos.enabled (REMOVED)

- **Status:** Completely removed from this version
- **Was in previous version:** Yes

---

### amp.debug.httpLogging (REMOVED)

- **Status:** Completely removed from this version
- **Was in previous version:** Yes

---

### amp.openrouter.apiKey (REMOVED from registry)

- **Status:** No longer in the settings registry as a formal setting
- **Still accessible:** Via `settings["openrouter.apiKey"]` at runtime and `OPENROUTER_API_KEY` env var
- **Was in previous version:** Yes (as a formal registry entry)

---

### amp.internal.scaffoldCustomizationFile (REMOVED from registry)

- **Status:** No longer in the main settings registry z86
- **Still accessible:** Via `settings["internal.scaffoldCustomizationFile"]` at runtime

---

## Environment Variables

### AMP_API_KEY

- **Description:** Access token for Amp (see https://ampcode.com/settings)
- **Usage:** Used for authentication; if set, `amp login` will store it automatically

---

### AMP_URL

- **Description:** URL for the Amp service (default is https://ampcode.com)
- **Usage:** Overrides the `amp.url` setting; checked during logout to decide whether to delete settings

---

### AMP_LOG_LEVEL

- **Description:** Set log level (can also use --log-level CLI flag)

---

### AMP_LOG_FILE

- **Description:** Set log file location (can also use --log-file CLI flag)

---

### AMP_SETTINGS_FILE

- **Description:** Set settings file path (can also use --settings-file; default is the standard settings path)

---

### AMP_HOME

- **Description:** Custom home directory for Amp installation
- **Default:** `~/.amp`
- **Usage:** When set, installation scripts use `$AMP_HOME/bin/amp`. If custom path differs from `~/.amp`, skips installation of `~/.local/bin/amp` (testing mode).

---

### AMP_VERSION

- **Description:** Override the version string for Amp
- **Usage:** If set, returns this value instead of fetching from npm registry

---

### AMP_SKIP_UPDATE_CHECK

- **Description:** Disable update checking when set to "1"
- **Usage:** Skips all update checks; `amp update` warns user that this env var is set

---

### AMP_TEST_UPDATE_STATUS

- **Description:** Fake update status for testing purposes
- **Usage:** Emits a fake update status after 500ms delay

---

### AMP_DEBUG

- **Description:** Enable debug mode
- **Usage:** When set (and not "0"), enables debug mode. When "1", shows detailed error logs and stack traces.

---

### AMP_CLI_STDOUT_DEBUG

- **Description:** Enable debug-level console logging
- **Usage:** When set to "true", adds a Console transport at debug level to Winston logger

---

### AMP_ENABLE_TRACING

- **Description:** Enable OpenTelemetry tracing
- **Usage:** When set, switches from AlwaysOffSampler to AlwaysOnSampler for OTEL tracing

---

### AMP_HEADLESS_OAUTH

- **Description:** Enable headless OAuth flow
- **Usage:** When "1" or "true", forces headless OAuth mode (no browser-based auth)

---

### AMP_INSPECTOR_ENABLED

- **Description:** Enable the inspector
- **Usage:** Set to "1" when inspector mode is active

---

### AMP_RIPGREP_PATH

- **Description:** Custom path to ripgrep binary
- **Usage:** Overrides the default ripgrep detection (system rg or bundled)

---

### AMP_SDK_VERSION

- **Description:** SDK version identifier
- **Usage:** Identifies the client as "AmpSDK" type when set

---

### AMP_WORKER_URL

- **Description:** URL for the Cloudflare Worker used in agent loop operations
- **Usage:** Passed to agent loop for add-message and headless operations

---

### AMP_PWD

- **Description:** Override the working directory
- **Usage:** If set, `process.chdir()` is called with this path at startup, then the variable is deleted

---

### AMP_TOOLBOX

- **Description:** Path(s) to toolbox script directories
- **Usage:** Colon-separated list of absolute paths. Must be absolute paths only. Overrides the `amp.toolbox.path` setting.

---

### AMP_RESUME_OTHER_USER_THREADS_INSECURE

- **Description:** Bypass thread ownership check
- **Usage:** When "1", allows resuming threads created by a different user (security bypass)

---

### AMP_EDITOR

- **Description:** Preferred editor for Amp
- **Usage:** Checked first in the editor resolution chain: AMP_EDITOR -> EDITOR -> VISUAL -> vi -> nano -> edit

---

### AMP_SHELL_ENV_MARKER

- **Description:** Internal marker used during shell environment loading
- **Usage:** Used to detect when login shell environment has been fully loaded

---

### AMP_CURRENT_THREAD_ID

- **Description:** Current thread ID (set for toolbox scripts)
- **Usage:** Set in the environment for toolbox action execution alongside AGENT_THREAD_ID

---

### Other Relevant Environment Variables

#### OPENROUTER_API_KEY

- **Description:** OpenRouter API key
- **Usage:** Fallback for `amp.openrouter.apiKey` setting. Used when connecting to OpenRouter-hosted models.

---

#### NO_ANIMATION / NO_ANIMATIONS

- **Description:** Disable terminal animations
- **Usage:** When "1", disables all terminal animations (equivalent to `amp.terminal.animation: false`)

---

#### CLAUDECODE / AGENT

- **Description:** Set to "1" and "amp" respectively for toolbox script execution
- **Usage:** Identifies the caller as Amp to toolbox scripts

---

#### TOOLBOX_ACTION

- **Description:** Toolbox protocol action type
- **Values:** "describe" (get tool metadata) or "execute" (run the tool)

---

## Changes from Previous Version (0.0.1766908883-g25743d)

### New Settings Added to CLI Registry (z86)

| Setting | Type | Default | Visible |
|---------|------|---------|---------|
| `amp.workerUrl` | string | `"http://localhost:8787"` | hidden |
| `amp.anthropic.effort` | string | `"high"` | hidden |
| `amp.internal.deepReasoningEffort` | string | `"medium"` | hidden |
| `amp.gemini.thinkingLevel` | string/undefined | `undefined` | hidden |
| `amp.agent.skipTitleGenerationIfMessageContains` | array | `[]` | hidden |
| `amp.tools.enable` | array/undefined | `undefined` | visible |
| `amp.tools.stopTimeout` | number | `300` | hidden |
| `amp.network.timeout` | number | `30` | visible |
| `amp.guardedFiles.allowlist` | array | `[]` | visible |
| `amp.submitOnEnter` | boolean | `true` | hidden |
| `amp.terminal.animation` | boolean | `true` | visible |
| `amp.terminal.theme` | string | `"terminal"` | visible |
| `amp.hooks` | array | `[]` | hidden |
| `amp.anthropic.provider` | string | `"anthropic"` | hidden |
| `amp.experimental.tools` | array | `[]` | hidden |
| `amp.experimental.modes` | array | `[]` | visible |
| `amp.fuzzy.alwaysIncludePaths` | array | `[]` | visible |
| `amp.systemPrompt` | string/undefined | `undefined` | hidden |
| `amp.skills.path` | string/undefined | `undefined` | visible |
| `amp.toolbox.path` | string/undefined | `undefined` | visible |
| `amp.proxy` | string/undefined | `undefined` | visible |
| `amp.showCosts` | boolean | `true` | visible |

### New VS Code Extension Settings

| Setting | Type | Default |
|---------|------|---------|
| `amp.workerUrl` | string | - |
| `amp.experimental.compaction` | boolean/number | `false` |
| `amp.experimental.promptAutocomplete.verboseLogging` | boolean | `false` |
| `amp.experimental.reviewSubagent` | boolean | `false` |
| `amp.debug.logReview` | boolean | `false` |
| `amp.review.separatePanel` | boolean | `false` |
| `amp.mcpPermissions` | array | `[]` |
| `amp.mcpTrustedServers` | array | - |
| `amp.workspaces` | array | - |
| `amp.bitbucket.enterprise.connections` | array | `[]` |
| `amp.tools.stopTimeout` | number | `300` |

### New Runtime-Only Settings

| Setting | Type | Default |
|---------|------|---------|
| `internal.deepReasoningEffort` | string | `"medium"` |
| `internal.fireworks.directRouting` | boolean | - |
| `internal.kimi.reasoning` | string | `"medium"` |
| `internal.cli.logViewer` | string | - |
| `experimental.autoSnapshot` | boolean | `false` |
| `experimental.cli.commandTelemetry.enabled` | boolean | `false` |
| `agent.showUsageDebugInfo` | boolean | `false` |

### New Environment Variables

| Variable | Description |
|----------|-------------|
| `AMP_ENABLE_TRACING` | Enable OpenTelemetry tracing |
| `AMP_HEADLESS_OAUTH` | Enable headless OAuth flow |
| `AMP_INSPECTOR_ENABLED` | Enable inspector mode |
| `AMP_RIPGREP_PATH` | Custom ripgrep binary path |
| `AMP_SDK_VERSION` | SDK version identifier |
| `AMP_WORKER_URL` | Cloudflare Worker URL |
| `AMP_RESUME_OTHER_USER_THREADS_INSECURE` | Bypass thread ownership check |
| `AMP_EDITOR` | Preferred editor |
| `AMP_SHELL_ENV_MARKER` | Internal shell env loading marker |
| `AMP_CURRENT_THREAD_ID` | Current thread ID for toolbox scripts |

### Settings Removed

| Setting | Notes |
|---------|-------|
| `amp.tab.enabled` | Completely removed |
| `amp.todos.enabled` | Completely removed |
| `amp.debug.httpLogging` | Completely removed |
| `amp.openrouter.apiKey` | Removed from registry; still accessible at runtime |
| `amp.internal.scaffoldCustomizationFile` | Removed from registry; still accessible at runtime |

### Settings with Changed Defaults or Behavior

| Setting | Previous Default | Current Default | Notes |
|---------|-----------------|-----------------|-------|
| `amp.tools.disable` | (varied) | `["browser_navigate", "builtin:edit_file"]` | Now includes `builtin:edit_file` by default |
| `amp.experimental.agentMode` | (was in registry) | Not in registry; runtime default is `"smart"` | Accessed via `--mode` CLI flag; values: smart, large, deep, rush, free |

---

## Summary Statistics

- **Total CLI Registry Settings (z86):** 42
- **Total VS Code Extension Settings:** 35
- **Total Runtime-Only Settings:** 7
- **Total Environment Variables (AMP_*):** 21
- **Total Other Relevant Env Vars:** 3 (OPENROUTER_API_KEY, NO_ANIMATION, TOOLBOX_ACTION)
- **Deprecated Settings:** 1 (amp.model.sonnet)
- **Removed Settings (vs previous):** 5
- **New Settings (vs previous):** 22+ in CLI registry, 11+ in VS Code, 7 runtime-only, 10 new env vars

---

**Generation Details:**
- CLI Version: 0.0.1770366910-g1852ef
- Bundle: `node_modules/@sourcegraph/amp/dist/main.js`
- Settings Registry Variable: `z86` (line 7713)
- Analysis Method: Extraction from minified main.js bundle
- Last Updated: 2026-02-06

---

## Version History

### v0.0.1770366910-g1852ef (2026-02-06)
- Updated to latest version
- 22 new CLI registry settings added
- 11 new VS Code extension settings added
- 7 new runtime-only settings documented
- 10 new environment variables documented
- 5 settings removed from previous version
- Settings registry variable changed from CQ6 to z86

### v0.0.1761153678-gfa55cf (2025-01-21)
- Initial extraction
- All documented and undocumented settings catalogued
- Environment variables comprehensively documented
- Cross-referenced with Amp Manual
- Oracle-verified source line numbers
