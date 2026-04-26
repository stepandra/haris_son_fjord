# Amp Agents and Subagents

- Build: `0.0.1777185893-gae6d40`
- Source bundle: `npm-packages/0.0.1777185893-gae6d40/node_modules/@sourcegraph/amp/dist/main.js`
- Public comparison sources: `https://ampcode.com/manual` and `https://ampcode.com/models`

This is the simple map of agent modes, true subagents, and less-public/internal entries. Full prompt text lives in the individual `agents/*system-prompt.md` files.

## Agent Modes

| Key | Display | Model | Public? | Notes | Tools |
| --- | --- | --- | --- | --- | --- |
| `smart` | Smart | `CLAUDE_OPUS_4_7` | yes | reasoning=high | `Read`, `finder`, `Bash`, `create_file`, `edit_file`, `web_search`, `read_web_page`, `read_thread`, `find_thread`, `skill`, `oracle`, `librarian`, `Task`, `look_at`, `handoff`, `painter`, `read_mcp_resource` |
| `rush` | Rush | `CLAUDE_HAIKU_4_5` | yes |  | `Read`, `Grep`, `glob`, `finder`, `Bash`, `create_file`, `edit_file`, `get_diagnostics`, `web_search`, `read_web_page`, `read_mcp_resource`, `mermaid`, `chart`, `read_thread`, `find_thread`, `skill`, `oracle`, `handoff`, `librarian`, `Task`, `task_list`, `look_at`, `painter` |
| `agg-man` | Agg | `CLAUDE_OPUS_4_6` | no/hidden | server-only | `find_thread`, `read_thread`, `web_search`, `read_web_page`, `docs_list`, `docs_read`, `docs_write`, `render_agg_man`, `create_project`, `create_thread`, `archive_thread`, `unarchive_thread`, `send_message_to_thread`, `slack_write`, `slack_read`, `github_repo_ci_status`, `read_github`, `search_github`, `commit_search`, `list_directory_github`, `list_repositories`, `glob_github`, `diff` |
| `large` | Large | `CLAUDE_OPUS_4_6` | yes |  | `Read`, `finder`, `Bash`, `create_file`, `edit_file`, `web_search`, `read_web_page`, `read_thread`, `find_thread`, `skill`, `oracle`, `librarian`, `Task`, `look_at`, `handoff`, `painter`, `read_mcp_resource` |
| `deep` | Deep | `GPT_5_4` | yes | reasoning=high | `shell_command`, `apply_patch`, `web_search`, `read_web_page`, `mermaid`, `chart`, `skill`, `read_thread`, `find_thread`, `librarian`, `oracle`, `code_tour`, `finder`, `painter`, `handoff`, `send_message_to_aggman` |
| `frontier` | Frontier | `CLAUDE_OPUS_4_7` | no/hidden | reasoning=xhigh | `Read`, `finder`, `Bash`, `create_file`, `edit_file`, `web_search`, `read_web_page`, `read_thread`, `find_thread`, `skill`, `oracle`, `librarian`, `Task`, `look_at`, `handoff`, `painter` |
| `nostromo` | nostromo | `AMP_NOSTROMO` | no/hidden | reasoning=low | `Bash`, `Read`, `Task`, `apply_patch`, `chart`, `code_tour`, `create_file`, `edit_file`, `find_thread`, `finder`, `handoff`, `librarian`, `look_at`, `mermaid`, `oracle`, `painter`, `read_mcp_resource`, `read_thread`, `read_web_page`, `send_message_to_aggman`, `shell_command`, `skill`, `web_search` |

## True Subagents

| Key | Display | Model | Public/default? | MCP | Toolbox | Tools |
| --- | --- | --- | --- | --- | --- | --- |
| `finder` | Finder | `CLAUDE_HAIKU_4_5` | yes/known | false | false | `Grep`, `glob`, `Read` |
| `oracle` | Oracle | `GPT_5_4` | yes/known | false | false | `Read`, `Grep`, `glob`, `web_search`, `read_web_page`, `read_thread`, `find_thread` |
| `librarian` | Librarian | `CLAUDE_SONNET_4_6` | yes/known | false | false | `read_github`, `search_github`, `commit_search`, `diff`, `list_directory_github`, `list_repositories`, `glob_github` |
| `task-subagent` | Task Subagent | `inherits` | yes/known | true | true | `Read`, `Bash`, `edit_file`, `create_file`, `read_web_page`, `web_search`, `finder`, `skill`, `task_list`, `look_at` |
| `code-review` | Code Review | `GEMINI_3_1_PRO_PREVIEW` | yes/known | false | false | `Read`, `Grep`, `glob`, `web_search`, `read_web_page`, `Bash` |
| `code-tour` | Code Tour | `CLAUDE_OPUS_4_6` | internal or support | false | false | `Read`, `Grep`, `glob`, `web_search`, `read_web_page`, `Bash`, `eval_git_diff`, `post_explanation` |
| `codereview-check` | Codereview Check | `CLAUDE_HAIKU_4_5` | internal or support | false | false | `Read`, `Grep`, `glob`, `Bash` |

## Internal, Hidden, Test, or Support Entries

### Agent modes
- `agg-man` (Agg) uses `CLAUDE_OPUS_4_6`; server-only.
- `frontier` (Frontier) uses `CLAUDE_OPUS_4_7`; reasoning=xhigh.
- `nostromo` (nostromo) uses `AMP_NOSTROMO`; reasoning=low.

### Subagents
- `code-tour` (Code Tour) uses `CLAUDE_OPUS_4_6`; tools: `Read`, `Grep`, `glob`, `web_search`, `read_web_page`, `Bash`, `eval_git_diff`, `post_explanation`.
- `codereview-check` (Codereview Check) uses `CLAUDE_HAIKU_4_5`; tools: `Read`, `Grep`, `glob`, `Bash`.

## Prompt Files

- Smart/Rush/Deep/Large/Frontier/Nostromo/Agg mode prompts: `agents/smart-system-prompt.md`
- Agg Man standalone prompt: `agents/aggman-system-prompt.md`
- Finder/Search: `agents/finder-system-prompt.md`
- Oracle: `agents/oracle-system-prompt.md`
- Librarian: `agents/librarian-system-prompt.md`
- Review and check subagents: `agents/code-review-system-prompt.md`
- Code Tour: `agents/code-tour-system-prompt.md`
- Look At, Painter, Handoff, Titling model instructions: `agents/system-model-instructions.md`
