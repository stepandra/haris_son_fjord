# Documentation Errata (Audited)

- Source bundle: `npm-packages/0.0.1777185893-gae6d40/node_modules/@sourcegraph/amp/dist/main.js`
- Build version: `0.0.1777185893-gae6d40`
- Generated: `2026-04-26T07:37:19.914Z`

## Corrected High-Impact Drift
1. `z86` setting count corrected to **43**.
2. Static known tool-name list `sW0` count corrected to **56**.
3. Settings/config docs now come from machine-generated artifact data instead of manual partial extraction.
4. No VS Code extension settings contribution block was found in this CLI bundle; VS Code IDE integration should not be conflated with an extension settings schema.

## Artifact-Backed Sources
- `amp-extractions/meta/extraction-artifacts.json`
- `amp-extractions/meta/extraction-audit.md`
- `amp-extractions/config/settings.md`
- `amp-extractions/config/endpoints.md`
- `amp-extractions/agents/agent-tools.md`
