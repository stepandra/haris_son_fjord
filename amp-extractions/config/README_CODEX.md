# AMP Config Docs Index (CODEX, Audited)

This directory contains artifact-backed configuration documentation for build `0.0.1770366910-g1852ef`.

## Primary Docs
- `settings_CODEX.md`: full `z86` + VS Code schema + runtime-read crosswalk.
- `settings-verification-status_CODEX.md`: static evidence classification by schema/read status.
- `testing-guide_CODEX.md`: manual validation workflow for ambiguous settings.
- `endpoints_CODEX.md`: provider endpoints, model catalog, and API path inventory.
- `ERRATA_CODEX.md`: corrected drift and audit notes.

## Audit Artifacts
- `../meta/extraction-artifacts_CODEX.json`
- `../meta/extraction-audit_CODEX.md`

## Reproduction
```bash
node amp-extractions/scripts/extract_bundle_codex.mjs
node amp-extractions/scripts/generate_codex_docs.mjs
```
