# Amp CLI Extractions (CODEX, Audited Pass 2)

This index points to the second-pass `_CODEX` docs regenerated from:

- `npm-packages/0.0.1770366910-g1852ef/node_modules/@sourcegraph/amp/dist/main.js`
- Build literal: `0.0.1770366910-g1852ef`

## Primary Outputs
- `amp-extractions/AUDIT_SUMMARY_CODEX.md`
- `amp-extractions/meta/extraction-audit_CODEX.md`
- `amp-extractions/meta/extraction-artifacts_CODEX.json`
- `amp-extractions/config/README_CODEX.md`
- `amp-extractions/agents/agent-tools_CODEX.md`
- `amp-extractions/agents/librarian-system-prompt_CODEX.md`
- `amp-extractions/agents/oracle-system-prompt_CODEX.md`
- `amp-extractions/agents/smart-system-prompt_CODEX.md`

## Regeneration
```bash
node amp-extractions/scripts/extract_bundle_codex.mjs
node amp-extractions/scripts/generate_codex_docs.mjs
```

## Notes
- `_CODEX` docs are additive and do not overwrite historical baseline docs.
- This pass is artifact-backed for high-signal counts and key inventories (settings, tools, modes, endpoints, model catalog).
