# Amp CLI Agent Tools Reference

**Source:** Amp CLI `main.js` version `0.0.1770366910-g1852ef` (~8.6MB minified)
**Extracted:** Complete tool definitions, input schemas, agent mode mappings, and model definitions

---

## Table of Contents

1. [Agent Modes & Tool Availability](#agent-modes--tool-availability)
2. [Subagent Modes & Tool Availability](#subagent-modes--tool-availability)
3. [Core Tools (Local Filesystem)](#core-tools-local-filesystem)
4. [Search & Navigation Tools](#search--navigation-tools)
5. [File Modification Tools](#file-modification-tools)
6. [Shell & Execution Tools](#shell--execution-tools)
7. [Web Tools](#web-tools)
8. [AI Sub-Agent Tools](#ai-sub-agent-tools)
9. [Thread & Memory Tools](#thread--memory-tools)
10. [Visualization Tools](#visualization-tools)
11. [GitHub Repository Tools](#github-repository-tools)
12. [Bitbucket Enterprise Repository Tools](#bitbucket-enterprise-repository-tools)
13. [User Interaction Tools](#user-interaction-tools)
14. [Code Quality Tools](#code-quality-tools)
15. [Image Tools](#image-tools)
16. [Miscellaneous Tools](#miscellaneous-tools)
17. [Tool Alias Mapping](#tool-alias-mapping)
18. [Deep Mode Aliases](#deep-mode-aliases)
19. [Model Definitions](#model-definitions)
20. [Complete Tool Name Index (Alphabetical)](#complete-tool-name-index-alphabetical)
21. [Changes from Previous Version](#changes-from-previous-version-001767470475-g48ecc2)

---

## Agent Modes & Tool Availability

### SMART Mode (Primary)
- **Key**: `smart`
- **Display Name**: Smart
- **Description**: "The most capable model and set of tools"
- **Primary Model**: CLAUDE_OPUS_4_6 (`claude-opus-4-6`)
- **Include Tools**: `Read`, `finder`, `Bash`, `repl`, `create_file`, `edit_file`, `undo_edit`, `web_search`, `read_web_page`, `task_list`, `read_thread`, `find_thread`, `skill`, `oracle`, `librarian`, `Task`, `Grep`, `glob`, `read_mcp_resource`, `mermaid`, `look_at`, `format_file`, `get_diagnostics`, `handoff`, `Check`, `painter`, `ask`, `save_memory`, `restore_snapshot`
- **Deferred Tools**: `code_review`, `walkthrough`, `walkthrough_diagram`
- **Allows MCP**: Yes (implied from main registration)
- **Allows Toolbox**: Yes (implied)

### FREE Mode
- **Key**: `free`
- **Display Name**: Free
- **Description**: "Amp Free"
- **Primary Model**: CLAUDE_HAIKU_4_5 (`claude-haiku-4-5-20251001`)
- **Include Tools**: `Read`, `Grep`, `glob`, `finder`, `Bash`, `create_file`, `edit_file`, `format_file`, `get_diagnostics`, `web_search`, `read_web_page`, `task_list`, `read_thread`, `find_thread`, `mermaid`, `skill`

### RUSH Mode
- **Key**: `rush`
- **Display Name**: Rush
- **Description**: "Faster and cheaper for small, well-defined tasks"
- **Primary Model**: CLAUDE_HAIKU_4_5 (`claude-haiku-4-5-20251001`)
- **Include Tools**: `Read`, `Grep`, `glob`, `finder`, `Bash`, `create_file`, `edit_file`, `format_file`, `undo_edit`, `get_diagnostics`, `web_search`, `read_web_page`, `read_mcp_resource`, `mermaid`, `read_thread`, `find_thread`, `skill`, `oracle`, `handoff`, `librarian`, `Task`, `task_list`, `look_at`, `Check`, `painter`

### LARGE Mode
- **Key**: `large`
- **Display Name**: Large
- **Description**: "The biggest context window possible (Sonnet 4.5 1M tokens), for large tasks"
- **Primary Model**: CLAUDE_SONNET_4_5 (`claude-sonnet-4-5-20250929`)
- **Include Tools**: Same as SMART mode
- **Deferred Tools**: `code_review`, `walkthrough`, `walkthrough_diagram`
- **Visible**: false (hidden mode)

### DEEP Mode
- **Key**: `deep`
- **Display Name**: Deep
- **Description**: "Deep reasoning with GPT-5.2 Codex"
- **Primary Model**: GPT_5_2_CODEX (`gpt-5.2-codex`)
- **Include Tools**: `Bash`, `apply_patch`, `web_search`, `read_web_page`, `skill`, `read_thread`
- **Deferred Tools**: `code_review`, `walkthrough`, `walkthrough_diagram`
- **Reasoning Effort**: `medium`

### BOMBADIL Mode
- **Key**: `bombadil`
- **Display Name**: Bombadil
- **Description**: "Old Tom Bombadil with Kimi K2.5 - experimental open model mode"
- **Primary Model**: FIREWORKS_KIMI_K2P5 (`accounts/fireworks/models/kimi-k2p5`)
- **Include Tools**: Same as SMART mode
- **Deferred Tools**: `code_review`, `walkthrough`, `walkthrough_diagram`
- **Visible**: false (hidden mode)

---

## Subagent Modes & Tool Availability

### Finder (Subagent)
- **Model**: CLAUDE_HAIKU_4_5
- **Include Tools**: `Grep`, `glob`, `Read`
- **Allow MCP**: false
- **Allow Toolbox**: false

### Oracle (Subagent)
- **Model**: GPT_5_2 (`gpt-5.2`)
- **Include Tools**: `Read`, `Grep`, `glob`, `web_search`, `read_web_page`, `read_thread`, `find_thread`
- **Allow MCP**: false
- **Allow Toolbox**: false

### Librarian (Subagent)
- **Model**: CLAUDE_HAIKU_4_5
- **Include Tools (GitHub)**: `read_github`, `search_github`, `commit_search`, `diff`, `list_directory_github`, `list_repositories`, `glob_github`
- **Include Tools (Bitbucket Enterprise)**: `read_bitbucket_enterprise`, `search_bitbucket_enterprise`, `commit_search_bitbucket_enterprise`, `diff_bitbucket_enterprise`, `list_directory_bitbucket_enterprise`, `list_repositories_bitbucket_enterprise`, `glob_bitbucket_enterprise`
- **Allow MCP**: false
- **Allow Toolbox**: false

### Task Subagent
- **Model**: Inherited from parent (undefined, uses parent model)
- **Include Tools**: `Grep`, `glob`, `Read`, `Bash`, `edit_file`, `create_file`, `format_file`, `read_web_page`, `get_diagnostics`, `web_search`, `finder`, `skill`, `task_list`
- **Allow MCP**: true
- **Allow Toolbox**: true

### Code Review (Subagent)
- **Model**: CLAUDE_SONNET_4_5
- **Include Tools**: `Read`, `Grep`, `glob`, `web_search`, `read_web_page`, `Bash`
- **Allow MCP**: false
- **Allow Toolbox**: false

### Codereview Check (Subagent)
- **Model**: CLAUDE_HAIKU_4_5
- **Include Tools**: `Read`, `Grep`, `glob`, `Bash`
- **Allow MCP**: false
- **Allow Toolbox**: false

### Walkthrough Planner (Subagent)
- **Model**: CLAUDE_SONNET_4_5
- **Include Tools**: `Read`, `Grep`, `glob`, `finder`

---

## Core Tools (Local Filesystem)

### 1. Read
- **Tool Name**: `Read`
- **Variable**: `w6`
- **Source**: builtin
- **Description**: Read a file or list a directory from the file system. If the path is a directory, it returns a line-numbered list of entries. If the file or directory doesn't exist, an error is returned. If you don't know the exact file path, use the `glob` tool to look up filenames by glob pattern. The contents are returned with each line prefixed by its line number. For example, if a file has contents "abc\n", you will receive "1: abc\n". For directories, entries are returned one per line (without line numbers) with a trailing "/" for subdirectories. This tool can read images (such as PNG, JPEG, and GIF files) and present them to the model visually. When possible, call this tool in parallel for all files you will want to read. Avoid tiny repeated slices (e.g., 50-line chunks). If you need more context from the same file, read a larger range or the full default window instead.
- **Input Schema**:
  ```json
  {
    "type": "object",
    "properties": {
      "path": {
        "type": "string",
        "description": "The absolute path to the file or directory (MUST be absolute, not relative)."
      },
      "read_range": {
        "type": "array",
        "items": { "type": "number" },
        "minItems": 2,
        "maxItems": 2,
        "description": "An array of two integers specifying the start and end line numbers to view. Line numbers are 1-indexed. If not provided, defaults to [1, 1000]. Examples: [500, 700], [700, 1400]"
      }
    },
    "required": ["path"]
  }
  ```
- **Execution Profile**: Resource key based on path (read mode)
- **Available to**: All agent modes

### 2. glob
- **Tool Name**: `glob`
- **Variable**: `qG`
- **Source**: builtin
- **Description**: Fast file pattern matching tool that works with any codebase size. Use this tool to find files by name patterns across your codebase. It returns matching file paths sorted by most recent modification time first.
- **File Pattern Syntax**:
  - `**/*.js` - All JavaScript files in any directory
  - `src/**/*.ts` - All TypeScript files under the src directory
  - `*.json` - All JSON files in the current directory
  - `**/*test*` - All files with "test" in their name
  - `web/src/**/*` - All files under the web/src directory
  - `**/*.{js,ts}` - All JavaScript and TypeScript files
  - `src/[a-z]*/*.ts` - TypeScript files in src subdirectories starting with lowercase
- **Input Schema**:
  ```json
  {
    "type": "object",
    "properties": {
      "filePattern": {
        "type": "string",
        "description": "Glob pattern like \"**/*.js\" or \"src/**/*.ts\" to match files"
      },
      "limit": {
        "type": "number",
        "description": "Maximum number of results to return"
      },
      "offset": {
        "type": "number",
        "description": "Number of results to skip (for pagination)"
      }
    },
    "required": ["filePattern"],
    "additionalProperties": false
  }
  ```
- **Available to**: All agent modes

---

## Search & Navigation Tools

### 3. Grep
- **Tool Name**: `Grep`
- **Variable**: `x8`
- **Source**: builtin
- **Description**: Search for exact text patterns in files using ripgrep, a fast keyword search tool.
  - **When to use**: Finding exact text matches (variable names, function calls, specific strings). Use `finder` for semantic/conceptual searches.
  - **Strategy**: Use 'path' or 'glob' to narrow searches; run multiple focused calls rather than one broad search. Uses Rust-style regex (escape `{` and `}`); use `literal: true` for literal text search.
  - **Constraints**: Results limited to 100 matches (up to 10 per file). Lines truncated at 200 characters.
  - **Complementary to finder**: Use `finder` first to locate relevant code concepts, then use `Grep` to find specific implementations.
- **Input Schema**:
  ```json
  {
    "type": "object",
    "properties": {
      "pattern": {
        "type": "string",
        "description": "The pattern to search for (regex)"
      },
      "path": {
        "type": "string",
        "description": "The file or directory path to search in. Cannot be used with glob."
      },
      "glob": {
        "type": "string",
        "description": "The glob pattern to search for. Cannot be used with path."
      },
      "caseSensitive": {
        "type": "boolean",
        "description": "Whether to search case-sensitively"
      },
      "literal": {
        "type": "boolean",
        "description": "Whether to treat the pattern as a literal string instead of a regex"
      }
    },
    "required": ["pattern"]
  }
  ```
- **Available to**: All agent modes

### 4. finder
- **Tool Name**: `finder`
- **Variable**: `h8`
- **Source**: builtin
- **Disable Timeout**: true
- **Description**: Intelligently search your codebase: Use it for complex, multi-step search tasks where you need to find code based on functionality or concepts rather than exact matches. Anytime you want to chain multiple grep calls you should use this tool.
  - **WHEN TO USE**: Locate code by behavior or concept; run multiple greps in sequence; correlate or look for connection between several areas of the codebase; filter broad terms by context; answer questions like "Where do we validate JWT authentication headers?"
  - **WHEN NOT TO USE**: When you know the exact file path (use Read directly); when looking for specific symbols (use glob or Grep); when you need to create/modify files or run terminal commands.
  - **USAGE GUIDELINES**: Always spawn multiple search agents in parallel; formulate queries as precise engineering requests; name concrete artifacts, patterns, or APIs; state explicit success criteria; never issue vague or exploratory commands.
- **Input Schema**:
  ```json
  {
    "type": "object",
    "properties": {
      "query": {
        "type": "string",
        "description": "The search query describing to the agent what it should. Be specific and include technical terms, file types, or expected code patterns to help the agent find relevant code."
      }
    },
    "required": ["query"]
  }
  ```
- **Implementation**: Runs a sub-agent (Finder) using CLAUDE_HAIKU_4_5 with tools: Grep, glob, Read
- **Available to**: Smart, Rush, Free modes (and Task subagent)

---

## File Modification Tools

### 5. edit_file
- **Tool Name**: `edit_file`
- **Variable**: `m8`
- **Source**: builtin
- **Description**: Make edits to a text file. Replaces `old_str` with `new_str` in the given file. Returns a git-style diff showing the changes made as formatted markdown, along with the line range ([startLine, endLine]) of the changed content. The diff is also shown to the user.
  - The file specified by `path` MUST exist, and it MUST be an absolute path. If you need to create a new file, use `create_file` instead.
  - `old_str` MUST exist in the file. Use tools like `Read` to understand files before editing.
  - `old_str` and `new_str` MUST be different from each other.
  - Set `replace_all` to true to replace all occurrences. Otherwise, `old_str` MUST be unique within the file or the edit will fail.
  - If you need to replace the entire contents, use `create_file` instead.
- **Input Schema** (via Zod):
  ```json
  {
    "type": "object",
    "properties": {
      "path": {
        "type": "string",
        "description": "The absolute path to the file (MUST be absolute, not relative). File must exist. ALWAYS generate this argument first."
      },
      "old_str": {
        "type": "string",
        "description": "Text to search for. Must match exactly."
      },
      "new_str": {
        "type": "string",
        "description": "Text to replace old_str with."
      },
      "replace_all": {
        "type": "boolean",
        "default": false,
        "description": "Set to true to replace all matches of old_str. Else, old_str must be an unique match."
      }
    },
    "required": ["path", "old_str", "new_str"]
  }
  ```
- **Execution Profile**: Resource key based on path (write mode)
- **Available to**: Smart, Rush, Free, Task subagent

### 6. create_file
- **Tool Name**: `create_file`
- **Variable**: `O9`
- **Source**: builtin
- **Description**: Create or overwrite a file in the workspace. Use this tool to create a **new file** that does not yet exist. For **existing files**, prefer `edit_file` instead -- even for extensive changes. Only use `create_file` to overwrite an existing file when you are replacing nearly all of its content AND the file is small (under ~250 lines).
- **Input Schema**:
  ```json
  {
    "type": "object",
    "properties": {
      "path": {
        "type": "string",
        "description": "The absolute path of the file to be created (must be absolute, not relative). If the file exists, it will be overwritten. ALWAYS generate this argument first."
      },
      "content": {
        "type": "string",
        "description": "The content for the file."
      }
    },
    "required": ["path", "content"]
  }
  ```
- **Preprocessing**: Automatically adds trailing newline if missing
- **Available to**: Smart, Rush, Free, Task subagent

### 7. apply_patch
- **Tool Name**: `apply_patch`
- **Variable**: `gC`
- **Source**: builtin
- **Description**: Apply a patch to one or more files using the Codex patch format. This tool is preferred for single file edits in deep mode. Do not use it for auto-generated changes or when scripting is more efficient.
  - **You MUST read the file before applying a patch to it.** Even if you already read it, read it again before applying a patch.
  - **Patch Format**: Must be wrapped in `*** Begin Patch` and `*** End Patch` markers.
  - **Operations**: `*** Add File: <path>`, `*** Delete File: <path>`, `*** Update File: <path>` (optionally with `*** Move to:`)
  - **Rules**: Include at least 3-5 context lines; for Add File: every content line MUST start with `+`; for Update File: lines start with ` ` (context), `-` (remove), or `+` (add); use multiple `@@` blocks; use `*** End of File` marker to anchor at end.
- **Input Schema** (via Zod):
  ```json
  {
    "type": "object",
    "properties": {
      "patchText": {
        "type": "string",
        "description": "The full patch text that describes all changes to be made"
      }
    },
    "required": ["patchText"]
  }
  ```
- **Examples**:
  - Add a new file
  - Simple update with context
  - Multiple `@@` blocks to skip intervening code
  - Editing content within jj conflict markers
  - Deleting a file
  - Moving/renaming a file with changes
- **Available to**: Deep mode

### 8. undo_edit
- **Tool Name**: `undo_edit`
- **Variable**: `KL`
- **Source**: builtin
- **Description**: Undo the last edit made to a file. This command reverts the most recent edit made to the specified file. It will restore the file to its state before the last edit was made. Returns a git-style diff showing the changes that were undone as formatted markdown.
- **Input Schema**:
  ```json
  {
    "type": "object",
    "properties": {
      "path": {
        "type": "string",
        "description": "The absolute path to the file whose last edit should be undone (must be absolute, not relative)"
      }
    },
    "required": ["path"]
  }
  ```
- **Available to**: Smart, Rush

### 9. format_file
- **Tool Name**: `format_file`
- **Variable**: `ud`
- **Source**: builtin
- **Description**: Format a file using VS Code's formatter. This tool is only available when running in VS Code. It returns a git-style diff showing the changes made as formatted markdown. IMPORTANT: Use this after making large edits to files. IMPORTANT: Consider the return value when making further changes to the same file. Formatting might have changed the code structure.
- **Input Schema**:
  ```json
  {
    "type": "object",
    "properties": {
      "path": {
        "type": "string",
        "description": "The absolute path to the file to format (must be absolute, not relative)"
      }
    },
    "required": ["path"]
  }
  ```
- **Available to**: Smart, Rush, Free, Task subagent

### 10. restore_snapshot
- **Tool Name**: `restore_snapshot`
- **Variable**: `td`
- **Source**: builtin
- **Description**: Restore a file or directory to a previous snapshot state. Use this tool to restore files to a previous state captured in a git tree snapshot. The snapshot OIDs are provided in the `# User State` section of user messages.
- **Input Schema**:
  ```json
  {
    "type": "object",
    "properties": {
      "path": {
        "type": "string",
        "description": "The file or directory path to restore. Use \".\" to restore the entire workspace."
      },
      "treeOID": {
        "type": "string",
        "description": "The git tree OID from a previous snapshot to restore from."
      }
    },
    "required": ["path", "treeOID"]
  }
  ```
- **Examples**:
  - Restore a single file: `{"path": "src/main.ts", "treeOID": "abc123..."}`
  - Restore an entire directory: `{"path": "src/components", "treeOID": "abc123..."}`
  - Restore the entire workspace: `{"path": ".", "treeOID": "abc123..."}`
- **Note**: Only registered when `experimental.autoSnapshot` setting is enabled
- **Available to**: Smart mode (experimental)

---

## Shell & Execution Tools

### 11. Bash
- **Tool Name**: `Bash`
- **Variable**: `k9`
- **Source**: builtin
- **Disable Timeout**: true
- **Serial Execution**: true (via execution profile)
- **Description**: Executes the given shell command using bash (or sh on systems without bash).
  - Do NOT chain commands with `;` or `&&` or use `&` for background processes; make separate tool calls instead
  - Do NOT use interactive commands (REPLs, editors, password prompts)
  - Output is truncated to the last 50000 characters
  - Environment variables and `cd` do not persist between commands; use the `cwd` parameter instead
  - Commands run in the workspace root by default
  - ALWAYS quote file paths
  - Use `finder`/`Grep` instead of find/grep, `Read` instead of cat, `edit_file` instead of sed
  - Only run `git commit` and `git push` if explicitly instructed
- **Input Schema**:
  ```json
  {
    "type": "object",
    "properties": {
      "cmd": {
        "type": "string",
        "description": "The shell command to execute"
      },
      "cwd": {
        "type": "string",
        "description": "Absolute path to a directory where the command will be executed (must be absolute, not relative)"
      }
    },
    "required": ["cmd"]
  }
  ```
- **Deep Mode Alias**: In deep mode, aliased as `shell_command` with schema:
  ```json
  {
    "type": "object",
    "properties": {
      "command": { "type": "string", "description": "Shell command to execute." },
      "workdir": { "type": "string", "description": "Optional working directory to run the command in; defaults to the turn cwd." },
      "login": { "type": "boolean", "description": "Whether to run the shell with login shell semantics. Defaults to true." },
      "timeout_ms": { "type": "number", "description": "The timeout for the command in milliseconds" }
    },
    "required": ["command"],
    "additionalProperties": false
  }
  ```
- **Available to**: All agent modes (Smart, Rush, Free, Deep, Task subagent)

### 12. repl
- **Tool Name**: `repl`
- **Variable**: `rd`
- **Source**: builtin
- **Disable Timeout**: true
- **Description**: Start a REPL (Read-Eval-Print Loop) subprocess and use an agent to interact with it to accomplish an objective.
  - Spawns a REPL process and runs an autonomous agent loop
  - **WHEN TO USE**: Interactively explore a database (psql, mysql, sqlite3, redis-cli); test code snippets in a REPL (node, python3, irb, ghci); interact with any command-line tool with REPL interface; tasks requiring multiple back-and-forth interactions
  - **WHEN NOT TO USE**: Simple one-off commands (use Bash instead); no interactive exploration needed; command exits immediately
  - **IMPORTANT**: Agent text responses are sent DIRECTLY to REPL stdin; subprocess HAS NO PTY; REPL process terminated when agent stops
- **Input Schema**:
  ```json
  {
    "type": "object",
    "properties": {
      "binary": {
        "type": "string",
        "description": "The REPL binary to run (e.g., \"node\", \"python\", \"psql\", \"redis-cli\")"
      },
      "args": {
        "type": "array",
        "items": { "type": "string" },
        "description": "Arguments to pass to the REPL binary"
      },
      "objective": {
        "type": "string",
        "description": "What you want to accomplish in the REPL session"
      },
      "replDescription": {
        "type": "string",
        "description": "A description of the REPL being used (e.g., \"Node.js JavaScript REPL\", \"PostgreSQL database shell\")"
      },
      "workingDirectory": {
        "type": "string",
        "description": "The working directory to run the REPL in (absolute path)"
      },
      "initialOutputTimeoutMs": {
        "type": "number",
        "description": "Timeout in milliseconds to wait for initial REPL output. Only set this if the REPL fails to start due to a timeout."
      }
    },
    "required": ["binary", "objective", "replDescription"]
  }
  ```
- **Note**: Only registered when `repl` is in `experimental.tools` setting
- **Available to**: Smart mode (experimental, when enabled)

---

## Web Tools

### 13. web_search
- **Tool Name**: `web_search`
- **Variable**: `WG`
- **Source**: builtin
- **Description**: Search the web for information relevant to a research objective. Use when you need up-to-date or precise documentation. Use `read_web_page` to fetch full content from a specific URL.
- **Input Schema**:
  ```json
  {
    "type": "object",
    "properties": {
      "objective": {
        "type": "string",
        "description": "A natural-language description of the broader task or research goal, including any source or freshness guidance"
      },
      "search_queries": {
        "type": "array",
        "items": { "type": "string" },
        "description": "Optional keyword queries to ensure matches for specific terms are prioritized (recommended for best results)"
      },
      "max_results": {
        "type": "number",
        "description": "The maximum number of results to return (default: configurable)"
      }
    },
    "required": ["objective"]
  }
  ```
- **Examples**:
  - See usage documentation for newly released library features
- **Available to**: Smart, Rush, Free, Oracle, Task subagent, Code Review, Deep

### 14. read_web_page
- **Tool Name**: `read_web_page`
- **Variable**: `gZ`
- **Source**: builtin
- **Description**: Read the contents of a web page at a given URL. When only the url parameter is set, it returns the contents of the webpage converted to Markdown. When an objective is provided, it returns excerpts relevant to that objective. If the user asks for the latest or recent contents, pass `forceRefetch: true`. Do NOT use for access to localhost or any other local or non-Internet-accessible URLs; use `curl` via Bash instead.
- **Input Schema**:
  ```json
  {
    "type": "object",
    "properties": {
      "url": {
        "type": "string",
        "description": "The URL of the web page to read"
      },
      "objective": {
        "type": "string",
        "description": "A natural-language description of the research goal. If set, only relevant excerpts will be returned. If not set, the full content of the web page will be returned."
      },
      "forceRefetch": {
        "type": "boolean",
        "description": "Force a live fetch of the URL (default: use a cached version that may be a few days old)"
      }
    },
    "required": ["url"]
  }
  ```
- **Content truncation**: 256KB maximum
- **Available to**: Smart, Rush, Free, Oracle, Task subagent, Code Review, Deep

---

## AI Sub-Agent Tools

### 15. Task (Subagent)
- **Tool Name**: `Task`
- **Variable**: `_2`
- **Source**: builtin
- **Disable Timeout**: true
- **Description**: Perform a task (a sub-task of the user's overall task) using a sub-agent that has access to: Grep, glob, Read, Bash, edit_file, create_file, format_file, read_web_page, get_diagnostics, web_search, finder, skill, task_list.
  - **When to use**: Complex multi-step tasks; operations producing lots of output tokens not needed after; changes across many layers after planning; when user asks to launch an "agent"
  - **When NOT to use**: Single logical task; reading a single file; performing text search; editing a single file; not sure what changes to make
  - **How to use**: Run multiple sub-agents concurrently if tasks are independent; include all necessary context and a detailed plan; tell sub-agent how to verify work; show user concise summary of result
- **Input Schema**:
  ```json
  {
    "type": "object",
    "properties": {
      "prompt": {
        "type": "string",
        "description": "The task for the agent to perform. Be specific about what needs to be done and include any relevant context."
      },
      "description": {
        "type": "string",
        "description": "A very short description of the task that can be displayed to the user."
      }
    },
    "required": ["prompt", "description"]
  }
  ```
- **Available to**: Smart, Rush

### 16. oracle
- **Tool Name**: `oracle`
- **Variable**: `p9`
- **Source**: builtin
- **Disable Timeout**: true
- **Description**: Consult the Oracle - an AI advisor powered by OpenAI's GPT-5.2 reasoning model that can plan, review, and provide expert guidance.
  - The Oracle has access to tools: Read, Grep, glob, web_search, read_web_page, read_thread, find_thread
  - **WHEN TO USE**: Code reviews and architecture feedback; finding bugs in multiple files; planning complex implementations; analyzing code quality; answering complex technical questions requiring deep reasoning
  - **WHEN NOT TO USE**: Simple file reading (use Read/Grep directly); codebase searches (use finder); web browsing (use read_web_page/web_search); basic code modifications (use edit_file/Task)
- **Input Schema**:
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
        "description": "Optional context about the current situation, what you've tried, or background information."
      },
      "files": {
        "type": "array",
        "items": { "type": "string" },
        "description": "Optional list of specific file paths (text files, images) that the Oracle should examine."
      }
    },
    "required": ["task"]
  }
  ```
- **Available to**: Smart, Rush

### 17. librarian
- **Tool Name**: `librarian`
- **Variable**: `R$`
- **Source**: builtin
- **Disable Timeout**: true
- **Description**: The Librarian - a specialized codebase understanding agent. Explores repositories for deep analysis and comprehensive explanations across repositories.
  - Ideal for complex, multi-step analysis tasks understanding code architecture across multiple repositories.
  - **WHEN TO USE**: Understanding complex multi-repo codebases; exploring relationships between repos; analyzing architectural patterns; finding implementations across multiple codebases; understanding code evolution; getting comprehensive explanations
  - **WHEN NOT TO USE**: Simple local file reading; local codebase searches; code modifications; non-repo questions
  - **USAGE GUIDELINES**: Be specific about repositories; provide context; expect detailed documentation-quality responses; show full answers (don't summarize)
- **Input Schema**:
  ```json
  {
    "type": "object",
    "properties": {
      "query": {
        "type": "string",
        "description": "Your question about the codebase. Be specific about what you want to understand or explore."
      },
      "context": {
        "type": "string",
        "description": "Optional context about what you're trying to achieve or background information."
      }
    },
    "required": ["query"]
  }
  ```
- **Librarian Tools**: read_github, search_github, commit_search, diff, list_directory_github, list_repositories, glob_github (plus Bitbucket Enterprise equivalents)
- **Available to**: Smart, Rush

---

## Thread & Memory Tools

### 18. read_thread
- **Tool Name**: `read_thread`
- **Variable**: `VL`
- **Source**: builtin
- **Description**: Read and extract relevant content from another Amp thread by its ID. Fetches a thread (locally or from the server if synced), renders it as markdown, and uses AI to extract only the information relevant to your specific goal.
  - **When to use**: User pastes/references an Amp thread URL; user references a thread ID (T-xxx format); user asks to apply the same approach from a thread
  - **When NOT to use**: No thread ID mentioned; working within current thread
- **Input Schema**:
  ```json
  {
    "type": "object",
    "properties": {
      "threadID": {
        "type": "string",
        "description": "The thread ID in format T-{uuid} (e.g., \"T-a38f981d-52da-47b1-818c-fbaa9ab56e0c\")"
      },
      "goal": {
        "type": "string",
        "description": "A clear description of what information you need from the thread. Be specific about what to extract."
      }
    },
    "required": ["threadID", "goal"]
  }
  ```
- **Available to**: Smart, Rush, Free, Oracle, Deep

### 19. find_thread
- **Tool Name**: `find_thread`
- **Variable**: `hd`
- **Source**: builtin
- **Description**: Find Amp threads (conversation threads with the agent) using a query DSL. Searches Amp threads, NOT git commits.
  - **Query Syntax**:
    - Keywords: Bare words or quoted phrases: `auth` or `"race condition"`
    - File filter: `file:path` (e.g., `file:src/auth/login.ts`)
    - Repo filter: `repo:url` (e.g., `repo:github.com/owner/repo`)
    - Author filter: `author:name` (e.g., `author:alice` or `author:me`)
    - Date filters: `after:date` and `before:date` (ISO dates, relative: `7d`, `2w`)
    - Task filter: `task:id` (e.g., `task:142`, `task:142+` for deps, `task:142^` for dependents)
    - Cluster filter: `cluster_of:id`
    - Combine filters with implicit AND
  - **When NOT to use**: Git commits/history/blame -> use git commands; finding WHO made changes -> use git log
- **Input Schema**:
  ```json
  {
    "type": "object",
    "properties": {
      "query": {
        "type": "string",
        "description": "Search query using DSL syntax. Supports keywords, file:path, repo:url, author:name, after:date, before:date, task:id, and cluster_of:id filters."
      },
      "limit": {
        "type": "number",
        "description": "Maximum number of threads to return. Defaults to 20."
      }
    },
    "required": ["query"]
  }
  ```
- **Available to**: Smart, Rush, Free, Oracle

### 20. save_memory
- **Tool Name**: `save_memory`
- **Variable**: `dD`
- **Source**: builtin
- **Serial Execution**: true
- **Description**: Save a fact or preference to long-term memory that persists across sessions.
  - Use when the user explicitly asks you to remember something, or states a clear preference worth retaining
  - Facts should be short, self-contained statements (e.g., "Prefers tabs over spaces", "Project uses pnpm")
  - If unsure whether to save, ask the user "Should I remember that for you?"
  - Not for transient conversational context only relevant to the current session
- **Input Schema**:
  ```json
  {
    "type": "object",
    "properties": {
      "fact": {
        "type": "string",
        "description": "The specific fact or piece of information to remember. Should be a clear, self-contained statement."
      }
    },
    "required": ["fact"]
  }
  ```
- **Implementation**: Writes to `AGENTS.md` file in workspace under `## Memories` section
- **Note**: Only registered when `save_memory` is in `experimental.tools` setting
- **Available to**: Smart mode (experimental, when enabled)

### 21. handoff
- **Tool Name**: `handoff`
- **Variable**: `rW0`
- **Source**: builtin
- **Description**: Hand off work to a new thread that runs in the background.
  - Use when current thread is too long; want to start new focused task preserving context; context window near capacity
  - When called: new thread created with relevant context; new thread starts in background; current thread continues
  - Set `follow: true` to navigate to new thread when current thread is stopping
- **Input Schema**:
  ```json
  {
    "type": "object",
    "properties": {
      "goal": {
        "type": "string",
        "description": "A short description of the next task to accomplish in the new thread. Should be a single sentence or at most one paragraph."
      },
      "follow": {
        "type": "boolean",
        "default": false,
        "description": "If true, navigate to the new thread after creation."
      },
      "mode": {
        "type": "string",
        "description": "The agent mode for the new thread. Defaults to the current thread's agent mode if not specified."
      }
    },
    "required": ["goal", "follow"]
  }
  ```
- **Available to**: Smart, Rush

---

## Visualization Tools

### 22. mermaid
- **Tool Name**: `mermaid`
- **Variable**: `OK`
- **Source**: builtin
- **Description**: Renders a Mermaid diagram from the provided code. PROACTIVELY USE DIAGRAMS when they would better convey information than prose alone.
  - Create diagrams WITHOUT being explicitly asked for: system architecture, workflows, data flows, user journeys, algorithms, class hierarchies, entity relationships, state transitions, event sequences
  - **Citations**: Always include `citations` to make diagram elements clickable; keys are node IDs or edge labels; values are file:// URIs with optional line range
  - **Styling**: Use DARK fill colors with light stroke/text colors
- **Input Schema**:
  ```json
  {
    "type": "object",
    "properties": {
      "code": {
        "type": "string",
        "description": "The Mermaid diagram code to render (DO NOT override with custom colors/styles, DO NOT use HTML tags in node labels)"
      },
      "citations": {
        "type": "object",
        "description": "REQUIRED: Map of citation keys to file:// URIs for clickable code navigation. Keys can be node IDs or edge labels. Use {} if no code references apply.",
        "additionalProperties": { "type": "string" }
      }
    },
    "required": ["code", "citations"]
  }
  ```
- **Available to**: Smart, Rush, Free

### 23. walkthrough
- **Tool Name**: `walkthrough`
- **Variable**: `gW0`
- **Source**: builtin
- **Disable Timeout**: true
- **Description**: Create an interactive walkthrough diagram for exploring a topic in the codebase. Invokes a planner subagent to explore the codebase, creates a diagram structure with detailed "deep dive" content for each node, returns a complete diagram where clicking nodes shows their deep dive content.
  - The planner has access to: Read, Grep, glob, finder
  - After receiving the result, call `walkthrough_diagram` with the returned diagram
- **Input Schema**:
  ```json
  {
    "type": "object",
    "properties": {
      "topic": {
        "type": "string",
        "description": "The topic or question to create a walkthrough for. Be specific about what aspect of the codebase to explore."
      },
      "context": {
        "type": "string",
        "description": "Optional additional context about what the user wants to understand."
      }
    },
    "required": ["topic"]
  }
  ```
- **Available to**: Smart (deferred), Rush (deferred)

### 24. walkthrough_diagram
- **Tool Name**: `walkthrough_diagram`
- **Variable**: `fd`
- **Source**: builtin
- **Description**: Renders an interactive Mermaid diagram where users can click on nodes to see detailed information or navigate to related documentation.
  - Useful for: architecture diagrams, system overviews, code structure visualizations, workflow diagrams
  - Node IDs in `nodes` must match IDs in mermaid code
  - Each node can have: `title`, `description`, `links`, `codeSnippet`, `threadID`
  - **Styling**: Do NOT add colors, classDefs, or styles; UI handles theming automatically
  - **ALWAYS include the `message` from the result** in your response
- **Input Schema**:
  ```json
  {
    "type": "object",
    "properties": {
      "code": {
        "type": "string",
        "description": "The Mermaid diagram code to render without overrides or modifications to styling."
      },
      "summary": {
        "type": "string",
        "description": "A one-sentence summary describing what this diagram illustrates"
      },
      "nodes": {
        "type": "object",
        "description": "Metadata for clickable nodes, keyed by node ID from the mermaid code",
        "additionalProperties": {
          "type": "object",
          "properties": {
            "title": { "type": "string", "description": "Display title for the node" },
            "description": { "type": "string", "description": "Detailed description shown when node is selected" },
            "links": {
              "type": "array",
              "description": "Related files or documentation links",
              "items": {
                "type": "object",
                "properties": {
                  "label": { "type": "string" },
                  "url": { "type": "string" }
                },
                "required": ["label", "url"]
              }
            },
            "codeSnippet": { "type": "string", "description": "Optional code snippet to display" },
            "threadID": { "type": "string", "description": "Thread ID of a subthread that explores this node in detail" }
          },
          "required": ["title", "description"]
        }
      }
    },
    "required": ["code", "nodes"]
  }
  ```
- **Available to**: Smart (deferred), Rush (deferred)

---

## GitHub Repository Tools

These tools are used by the **Librarian** subagent to interact with GitHub repositories.

### 25. read_github
- **Tool Name**: `read_github`
- **Variable**: `dd`
- **Source**: builtin
- **Description**: Read the contents of a file from a GitHub repository. Contents returned with line numbers prefixed. Maximum file size is 128KB. Use `read_range` for specific lines of large files.
- **Input Schema**:
  ```json
  {
    "type": "object",
    "properties": {
      "path": {
        "type": "string",
        "description": "The path to the file to read"
      },
      "read_range": {
        "type": "array",
        "items": { "type": "number" },
        "minItems": 2,
        "maxItems": 2,
        "description": "Optional [start_line, end_line] to read only specific lines"
      },
      "repository": {
        "type": "string",
        "description": "Repository URL (e.g., https://github.com/owner/repo)"
      }
    },
    "required": ["path", "repository"]
  }
  ```

### 26. search_github
- **Tool Name**: `search_github`
- **Variable**: `cd`
- **Source**: builtin
- **Description**: Search for code in a GitHub repository. Groups results by file with surrounding context and line numbers. Supports GitHub search operators (AND, OR, NOT) with up to 5 operators per query. Max 256 characters per query.
  - **Qualifiers**: `language:LANGUAGE`, `path:PATH`, `extension:EXT`, `in:file`/`in:path`
- **Input Schema**:
  ```json
  {
    "type": "object",
    "properties": {
      "pattern": {
        "type": "string",
        "description": "The search pattern to find in code. Supports GitHub search operators (AND, OR, NOT) and qualifiers. Max 256 characters."
      },
      "path": {
        "type": "string",
        "description": "Optional path to limit search to specific directory or file pattern"
      },
      "repository": {
        "type": "string",
        "description": "Repository URL (e.g., https://github.com/owner/repo)"
      },
      "limit": {
        "type": "number",
        "description": "Maximum number of search results to return (default: 30, max: 100)",
        "minimum": 1,
        "maximum": 100
      },
      "offset": {
        "type": "number",
        "description": "Number of results to skip for pagination (default: 0). Must be divisible by limit.",
        "minimum": 0
      }
    },
    "required": ["pattern", "repository"]
  }
  ```

### 27. commit_search
- **Tool Name**: `commit_search`
- **Variable**: `ld`
- **Source**: builtin
- **Description**: Search for commits in repositories with detailed commit information and metadata. Returns commits with SHA, message, author, date.
- **Input Schema**:
  ```json
  {
    "type": "object",
    "properties": {
      "query": {
        "type": "string",
        "description": "Search query to find in commit messages and author information. If empty, returns all commits."
      },
      "author": {
        "type": "string",
        "description": "Filter commits by author username or email"
      },
      "since": {
        "type": "string",
        "description": "ISO 8601 date string for earliest commit date"
      },
      "until": {
        "type": "string",
        "description": "ISO 8601 date string for latest commit date"
      },
      "path": {
        "type": "string",
        "description": "Filter commits that changed specific files or directories"
      },
      "repository": {
        "type": "string",
        "description": "Repository URL (e.g., https://github.com/owner/repo)"
      },
      "limit": {
        "type": "number",
        "description": "Maximum number of commits to return (default: 50, max: 100)",
        "minimum": 1,
        "maximum": 100
      },
      "offset": {
        "type": "number",
        "description": "Number of commits to skip for pagination (default: 0). Must be divisible by limit.",
        "minimum": 0
      }
    },
    "required": []
  }
  ```

### 28. diff
- **Tool Name**: `diff`
- **Variable**: `od`
- **Source**: builtin
- **Description**: Get a diff between two commits, branches, or tags in a repository. Returns structured information about changed files with additions, deletions, and optional diff patches.
  - **WHEN TO USE**: Understand changes between commits/branches/tags; investigate scope of PR; need actual diff patches for review
  - **WHEN NOT TO USE**: Finding commits by message/author (use commit_search); viewing complete file contents (use read)
  - Patches auto-truncated at ~4k characters per file
- **Input Schema**:
  ```json
  {
    "type": "object",
    "properties": {
      "base": {
        "type": "string",
        "description": "The base commit SHA, branch name, or tag to compare from"
      },
      "head": {
        "type": "string",
        "description": "The head commit SHA, branch name, or tag to compare to"
      },
      "repository": {
        "type": "string",
        "description": "Repository URL (e.g., https://github.com/owner/repo)"
      },
      "includePatches": {
        "type": "boolean",
        "description": "Include unified diff patches per file (token heavy, truncated to ~4k characters per file). Default false."
      }
    },
    "required": ["base", "head", "repository"]
  }
  ```

### 29. glob_github
- **Tool Name**: `glob_github`
- **Variable**: `ad`
- **Source**: builtin
- **Description**: Find files matching a glob pattern in a GitHub repository.
- **Input Schema**:
  ```json
  {
    "type": "object",
    "properties": {
      "filePattern": {
        "type": "string",
        "description": "Glob pattern to match files (e.g., \"**/*.ts\", \"src/**/*.test.js\")"
      },
      "limit": {
        "type": "number",
        "description": "Maximum number of results to return (default = 100)."
      },
      "offset": {
        "type": "number",
        "description": "Number of results to skip for pagination"
      },
      "repository": {
        "type": "string",
        "description": "Repository URL (e.g., https://github.com/owner/repo)"
      }
    },
    "required": ["filePattern", "repository"]
  }
  ```

### 30. list_directory_github
- **Tool Name**: `list_directory_github`
- **Variable**: `id`
- **Source**: builtin
- **Description**: List the contents of a directory in a GitHub repository. Returns files and directories (directories have trailing slash).
- **Input Schema**:
  ```json
  {
    "type": "object",
    "properties": {
      "path": {
        "type": "string",
        "description": "The path to the directory to list"
      },
      "repository": {
        "type": "string",
        "description": "Repository URL (e.g., https://github.com/owner/repo)"
      },
      "limit": {
        "type": "number",
        "description": "Maximum number of entries to return (default: 100, max: 1000)",
        "minimum": 1,
        "maximum": 1000
      }
    },
    "required": ["path", "repository"]
  }
  ```

### 31. list_repositories
- **Tool Name**: `list_repositories`
- **Variable**: `nd`
- **Source**: builtin
- **Description**: List and search for repositories, prioritizing your own repositories. Uses hybrid approach: first searches your repos (owned, collaborator, organization member), then supplements with public repos.
- **Input Schema**:
  ```json
  {
    "type": "object",
    "properties": {
      "pattern": {
        "type": "string",
        "description": "Optional pattern to match in repository names"
      },
      "organization": {
        "type": "string",
        "description": "Optional organization name to filter repositories"
      },
      "language": {
        "type": "string",
        "description": "Optional programming language to filter repositories"
      },
      "limit": {
        "type": "number",
        "description": "Maximum number of repositories to return (default: 30, max: 100)",
        "minimum": 1,
        "maximum": 100
      },
      "offset": {
        "type": "number",
        "description": "Number of results to skip for pagination (default: 0). Must be divisible by limit.",
        "minimum": 0
      }
    },
    "required": []
  }
  ```

---

## Bitbucket Enterprise Repository Tools

These mirror the GitHub tools but for Bitbucket Enterprise instances. Used by the **Librarian** subagent.

### 32. read_bitbucket_enterprise
- **Tool Name**: `read_bitbucket_enterprise`
- **Variable**: `dW0`
- **Source**: builtin
- **Description**: Same as read_github but with `repository` referencing Bitbucket Enterprise URLs (e.g., `https://{instance}/projects/PROJ/repos/repo-name/browse`)
- **Additional param**: `ref` (optional branch or commit reference)

### 33. search_bitbucket_enterprise
- **Tool Name**: `search_bitbucket_enterprise`
- **Variable**: `nW0`
- **Source**: builtin
- **Description**: Same structure as search_github but for Bitbucket Enterprise
- **Additional params**: `ref`, `repository` with Bitbucket URL format

### 34. commit_search_bitbucket_enterprise
- **Tool Name**: `commit_search_bitbucket_enterprise`
- **Variable**: `oW0`
- **Source**: builtin
- **Description**: Same schema as commit_search but for Bitbucket Enterprise
- **Additional params**: `repository` (Bitbucket URL), `ref` (branch/commit reference)

### 35. diff_bitbucket_enterprise
- **Tool Name**: `diff_bitbucket_enterprise`
- **Variable**: `aW0`
- **Source**: builtin
- **Description**: Same schema as diff but for Bitbucket Enterprise

### 36. glob_bitbucket_enterprise
- **Tool Name**: `glob_bitbucket_enterprise`
- **Variable**: `iW0`
- **Source**: builtin
- **Description**: Same schema as glob_github but for Bitbucket Enterprise
- **Additional param**: `ref`

### 37. list_directory_bitbucket_enterprise
- **Tool Name**: `list_directory_bitbucket_enterprise`
- **Variable**: `cW0`
- **Source**: builtin
- **Description**: Same schema as list_directory_github but for Bitbucket Enterprise
- **Additional params**: `repository` (Bitbucket URL), `ref`

### 38. list_repositories_bitbucket_enterprise
- **Tool Name**: `list_repositories_bitbucket_enterprise`
- **Variable**: `lW0`
- **Source**: builtin
- **Description**: For listing repos on Bitbucket Enterprise instances
- **Additional params**: `instanceUrl`, `project`, `pattern`

---

## User Interaction Tools

### 39. ask
- **Tool Name**: `ask`
- **Variable**: `pD`
- **Source**: builtin
- **Description**: Ask the user questions during execution to gather input, clarify requirements, or get decisions.
  - Use for: gathering user preferences; clarifying ambiguous instructions; getting decisions on implementation choices; offering choices
  - **CRITICAL - When NOT to use**: Be decisive. Do NOT ask for: implementation details inferable from codebase; minor stylistic choices; decisions with obvious best practices; anything you can figure out by reading existing code
  - Only ask when decision is: high-impact and irreversible; genuinely ambiguous; about user preferences that cannot be inferred
  - Users can always select "Other" to provide custom text input
- **Input Schema**:
  ```json
  {
    "type": "object",
    "properties": {
      "questions": {
        "type": "array",
        "description": "1-4 questions to ask the user",
        "minItems": 1,
        "maxItems": 4,
        "items": {
          "type": "object",
          "properties": {
            "question": {
              "type": "string",
              "description": "The full question text (should end with ?)"
            },
            "header": {
              "type": "string",
              "description": "Short label/chip for display (max 12 chars)",
              "maxLength": 12
            },
            "options": {
              "type": "array",
              "description": "2-4 options for the user to choose from",
              "minItems": 2,
              "maxItems": 4,
              "items": {
                "type": "object",
                "properties": {
                  "label": { "type": "string", "description": "The display text for this option" },
                  "description": { "type": "string", "description": "Explanation of what this option means" }
                },
                "required": ["label", "description"]
              }
            },
            "multiSelect": {
              "type": "boolean",
              "description": "Allow selecting multiple options (default: false)"
            },
            "reusable": {
              "type": "boolean",
              "description": "True if answer could apply to similar situations in the future (default: false)"
            },
            "assumptions": {
              "type": "array",
              "description": "Surface the model's assumptions so user can spot wrong ones",
              "items": { "type": "string" }
            }
          },
          "required": ["question", "header", "options"]
        }
      }
    },
    "required": ["questions"]
  }
  ```
- **Note**: Only registered when `question` is in `experimental.tools` setting
- **Available to**: Smart mode (experimental, when enabled)

### 40. stop
- **Tool Name**: `stop`
- **Source**: builtin
- **Description**: Stop the REPL session and end the conversation. Use this when you have completed your objective or cannot proceed further.
- **Input Schema**:
  ```json
  {
    "type": "object",
    "properties": {
      "message": {
        "type": "string",
        "description": "A summary of what was accomplished or why you are stopping"
      }
    },
    "required": ["message"]
  }
  ```
- **Note**: Used internally by the REPL subagent, not by main agent

---

## Code Quality Tools

### 41. get_diagnostics
- **Tool Name**: `get_diagnostics`
- **Variable**: `A$`
- **Source**: builtin
- **Description**: Get the diagnostics (errors, warnings, etc.) for a file or directory (prefer running for directories rather than files one by one!) Output is shown in the UI so do not repeat/summarize the diagnostics.
- **Input Schema**:
  ```json
  {
    "type": "object",
    "properties": {
      "path": {
        "type": "string",
        "description": "The absolute path to the file or directory to get the diagnostics for (must be absolute, not relative)"
      }
    },
    "required": ["path"]
  }
  ```
- **Available to**: Smart, Rush, Free, Task subagent

### 42. code_review
- **Tool Name**: `code_review`
- **Variable**: `gd`
- **Source**: builtin
- **Disable Timeout**: true
- **Description**: Review code changes, diffs, outstanding changes, or modified files. Use when asked to review changes, check code quality, analyze uncommitted work, or perform a code review. Takes a description of the diff or code change that can be used to generate the full diff. When using this tool, do not invoke `git diff` or any other tool to generate the diff.
- **Input Schema**:
  ```json
  {
    "type": "object",
    "properties": {
      "diff_description": {
        "type": "string",
        "description": "A description of the diff or code change that can be used to generate the full diff. Can include a git or bash command to generate the diff."
      },
      "files": {
        "type": "array",
        "items": { "type": "string" },
        "description": "Specific files to focus the review on. If empty, all changed files covered by the diff description are reviewed."
      },
      "instructions": {
        "type": "string",
        "description": "Additional instructions to guide the review agent."
      },
      "checkScope": {
        "type": "string",
        "description": "A directory to search for checks. If empty, includes all checks."
      },
      "checkFilter": {
        "type": "array",
        "items": { "type": "string" },
        "description": "A list of specific check names to run. If empty, includes all checks in scope."
      }
    },
    "required": ["diff_description"]
  }
  ```
- **Implementation**: Uses CLAUDE_SONNET_4_5 as code-review subagent with tools: Read, Grep, glob, web_search, read_web_page, Bash
- **Available to**: Smart (deferred)

### 43. task_list
- **Tool Name**: `task_list`
- **Variable**: `jJ`
- **Source**: builtin
- **Description**: Plan and track tasks. Use this tool for ALL task planning - breaking down work into steps, tracking progress, and managing what needs to be done.
  - **Actions**: `create`, `list`, `get`, `update`, `delete`
  - Use `dependsOn` for task dependencies; `parentID` for hierarchical breakdown
  - Tasks persist across sessions; creating thread ID is automatically recorded
  - Write descriptions with enough context for a future thread to pick up work
- **Input Schema**:
  ```json
  {
    "type": "object",
    "properties": {
      "action": {
        "type": "string",
        "enum": ["create", "list", "get", "update", "delete"],
        "description": "The action to perform"
      },
      "taskID": {
        "type": "string",
        "description": "Task ID (required for get, update, delete)"
      },
      "title": {
        "type": "string",
        "description": "Task title (required for create, optional for update)"
      },
      "description": {
        "type": "string",
        "description": "Task description"
      },
      "repoURL": {
        "type": "string",
        "description": "Repository URL to associate with the task"
      },
      "status": {
        "type": "string",
        "enum": ["open", "in_progress", "completed"],
        "description": "Task status"
      },
      "dependsOn": {
        "type": "array",
        "items": { "type": "string" },
        "description": "Array of task IDs this task depends on"
      },
      "parentID": {
        "type": "string",
        "description": "Parent task ID for hierarchical task breakdown"
      },
      "limit": {
        "type": "number",
        "description": "Limit for list action"
      },
      "ready": {
        "type": "boolean",
        "description": "For list action: only return tasks that are ready to work on (all dependencies completed)"
      }
    },
    "required": ["action"]
  }
  ```
- **Available to**: Smart, Rush, Free, Task subagent

---

## Image Tools

### 44. painter
- **Tool Name**: `painter`
- **Variable**: `sd`
- **Source**: builtin
- **Description**: Generate an image using an AI model. IMPORTANT: Only invoke this tool when the user explicitly asks to use the "painter" tool.
  - **Model**: Gemini 3 Pro Image
  - **When to use**: Only when user explicitly asks for image generation
  - **When NOT to use**: Do NOT use automatically for UI mockups/diagrams/icons; for code-linked diagrams use `mermaid`; for analyzing existing images use `look_at`
  - **Scenarios**: Generate from description; create with reference images; edit/composite images
- **Input Schema**:
  ```json
  {
    "type": "object",
    "properties": {
      "prompt": {
        "type": "string",
        "description": "Detailed instructions for image generation based on user requirements."
      },
      "inputImagePaths": {
        "type": "array",
        "description": "Optional image paths for editing or style guidance. Maximum 3 images.",
        "maxItems": 3,
        "items": { "type": "string" }
      },
      "savePath": {
        "type": "string",
        "description": "Optional URI string to save the generated image. Must be an absolute file URI."
      }
    },
    "required": ["prompt"]
  }
  ```
- **Available to**: Smart, Rush (auto-registered)

### 45. look_at (analyze_file)
- **Tool Name**: `look_at`
- **Variable**: `pd`
- **Source**: builtin
- **Description**: Extract specific information from a local file (including PDFs, images, and other media). Always provide a clear objective describing what you want to learn or extract. Pass reference files when you need to compare two or more things.
  - **When to use**: Analyzing PDFs, images, or media files; extracting specific information or summaries; describing visual content; when you only need analyzed/extracted data
  - **When NOT to use**: For source code or plain text files where you need exact contents (use Read); when you need to edit afterward; for simple file reading
- **Input Schema**:
  ```json
  {
    "type": "object",
    "properties": {
      "path": {
        "type": "string",
        "description": "Workspace-relative or absolute path to the file to analyze."
      },
      "objective": {
        "type": "string",
        "description": "Natural-language description of the analysis goal (e.g., summarize, extract data, describe image)."
      },
      "context": {
        "type": "string",
        "description": "The broader goal and context for the analysis."
      },
      "referenceFiles": {
        "type": "array",
        "items": { "type": "string" },
        "description": "Optional list of workspace-relative or absolute paths to reference files for comparison."
      }
    },
    "required": ["path", "objective", "context"]
  }
  ```
- **Available to**: Smart, Rush

---

## Miscellaneous Tools

### 46. skill (load_skill)
- **Tool Name**: `skill`
- **Variable**: `S2`
- **Source**: builtin
- **Description**: Load a specialized skill that provides domain-specific instructions and workflows. When you recognize that a task matches one of the available skills, use this tool to load the full skill instructions. The skill will inject detailed instructions, workflows, and access to bundled resources into the conversation context.
- **Input Schema**:
  ```json
  {
    "type": "object",
    "properties": {
      "name": {
        "type": "string",
        "description": "The name of the skill to load"
      },
      "arguments": {
        "type": "string",
        "description": "Optional arguments to pass to the skill"
      }
    },
    "required": ["name"]
  }
  ```
- **Available to**: Smart, Rush, Free, Deep, Task subagent

### 47. read_mcp_resource
- **Tool Name**: `read_mcp_resource`
- **Variable**: `md`
- **Source**: builtin
- **Description**: Read a resource from an MCP (Model Context Protocol) server. Use when the user references an MCP resource, e.g. "read @filesystem-server:file:///path/to/document.txt"
- **Input Schema**:
  ```json
  {
    "type": "object",
    "properties": {
      "server": {
        "type": "string",
        "description": "The name or identifier of the MCP server to read from"
      },
      "uri": {
        "type": "string",
        "description": "The URI of the resource to read"
      }
    },
    "required": ["server", "uri"]
  }
  ```
- **Available to**: Smart, Rush

### 48. create_handoff_context
- **Tool Name**: `create_handoff_context`
- **Source**: builtin (internal tool)
- **Description**: A tool to extract relevant information from the thread and select relevant files for another agent to continue the conversation. Used internally for thread handoffs.
- **Input Schema**:
  ```json
  {
    "type": "object",
    "properties": {
      "relevantInformation": {
        "type": "string",
        "description": "Extract relevant context from the conversation. Write from first person perspective. Focus on capabilities and behavior, not file-by-file changes."
      },
      "relevantFiles": {
        "type": "array",
        "items": { "type": "string" },
        "description": "Array of file or directory paths (workspace-relative) that are relevant. Maximum 10 files. Prioritize by importance. PUT THE MOST IMPORTANT FILES FIRST."
      }
    }
  }
  ```
- **Note**: Internal tool, not directly user-facing

### 49. echo
- **Tool Name**: `echo`
- **Source**: builtin
- **Description**: Echoes back the provided text. Use this tool for testing.
- **Input Schema**:
  ```json
  {
    "type": "object",
    "properties": {
      "text": {
        "type": "string",
        "description": "The text to echo back"
      }
    },
    "required": ["text"]
  }
  ```
- **Note**: Testing tool only

### 50. Custom Subagents
- **Tool Name**: Dynamic (based on agent `.name` field)
- **Description**: Custom subagents defined in AGENTS.md files can be loaded as tools. Each generates a tool with description showing model, tools, and accepts a `prompt` parameter.
- **Input Schema**:
  ```json
  {
    "type": "object",
    "properties": {
      "prompt": {
        "type": "string",
        "description": "The instruction or question for the subagent"
      }
    },
    "required": ["prompt"]
  }
  ```
- **Disable Timeout**: true

---

## Referenced but Not Fully Defined as Standalone Tools

The following tool names appear in the known tool names list (`sW0`) but do not have standalone spec definitions in this version. They may be provided by IDE extensions, MCP servers, or external toolboxes:

- **delete_file** - Listed in tool alias mapping (`Delete` -> `delete_file`)
- **search_documents** - Referenced in known tools list
- **get_document** - Referenced in known tools list
- **Check** - Referenced in tool lists (may be IDE-provided diagnostic tool, similar to `get_diagnostics`)
- **Glob** - Alias for `glob` (uppercase version referenced in known tools list)

---

## Tool Alias Mapping

The following aliases map alternative names to canonical tool names:

| Alias | Canonical Tool |
|-------|---------------|
| `Read` / `read` | `Read` |
| `Write` / `write` | `create_file` |
| `Edit` / `edit` | `edit_file` |
| `Glob` / `glob` | `glob` |
| `Delete` / `delete` | `delete_file` |
| `Bash` / `bash` | `Bash` |
| `Grep` / `grep` | `Grep` |
| `WebSearch` / `websearch` | `web_search` |
| `WebFetch` | `read_web_page` |
| `planner` | `Task` |
| `browser` | `read_web_page` |

---

## Deep Mode Aliases

Deep mode has additional tool aliases with modified schemas:

| Alias | Canonical Tool | Variable |
|-------|---------------|----------|
| `shell_command` | `Bash` | - |
| `run_terminal_command` | `Bash` | `bd` |
| `write_file` | `create_file` | `uW0` |
| `read_file` | `Read` | `mC` |

---

## Model Definitions

| Model Key | Provider | Model Name | Display Name | Context Window | Max Output | Notable |
|-----------|----------|-----------|--------------|---------------|-----------|---------|
| CLAUDE_OPUS_4_6 | Anthropic | `claude-opus-4-6` | Claude Opus 4.6 | - | - | Smart mode primary |
| CLAUDE_SONNET_4_5 | Anthropic | `claude-sonnet-4-5-20250929` | Claude Sonnet 4.5 | - | - | Large mode, Code Review, Walkthrough Planner |
| CLAUDE_HAIKU_4_5 | Anthropic | `claude-haiku-4-5-20251001` | Claude Haiku 4.5 | - | - | Free, Rush, Finder, Librarian, Codereview Check |
| GPT_5_2 | OpenAI | `gpt-5.2` | GPT-5.2 | 400K | 128K | Oracle |
| GPT_5_2_CODEX | OpenAI | `gpt-5.2-codex` | GPT-5.2 Codex | 400K | 128K | Deep mode primary |
| GPT_5 | OpenAI | `gpt-5` | GPT-5 | 400K | 128K | - |
| GEMINI_3_PRO_PREVIEW | VertexAI | `gemini-3-pro-preview` | Gemini 3 Pro Preview | 1M | 65K | Bombadil model catalog |
| GEMINI_3_PRO_IMAGE | VertexAI | `gemini-3-pro-image-preview` | Gemini 3 Pro Image | 1M | 65K | Painter tool |
| GROK_CODE_FAST_1 | xAI | `grok-code-fast-1` | Grok Code Fast 1 | 256K | 32K | - |
| FIREWORKS_KIMI_K2P5 | Fireworks | `accounts/fireworks/models/kimi-k2p5` | Kimi K2.5 | 262K | 32K | Bombadil mode |
| FIREWORKS_KIMI_K2_INSTRUCT | Fireworks | `accounts/fireworks/models/kimi-k2-instruct-0905` | - | - | - | - |

---

## Complete Tool Name Index (Alphabetical)

| # | Tool Name | Type | Agent Availability |
|---|-----------|------|-------------------|
| 1 | `apply_patch` | builtin | Deep |
| 2 | `ask` | builtin (experimental) | Smart (when enabled) |
| 3 | `Bash` / `shell_command` | builtin | All modes |
| 4 | `code_review` | builtin (deferred) | Smart |
| 5 | `commit_search` | builtin | Librarian (GitHub) |
| 6 | `commit_search_bitbucket_enterprise` | builtin | Librarian (Bitbucket) |
| 7 | `create_file` | builtin | Smart, Rush, Free, Task |
| 8 | `create_handoff_context` | builtin (internal) | Internal |
| 9 | `diff` | builtin | Librarian (GitHub) |
| 10 | `diff_bitbucket_enterprise` | builtin | Librarian (Bitbucket) |
| 11 | `echo` | builtin (test) | Test only |
| 12 | `edit_file` | builtin | Smart, Rush, Free, Task |
| 13 | `find_thread` | builtin | Smart, Rush, Free, Oracle |
| 14 | `finder` | builtin | Smart, Rush, Free, Task |
| 15 | `format_file` | builtin | Smart, Rush, Free, Task |
| 16 | `get_diagnostics` | builtin | Smart, Rush, Free, Task |
| 17 | `glob` | builtin | All modes |
| 18 | `glob_bitbucket_enterprise` | builtin | Librarian (Bitbucket) |
| 19 | `glob_github` | builtin | Librarian (GitHub) |
| 20 | `handoff` | builtin | Smart, Rush |
| 21 | `librarian` | builtin | Smart, Rush |
| 22 | `list_directory_bitbucket_enterprise` | builtin | Librarian (Bitbucket) |
| 23 | `list_directory_github` | builtin | Librarian (GitHub) |
| 24 | `list_repositories` | builtin | Librarian (GitHub) |
| 25 | `list_repositories_bitbucket_enterprise` | builtin | Librarian (Bitbucket) |
| 26 | `look_at` | builtin | Smart, Rush |
| 27 | `mermaid` | builtin | Smart, Rush, Free |
| 28 | `oracle` | builtin | Smart, Rush |
| 29 | `painter` | builtin | Smart, Rush |
| 30 | `Read` | builtin | All modes |
| 31 | `read_bitbucket_enterprise` | builtin | Librarian (Bitbucket) |
| 32 | `read_github` | builtin | Librarian (GitHub) |
| 33 | `read_mcp_resource` | builtin | Smart, Rush |
| 34 | `read_thread` | builtin | Smart, Rush, Free, Oracle, Deep |
| 35 | `read_web_page` | builtin | All modes (except Finder) |
| 36 | `repl` | builtin (experimental) | Smart (when enabled) |
| 37 | `restore_snapshot` | builtin (experimental) | Smart (when snapshot enabled) |
| 38 | `save_memory` | builtin (experimental) | Smart (when enabled) |
| 39 | `search_bitbucket_enterprise` | builtin | Librarian (Bitbucket) |
| 40 | `search_github` | builtin | Librarian (GitHub) |
| 41 | `skill` | builtin | Smart, Rush, Free, Deep, Task |
| 42 | `stop` | builtin | REPL subagent |
| 43 | `Grep` | builtin | All modes |
| 44 | `Task` | builtin | Smart, Rush |
| 45 | `task_list` | builtin | Smart, Rush, Free, Task |
| 46 | `undo_edit` | builtin | Smart, Rush |
| 47 | `walkthrough` | builtin (deferred) | Smart |
| 48 | `walkthrough_diagram` | builtin (deferred) | Smart |
| 49 | `web_search` | builtin | All modes (except Finder) |
| 50 | Custom subagents | dynamic | Via AGENTS.md |

---

## Changes from Previous Version (0.0.1767470475-g48ecc2)

### New Tools
1. **apply_patch** (`gC`) - Codex patch format for Deep mode file editing
2. **ask** (`pD`) - User question tool with structured option selection (experimental)
3. **save_memory** (`dD`) - Long-term memory persistence to AGENTS.md (experimental)
4. **restore_snapshot** (`td`) - Git tree snapshot restoration (experimental)
5. **look_at** (`pd`) - File analysis tool for PDFs, images, and media
6. **painter** (`sd`) - AI image generation via Gemini 3 Pro Image
7. **handoff** (`rW0`) - Thread handoff for background work continuation

### New Agent Modes
1. **DEEP** - GPT-5.2 Codex with reasoning, limited toolset (Bash, apply_patch, web_search, read_web_page, skill, read_thread)
2. **BOMBADIL** - Experimental Kimi K2.5 mode (hidden)
3. **LARGE** - Sonnet 4.5 with 1M context window (hidden)

### Updated Agent Modes
- **SMART** now uses `claude-opus-4-6` (was likely opus-4 or sonnet-4-5)
- **Oracle** now uses `GPT-5.2` (was GPT-5)
- Smart mode now has `deferred tools` concept: `code_review`, `walkthrough`, `walkthrough_diagram`

### Updated Tools
- **finder** description significantly updated with more specific usage guidelines
- **Task** (subagent) now has more detailed usage instructions
- **code_review** now supports `checkScope` and `checkFilter` parameters
- **task_list** now supports `parentID` for hierarchical task breakdown
- **walkthrough_diagram** now supports `summary`, `codeSnippet`, and `threadID` fields in nodes
