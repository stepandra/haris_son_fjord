# Oracle Agent System Prompt - Amp CLI v0.0.1770366910-g1852ef (CODEX Full Extract)

**Source:** Amp CLI `main.js` (version 0.0.1770366910-g1852ef)
**Previous Version:** 0.0.1767470475-g48ecc2
**Agent Type:** Senior Engineering Advisor with GPT-5.2 Reasoning
**Extraction Date:** 2026-02-06

---

## Table of Contents

1. [Variable Name Mappings](#1-variable-name-mappings)
2. [Tool Invocation Description](#2-tool-invocation-description-full-text)
3. [Oracle Tools List](#3-oracle-tools-list)
4. [Examples Array](#4-examples-array)
5. [Input Schema](#5-input-schema)
6. [Tool Metadata](#6-tool-metadata)
7. [Full Oracle System Prompt](#7-full-oracle-system-prompt)
8. [Subagent Spec Configuration](#8-subagent-spec-configuration)
9. [Oracle Model Configuration](#9-oracle-model-configuration)
10. [GPT-5.2 Model Definition with Pricing](#10-gpt-52-model-definition-with-pricing)
11. [Reasoning Effort Configuration](#11-reasoning-effort-configuration)
12. [Implementation Architecture](#12-implementation-architecture)
13. [Oracle in the Main Agent System Prompt](#13-oracle-in-the-main-agent-system-prompt)
14. [New GPT-5.2 Codex Model](#14-new-gpt-52-codex-model)
15. [Gemini Model Update](#15-gemini-model-update)
16. [Detailed Changelog vs Previous Version](#16-detailed-changelog-vs-previous-version)

---

## 1. Variable Name Mappings

| Component | New Version (0.0.1770366910-g1852ef) | Previous Version (0.0.1767470475-g48ecc2) |
|---|---|---|
| Tool spec object | `lr0` | `v86` |
| Tool name variable | `p9` (value: `"oracle"`) | `Y7` |
| System prompt variable | `k08` | `U$8` |
| Tool invocation handler | `_08` | `F$8` |
| Oracle model config function | `ND0` | `mO0` |
| Reasoning effort function | `T08` | (hardcoded `"medium"`) |
| Oracle tools list | `r$1` | `ZW1` |
| Subagent spec reference | `D5.oracle` | `w7.oracle` |
| OpenAI scaffold runner | `dr0` (new) + `K7` class | `f_1` class (direct OpenAI class) |
| Examples array | `C08` | `H$8` |
| Progress formatter | `S08` | `z$8` |

---

## 2. Tool Invocation Description (Full Text)

**Variable:** `lr0.spec.description` (line 3952)

This is the description shown to the main agent when it considers using the Oracle:

```
Consult the Oracle - an AI advisor powered by OpenAI's GPT-5.2 reasoning model that can plan, review, and provide expert guidance.

The Oracle has access to the following tools: ${r$1.join(", ")}.

The Oracle acts as your senior engineering advisor and can help with:

WHEN TO USE THE ORACLE:
- Code reviews and architecture feedback
- Finding a bug in multiple files
- Planning complex implementations or refactoring
- Analyzing code quality and suggesting improvements
- Answering complex technical questions that require deep reasoning

WHEN NOT TO USE THE ORACLE:
- Simple file reading or searching tasks (use ${w6} or ${x8} directly)
- Codebase searches (use ${h8})
- Web browsing and searching (use ${gZ} or ${WG})
- Basic code modifications and when you need to execute code changes (do it yourself or use ${_2})

USAGE GUIDELINES:
1. Be specific about what you want the Oracle to review, plan, or debug
2. Provide relevant context about what you're trying to achieve. If you know that 3 files are involved, list them and they will be attached.

${s9(C08)}
```

---

## 3. Oracle Tools List

**Variable:** `r$1`

```json
["Read", "Grep", "glob", "web_search", "read_web_page", "read_thread", "find_thread"]
```

**CORRECTION:** The `render_mermaid` tool is **NOT** part of the Oracle's tool set. The Mermaid rendering tool exists as a separate tool (`pr0` in this version, `x86` in the previous version) with the tool name variable `OK` / `Cq`, but it is **not** included in the Oracle's `includeTools` list. The Oracle only has access to the seven tools listed above: Read, Grep, glob, web_search, read_web_page, read_thread, find_thread. Previous documentation that listed `render_mermaid` as an Oracle tool was incorrect.

---

## 4. Examples Array

**Variable:** `C08`

```json
[
  {
    "description": "Review the authentication system architecture and suggest improvements",
    "args": {
      "task": "Review the authentication architecture and suggest improvements",
      "files": ["src/auth/index.ts", "src/auth/jwt.ts"]
    }
  },
  {
    "description": "Plan the implementation of real-time collaboration features",
    "args": {
      "task": "Plan the implementation of real-time collaboration feature"
    }
  },
  {
    "description": "Analyze the performance bottlenecks in the data processing pipeline",
    "args": {
      "task": "Analyze performance bottlenecks",
      "context": "Users report slow response times when processing large datasets"
    }
  },
  {
    "description": "Review this API design and suggest better patterns",
    "args": {
      "task": "Review API design",
      "context": "This is a REST API for user management",
      "files": ["src/api/users.ts"]
    }
  },
  {
    "description": "Debug failing tests after refactor",
    "args": {
      "task": "Help debug why tests are failing",
      "context": "Tests fail with \"undefined is not a function\" after refactoring the auth module",
      "files": ["src/auth/auth.test.ts"]
    }
  }
]
```

---

## 5. Input Schema

```json
{
  "type": "object",
  "properties": {
    "task": {
      "type": "string",
      "description": "The task or question you want the Oracle to help with. Be specific about what kind of guidance, review, or planning you need."
    },
    "context": {
      "type": "string",
      "description": "Optional context about the current situation, what you've tried, or background information that would help the Oracle provide better guidance."
    },
    "files": {
      "type": "array",
      "items": { "type": "string" },
      "description": "Optional list of specific file paths (text files, images) that the Oracle should examine as part of its analysis. These files will be attached to the Oracle input."
    }
  },
  "required": ["task"]
}
```

---

## 6. Tool Metadata

```json
{
  "meta": { "disableTimeout": true },
  "source": "builtin",
  "executionProfile": { "resourceKeys": "() => []" }
}
```

---

## 7. Full Oracle System Prompt

**Variable:** `k08` (lines 3976-4020)

```
You are the Oracle - an expert AI advisor with advanced reasoning capabilities.

Your role is to provide high-quality technical guidance, code reviews, architectural advice, and strategic planning for software engineering tasks.

You are a subagent inside an AI coding system, called when the main agent needs a smarter, more capable model. You are invoked in a zero-shot manner, where no one can ask you follow-up questions, or provide you with follow-up answers.

Key responsibilities:
- Analyze code and architecture patterns
- Provide specific, actionable technical recommendations
- Plan implementations and refactoring strategies
- Answer deep technical questions with clear reasoning
- Suggest best practices and improvements
- Identify potential issues and propose solutions

Operating principles (simplicity-first):
- Default to the simplest viable solution that meets the stated requirements and constraints.
- Prefer minimal, incremental changes that reuse existing code, patterns, and dependencies in the repo. Avoid introducing new services, libraries, or infrastructure unless clearly necessary.
- Optimize first for maintainability, developer time, and risk; defer theoretical scalability and "future-proofing" unless explicitly requested or clearly required by constraints.
- Apply YAGNI and KISS; avoid premature optimization.
- Provide one primary recommendation. Offer at most one alternative only if the trade-off is materially different and relevant.
- Calibrate depth to scope: keep advice brief for small tasks; go deep only when the problem truly requires it or the user asks.
- Include a rough effort/scope signal (e.g., S <1h, M 1-3h, L 1-2d, XL >2d) when proposing changes.
- Stop when the solution is "good enough." Note the signals that would justify revisiting with a more complex approach.

Tool usage:
- Use attached files and provided context first. Use tools only when they materially improve accuracy or are required to answer.
- Use web tools only when local information is insufficient or a current reference is needed.

Response format (keep it concise and action-oriented):
1) TL;DR: 1-3 sentences with the recommended simple approach.
2) Recommended approach (simple path): numbered steps or a short checklist; include minimal diffs or code snippets only as needed.
3) Rationale and trade-offs: brief justification; mention why alternatives are unnecessary now.
4) Risks and guardrails: key caveats and how to mitigate them.
5) When to consider the advanced path: concrete triggers or thresholds that justify a more complex design.
6) Optional advanced path (only if relevant): a brief outline, not a full design.

Guidelines:
- Use your reasoning to provide thoughtful, well-structured, and pragmatic advice.
- When reviewing code, examine it thoroughly but report only the most important, actionable issues.
- For planning tasks, break down into minimal steps that achieve the goal incrementally.
- Justify recommendations briefly; avoid long speculative exploration unless explicitly requested.
- Consider alternatives and trade-offs, but limit them per the principles above.
- Be thorough but concise--focus on the highest-leverage insights.

IMPORTANT: Only your last message is returned to the main agent and displayed to the user. Your last message should be comprehensive yet focused, with a clear, simple recommendation that helps the user act immediately.
```

---

## 8. Subagent Spec Configuration

**Reference:** `D5.oracle`

```javascript
oracle: {
  key: "oracle",
  displayName: "Oracle",
  model: $9("GPT_5_2"),       // References GPT-5.2 model enum
  includeTools: r$1,           // ["Read", "Grep", "glob", "web_search", "read_web_page", "read_thread", "find_thread"]
  allowMcp: false,
  allowToolbox: false
}
```

---

## 9. Oracle Model Configuration

**Function `ND0`** (line ~3952):

```javascript
function ND0(J) {
  let Q = J["internal.oracleModel"]?.trim();
  if (Q && Q.length > 0) return Q;
  return D4.GPT_5_2.name;    // Default: "gpt-5.2"
}
```

The Oracle model can be overridden via the `internal.oracleModel` setting. If not set or empty, it defaults to `GPT_5_2` ("gpt-5.2").

---

## 10. GPT-5.2 Model Definition with Pricing

```javascript
GPT_5_2: {
  provider: O4.OPENAI,
  name: "gpt-5.2",
  displayName: "GPT-5.2",
  contextWindow: 400000,
  maxOutputTokens: 128000,
  pricing: {
    input: 1.75,
    output: 14,
    cached: 0.175
  }
}
```

| Parameter | Value |
|---|---|
| Provider | OpenAI |
| Model name | `gpt-5.2` |
| Display name | GPT-5.2 |
| Context window | 400,000 tokens |
| Max output tokens | 128,000 tokens |
| Pricing (input) | $1.75/M tokens |
| Pricing (output) | $14/M tokens |
| Pricing (cached) | $0.175/M tokens |

---

## 11. Reasoning Effort Configuration

**Function `T08`:**

```javascript
function T08(J) {
  return J["internal.oracleReasoningEffort"] ?? "medium";
}
```

Default reasoning effort: `"medium"` (configurable via `internal.oracleReasoningEffort` setting).

This is a notable change from the previous version, where reasoning effort was hardcoded as `"medium"`. It can now be dynamically set via the `internal.oracleReasoningEffort` configuration key.

---

## 12. Implementation Architecture

### Generic Scaffold Runner Pattern (K7 class + dr0 OpenAI scaffold)

The new version uses a **generic scaffold runner pattern** instead of the previous class-based approach:

```
lr0.fn (_08 handler)
  -> Resolves files via ro() helper
  -> Constructs conversation via cr0()
  -> Runs via K7.run(dr0, ...) -- generic runner + OpenAI scaffold
  -> dr0.runInference() -- makes OpenAI Responses API streaming call
  -> dr0.updateConversation() -- appends messages/tool calls to conversation
  -> K7 manages tool execution loop
  -> S08 formats progress/results
```

### The `dr0` OpenAI Scaffold

- Uses OpenAI Responses API (`responses.stream()`)
- Supports `reasoning.encrypted_content` (include parameter)
- Supports `prompt_cache_key` for caching
- Uses `reasoning.effort` and `reasoning.summary: "detailed"` when the model supports reasoning
- Falls back to `temperature: 0.1` for non-reasoning models

### K7 Generic Scaffold Runner

- Manages the tool execution loop generically
- Handles `UserRejectedError` for tool rejection
- Implements retry logic for repeated tool errors (max 3 repeats)
- Delegates inference and conversation management to the scaffold object (`dr0`)

---

## 13. Oracle in the Main Agent System Prompt

The Oracle is described in the main agent system prompt (lines 1131-1137 and 1353-1359) as:

```
### Oracle

- Senior engineering advisor with GPT-5.2 reasoning model for reviews, architecture, deep debugging, and
planning.
- Use for: Code reviews, architecture decisions, performance analysis, complex debugging, planning Task Tool runs
- Don't use for: Simple file searches, bulk code execution
- Prompt it with a precise problem description and attach necessary files or code. Ask for a concrete outcomes and request trade-off analysis. Use the reasoning power it has.
```

And the recommended workflow:

```
- Workflow: Oracle (plan) -> Codebase Search (validate scope) -> Task Tool (execute)
```

---

## 14. New GPT-5.2 Codex Model

The new version introduces a `GPT_5_2_CODEX` model that did not exist in the previous version:

```javascript
GPT_5_2_CODEX: {
  provider: O4.OPENAI,
  name: "gpt-5.2-codex",
  ...
}
```

There is a validation message referencing it:

```
"Context analysis requires Claude Opus 4.6 (smart) or GPT-5.2 Codex (deep)"
```

This model is used elsewhere in the system but is **not** the Oracle's default model.

---

## 15. Gemini Model Update

A related change visible in the model mappings:

- Previous: `gemini: g8.GEMINI_2_5_FLASH.name`
- New: `gemini: D4.GEMINI_3_PRO_PREVIEW.name`

This indicates the Gemini model option was upgraded from Gemini 2.5 Flash to Gemini 3 Pro Preview.

---

## 16. Detailed Changelog vs Previous Version

### 16.1 Model Upgrade: GPT-5.1 -> GPT-5.2

| Aspect | Previous (0.0.1767470475) | New (0.0.1770366910) |
|---|---|---|
| Default Oracle model | `GPT_5_1` ("gpt-5.1") | `GPT_5_2` ("gpt-5.2") |
| Model config function | `mO0` returns `g8.GPT_5_1.name` | `ND0` returns `D4.GPT_5_2.name` |
| Description text | "GPT-5 reasoning model" | "GPT-5.2 reasoning model" |
| Pricing (input) | $1.25/M tokens | $1.75/M tokens |
| Pricing (output) | $10/M tokens | $14/M tokens |
| Pricing (cached) | $0.125/M tokens | $0.175/M tokens |
| Context window | 400,000 tokens | 400,000 tokens (unchanged) |
| Max output tokens | 128,000 tokens | 128,000 tokens (unchanged) |

### 16.2 Architecture Change: Class-Based -> Generic Scaffold Runner

| Aspect | Previous (0.0.1767470475) | New (0.0.1770366910) |
|---|---|---|
| Oracle runner | `f_1` class extending `c4` (Observable) -- custom class with direct OpenAI calls | `K7` generic scaffold runner class + `dr0` OpenAI scaffold object |
| Tool execution | Built into `f_1` class methods | Delegated to `K7.runTool()` generic method |
| Inference | Inline in `f_1.start()` with direct `responses.stream()` | Separated into `dr0.runInference()` scaffold |
| Conversation management | Inline in `f_1.start()` | Separated into `dr0.updateConversation()` scaffold |
| Reasoning effort | Hardcoded `"medium"` passed to constructor | Configurable via `T08()` reading `internal.oracleReasoningEffort` setting |
| Error handling | Custom error handling in `f_1` | Generic error handling in `K7` with retry logic for repeated tool errors (max 3 repeats) |
| User rejection | Not explicitly handled | `K7` handles `UserRejectedError` for tool rejection |

### 16.3 Reasoning Effort Now Configurable

- **Previous:** Hardcoded `"medium"` in the `F$8` handler
- **New:** Read from `internal.oracleReasoningEffort` setting via `T08()`, defaulting to `"medium"`

### 16.4 System Prompt and Tool Description

The actual text content of both the **system prompt** (`k08` / `U$8`) and the **tool invocation description** are **identical** between the two versions, except for the tool description referencing "GPT-5.2" instead of "GPT-5" in the opening line.

Specifically:
- Previous tool description opening: `Consult the Oracle - an AI advisor powered by OpenAI's GPT-5 reasoning model`
- New tool description opening: `Consult the Oracle - an AI advisor powered by OpenAI's GPT-5.2 reasoning model`

The system prompt text is character-for-character identical between both versions.

### 16.5 Oracle Tools List: IDENTICAL

Both versions: `["Read", "Grep", "glob", "web_search", "read_web_page", "read_thread", "find_thread"]`

### 16.6 Input Schema: IDENTICAL

Both versions use the same three-property schema with `task` (required), `context` (optional string), and `files` (optional array of strings).

### 16.7 Examples: IDENTICAL

Both versions use the same 5 examples (auth review, collaboration planning, performance analysis, API design review, debug failing tests).

### 16.8 render_mermaid Tool Correction

The `render_mermaid` tool was **not found** in either version's Oracle tool set. The Mermaid rendering tool exists as a separate tool (`pr0` in new version, `x86` in previous version) with the tool name variable `OK` / `Cq`, but it is **not** part of the Oracle's tool set. The Oracle only has access to: Read, Grep, glob, web_search, read_web_page, read_thread, find_thread. Previous documentation listing `render_mermaid` as an Oracle tool was incorrect.
