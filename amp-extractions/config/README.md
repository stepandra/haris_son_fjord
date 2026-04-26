# AMP Config Docs Index (Audited)

This directory contains artifact-backed configuration documentation for build `0.0.1777185893-gae6d40`.

## Primary Docs
- `settings.md`: full settings registry + runtime-read crosswalk.
- `settings-verification-status.md`: static evidence classification by schema/read status.
- `testing-guide.md`: manual validation workflow for ambiguous settings.
- `endpoints.md`: provider endpoints, model catalog, and API path inventory.
- `ERRATA.md`: corrected drift and audit notes.

## Audit Artifacts
- `../meta/extraction-artifacts.json`
- `../meta/extraction-audit.md`

## Reproduction
```bash
node amp-extractions/scripts/extract_bundle_codex.mjs
node amp-extractions/scripts/generate_codex_docs.mjs
```
