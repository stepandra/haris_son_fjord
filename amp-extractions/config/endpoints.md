# AMP CLI API Endpoints Reference

**Version:** 0.0.1770366910-g1852ef
**Source:** `node_modules/@sourcegraph/amp/dist/main.js`
**Last Updated:** 2026-02-06
**Previous Version:** 0.0.1767470475-g48ecc2

---

## Table of Contents

1. [Overview](#overview)
2. [API Endpoints](#api-endpoints)
   - [Provider Proxy Endpoints](#provider-proxy-endpoints)
   - [Direct Provider URL (Not Proxied)](#direct-provider-url-not-proxied)
   - [Thread Management Endpoints](#thread-management-endpoints)
   - [Internal Endpoints](#internal-endpoints)
   - [Telemetry Endpoint](#telemetry-endpoint)
   - [Worker Endpoints](#worker-endpoints)
3. [Changes from Previous Version](#changes-from-previous-version-00176747047548ecc2)
4. [Provider Configuration Enum (O4)](#provider-configuration-enum-o4)
5. [Complete Model Catalog](#complete-model-catalog)
   - [Anthropic Models](#anthropic-models)
   - [OpenAI Models](#openai-models)
   - [xAI Models](#xai-models)
   - [Google/Vertex AI Models](#googlevertex-ai-models)
   - [Cerebras Models](#cerebras-models)
   - [Fireworks Models](#fireworks-models)
   - [Baseten Models (NEW)](#baseten-models-new)
   - [Moonshot AI Models (NEW)](#moonshot-ai-models-new)
   - [OpenRouter Models](#openrouter-models)
6. [Agent Modes](#agent-modes)
7. [Default Model per Provider](#default-model-per-provider)
8. [Request Headers](#request-headers)
   - [Standard Headers](#standard-headers-applied-to-all-proxied-requests-via-z7)
   - [Per-Request Headers](#per-request-headers)
   - [Provider-Specific Headers](#provider-specific-headers)
9. [Subagent Configurations](#subagent-configurations)
10. [Environment Variables](#environment-variables)
11. [Provider-Related Settings Keys](#provider-related-settings-keys)
12. [Model Capabilities](#model-capabilities)
13. [SDK Dependencies](#sdk-dependencies)
14. [Static Asset URLs](#static-asset-urls)
15. [OAuth / Authentication URLs](#oauth--authentication-urls)
16. [Summary of Changes from Previous Version](#summary-of-changes-from-previous-version)

---

## Overview

This document catalogs all HTTP endpoints, provider configurations, model definitions, and related infrastructure used by the AMP CLI version 0.0.1770366910-g1852ef. All data is extracted from the bundled `main.js` source.

All endpoints are relative to the configured `amp.url` (default: `https://ampcode.com`). Requests are authenticated via `Authorization: Bearer <apiKey>` header.

Endpoints fall into two categories:

- **Proxied through `amp.url`**: Most endpoints route through the configured Amp server (default: `https://ampcode.com`)
- **Direct connections**: Only OpenRouter bypasses the Amp proxy and connects directly

---

## API Endpoints

### Provider Proxy Endpoints

| Endpoint | Client SDK | Protocol | Notes |
|----------|-----------|----------|-------|
| `/api/provider/anthropic` | `eK` (Anthropic SDK) | Anthropic Messages API (`/v1/messages`) | Used for all Claude models |
| `/api/provider/openai/v1` | `T6` (OpenAI SDK) | OpenAI Chat Completions (`chat/completions`) | Used for GPT-5/o3 models |
| `/api/provider/google` | `Nj1` (Google GenAI SDK) | Google Generative Language API | Vertex AI passthrough, uses `vertexai:true` flag |
| `/api/provider/xai/v1` | `T6` (OpenAI-compatible) | OpenAI Chat Completions | Used for Grok models |
| `/api/provider/cerebras` | `zf0` (Cerebras SDK) | OpenAI-compatible | Used for Z.ai GLM models |
| `/api/provider/fireworks/v1` | `T6` (OpenAI-compatible) | OpenAI Chat Completions | Used for Fireworks-hosted models (Qwen, Kimi, GLM) |
| `/api/provider/groq` | `T6` (OpenAI-compatible) | OpenAI Chat Completions | Used for Groq-hosted models |
| `/api/provider/baseten/v1` | `T6` (OpenAI-compatible) | OpenAI Chat Completions | **NEW** - Used for Baseten-hosted Kimi K2.5 |
| `/api/provider/kimi` | `T6` (OpenAI-compatible) | OpenAI Chat Completions | **NEW** - Used for Moonshot AI Kimi models directly |

### Direct Provider URL (Not Proxied)

| URL | Client SDK | Notes |
|-----|-----------|-------|
| `https://openrouter.ai/api/v1` | `T6` (OpenAI-compatible) | Direct connection (not proxied through Amp backend). Requires `OPENROUTER_API_KEY` env var or `openrouter.apiKey` setting. |

### Thread Management Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/threads/sync` | POST | Synchronize thread data (metadata + versions) with server |
| `/api/threads/find?q={query}&limit={n}&offset={n}` | GET | Search threads by query string |
| `/api/threads/{id}.md` | GET | Get thread content as Markdown |
| `/api/threads/{id}` | GET | Get thread metadata/data |
| `/api/threads?createdByUserID={id}` | GET | List threads by user ID |

### Internal Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/internal?{method}` | POST | Generic internal RPC endpoint (method name appended as query parameter) |
| `/api/internal/github-auth-status` | GET | Check GitHub authentication status |
| `/api/internal/github-proxy/{path}` | GET/POST | Proxy requests to GitHub API (with Amp auth) |

### Telemetry Endpoint

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/telemetry` | POST | Submit usage telemetry data |

### Worker Endpoints

| Base URL | Condition |
|----------|-----------|
| `https://production.ampworkers.com` | Default for production |
| `https://staging.ampworkers.com` | When URL contains `staging.ampcodedev.org` |

---

## Changes from Previous Version (0.0.1767470475-g48ecc2)

### New Endpoints

- `/api/provider/baseten/v1` - Baseten provider proxy (NEW provider)
- `/api/provider/kimi` - Moonshot AI / Kimi provider proxy (NEW provider)

### Removed Endpoints

- `/api/skills` - Skills API endpoint (removed entirely)
- `/api/provider/supernova` - Was already absent in previous version, confirmed absent

### Unchanged Endpoints

- `/api/provider/anthropic`
- `/api/provider/openai/v1`
- `/api/provider/google`
- `/api/provider/xai/v1`
- `/api/provider/cerebras`
- `/api/provider/fireworks/v1`
- `/api/provider/groq`
- `/api/threads/sync`
- `/api/threads/find`
- `/api/threads/{id}`
- `/api/threads/{id}.md`
- `/api/threads?createdByUserID={id}`
- `/api/internal?{method}`
- `/api/internal/github-auth-status`
- `/api/internal/github-proxy/{path}`
- `/api/telemetry`
- `https://openrouter.ai/api/v1` (direct)

### Endpoints Not Found (from original expected list)

- `/api/user` - Not present as an actual endpoint (only in example text for prompt demos)
- `/api/connect` - Not present in either version

---

## Provider Configuration Enum (O4)

```javascript
O4 = {
    ANTHROPIC:  "anthropic",
    BASENTEN:   "baseten",      // NEW (note typo: "BASENTEN" not "BASETEN")
    OPENAI:     "openai",
    XAI:        "xai",
    CEREBRAS:   "cerebras",
    FIREWORKS:  "fireworks",
    GROQ:       "groq",
    MOONSHOT:   "moonshotai",
    OPENROUTER: "openrouter",
    VERTEXAI:   "vertexai"
}
```

Previous version did NOT have `BASENTEN` ("baseten"). All others existed.

---

## Complete Model Catalog

### Anthropic Models

| Enum Key | Model ID | Display Name | Context | Max Output | Pricing ($/M tokens) |
|----------|----------|-------------|---------|------------|---------------------|
| CLAUDE_SONNET_4 | claude-sonnet-4-20250514 | Claude Sonnet 4 | 1,000,000 | 32,000 | in:$3 out:$15 cached:$0.30 |
| CLAUDE_SONNET_4_5 | claude-sonnet-4-5-20250929 | Claude Sonnet 4.5 | 1,000,000 | 32,000 | in:$3 out:$15 cached:$0.30 |
| CLAUDE_OPUS_4 | claude-opus-4-20250514 | Claude Opus 4 | 200,000 | 32,000 | in:$15 out:$75 cached:$1.50 |
| CLAUDE_OPUS_4_1 | claude-opus-4-1-20250805 | Claude Opus 4.1 | 200,000 | 32,000 | in:$15 out:$75 cached:$1.50 |
| CLAUDE_OPUS_4_5 | claude-opus-4-5-20251101 | Claude Opus 4.5 | 200,000 | 32,000 | in:$5 out:$25 cached:$0.50 |
| CLAUDE_OPUS_4_6 | claude-opus-4-6 | Claude Opus 4.6 | 200,000 | 32,000 | in:$5 out:$25 cached:$0.50 |
| CLAUDE_HAIKU_4_5 | claude-haiku-4-5-20251001 | Claude Haiku 4.5 | 200,000 | 64,000 | in:$1 out:$5 cached:$0.10 |

### OpenAI Models

| Enum Key | Model ID | Display Name | Context | Max Output | Pricing ($/M tokens) |
|----------|----------|-------------|---------|------------|---------------------|
| GPT_5 | gpt-5 | GPT-5 | 400,000 | 128,000 | in:$1.25 out:$10 cached:$0.125 |
| GPT_5_1 | gpt-5.1 | GPT-5.1 | 400,000 | 128,000 | in:$1.25 out:$10 cached:$0.125 |
| GPT_5_2 | gpt-5.2 | GPT-5.2 | 400,000 | 128,000 | in:$1.75 out:$14 cached:$0.175 |
| GPT_5_CODEX | gpt-5-codex | GPT-5 Codex | 400,000 | 128,000 | in:$1.25 out:$10 cached:$0.125 |
| GPT_5_1_CODEX | gpt-5.1-codex | GPT-5.1 Codex | 400,000 | 128,000 | in:$1.25 out:$10 cached:$0.125 |
| GPT_5_2_CODEX | gpt-5.2-codex | GPT-5.2 Codex | 400,000 | 128,000 | in:$1.75 out:$14 cached:$0.175 |
| GPT_5_MINI | gpt-5-mini | GPT-5 Mini | 400,000 | 128,000 | in:$0.25 out:$2 cached:$0.025 |
| GPT_5_NANO | gpt-5-nano | GPT-5 Nano | 400,000 | 128,000 | in:$0.05 out:$0.40 cached:$0.005 |
| O3 | o3 | o3 | 200,000 | 100,000 | in:$2 out:$8 cached:$0.50 |
| O3_MINI | o3-mini | o3-mini | 200,000 | 100,000 | in:$1.10 out:$4.40 cached:$0.55 |
| GPT_OSS_120B | openai/gpt-oss-120b | GPT OSS 120B | 128,000 | 32,000 | (no pricing) |

### xAI Models

| Enum Key | Model ID | Display Name | Context | Max Output |
|----------|----------|-------------|---------|------------|
| GROK_CODE_FAST_1 | grok-code-fast-1 | Grok Code Fast 1 | 256,000 | 32,000 |

### Google/Vertex AI Models

| Enum Key | Model ID | Display Name | Context | Max Output |
|----------|----------|-------------|---------|------------|
| GEMINI_3_PRO_PREVIEW | gemini-3-pro-preview | Gemini 3 Pro Preview | 1,048,576 | 65,535 |
| GEMINI3_FLASH_PREVIEW | gemini-3-flash-preview | Gemini 3 Flash Preview | 1,048,576 | 65,535 |
| GEMINI_3_PRO_IMAGE | gemini-3-pro-image-preview | Gemini 3 Pro Image | 1,048,576 | 65,535 |

### Cerebras Models

| Enum Key | Model ID | Display Name | Context | Max Output |
|----------|----------|-------------|---------|------------|
| Z_AI_GLM_4_7 | zai-glm-4.7 | Z.ai GLM 4.7 | 131,000 | 40,000 |

### Fireworks Models

| Enum Key | Model ID | Display Name | Context | Max Output | Pricing |
|----------|----------|-------------|---------|------------|---------|
| FIREWORKS_QWEN3_CODER_480B | accounts/fireworks/models/qwen3-coder-480b-a35b-instruct | Qwen3 Coder 480B | 230,144 | 32,000 | (no pricing) |
| FIREWORKS_KIMI_K2_INSTRUCT | accounts/fireworks/models/kimi-k2-instruct-0905 | Kimi K2 Instruct | 230,144 | 32,000 | (no pricing) |
| FIREWORKS_KIMI_K2P5 | accounts/fireworks/models/kimi-k2p5 | Kimi K2.5 | 262,144 | 32,000 | in:$0.60 out:$3 cached:$0.10 |
| FIREWORKS_QWEN3_235B | accounts/fireworks/models/qwen3-235b-a22b-instruct-2507 | Qwen3 235B | 230,144 | 32,000 | (no pricing) |
| FIREWORKS_GLM_4P6 | accounts/fireworks/models/glm-4p6 | GLM 4P6 | 162,752 | 40,000 | (no pricing) |

### Baseten Models (NEW)

| Enum Key | Model ID | Display Name | Context | Max Output | Pricing |
|----------|----------|-------------|---------|------------|---------|
| BASETEN_KIMI_K2P5 | moonshotai/Kimi-K2.5 | Kimi K2.5 | 262,144 | 32,000 | in:$0.60 out:$3 cached:$0.10 |

### Moonshot AI Models (NEW)

| Enum Key | Model ID | Display Name | Context | Max Output |
|----------|----------|-------------|---------|------------|
| KIMI_K2_INSTRUCT | kimi-k2-instruct-0905 | Kimi K2 Instruct | 1,000,000 | 32,000 |

### OpenRouter Models

| Enum Key | Model ID | Display Name | Context | Max Output |
|----------|----------|-------------|---------|------------|
| SONOMA_SKY_ALPHA | sonoma-sky-alpha | Sonoma Sky Alpha | 256,000 | 32,000 |
| OPENROUTER_GLM_4_6 | z-ai/glm-4.6 | OpenRouter GLM 4.6 | 131,000 | 40,000 |
| OPENROUTER_KIMI_K2_0905 | moonshotai/kimi-k2-0905 | Kimi K2 0905 (OpenRouter) | 262,144 | 32,000 |
| OPENROUTER_QWEN3_CODER_480B | qwen/qwen3-coder | Qwen3 Coder 480B (OpenRouter) | 262,144 | 32,000 |
| OPENROUTER_QWEN3_235B | qwen/qwen3-235b-a22b-2507 | Qwen3 235B A22B (OpenRouter) | 262,144 | 32,000 |

---

## Agent Modes

| Mode Key | Display Name | Primary Model | Description | Visible | Notes |
|----------|-------------|---------------|-------------|---------|-------|
| `smart` | Smart | CLAUDE_OPUS_4_6 | The most capable model and set of tools | Yes | Default mode |
| `free` | Free | CLAUDE_HAIKU_4_5 | Amp Free | Yes | Limited tool set |
| `rush` | Rush | CLAUDE_HAIKU_4_5 | Faster and cheaper for small, well-defined tasks | Yes | Has "jitter" label animation |
| `large` | Large | CLAUDE_SONNET_4_5 | The biggest context window possible (Sonnet 4.5 1M tokens) | No (hidden) | |
| `deep` | Deep | GPT_5_2_CODEX | Deep reasoning with GPT-5.2 Codex | Yes | **NEW mode** - reasoning effort: "medium" |
| `bombadil` | Bombadil | FIREWORKS_KIMI_K2P5 | Old Tom Bombadil with Kimi K2.5 - experimental open model mode | No (hidden) | **NEW mode** |

---

## Default Model per Provider

| Provider | Default Model |
|----------|---------------|
| anthropic | CLAUDE_SONNET_4_5 |
| openai | GPT_5 |
| xai | GROK_CODE_FAST_1 |
| cerebras | Z_AI_GLM_4_7 |
| fireworks | FIREWORKS_GLM_4P6 |
| baseten | BASETEN_KIMI_K2P5 |
| moonshotai | KIMI_K2_INSTRUCT |
| openrouter | SONOMA_SKY_ALPHA |
| groq | GPT_OSS_120B |
| vertexai | GEMINI_3_PRO_PREVIEW |

---

## Request Headers

### Standard Headers (applied to all proxied requests via `Z7()`)

| Header | Value | Source |
|--------|-------|--------|
| `X-Amp-Client-Application` | Client name (e.g., "CLI", "Neovim", "JetBrains") | `$B()` function |
| `X-Amp-Client-Type` | Client type (e.g., "cli", "unknown") | `$B()` function |
| `X-Amp-Client-Version` | CLI version string | `$B()` function |
| `X-Amp-Client-Bundle` | Always `"cli"` | Hardcoded |
| `Authorization` | `Bearer <apiKey>` | From secrets store |
| `Content-Type` | `application/json` | Default for all API calls |

### Per-Request Headers

| Header | Value | When Used |
|--------|-------|-----------|
| `x-amp-feature` | `"amp.chat"` or `"amp.context-analyze"` | All LLM provider calls |
| `x-amp-thread-id` | Thread UUID | When thread context exists |
| `x-amp-message-id` | Message ID (numeric) | When message context exists |
| `x-amp-mode` | Agent mode key (e.g., "smart", "free") | When thread context exists |
| `x-amp-override-provider` | Provider name (e.g., "anthropic") | For context-analyze calls |

### Provider-Specific Headers

| Header | Value | Provider |
|--------|-------|----------|
| `x-fireworks-direct-routing` | `"true"` | Fireworks (when `internal.fireworks.directRouting` is set) |
| `x-session-affinity` | Thread ID | Fireworks |
| `x-grok-conv-id` | Thread ID | xAI/Grok |
| `anthropic-beta` | Comma-separated beta features | Anthropic |
| `anthropic-version` | `"2023-06-01"` | Anthropic SDK default |

---

## Subagent Configurations

| Subagent | Display Name | Model | Tools |
|----------|-------------|-------|-------|
| `finder` | Finder | CLAUDE_HAIKU_4_5 | Read, Grep, glob |
| `oracle` | Oracle | GPT_5_2 | Read, Grep, glob, web_search, read_web_page, read_thread, find_thread |
| `librarian` | Librarian | CLAUDE_HAIKU_4_5 | GitHub tools (read, search, commit_search, diff, etc.) |
| `task-subagent` | Task Subagent | (inherited from parent) | Grep, glob, Read, Bash, edit_file, create_file, format_file, etc. + MCP + Toolbox |
| `code-review` | Code Review | CLAUDE_SONNET_4_5 | Read, Grep, glob, web_search, read_web_page, Bash |
| `codereview-check` | Codereview Check | CLAUDE_HAIKU_4_5 | Read, Grep, glob, Bash |
| `walkthrough` | Walkthrough | (not extracted) | (not extracted) |

---

## Environment Variables

### Amp-Specific

| Variable | Purpose |
|----------|---------|
| `AMP_API_KEY` | API key for Amp authentication |
| `AMP_URL` | Override Amp backend URL |
| `AMP_WORKER_URL` | Override Amp worker URL |
| `AMP_HOME` | Amp home directory |
| `AMP_VERSION` | CLI version |
| `AMP_SDK_VERSION` | SDK version |
| `AMP_PWD` | Working directory override |
| `AMP_SETTINGS_FILE` | Custom settings file path |
| `AMP_DEBUG` | Enable debug mode |
| `AMP_LOG_FILE` | Log file path |
| `AMP_LOG_LEVEL` | Log level |
| `AMP_ENABLE_TRACING` | Enable OpenTelemetry tracing |
| `AMP_HEADLESS_OAUTH` | Headless OAuth mode |
| `AMP_INSPECTOR_ENABLED` | Enable inspector |
| `AMP_RIPGREP_PATH` | Custom ripgrep binary path |
| `AMP_SKIP_UPDATE_CHECK` | Skip update check |
| `AMP_TEST_UPDATE_STATUS` | Test update status |
| `AMP_RESUME_OTHER_USER_THREADS_INSECURE` | Allow resuming other users' threads |
| `AMP_CLI_STDOUT_DEBUG` | Debug stdout |
| `AMP_TOOLBOX` | Toolbox configuration |
| `FORCE_ENABLE_SYNC` | Force enable thread sync |

### Provider API Keys

| Variable | Provider |
|----------|---------|
| `OPENROUTER_API_KEY` | OpenRouter (only explicit env var for a provider) |

---

## Provider-Related Settings Keys

| Setting Key | Description |
|-------------|-------------|
| `openrouter.apiKey` | OpenRouter API key |
| `internal.fireworks.directRouting` | Enable Fireworks direct routing header |
| `internal.kimi.reasoning` | Kimi reasoning level (default: "medium", options: "none"/"medium") |
| `internal.deepReasoningEffort` | Deep mode reasoning effort |
| `anthropic.effort` | Anthropic reasoning effort |
| `anthropic.temperature` | Anthropic temperature |
| `anthropic.thinking.enabled` | Enable Anthropic extended thinking |
| `gemini.thinkingLevel` | Gemini thinking level |

---

## Model Capabilities

The following capability flags are used across models:

| Capability | Description |
|-----------|-------------|
| `tools` | Function/tool calling support |
| `reasoning` | Extended thinking / chain-of-thought |
| `vision` | Image input support |
| `imageGeneration` | Image output support (Gemini 3 Pro Image only) |

---

## SDK Dependencies

| Package | Used For |
|---------|----------|
| `@anthropic-ai/sdk` | Anthropic Claude models (eK client) |
| `@google/genai` | Google Gemini / Vertex AI models (Nj1 client) |
| OpenAI-compatible SDK (T6) | OpenAI, xAI, Fireworks, Groq, Baseten, Kimi, OpenRouter |
| Cerebras SDK (zf0) | Cerebras models |

---

## Static Asset URLs

| URL | Purpose |
|-----|---------|
| `https://storage.googleapis.com/amp-public-assets-prod-0/cli` | CLI binary distribution |
| `https://storage.googleapis.com/amp-public-assets-prod-0/cli/cli-version.txt` | Latest CLI version check |
| `https://storage.googleapis.com/amp-public-assets-prod-0/jetbrains/latest.json` | JetBrains plugin version |
| `https://static.ampcode.com/schemas/permissions.schema.json` | Permissions schema |
| `https://registry.npmjs.org` | NPM registry for package checks |

---

## OAuth / Authentication URLs

| URL | Purpose |
|-----|---------|
| `http://localhost:8976/oauth/callback` | Local OAuth callback URL (for MCP server OAuth flows) |
| `https://accounts.google.com/o/oauth2/v2/auth` | Google OAuth (for Vertex AI) |
| `https://oauth2.googleapis.com/token` | Google token exchange |
| `https://oauth2.googleapis.com/tokeninfo` | Google token info |
| `https://oauth2.googleapis.com/revoke` | Google token revocation |

---

## Summary of Changes from Previous Version

### Added

1. **Provider: Baseten** (`baseten`) - New provider with `/api/provider/baseten/v1` endpoint, hosting Kimi K2.5 model
2. **Provider: Moonshot AI** (`moonshotai`) - New provider with `/api/provider/kimi` endpoint, hosting Kimi K2 Instruct with 1M context
3. **Agent Mode: Deep** - GPT-5.2 Codex-based deep reasoning mode (visible)
4. **Agent Mode: Bombadil** - Kimi K2.5 experimental open model mode (hidden)
5. **New Models**: Claude Opus 4.5, Claude Opus 4.6, GPT-5.1, GPT-5.2, GPT-5.1 Codex, GPT-5.2 Codex, GPT-5 Nano, Gemini 3 Flash Preview, Gemini 3 Pro Image, numerous Fireworks/OpenRouter models
6. **Header: x-amp-override-provider** - New header for context-analyze calls
7. **Header: x-session-affinity** - New session affinity header for Fireworks
8. **Baseten-specific**: Custom `chat_template_args` for reasoning (`enable_thinking`)

### Removed

1. **Endpoint: `/api/skills`** - Skills API completely removed
2. **Provider: supernova** - Confirmed absent (was already absent in previous version)

### Changed

1. **Smart mode primary model**: Now uses `CLAUDE_OPUS_4_6` (previously unknown, likely Opus 4 or Sonnet 4.5)
2. **Model capabilities**: Added `imageGeneration` capability type (for Gemini 3 Pro Image)

---

**Generation Details:**
- CLI Version: 0.0.1770366910-g1852ef
- Bundle: `node_modules/@sourcegraph/amp/dist/main.js`
- Analysis Method: Static analysis of minified bundle
- Last Updated: 2026-02-06
