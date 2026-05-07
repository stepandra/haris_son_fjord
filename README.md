# Amp CLI Extractions

This repository contains artifact-backed documentation extracted from the Amp CLI minified bundle.

## Source Metadata

- Build: `0.0.1777185893-gae6d40`
- Extraction artifact: `amp-extractions/meta/extraction-artifacts.json`
- Note: the vendored CLI bundle and SDK directories were removed from this repository; only the extracted docs and metadata remain.

## Primary Docs

Start here:

- `amp-extractions/agents-and-subagents.md` — simple map of public, hidden, internal, and support agents/subagents.
- `amp-extractions/settings-undocumented.md` — settings found in the bundle but not documented in the public Owner's Manual.
- `amp-extractions/providers-and-models.md` — provider enum, model catalog, and which modes/subagents use each model.

Detailed reference:

- `amp-extractions/config/settings.md` — full extracted settings registry and runtime-read evidence.
- `amp-extractions/config/settings-verification-status.md` — confidence/evidence categories for settings.
- `amp-extractions/agents/agent-tools.md` — generated tool/mode/subagent matrix.
- `amp-extractions/agents/*system-prompt.md` — full extracted prompt text where available.
- `amp-extractions/meta/extraction-artifacts.json` — raw machine-readable extraction artifact.
- `amp-extractions/AUDIT_SUMMARY.md` — extraction counts and regeneration notes.

## Regeneration

```bash
node amp-extractions/scripts/extract_bundle_codex.mjs /path/to/@sourcegraph/amp/dist/main.js amp-extractions/meta/extraction-artifacts.json
node amp-extractions/scripts/generate_codex_docs.mjs amp-extractions/meta/extraction-artifacts.json
node amp-extractions/scripts/generate_simple_docs.mjs amp-extractions/meta/extraction-artifacts.json
```

## Notes

The previous `_CODEX` duplicate documentation files were consolidated into the canonical non-suffixed files above. Model enum names containing `CODEX` are retained because they are real Amp model identifiers.
