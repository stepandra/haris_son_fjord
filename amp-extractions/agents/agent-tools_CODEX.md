# AMP Agent Tools and Modes (CODEX, Audited)

- Source bundle: `npm-packages/0.0.1770366910-g1852ef/node_modules/@sourcegraph/amp/dist/main.js`
- Build version: `0.0.1770366910-g1852ef`
- Generated: `2026-02-06T10:15:24.179Z`
- Extraction artifact: `amp-extractions/meta/extraction-artifacts_CODEX.json`
- Source anchors:
  - `sW0=[` at byte offset `1013867`
  - `HL=` at byte offset `1047640`
  - `D5=` at byte offset `1050455`

## Summary
- Static known tool-name list (`sW0`): **45**
- Parsed tool specs (`spec:{name:...}`) entries: **47**
- Resolved spec tool names: **45**
- Agent modes (`HL`): **6**
- Subagent modes (`D5`): **6**

## Tool Alias Map
| Variable | Resolved Name |
| --- | --- |
| `_2` | `Task` |
| `A$` | `get_diagnostics` |
| `ad` | `glob_github` |
| `aW0` | `diff_bitbucket_enterprise` |
| `cd` | `search_github` |
| `cW0` | `list_directory_bitbucket_enterprise` |
| `dd` | `read_github` |
| `dD` | `save_memory` |
| `dW0` | `read_bitbucket_enterprise` |
| `fd` | `walkthrough_diagram` |
| `gC` | `apply_patch` |
| `gd` | `code_review` |
| `gW0` | `walkthrough` |
| `gZ` | `read_web_page` |
| `h8` | `finder` |
| `hd` | `find_thread` |
| `id` | `list_directory_github` |
| `iW0` | `glob_bitbucket_enterprise` |
| `jJ` | `task_list` |
| `k9` | `Bash` |
| `KL` | `undo_edit` |
| `ld` | `commit_search` |
| `lW0` | `list_repositories_bitbucket_enterprise` |
| `m8` | `edit_file` |
| `md` | `read_mcp_resource` |
| `nd` | `list_repositories` |
| `nW0` | `search_bitbucket_enterprise` |
| `O9` | `create_file` |
| `od` | `diff` |
| `OK` | `mermaid` |
| `oW0` | `commit_search_bitbucket_enterprise` |
| `p9` | `oracle` |
| `pd` | `look_at` |
| `pD` | `ask` |
| `pW0` | `todo_write` |
| `qG` | `glob` |
| `R$` | `librarian` |
| `rd` | `repl` |
| `rW0` | `handoff` |
| `S2` | `skill` |
| `sd` | `painter` |
| `td` | `restore_snapshot` |
| `uC` | `Check` |
| `ud` | `format_file` |
| `VL` | `read_thread` |
| `w6` | `Read` |
| `WG` | `web_search` |
| `x8` | `Grep` |

## Static Known Tool Names (`sW0`)
| # | Tool |
| --- | --- |
| 1 | `Task` |
| 2 | `task_list` |
| 3 | `finder` |
| 4 | `get_diagnostics` |
| 5 | `Bash` |
| 6 | `oracle` |
| 7 | `mermaid` |
| 8 | `walkthrough` |
| 9 | `walkthrough_diagram` |
| 10 | `read_web_page` |
| 11 | `create_file` |
| 12 | `glob` |
| 13 | `Glob` |
| 14 | `undo_edit` |
| 15 | `Read` |
| 16 | `edit_file` |
| 17 | `delete_file` |
| 18 | `format_file` |
| 19 | `web_search` |
| 20 | `Grep` |
| 21 | `search_documents` |
| 22 | `get_document` |
| 23 | `Check` |
| 24 | `code_review` |
| 25 | `look_at` |
| 26 | `librarian` |
| 27 | `read_thread` |
| 28 | `find_thread` |
| 29 | `skill` |
| 30 | `read_github` |
| 31 | `search_github` |
| 32 | `commit_search` |
| 33 | `list_directory_github` |
| 34 | `list_repositories` |
| 35 | `glob_github` |
| 36 | `diff` |
| 37 | `read_bitbucket_enterprise` |
| 38 | `list_directory_bitbucket_enterprise` |
| 39 | `list_repositories_bitbucket_enterprise` |
| 40 | `handoff` |
| 41 | `painter` |
| 42 | `apply_patch` |
| 43 | `ask` |
| 44 | `save_memory` |
| 45 | `restore_snapshot` |

