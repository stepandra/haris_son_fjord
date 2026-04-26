# AMP Agent Tools and Modes (Audited)

- Source bundle: `npm-packages/0.0.1777185893-gae6d40/node_modules/@sourcegraph/amp/dist/main.js`
- Build version: `0.0.1777185893-gae6d40`
- Generated: `2026-04-26T07:37:19.914Z`
- Extraction artifact: `amp-extractions/meta/extraction-artifacts.json`
- Source anchors:
  - static/fallback tool list source at byte offset `1776487`
  - mode registry at byte offset `1776487`
  - subagent registry at byte offset `1984079`

## Summary
- Static known tool-name list (`sW0`): **56**
- Parsed tool specs (`spec:{name:...}`) entries: **45**
- Resolved spec tool names: **42**
- Agent modes (`HL`): **7**
- Subagent modes (`D5`): **7**

## Tool Alias Map
| Variable | Resolved Name |
| --- | --- |
| `A54` | `github_repo_ci_status` |
| `a64` | `diff_bitbucket_enterprise` |
| `ax0` | `create_thread` |
| `b64` | `docs_list` |
| `c6` | `Read` |
| `c64` | `list_directory_bitbucket_enterprise` |
| `C90` | `diff` |
| `d64` | `read_bitbucket_enterprise` |
| `e64` | `unarchive_thread` |
| `E90` | `look_at` |
| `Ec` | `chart` |
| `f64` | `todo_write` |
| `fq` | `glob` |
| `g3` | `create_file` |
| `g64` | `code_tour` |
| `h3` | `Task` |
| `h64` | `docs_write` |
| `H90` | `search_github` |
| `I3` | `Grep` |
| `I6` | `Bash` |
| `i64` | `glob_bitbucket_enterprise` |
| `I8` | `finder` |
| `I90` | `glob_github` |
| `iV` | `web_search` |
| `k2` | `librarian` |
| `K90` | `read_mcp_resource` |
| `Kc` | `run_terminal_command` |
| `kk` | `mermaid` |
| `l64` | `list_repositories_bitbucket_enterprise` |
| `lV` | `get_diagnostics` |
| `m64` | `eval_git_diff` |
| `M90` | `slack_read` |
| `N3` | `edit_file` |
| `n64` | `search_bitbucket_enterprise` |
| `N90` | `list_repositories` |
| `nV` | `code_review` |
| `nx0` | `read_file` |
| `o64` | `commit_search_bitbucket_enterprise` |
| `oE` | `read_thread` |
| `ox0` | `slack_write` |
| `OY` | `shell_command` |
| `p64` | `post_explanation` |
| `q3` | `oracle` |
| `q90` | `list_directory_github` |
| `qD` | `apply_patch` |
| `r64` | `render_agg_man` |
| `rE` | `find_thread` |
| `s64` | `create_project` |
| `Sk` | `task_list` |
| `t64` | `archive_thread` |
| `u64` | `docs_read` |
| `vk` | `handoff` |
| `w90` | `painter` |
| `W90` | `read_github` |
| `Wc` | `file_tree` |
| `xk` | `send_message_to_aggman` |
| `XQ` | `skill` |
| `yk` | `send_message_to_thread` |
| `z90` | `commit_search` |
| `zD` | `read_web_page` |

## Static Known Tool Names (`sW0`)
| # | Tool |
| --- | --- |
| 1 | `Bash` |
| 2 | `Grep` |
| 3 | `Read` |
| 4 | `Task` |
| 5 | `apply_patch` |
| 6 | `archive_thread` |
| 7 | `chart` |
| 8 | `code_review` |
| 9 | `code_tour` |
| 10 | `commit_search` |
| 11 | `commit_search_bitbucket_enterprise` |
| 12 | `create_file` |
| 13 | `create_project` |
| 14 | `create_thread` |
| 15 | `diff` |
| 16 | `diff_bitbucket_enterprise` |
| 17 | `docs_list` |
| 18 | `docs_read` |
| 19 | `docs_write` |
| 20 | `edit_file` |
| 21 | `eval_git_diff` |
| 22 | `find_thread` |
| 23 | `finder` |
| 24 | `get_diagnostics` |
| 25 | `github_repo_ci_status` |
| 26 | `glob` |
| 27 | `glob_bitbucket_enterprise` |
| 28 | `glob_github` |
| 29 | `handoff` |
| 30 | `librarian` |
| 31 | `list_directory_bitbucket_enterprise` |
| 32 | `list_directory_github` |
| 33 | `list_repositories` |
| 34 | `list_repositories_bitbucket_enterprise` |
| 35 | `look_at` |
| 36 | `mermaid` |
| 37 | `oracle` |
| 38 | `painter` |
| 39 | `post_explanation` |
| 40 | `read_bitbucket_enterprise` |
| 41 | `read_github` |
| 42 | `read_mcp_resource` |
| 43 | `read_thread` |
| 44 | `read_web_page` |
| 45 | `render_agg_man` |
| 46 | `search_bitbucket_enterprise` |
| 47 | `search_github` |
| 48 | `send_message_to_aggman` |
| 49 | `send_message_to_thread` |
| 50 | `shell_command` |
| 51 | `skill` |
| 52 | `slack_read` |
| 53 | `slack_write` |
| 54 | `task_list` |
| 55 | `unarchive_thread` |
| 56 | `web_search` |

