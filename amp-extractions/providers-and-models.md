# Amp Providers and Models

- Build: `0.0.1777185893-gae6d40`
- Source bundle: `npm-packages/0.0.1777185893-gae6d40/node_modules/@sourcegraph/amp/dist/main.js`

This is the simple provider/model catalog. The bundle also exposes a hidden CLI model override option: `--model` accepts `provider:model` and mode-specific forms like `smart=provider:model,deep=provider:model`. I did not find a public registry setting that directly changes the Oracle model; Oracle is wired in the subagent registry to `GPT_5_4` for this build.

## Providers

| Enum | Provider ID |
| --- | --- |
| `ANTHROPIC` | `anthropic` |
| `BASENTEN` | `baseten` |
| `CEREBRAS` | `cerebras` |
| `FIREWORKS` | `fireworks` |
| `GROQ` | `groq` |
| `MOONSHOT` | `moonshotai` |
| `OPENAI` | `openai` |
| `OPENROUTER` | `openrouter` |
| `VERTEXAI` | `vertexai` |
| `XAI` | `xai` |

## Models

| Key | Provider | Model Name | Display | Context | Max Output | Capabilities | Used By |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `CLAUDE_HAIKU_4_5` | `anthropic` | `claude-haiku-4-5-20251001` | Claude Haiku 4.5 | 200000 | 64000 | reasoning, vision, tools | `mode:rush`, `subagent:finder`, `subagent:codereview-check` |
| `CLAUDE_OPUS_4` | `anthropic` | `claude-opus-4-20250514` | Claude Opus 4 | 200000 | 32000 | reasoning, vision, tools |  |
| `CLAUDE_OPUS_4_1` | `anthropic` | `claude-opus-4-1-20250805` | Claude Opus 4.1 | 200000 | 32000 | reasoning, vision, tools |  |
| `CLAUDE_OPUS_4_5` | `anthropic` | `claude-opus-4-5-20251101` | Claude Opus 4.5 | 200000 | 32000 | reasoning, vision, tools |  |
| `CLAUDE_OPUS_4_6` | `anthropic` | `claude-opus-4-6` | Claude Opus 4.6 | 332000 | 32000 | reasoning, vision, tools | `mode:agg-man`, `mode:large`, `subagent:code-tour` |
| `CLAUDE_OPUS_4_7` | `anthropic` | `claude-opus-4-7` | Claude Opus 4.7 | 332000 | 32000 | reasoning, vision, tools | `mode:smart`, `mode:frontier` |
| `CLAUDE_SONNET_4` | `anthropic` | `claude-sonnet-4-20250514` | Claude Sonnet 4 | 1000000 | 32000 | reasoning, vision, tools |  |
| `CLAUDE_SONNET_4_5` | `anthropic` | `claude-sonnet-4-5-20250929` | Claude Sonnet 4.5 | 1000000 | 32000 | reasoning, vision, tools |  |
| `CLAUDE_SONNET_4_6` | `anthropic` | `claude-sonnet-4-6` | Claude Sonnet 4.6 | 1000000 | 64000 | reasoning, vision, tools | `subagent:librarian` |
| `BASETEN_KIMI_K2P5` | `baseten` | `moonshotai/Kimi-K2.5` | Kimi K2.5 | 262144 | 32000 | tools, vision |  |
| `Z_AI_GLM_4_7` | `cerebras` | `zai-glm-4.7` | Z.ai GLM 4.7 | 131000 | 40000 | tools |  |
| `FIREWORKS_GLM_4P6` | `fireworks` | `accounts/fireworks/models/glm-4p6` | GLM 4P6 | 162752 | 40000 | tools, reasoning |  |
| `FIREWORKS_GLM_5` | `fireworks` | `accounts/fireworks/models/glm-5` | GLM 5 | 202800 | 40000 | tools |  |
| `FIREWORKS_KIMI_K2_INSTRUCT` | `fireworks` | `accounts/fireworks/models/kimi-k2-instruct-0905` | Kimi K2 Instruct | 230144 | 32000 | tools |  |
| `FIREWORKS_MINIMAX_M2P5` | `fireworks` | `accounts/fireworks/models/minimax-m2p5` | MiniMax M2.5 | 200000 | 32000 | tools |  |
| `FIREWORKS_QWEN3_235B` | `fireworks` | `accounts/fireworks/models/qwen3-235b-a22b-instruct-2507` | Qwen3 235B | 230144 | 32000 | tools |  |
| `FIREWORKS_QWEN3_CODER_480B` | `fireworks` | `accounts/fireworks/models/qwen3-coder-480b-a35b-instruct` | Qwen3 Coder 480B | 230144 | 32000 | tools |  |
| `KIMI_K2_INSTRUCT` | `moonshotai` | `kimi-k2-instruct-0905` | Kimi K2 Instruct | 1000000 | 32000 | tools |  |
| `AMP_NOSTROMO` | `openai` | `amp-nostromo-v1` | nostromo | 400000 | 128000 | tools | `mode:nostromo` |
| `GPT_5` | `openai` | `gpt-5` | GPT-5 | 400000 | 128000 | reasoning, vision, tools |  |
| `GPT_5_1` | `openai` | `gpt-5.1` | GPT-5.1 | 400000 | 128000 | reasoning, vision, tools |  |
| `GPT_5_1_CODEX` | `openai` | `gpt-5.1-codex` | GPT-5.1 Codex | 400000 | 128000 | reasoning, tools |  |
| `GPT_5_2` | `openai` | `gpt-5.2` | GPT-5.2 | 400000 | 128000 | reasoning, vision, tools |  |
| `GPT_5_2_CODEX` | `openai` | `gpt-5.2-codex` | GPT-5.2 Codex | 400000 | 128000 | reasoning, tools, vision |  |
| `GPT_5_3_CODEX` | `openai` | `gpt-5.3-codex` | GPT-5.3 Codex | 400000 | 128000 | reasoning, tools, vision |  |
| `GPT_5_4` | `openai` | `gpt-5.4` | GPT-5.4 | 400000 | 128000 | reasoning, vision, tools | `mode:deep`, `subagent:oracle` |
| `GPT_5_4_PRO` | `openai` | `gpt-5.4-pro` | GPT-5.4-Pro | 1050000 | 128000 | reasoning, vision, tools |  |
| `GPT_5_5` | `openai` | `gpt-5.5` | GPT-5.5 | 400000 | 128000 | reasoning, vision, tools |  |
| `GPT_5_5_PRO` | `openai` | `gpt-5.5-pro` | GPT-5.5-Pro | 1050000 | 128000 | reasoning, vision, tools |  |
| `GPT_5_CODEX` | `openai` | `gpt-5-codex` | GPT-5 Codex | 400000 | 128000 | reasoning, tools |  |
| `GPT_5_MINI` | `openai` | `gpt-5-mini` | GPT-5 Mini | 400000 | 128000 | reasoning, vision, tools |  |
| `GPT_5_NANO` | `openai` | `gpt-5-nano` | GPT-5 Nano | 400000 | 128000 | reasoning, vision, tools |  |
| `GPT_OSS_120B` | `openai` | `openai/gpt-oss-120b` | GPT OSS 120B | 128000 | 32000 | reasoning, tools |  |
| `O3` | `openai` | `o3` | o3 | 200000 | 100000 | reasoning, tools |  |
| `O3_MINI` | `openai` | `o3-mini` | o3-mini | 200000 | 100000 | reasoning, tools |  |
| `OPENROUTER_GLM_4_6` | `openrouter` | `z-ai/glm-4.6` | OpenRouter GLM 4.6 | 131000 | 40000 | tools |  |
| `OPENROUTER_KIMI_K2_0905` | `openrouter` | `moonshotai/kimi-k2-0905` | Kimi K2 0905 (OpenRouter) | 262144 | 32000 | tools |  |
| `OPENROUTER_QWEN3_235B` | `openrouter` | `qwen/qwen3-235b-a22b-2507` | Qwen3 235B A22B (OpenRouter) | 262144 | 32000 | tools |  |
| `OPENROUTER_QWEN3_CODER_480B` | `openrouter` | `qwen/qwen3-coder` | Qwen3 Coder 480B (OpenRouter) | 262144 | 32000 | tools |  |
| `SONOMA_SKY_ALPHA` | `openrouter` | `sonoma-sky-alpha` | Sonoma Sky Alpha | 256000 | 32000 | tools |  |
| `GEMINI_3_1_PRO_PREVIEW` | `vertexai` | `gemini-3.1-pro-preview` | Gemini 3.1 Pro Preview | 1048576 | 65535 | tools, reasoning, vision | `subagent:code-review` |
| `GEMINI_3_PRO_IMAGE` | `vertexai` | `gemini-3-pro-image-preview` | Gemini 3 Pro Image | 1048576 | 65535 | vision, imageGeneration |  |
| `GEMINI_3_PRO_PREVIEW` | `vertexai` | `gemini-3-pro-preview` | Gemini 3 Pro Preview | 1048576 | 65535 | tools, reasoning, vision |  |
| `GEMINI3_FLASH_PREVIEW` | `vertexai` | `gemini-3-flash-preview` | Gemini 3 Flash Preview | 1048576 | 65535 | tools, reasoning, vision |  |
| `GROK_CODE_FAST_1` | `xai` | `grok-code-fast-1` | Grok Code Fast 1 | 256000 | 32000 | reasoning, tools |  |