## Mode Matrix (`HL`)
| Mode Key | Display Name | Description | Primary Model Key | Include Tools | Deferred Tools | Visible |
| --- | --- | --- | --- | --- | --- | --- |
| `bombadil` | Bombadil | Old Tom Bombadil with Kimi K2.5 - experimental open model mode | `FIREWORKS_KIMI_K2P5` | 29 | 3 | false |
| `deep` | Deep | Deep reasoning with GPT-5.2 Codex | `GPT_5_2_CODEX` | 6 | 3 | true |
| `free` | Free | Amp Free | `CLAUDE_HAIKU_4_5` | 16 | 0 | true |
| `large` | Large | The biggest context window possible (Sonnet 4.5 1M tokens), for large tasks | `CLAUDE_SONNET_4_5` | 29 | 3 | false |
| `rush` | Rush | Faster and cheaper for small, well-defined tasks | `CLAUDE_HAIKU_4_5` | 25 | 0 | true |
| `smart` | Smart | The most capable model and set of tools | `CLAUDE_OPUS_4_6` | 29 | 3 | true |

### Mode `bombadil`

Include tools:
- `Read`
- `finder`
- `Bash`
- `repl`
- `create_file`
- `edit_file`
- `undo_edit`
- `web_search`
- `read_web_page`
- `task_list`
- `read_thread`
- `find_thread`
- `skill`
- `oracle`
- `librarian`
- `Task`
- `Grep`
- `glob`
- `read_mcp_resource`
- `mermaid`
- `look_at`
- `format_file`
- `get_diagnostics`
- `handoff`
- `Check`
- `painter`
- `ask`
- `save_memory`
- `restore_snapshot`

Deferred tools:
- `code_review`
- `walkthrough`
- `walkthrough_diagram`

### Mode `deep`

Include tools:
- `Bash`
- `apply_patch`
- `web_search`
- `read_web_page`
- `skill`
- `read_thread`

Deferred tools:
- `code_review`
- `walkthrough`
- `walkthrough_diagram`

### Mode `free`

Include tools:
- `Read`
- `Grep`
- `glob`
- `finder`
- `Bash`
- `create_file`
- `edit_file`
- `format_file`
- `get_diagnostics`
- `web_search`
- `read_web_page`
- `task_list`
- `read_thread`
- `find_thread`
- `mermaid`
- `skill`

Deferred tools:
- (none)

### Mode `large`

Include tools:
- `Read`
- `finder`
- `Bash`
- `repl`
- `create_file`
- `edit_file`
- `undo_edit`
- `web_search`
- `read_web_page`
- `task_list`
- `read_thread`
- `find_thread`
- `skill`
- `oracle`
- `librarian`
- `Task`
- `Grep`
- `glob`
- `read_mcp_resource`
- `mermaid`
- `look_at`
- `format_file`
- `get_diagnostics`
- `handoff`
- `Check`
- `painter`
- `ask`
- `save_memory`
- `restore_snapshot`

Deferred tools:
- `code_review`
- `walkthrough`
- `walkthrough_diagram`

### Mode `rush`

Include tools:
- `Read`
- `Grep`
- `glob`
- `finder`
- `Bash`
- `create_file`
- `edit_file`
- `format_file`
- `undo_edit`
- `get_diagnostics`
- `web_search`
- `read_web_page`
- `read_mcp_resource`
- `mermaid`
- `read_thread`
- `find_thread`
- `skill`
- `oracle`
- `handoff`
- `librarian`
- `Task`
- `task_list`
- `look_at`
- `Check`
- `painter`

Deferred tools:
- (none)

### Mode `smart`

Include tools:
- `Read`
- `finder`
- `Bash`
- `repl`
- `create_file`
- `edit_file`
- `undo_edit`
- `web_search`
- `read_web_page`
- `task_list`
- `read_thread`
- `find_thread`
- `skill`
- `oracle`
- `librarian`
- `Task`
- `Grep`
- `glob`
- `read_mcp_resource`
- `mermaid`
- `look_at`
- `format_file`
- `get_diagnostics`
- `handoff`
- `Check`
- `painter`
- `ask`
- `save_memory`
- `restore_snapshot`

Deferred tools:
- `code_review`
- `walkthrough`
- `walkthrough_diagram`