## Mode Matrix (`HL`)
| Mode Key | Display Name | Description | Primary Model Key | Include Tools | Deferred Tools | Visible |
| --- | --- | --- | --- | --- | --- | --- |
| `agg-man` | Agg | Navigate work across Amp projects, threads, and context | `CLAUDE_OPUS_4_6` | 23 | 0 | false |
| `deep` | Deep | Deep reasoning with GPT-5.4 | `GPT_5_4` | 16 | 2 | true |
| `frontier` | Frontier | Frontier mode for Amp development and debugging | `CLAUDE_OPUS_4_7` | 16 | 0 | true |
| `large` | Large | The biggest context window possible (Opus 4.6 1M tokens), for large tasks | `CLAUDE_OPUS_4_6` | 17 | 2 | true |
| `nostromo` | nostromo | Internal-only deterministic test mode with scripted tool scenarios | `AMP_NOSTROMO` | 23 | 0 | true |
| `rush` | Rush | Faster and cheaper for small, well-defined tasks | `CLAUDE_HAIKU_4_5` | 23 | 0 | true |
| `smart` | Smart | The most capable model and set of tools | `CLAUDE_OPUS_4_7` | 17 | 2 | true |

### Mode `agg-man`

Include tools:
- `find_thread`
- `read_thread`
- `web_search`
- `read_web_page`
- `docs_list`
- `docs_read`
- `docs_write`
- `render_agg_man`
- `create_project`
- `create_thread`
- `archive_thread`
- `unarchive_thread`
- `send_message_to_thread`
- `slack_write`
- `slack_read`
- `github_repo_ci_status`
- `read_github`
- `search_github`
- `commit_search`
- `list_directory_github`
- `list_repositories`
- `glob_github`
- `diff`

Deferred tools:
- (none)

### Mode `deep`

Include tools:
- `shell_command`
- `apply_patch`
- `web_search`
- `read_web_page`
- `mermaid`
- `chart`
- `skill`
- `read_thread`
- `find_thread`
- `librarian`
- `oracle`
- `code_tour`
- `finder`
- `painter`
- `handoff`
- `send_message_to_aggman`

Deferred tools:
- `code_tour`
- `code_review`

### Mode `frontier`

Include tools:
- `Read`
- `finder`
- `Bash`
- `create_file`
- `edit_file`
- `web_search`
- `read_web_page`
- `read_thread`
- `find_thread`
- `skill`
- `oracle`
- `librarian`
- `Task`
- `look_at`
- `handoff`
- `painter`

Deferred tools:
- (none)

### Mode `large`

Include tools:
- `Read`
- `finder`
- `Bash`
- `create_file`
- `edit_file`
- `web_search`
- `read_web_page`
- `read_thread`
- `find_thread`
- `skill`
- `oracle`
- `librarian`
- `Task`
- `look_at`
- `handoff`
- `painter`
- `read_mcp_resource`

Deferred tools:
- `code_tour`
- `code_review`

### Mode `nostromo`

Include tools:
- `Bash`
- `Read`
- `Task`
- `apply_patch`
- `chart`
- `code_tour`
- `create_file`
- `edit_file`
- `find_thread`
- `finder`
- `handoff`
- `librarian`
- `look_at`
- `mermaid`
- `oracle`
- `painter`
- `read_mcp_resource`
- `read_thread`
- `read_web_page`
- `send_message_to_aggman`
- `shell_command`
- `skill`
- `web_search`

Deferred tools:
- (none)

### Mode `rush`

Include tools:
- `Read`
- `Grep`
- `glob`
- `finder`
- `Bash`
- `create_file`
- `edit_file`
- `get_diagnostics`
- `web_search`
- `read_web_page`
- `read_mcp_resource`
- `mermaid`
- `chart`
- `read_thread`
- `find_thread`
- `skill`
- `oracle`
- `handoff`
- `librarian`
- `Task`
- `task_list`
- `look_at`
- `painter`

