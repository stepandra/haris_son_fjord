# AMP CLI Endpoints and Models (CODEX, Audited)

- Source bundle: `npm-packages/0.0.1770366910-g1852ef/node_modules/@sourcegraph/amp/dist/main.js`
- Build version: `0.0.1770366910-g1852ef`
- Generated: `2026-02-06T10:15:24.179Z`
- Extraction artifact: `amp-extractions/meta/extraction-artifacts_CODEX.json`

## Summary
- Provider enum values: **10**
- Model catalog entries: **35**
- Provider proxy endpoints: **9**
- Amp-relevant absolute URLs: **31**

## Provider Enum (`O4`)
| Enum Key | Value |
| --- | --- |
| `ANTHROPIC` | `anthropic` |
| `BASENTEN` | `baseten` |
| `OPENAI` | `openai` |
| `XAI` | `xai` |
| `CEREBRAS` | `cerebras` |
| `FIREWORKS` | `fireworks` |
| `GROQ` | `groq` |
| `MOONSHOT` | `moonshotai` |
| `OPENROUTER` | `openrouter` |
| `VERTEXAI` | `vertexai` |

## Provider Proxy Endpoints
| Path |
| --- |
| `/api/provider/anthropic` |
| `/api/provider/baseten/v1` |
| `/api/provider/cerebras` |
| `/api/provider/fireworks/v1` |
| `/api/provider/google` |
| `/api/provider/groq` |
| `/api/provider/kimi` |
| `/api/provider/openai/v1` |
| `/api/provider/xai/v1` |

