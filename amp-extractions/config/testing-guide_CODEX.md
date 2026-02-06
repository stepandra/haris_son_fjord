# AMP CLI Settings Testing Guide (CODEX, Audited)

- Source bundle: `npm-packages/0.0.1770366910-g1852ef/node_modules/@sourcegraph/amp/dist/main.js`
- Build version: `0.0.1770366910-g1852ef`
- Generated: `2026-02-06T10:15:24.179Z`

## Goal
Manually validate behavior for keys with weaker static evidence, especially `RUNTIME-ONLY-CANDIDATE` settings.

## Baseline Procedure
1. Back up settings:
```bash
cp ~/.amp/settings.json ~/.amp/settings.json.bak
```
2. Capture baseline behavior:
```bash
amp "sanity check"
```
3. Toggle one target key and rerun the same workflow.
4. Capture debug evidence:
```bash
export AMP_LOG_LEVEL=debug
export AMP_CLI_STDOUT_DEBUG=1
amp "sanity check"
```
5. Restore original settings after each test.

## Recommended Targets (Highest Static Runtime Read Frequency)
- `amp.bitbucket.enterprise.connections`
- `amp.experimental.autoSnapshot`
- `amp.agent.showUsageDebugInfo`
- `amp.internal.kimi.reasoning`
- `amp.console.level`
- `amp.console.lock`
- `amp.experimental.cli.commandTelemetry.enabled`
- `amp.experimental.compaction`
- `amp.internal.cli.logViewer`
- `amp.internal.fireworks.directRouting`
- `amp.internal.scaffoldCustomizationFile`
- `amp.openrouter.apiKey`

## Suggested Matrix
- Interactive mode vs execute mode.
- New thread vs resumed thread.
- Smart mode vs rush/free/deep where relevant.
- With and without MCP/toolbox settings.

## Reporting Template
```text
Setting:
Configured Value:
Expected Behavior:
Observed Behavior:
Debug Evidence:
Conclusion: WORKS | PARTIAL | NO-OP
```