Deferred tools:
- (none)

### Mode `smart`

Include tools:
- `Read`
- `finder`
- `Bash`
- `create_file`
- `edit_file`
- `web_search`
- `read_web_page`
- `read_thread`
- `find_thread`
- `skill`
- `oracle`
- `librarian`
- `Task`
- `look_at`
- `handoff`
- `painter`
- `read_mcp_resource`

Deferred tools:
- `code_tour`
- `code_review`

## Subagent Matrix (`D5`)
| Subagent Key | Display Name | Model Key | Include Tools | allowMcp | allowToolbox |
| --- | --- | --- | --- | --- | --- |
| `code-review` | Code Review | `GEMINI_3_1_PRO_PREVIEW` | 6 | false | false |
| `code-tour` | Code Tour | `CLAUDE_OPUS_4_6` | 8 | false | false |
| `codereview-check` | Codereview Check | `CLAUDE_HAIKU_4_5` | 4 | false | false |
| `finder` | Finder | `CLAUDE_HAIKU_4_5` | 3 | false | false |
| `librarian` | Librarian | `CLAUDE_SONNET_4_6` | 7 | false | false |
| `oracle` | Oracle | `GPT_5_4` | 7 | false | false |
| `task-subagent` | Task Subagent | `(inherited)` | 10 | true | true |

