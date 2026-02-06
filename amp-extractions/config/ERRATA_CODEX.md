# Documentation Errata (CODEX Refresh)

- Previous baseline docs referenced: `0.0.1761153678-gfa55cf`
- Current analyzed build: `0.0.1770366910-g1852ef`

## Major Drift Corrected
1. **Tool naming drift in Librarian stack**
- GitHub tools now expose names such as `search_github`, `commit_search`, and `diff` (not the older `search_github_code` / `search_github_commits` / `diff_github` forms).

2. **Bitbucket Enterprise tooling is fully represented**
- Current bundle includes dedicated Bitbucket Enterprise tools:
  - `read_bitbucket_enterprise`
  - `search_bitbucket_enterprise`
  - `commit_search_bitbucket_enterprise`
  - `list_directory_bitbucket_enterprise`
  - `list_repositories_bitbucket_enterprise`
  - `glob_bitbucket_enterprise`
  - `diff_bitbucket_enterprise`

3. **Settings schema count and shape changed**
- Current schema extraction yields 36 `amp.*` entries, with multiple runtime keys living outside the schema block.

4. **Oracle invocation text updated**
- Invocation description now references OpenAI **GPT-5.2** reasoning model text in-bundle.

5. **OpenRouter routing remains direct**
- The bundle still contains direct `https://openrouter.ai/api/v1` usage while many other providers use `/api/provider/*` behind `amp.url`.

## Associated CODEX Files
- `amp-extractions/config/settings_CODEX.md`
- `amp-extractions/config/endpoints_CODEX.md`
- `amp-extractions/agents/agent-tools_CODEX.md`
- `amp-extractions/agents/librarian-system-prompt_CODEX.md`
- `amp-extractions/agents/oracle-system-prompt_CODEX.md`
- `amp-extractions/agents/smart-system-prompt_CODEX.md`
