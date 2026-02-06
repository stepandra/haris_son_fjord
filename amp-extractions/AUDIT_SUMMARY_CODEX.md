# Amp Extraction Refresh Summary (CODEX)

- Previous docs in this repo were primarily pinned to Amp CLI `0.0.1761153678-gfa55cf`.
- This refresh is pinned to Amp CLI `0.0.1770366910-g1852ef` (bundle timestamp `2026-02-06T08:40:14.971Z`).
- Generated at: `2026-02-06T09:30:38.714Z`

## New Files
- `amp-extractions/config/settings_CODEX.md`
- `amp-extractions/config/settings-verification-status_CODEX.md`
- `amp-extractions/config/testing-guide_CODEX.md`
- `amp-extractions/config/endpoints_CODEX.md`
- `amp-extractions/config/ERRATA_CODEX.md`
- `amp-extractions/config/README_CODEX.md`
- `amp-extractions/agents/librarian-system-prompt_CODEX.md`
- `amp-extractions/agents/oracle-system-prompt_CODEX.md`
- `amp-extractions/agents/smart-system-prompt_CODEX.md`
- `amp-extractions/agents/agent-tools_CODEX.md`
- `amp-extractions/AUDIT_SUMMARY_CODEX.md`

## Key Findings
- Settings schema block now yields **36** entries (static extraction).
- Runtime reads include **35** distinct dotted keys; **20** are outside the schema block.
- OpenRouter is still direct (`https://openrouter.ai/api/v1`), while many other providers route through `/api/provider/*` paths on `amp.url`.
- Librarian tool naming differs from older docs (`search_github` / `commit_search` / `diff` etc.), and Bitbucket Enterprise tools are first-class in this build.
- Oracle invocation description now explicitly references GPT-5.2 reasoning model text in-bundle.

## Method
- Static parsing of minified bundle (`dist/main.js`) using brace-aware extraction and focused schema/template decoding.
- No reliance on historical line numbers from previous builds.
