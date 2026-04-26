# Extraction Audit

- Artifact: `amp-extractions/meta/extraction-artifacts.json`
- Generated: `2026-04-26T07:37:19.914Z`
- Build version: `0.0.1777185893-gae6d40`
- Bundle path: `npm-packages/0.0.1777185893-gae6d40/node_modules/@sourcegraph/amp/dist/main.js`
- Bundle size: `8853424` bytes

## Verified High-Signal Counts
- `z86` settings keys: **43**
- `sW0` tool-name entries: **56**
- Agent modes (`HL`): **7**
- Subagent modes (`D5`): **7**
- Model catalog (`D4`): **45**

## Editor Settings Schema
- No VS Code extension settings contribution block was found in this CLI bundle. IDE integration is still present, but settings documentation is based on the CLI settings registry and runtime reads.

## Reproduction
```bash
node amp-extractions/scripts/extract_bundle_codex.mjs
node amp-extractions/scripts/generate_codex_docs.mjs
```