## Model Catalog (`D4`)
| Model Key | Provider | Model Name | Display Name | Context Window | Max Output Tokens | Pricing | Capabilities |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `BASETEN_KIMI_K2P5` | `baseten` | `moonshotai/Kimi-K2.5` | Kimi K2.5 | 262144 | 32000 | `input=0.6, output=3, cached=0.1` | `tools, vision` |
| `CLAUDE_HAIKU_4_5` | `anthropic` | `claude-haiku-4-5-20251001` | Claude Haiku 4.5 | 200000 | 64000 | `input=1, output=5, cached=0.1` | `reasoning, vision, tools` |
| `CLAUDE_OPUS_4` | `anthropic` | `claude-opus-4-20250514` | Claude Opus 4 | 200000 | 32000 | `input=15, output=75, cached=1.5` | `reasoning, vision, tools` |
| `CLAUDE_OPUS_4_1` | `anthropic` | `claude-opus-4-1-20250805` | Claude Opus 4.1 | 200000 | 32000 | `input=15, output=75, cached=1.5` | `reasoning, vision, tools` |
| `CLAUDE_OPUS_4_5` | `anthropic` | `claude-opus-4-5-20251101` | Claude Opus 4.5 | 200000 | 32000 | `input=5, output=25, cached=0.5` | `reasoning, vision, tools` |
| `CLAUDE_OPUS_4_6` | `anthropic` | `claude-opus-4-6` | Claude Opus 4.6 | 200000 | 32000 | `input=5, output=25, cached=0.5` | `reasoning, vision, tools` |
| `CLAUDE_SONNET_4` | `anthropic` | `claude-sonnet-4-20250514` | Claude Sonnet 4 | 1000000 | 32000 | `input=3, output=15, cached=0.3` | `reasoning, vision, tools` |
| `CLAUDE_SONNET_4_5` | `anthropic` | `claude-sonnet-4-5-20250929` | Claude Sonnet 4.5 | 1000000 | 32000 | `input=3, output=15, cached=0.3` | `reasoning, vision, tools` |
| `FIREWORKS_GLM_4P6` | `fireworks` | `accounts/fireworks/models/glm-4p6` | GLM 4P6 | 162752 | 40000 | `(none)` | `tools, reasoning` |
| `FIREWORKS_KIMI_K2_INSTRUCT` | `fireworks` | `accounts/fireworks/models/kimi-k2-instruct-0905` | Kimi K2 Instruct | 230144 | 32000 | `(none)` | `tools` |
| `FIREWORKS_KIMI_K2P5` | `fireworks` | `accounts/fireworks/models/kimi-k2p5` | Kimi K2.5 | 262144 | 32000 | `input=0.6, output=3, cached=0.1` | `tools, vision` |
| `FIREWORKS_QWEN3_235B` | `fireworks` | `accounts/fireworks/models/qwen3-235b-a22b-instruct-2507` | Qwen3 235B | 230144 | 32000 | `(none)` | `tools` |
| `FIREWORKS_QWEN3_CODER_480B` | `fireworks` | `accounts/fireworks/models/qwen3-coder-480b-a35b-instruct` | Qwen3 Coder 480B | 230144 | 32000 | `(none)` | `tools` |
| `GEMINI_3_PRO_IMAGE` | `vertexai` | `gemini-3-pro-image-preview` | Gemini 3 Pro Image | 1048576 | 65535 | `(none)` | `vision, imageGeneration` |
| `GEMINI_3_PRO_PREVIEW` | `vertexai` | `gemini-3-pro-preview` | Gemini 3 Pro Preview | 1048576 | 65535 | `(none)` | `tools, reasoning, vision` |
| `GEMINI3_FLASH_PREVIEW` | `vertexai` | `gemini-3-flash-preview` | Gemini 3 Flash Preview | 1048576 | 65535 | `(none)` | `tools, reasoning, vision` |
| `GPT_5` | `openai` | `gpt-5` | GPT-5 | 400000 | 128000 | `input=1.25, output=10, cached=0.125` | `reasoning, vision, tools` |
| `GPT_5_1` | `openai` | `gpt-5.1` | GPT-5.1 | 400000 | 128000 | `input=1.25, output=10, cached=0.125` | `reasoning, vision, tools` |
| `GPT_5_1_CODEX` | `openai` | `gpt-5.1-codex` | GPT-5.1 Codex | 400000 | 128000 | `input=1.25, output=10, cached=0.125` | `reasoning, tools` |
| `GPT_5_2` | `openai` | `gpt-5.2` | GPT-5.2 | 400000 | 128000 | `input=1.75, output=14, cached=0.175` | `reasoning, vision, tools` |
| `GPT_5_2_CODEX` | `openai` | `gpt-5.2-codex` | GPT-5.2 Codex | 400000 | 128000 | `input=1.75, output=14, cached=0.175` | `reasoning, tools, vision` |
| `GPT_5_CODEX` | `openai` | `gpt-5-codex` | GPT-5 Codex | 400000 | 128000 | `input=1.25, output=10, cached=0.125` | `reasoning, tools` |
| `GPT_5_MINI` | `openai` | `gpt-5-mini` | GPT-5 Mini | 400000 | 128000 | `input=0.25, output=2, cached=0.025` | `reasoning, vision, tools` |
| `GPT_5_NANO` | `openai` | `gpt-5-nano` | GPT-5 Nano | 400000 | 128000 | `input=0.05, output=0.4, cached=0.005` | `reasoning, vision, tools` |
| `GPT_OSS_120B` | `openai` | `openai/gpt-oss-120b` | GPT OSS 120B | 128000 | 32000 | `(none)` | `reasoning, tools` |
| `GROK_CODE_FAST_1` | `xai` | `grok-code-fast-1` | Grok Code Fast 1 | 256000 | 32000 | `(none)` | `reasoning, tools` |
| `KIMI_K2_INSTRUCT` | `moonshotai` | `kimi-k2-instruct-0905` | Kimi K2 Instruct | 1000000 | 32000 | `(none)` | `tools` |
| `O3` | `openai` | `o3` | o3 | 200000 | 100000 | `input=2, output=8, cached=0.5` | `reasoning, tools` |
| `O3_MINI` | `openai` | `o3-mini` | o3-mini | 200000 | 100000 | `input=1.1, output=4.4, cached=0.55` | `reasoning, tools` |
| `OPENROUTER_GLM_4_6` | `openrouter` | `z-ai/glm-4.6` | OpenRouter GLM 4.6 | 131000 | 40000 | `(none)` | `tools` |
| `OPENROUTER_KIMI_K2_0905` | `openrouter` | `moonshotai/kimi-k2-0905` | Kimi K2 0905 (OpenRouter) | 262144 | 32000 | `(none)` | `tools` |
| `OPENROUTER_QWEN3_235B` | `openrouter` | `qwen/qwen3-235b-a22b-2507` | Qwen3 235B A22B (OpenRouter) | 262144 | 32000 | `(none)` | `tools` |
| `OPENROUTER_QWEN3_CODER_480B` | `openrouter` | `qwen/qwen3-coder` | Qwen3 Coder 480B (OpenRouter) | 262144 | 32000 | `(none)` | `tools` |
| `SONOMA_SKY_ALPHA` | `openrouter` | `sonoma-sky-alpha` | Sonoma Sky Alpha | 256000 | 32000 | `(none)` | `tools` |
| `Z_AI_GLM_4_7` | `cerebras` | `zai-glm-4.7` | Z.ai GLM 4.7 | 131000 | 40000 | `(none)` | `tools` |