## Subagent Matrix (`D5`)
| Subagent Key | Display Name | Model Key | Include Tools | allowMcp | allowToolbox |
| --- | --- | --- | --- | --- | --- |
| `code-review` | Code Review | `CLAUDE_SONNET_4_5` | 6 | false | false |
| `codereview-check` | Codereview Check | `CLAUDE_HAIKU_4_5` | 4 | false | false |
| `finder` | Finder | `CLAUDE_HAIKU_4_5` | 3 | false | false |
| `librarian` | Librarian | `CLAUDE_HAIKU_4_5` | 7 | false | false |
| `oracle` | Oracle | `GPT_5_2` | 7 | false | false |
| `task-subagent` | Task Subagent | `(inherited)` | 13 | true | true |

## Parsed Tool Spec Entries
| Resolved Name | Name Expression | Input Schema Type | Source Expression | Description Preview |
| --- | --- | --- | --- | --- |
| `(unresolved)` | `G1.name` | `expression` | `{mcp:h},customizedForModel:!1` | (none) |
| `(unresolved)` | `K` | `expression` | `{mcp:Z,target:Y},meta:q?{skillName:X,skillNames:G,isFromMainConfig:V,hiddenFromDefaultListing:W}:void 0` | (none) |
| `skill` | `S2` | `object` | `"builtin"` | (none) |
| `Read` | `w6` | `object` | `"builtin"` | (none) |
| `edit_file` | `m8` | `expression` | `"builtin"` | Make edits to a text file.  Replaces \... |
| `Bash` | `k9` | `object` | `"builtin",meta:{disableTimeout:!0}` | Executes the given shell command using bash (or sh on systems without bash).  - Do NOT chain commands with \... |
| `apply_patch` | `gC` | `expression` | `"builtin"` | Apply a patch to one or more files using the Codex patch format.  This tool is preferred for single file edits in deep m... |
| `Grep` | `x8` | `object` | `"builtin"` | Search for exact text patterns in files using ripgrep, a fast keyword search tool.  # When to use this tool - Finding ex... |
| `painter` | `sd` | `object` | `"builtin"` | Generate an image using an AI model.  IMPORTANT: Only invoke this tool when the user explicitly asks to use the "${sd}" ... |
| `repl` | `rd` | `object` | `"builtin",meta:{disableTimeout:!0}` | Start a REPL (Read-Eval-Print Loop) subprocess and use an agent to interact with it to accomplish an objective.  This to... |
| `handoff` | `rW0` | `object` | `"builtin",meta:{}` | Hand off work to a new thread that runs in the background. Use this tool when you need to continue work in a fresh conte... |
| `ask` | `pD` | `object` | `"builtin"` | Ask the user questions during execution to gather input, clarify requirements, or get decisions.  Use this tool when you... |
| `code_review` | `"code_review"` | `object-unparsed` | `"builtin"` | Review code changes, diffs, outstanding changes, or modified files. Use when asked to review changes, check code quality... |
| `glob` | `qG` | `object` | `"builtin"` | Fast file pattern matching tool that works with any codebase size  Use this tool to find files by name patterns across y... |
| `finder` | `h8` | `object-unparsed` | `"builtin"` | Intelligently search your codebase: Use it for complex, multi-step search tasks where you need to find code based on fun... |
| `create_file` | `O9` | `object` | `"builtin"` | Create or overwrite a file in the workspace.  Use this tool to create a **new file** that does not yet exist.  For **exi... |
| `restore_snapshot` | `td` | `object` | `"builtin"` | Restore a file or directory to a previous snapshot state.  Use this tool to restore files to a previous state captured i... |
| `undo_edit` | `KL` | `object` | `"builtin"` | Undo the last edit made to a file.  This command reverts the most recent edit made to the specified file. It will restor... |
| `find_thread` | `hd` | `object` | `"builtin",meta:{}` | Find Amp threads (conversation threads with the agent) using a query DSL.  ## What this tool finds  This tool searches *... |
| `format_file` | `ud` | `object` | `"builtin"` | Format a file using VS Code's formatter.  This tool is only available when running in VS Code.  It returns a git-style d... |
| `commit_search_bitbucket_enterprise` | `oW0` | `object` | `"builtin"` | (none) |
| `diff_bitbucket_enterprise` | `aW0` | `object` | `"builtin"` | (none) |
| `glob_bitbucket_enterprise` | `iW0` | `object` | `"builtin"` | (none) |
| `list_directory_bitbucket_enterprise` | `cW0` | `object` | `"builtin"` | (none) |
| `list_repositories_bitbucket_enterprise` | `lW0` | `object` | `"builtin"` | (none) |
| `read_bitbucket_enterprise` | `dW0` | `object` | `"builtin"` | (none) |
| `search_bitbucket_enterprise` | `nW0` | `object` | `"builtin"` | (none) |
| `commit_search` | `ld` | `object` | `"builtin"` | Search for commits in repositories with detailed commit information and metadata.  WHEN TO USE THIS TOOL: - When you nee... |
| `diff` | `od` | `object` | `"builtin"` | Get a diff between two commits, branches, or tags in a repository.  This tool compares two points in repository history ... |
| `glob_github` | `ad` | `object` | `"builtin"` | Find files matching a glob pattern in a repository.  WHEN TO USE THIS TOOL: - When you need to find specific file types ... |
| `list_directory_github` | `id` | `object` | `"builtin"` | List the contents of a directory in a GitHub repository.  WHEN TO USE THIS TOOL: - When you need to understand the struc... |
| `list_repositories` | `nd` | `object` | `"builtin"` |  List and search for repositories, prioritizing your own repositories.  This tool uses a hybrid approach to find reposit... |
| `read_github` | `dd` | `object` | `"builtin"` | (none) |
| `search_github` | `cd` | `object` | `"builtin"` |  Search for code patterns and content in repositories with structured results.  This tool searches for text patterns wit... |
| `librarian` | `R$` | `object-unparsed` | `"builtin"` | The Librarian - a specialized codebase understanding agent that helps answer questions about large, complex codebases. T... |
| `look_at` | `pd` | `object` | `"builtin"` | Extract specific information from a local file (including PDFs, images, and other media).  Use this tool when you need t... |
| `mermaid` | `OK` | `object` | `"builtin"` | Renders a Mermaid diagram from the provided code.  PROACTIVELY USE DIAGRAMS when they would better convey information th... |
| `oracle` | `p9` | `object-unparsed` | `"builtin"` | Consult the Oracle - an AI advisor powered by OpenAI's GPT-5.2 reasoning model that can plan, review, and provide expert... |
| `read_mcp_resource` | `md` | `object` | `"builtin"` | Read a resource from an MCP (Model Context Protocol) server.  Use when the user references an MCP resource, e.g. "read @... |
| `read_thread` | `VL` | `object` | `"builtin",meta:{}` | Read and extract relevant content from another Amp thread by its ID.  This tool fetches a thread (locally or from the se... |
| `read_web_page` | `gZ` | `object` | `"builtin"` | Read the contents of a web page at a given URL.  When only the url parameter is set, it returns the contents of the webp... |
| `save_memory` | `dD` | `object` | `"builtin"` | Save a fact or preference to long-term memory that persists across sessions.  - Use when the user explicitly asks you to... |
| `Task` | `_2` | `object` | `"builtin",meta:{disableTimeout:!0}` | Perform a task (a sub-task of the user's overall task) using a sub-agent that has access to the following tools: ${Z68}.... |
| `task_list` | `jJ` | `object` | `"builtin"` | Plan and track tasks. Use this tool for ALL task planning - breaking down work into steps, tracking progress, and managi... |
| `walkthrough` | `gW0` | `object-unparsed` | `"builtin"` | Create an interactive walkthrough diagram for exploring a topic in the codebase.  The walkthrough tool: 1. Invokes a pla... |
| `walkthrough_diagram` | `fd` | `object` | `"builtin"` | Renders an interactive Mermaid diagram where users can click on nodes to see detailed information or navigate to related... |
| `web_search` | `WG` | `object-unparsed` | `"builtin"` | Search the web for information relevant to a research objective.  Use when you need up-to-date or precise documentation.... |

## Coverage Deltas
### In `sW0` but not in resolved parsed spec names
- `get_diagnostics`
- `Glob`
- `delete_file`
- `search_documents`
- `get_document`
- `Check`

### In resolved parsed spec names but not in `sW0`
- `commit_search_bitbucket_enterprise`
- `diff_bitbucket_enterprise`
- `glob_bitbucket_enterprise`
- `read_mcp_resource`
- `repl`
- `search_bitbucket_enterprise`

## Notes
- `sW0` is a static list and does not include every possible dynamic source (MCP/toolbox/custom subagents).
- Parsed spec coverage includes builtins and dynamic registration paths where a literal `spec:{name:...}` object appears in bundle source.
