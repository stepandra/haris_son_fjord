# Amp Extraction Refresh Summary (Audited)

- Source build: `0.0.1777185893-gae6d40`
- Source bundle: `npm-packages/0.0.1777185893-gae6d40/node_modules/@sourcegraph/amp/dist/main.js`
- Generated from artifact at: `amp-extractions/meta/extraction-artifacts.json`

## Verified Counts
- CLI settings registry keys: **43**
- Static/fallback tool-name list: **56**
- Parsed `spec:{name:...}` tool entries: **45**
- Agent modes: **7**
- Subagent modes: **7**
- Model catalog: **45**
- Provider enum: **10**
- Provider proxy endpoints: **9**

## Updated Documents
- `amp-extractions/config/settings.md`
- `amp-extractions/config/settings-verification-status.md`
- `amp-extractions/config/testing-guide.md`
- `amp-extractions/config/endpoints.md`
- `amp-extractions/config/ERRATA.md`
- `amp-extractions/config/README.md`
- `amp-extractions/agents/agent-tools.md`
- `amp-extractions/agents/smart-system-prompt.md`
- `amp-extractions/agents/oracle-system-prompt.md`
- `amp-extractions/agents/librarian-system-prompt.md`
- `amp-extractions/agents/aggman-system-prompt.md`
- `amp-extractions/agents/finder-system-prompt.md`
- `amp-extractions/agents/code-review-system-prompt.md`
- `amp-extractions/agents/code-tour-system-prompt.md`
- `amp-extractions/agents/system-model-instructions.md`
- `amp-extractions/agents/AGENT_PROMPT_COVERAGE.md`
- `amp-extractions/meta/extraction-audit.md`

## Key Corrections
- Updated extraction anchors for the renamed settings registry and mode/subagent registries in the new minified bundle.
- Captured new settings such as `amp.agent.deepReasoningEffort`, `amp.bitbucketToken`, `amp.defaultVisibility`, and provider speed settings.
- Reflected that the CLI bundle does not include a VS Code extension settings contribution schema; IDE integration remains separate from settings documentation.
- Updated model and mode inventories for the `0.0.1777185893-gae6d40` bundle.
- Added coverage for the additional agents and system-model instructions surfaced by `https://ampcode.com/models`: Search/Finder, Review, Code Tour, Agg Man, Look At, Painter, Handoff, and Titling.

## Reproduction
```bash
node amp-extractions/scripts/extract_bundle_codex.mjs npm-packages/0.0.1777185893-gae6d40/node_modules/@sourcegraph/amp/dist/main.js amp-extractions/meta/extraction-artifacts.json
node amp-extractions/scripts/generate_codex_docs.mjs amp-extractions/meta/extraction-artifacts.json
```