## Amp-Relevant Absolute URLs
- `https://ampcode.com`
- `https://ampcode.com/`
- `https://ampcode.com/manual`
- `https://ampcode.com/manual#agent-skills`
- `https://ampcode.com/manual#ide`
- `https://ampcode.com/manual#jetbrains`
- `https://ampcode.com/manual#permissions`
- `https://ampcode.com/manual#toolboxes`
- `https://ampcode.com/manual/appendix#amp-cli-tmux`
- `https://ampcode.com/manual/appendix#permissions-reference`
- `https://ampcode.com/manual/appendix#toolboxes-reference`
- `https://ampcode.com/manual/sdk`
- `https://ampcode.com/models`
- `https://ampcode.com/news/large-mode`
- `https://ampcode.com/news/stick-a-fork-in-it`
- `https://ampcode.com/settings`
- `https://ampcode.com/threads/${J.id}`
- `https://ampcode.com/threads/${J}`
- `https://ampcode.com/threads/${Q}`
- `https://ampcode.com/threads/${V.id}`
- `https://ampcode.com/threads/${z.id}`
- `https://ampcode.com/threads/T-3f1beb2b-bded-4fda-96cc-1af7192f24b6`
- `https://ampcode.com/threads/T-5928a90d-d53b-488f-a829-4e36442142ee`
- `https://ampcode.com/threads/T-95e73a95-f4fe-4f22-8d5c-6297467c97a5`
- `https://ampcode.com/threads/T-f916b832-c070-4853-8ab3-5e7596953bec`
- `https://ampcode.com/threads/T-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`
- `https://openrouter.ai/api/v1`
- `https://production.ampworkers.com`
- `https://staging.ampworkers.com`
- `https://static.ampcode.com/schemas/permissions.schema.json`
- `https://static.ampcode.com/schemas/permissions.schema.json#/$defs/permissionMatchCondition`

## Likely Amp API Paths (String Literals)
- `/api/internal/github-auth-status`
- `/api/internal/github-proxy/${J}`
- `/api/internal?`
- `/api/provider/anthropic`
- `/api/provider/baseten/v1`
- `/api/provider/cerebras`
- `/api/provider/fireworks/v1`
- `/api/provider/google`
- `/api/provider/groq`
- `/api/provider/kimi`
- `/api/provider/openai/v1`
- `/api/provider/xai/v1`
- `/api/telemetry`
- `/api/threads/${J}`
- `/api/threads/${J}.md`
- `/api/threads/find?${V.toString()}`
- `/api/threads/find?${q.toString()}`
- `/api/threads/sync`
- `/api/threads?createdByUserID=${G}`
- `/rest/api/1.0/projects/${Q}/repos/${Z}/files?${w}`
- `/rest/api/1.0/projects/${U}/repos/${D}/commits?${O.join("&")}`
- `/rest/api/1.0/projects/${encodeURIComponent(Q)}/repos?${W}`
- `/rest/api/1.0/projects/${q}/repos/${W}/browse${w}${N}`
- `/rest/api/1.0/projects/${q}/repos/${W}/browse/${U}${B}`
- `/rest/api/1.0/projects/${q}/repos/${W}/compare/changes?from=${encodeURIComponent(Z)}&to=${encodeURIComponent(Y)}&limit=1000`
- `/rest/api/1.0/projects/${q}/repos/${W}/compare/commits?from=${encodeURIComponent(Z)}&to=${encodeURIComponent(Y)}&limit=100`
- `/rest/api/1.0/projects/${q}/repos/${W}/compare/diff?from=${encodeURIComponent(Z)}&to=${encodeURIComponent(Y)}&contextLines=3`
- `/rest/api/1.0/repos?${W}`

## Notes
- OpenRouter remains direct via `https://openrouter.ai/api/v1` while most providers are proxied via `/api/provider/*` paths.
- Provider enum key `BASENTEN` is spelled that way in this minified build, while its value is `baseten`.
