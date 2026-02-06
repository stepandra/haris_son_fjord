# Amp Extraction Refresh Summary (CODEX, Audited Pass 2)

- Source build: `0.0.1770366910-g1852ef`
- Source bundle: `npm-packages/0.0.1770366910-g1852ef/node_modules/@sourcegraph/amp/dist/main.js`
- Generated from artifact at: `amp-extractions/meta/extraction-artifacts_CODEX.json`

## Verified Counts
- `z86` CLI settings keys: **40**
- VS Code `amp.*` settings keys: **36**
- Static tool-name list `sW0`: **45**
- Parsed `spec:{name:...}` tool entries: **47**
- Agent modes (`HL`): **6**
- Subagent modes (`D5`): **6**
- Model catalog (`D4`): **35**
- Provider enum (`O4`): **10**
- Provider proxy endpoints: **9**

## Updated Documents
- `amp-extractions/config/settings_CODEX.md`
- `amp-extractions/config/settings-verification-status_CODEX.md`
- `amp-extractions/config/testing-guide_CODEX.md`
- `amp-extractions/config/endpoints_CODEX.md`
- `amp-extractions/config/ERRATA_CODEX.md`
- `amp-extractions/config/README_CODEX.md`
- `amp-extractions/agents/agent-tools_CODEX.md`
- `amp-extractions/agents/librarian-system-prompt_CODEX.md`
- `amp-extractions/agents/oracle-system-prompt_CODEX.md`
- `amp-extractions/agents/smart-system-prompt_CODEX.md`
- `amp-extractions/meta/extraction-audit_CODEX.md`

## Key Corrections
- Corrected settings count drift (`z86` is 40, not 42 in this build).
- Corrected VS Code settings count drift (36 `amp.*` keys, not 35).
- Corrected static tool-list framing (`sW0` has 45 names; dynamic sources can add more).
- Replaced first-pass partial config docs with machine-generated artifact-backed docs.

## Reproduction
```bash
node amp-extractions/scripts/extract_bundle_codex.mjs
node amp-extractions/scripts/generate_codex_docs.mjs
```
