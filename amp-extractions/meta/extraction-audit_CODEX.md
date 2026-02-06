# CODEX Extraction Audit

- Artifact: `amp-extractions/meta/extraction-artifacts_CODEX.json`
- Generated: `2026-02-06T10:15:24.179Z`
- Build version: `0.0.1770366910-g1852ef`
- Bundle path: `npm-packages/0.0.1770366910-g1852ef/node_modules/@sourcegraph/amp/dist/main.js`
- Bundle size: `8659146` bytes

## Verified High-Signal Counts
- `z86` settings keys: **40**
- VS Code `amp.*` properties keys: **36**
- `sW0` tool-name entries: **45**
- Agent modes (`HL`): **6**
- Subagent modes (`D5`): **6**
- Model catalog (`D4`): **35**

## Reproduction
```bash
node amp-extractions/scripts/extract_bundle_codex.mjs
node amp-extractions/scripts/generate_codex_docs.mjs
```