## Parsed Tool Spec Entries
| Resolved Name | Name Expression | Input Schema Type | Source Expression | Description Preview |
| --- | --- | --- | --- | --- |
| `(unresolved)` | `Z0.name` | `expression` | `{mcp:f}` | (none) |
| `(unresolved)` | `F` | `expression` | `{mcp:B,target:$},meta:X` | (none) |
| `Read` | `c6` | `object` | `"builtin"` | (none) |
| `edit_file` | `N3` | `expression` | `"builtin"` | Make edits to a text file.  Replaces \... |
| `skill` | `XQ` | `object` | `"builtin"` | Load a specialized skill when the task matches one of the skills listed in the system prompt.  Use this tool to inject t... |
| `painter` | `w90` | `object` | `"builtin"` | Generate an image using an AI model.  IMPORTANT: Only invoke this tool when the user explicitly asks to use the "${w90}"... |
| `handoff` | `vk` | `object` | `"builtin",meta:{}` | Hand off work to a new thread that runs in the background. Use this tool when you need to continue work in a fresh conte... |
| `(unresolved)` | `D.name` | `expression` | `{plugin:G}` | (none) |
| `get_diagnostics` | `lV` | `object` | `"builtin"` | Get the diagnostics (errors, warnings, etc.) for a file or directory (prefer running for directories rather than files o... |
| `apply_patch` | `qD` | `expression` | `"builtin"` | Apply a patch to one or more files using the Codex patch format.  You MUST read the file before applying a patch to it. ... |
| `Bash` | `I6` | `object` | `"builtin",meta:{disableTimeout:!0}` | Executes the given shell command using bash (or sh on systems without bash).  - Do NOT chain commands with \... |
| `chart` | `Ec` | `object` | `"builtin"` | Render a chart visualization by running a command that produces JSON data. The chart is displayed inline to the user.  U... |
| `code_review` | `"code_review"` | `object-unparsed` | `"builtin"` | Review code changes, diffs, outstanding changes, or modified files. Use when asked to review changes, check code quality... |
| `post_explanation` | `p64` | `object` | `"builtin"` | Post one markdown explanation section for the code tour.... |
| `eval_git_diff` | `m64` | `object` | `"builtin"` | Run a shell command that computes a git diff and return the raw diff text as the tool result.... |
| `code_tour` | `g64` | `object-unparsed` | `"builtin"` | Generate a guided code tour for working changes relative to a base commit.  Use this tool for: - Walking through uncommi... |
| `glob` | `fq` | `object` | `"builtin"` | Fast file pattern matching tool that works with any codebase size  Use this tool to find files by name patterns across y... |
| `Grep` | `I3` | `object` | `"builtin"` | Search for exact text patterns in files using ripgrep, a fast keyword search tool.  # When to use this tool - Finding ex... |
| `finder` | `I8` | `object-unparsed` | `"builtin"` | Intelligently search your codebase: Use it for complex, multi-step search tasks where you need to find code based on fun... |
| `create_file` | `g3` | `object` | `"builtin"` | Create or overwrite a file in the workspace.  Use this tool to create a **new file** that does not yet exist.  For **exi... |
| `find_thread` | `rE` | `object` | `"builtin",meta:{}` | Find Amp threads (conversation threads with the agent) using a query DSL.  ## What this tool finds  This tool searches *... |
| `commit_search_bitbucket_enterprise` | `o64` | `object` | `"builtin"` | (none) |
| `diff_bitbucket_enterprise` | `a64` | `object` | `"builtin"` | (none) |
| `glob_bitbucket_enterprise` | `i64` | `object` | `"builtin"` | (none) |
| `list_directory_bitbucket_enterprise` | `c64` | `object` | `"builtin"` | (none) |
| `list_repositories_bitbucket_enterprise` | `l64` | `object` | `"builtin"` | (none) |
| `read_bitbucket_enterprise` | `d64` | `object` | `"builtin"` | (none) |
| `search_bitbucket_enterprise` | `n64` | `object` | `"builtin"` | (none) |
| `commit_search` | `z90` | `object` | `"builtin"` | Search commit history in a single GitHub repository.  Use this when you need historical context: which commits touched a... |
| `diff` | `C90` | `object` | `"builtin"` | Get a diff between two commits, branches, or tags in a single GitHub repository.  Use this when you need file-level chan... |
| `glob_github` | `I90` | `object` | `"builtin"` | Find files matching a glob pattern in a GitHub repository.  Use this when you know the file shapes you want and need mat... |
| `list_directory_github` | `q90` | `object` | `"builtin"` | List the contents of a directory in a GitHub repository.  Use this when you need to inspect repository structure or disc... |
| `list_repositories` | `N90` | `object` | `"builtin"` | List repositories on GitHub, prioritizing repositories the user can already access.  Use this when you need to discover ... |
| `read_github` | `W90` | `object` | `"builtin"` | (none) |
| `search_github` | `H90` | `object` | `"builtin"` | Search for code patterns inside a single GitHub repository and return matches grouped by file, with line numbers and sur... |
| `librarian` | `k2` | `object-unparsed` | `"builtin"` | The Librarian is a codebase-understanding subagent for repositories outside the local workspace.  It can read public Git... |
| `look_at` | `E90` | `object` | `"builtin"` | Extract specific information from a local file (including PDFs, images, and other media).  Use this tool when you need t... |
| `mermaid` | `kk` | `object` | `"builtin"` | Renders a Mermaid diagram from the provided code.  PROACTIVELY USE DIAGRAMS when they would better convey information th... |
| `oracle` | `q3` | `object-unparsed` | `"builtin"` | Consult the oracle - an AI advisor powered by OpenAI's GPT-5.4 reasoning model that can plan, review, and provide expert... |
| `read_mcp_resource` | `K90` | `object` | `"builtin"` | Read a resource from an MCP (Model Context Protocol) server.  Use when the user references an MCP resource, e.g. "read @... |
| `read_thread` | `oE` | `object` | `"builtin",meta:{}` | Read and extract relevant content from another Amp thread by its ID or ampcode.com URL.  This tool fetches a thread (loc... |
| `read_web_page` | `zD` | `object` | `"builtin"` | Read the contents of a web page at a given URL.  When only the url parameter is set, it returns the contents of the webp... |
| `shell_command` | `OY` | `object` | `"builtin",meta:{disableTimeout:!0}` | Runs a shell command and returns its output. - Always set the \`workdir\` param when using the shell_command function. D... |
| `Task` | `h3` | `object` | `"builtin",meta:{disableTimeout:!0}` | Perform a task (a sub-task of the user's overall task) using a sub-agent that has access to the following tools: ${DG5}.... |
| `web_search` | `iV` | `object-unparsed` | `"builtin"` | Search the web for information relevant to a research objective.  Use when you need up-to-date or precise documentation.... |

## Coverage Deltas
### In `sW0` but not in resolved parsed spec names
- `archive_thread`
- `create_project`
- `create_thread`
- `docs_list`
- `docs_read`
- `docs_write`
- `github_repo_ci_status`
- `render_agg_man`
- `send_message_to_aggman`
- `send_message_to_thread`
- `slack_read`
- `slack_write`
- `task_list`
- `unarchive_thread`

### In resolved parsed spec names but not in `sW0`
- (none)

## Notes
- `sW0` is a static list and does not include every possible dynamic source (MCP/toolbox/custom subagents).
- Parsed spec coverage includes builtins and dynamic registration paths where a literal `spec:{name:...}` object appears in bundle source.
