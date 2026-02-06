# AMP CLI Settings Testing Guide (CODEX)

- Source bundle: `npm-packages/0.0.1770366910-g1852ef/node_modules/@sourcegraph/amp/dist/main.js`
- Build version: `0.0.1770366910-g1852ef`

## Goal
Validate whether `SCHEMA-ONLY` and `READ-ONLY` keys in `settings-verification-status_CODEX.md` are truly functional in runtime behavior.

## Baseline Procedure
1. Back up settings:
```bash
cp ~/.amp/settings.json ~/.amp/settings.json.bak
```
2. Run a baseline command and capture behavior:
```bash
amp "sanity check"
```
3. Set one target key to a non-default value.
4. Run the same command and compare behavior.
5. Turn on debug logs and re-run:
```bash
export AMP_LOG_LEVEL=debug
export AMP_CLI_STDOUT_DEBUG=1
amp "sanity check"
```

## Priority Tests
1. `amp.tools.disable` and `amp.tools.enable`
- Verify tool filtering precedence and wildcard behavior.

2. `amp.terminal.commands.nodeSpawn.loadProfile`
- Verify shell profile loading modes (`always`/`never`/`fallback` behavior).

3. `amp.notifications.enabled` and `amp.notifications.system.enabled`
- Verify sound vs system notifications independently.

4. `amp.anthropic.thinking.enabled` and `amp.anthropic.effort`
- Verify model output differences when toggling thinking and effort levels.

5. `amp.openrouter.apiKey`
- Verify fallback order against `OPENROUTER_API_KEY` environment variable.

## Suggested Regression Matrix
- Interactive mode vs execute mode
- Fresh thread vs resumed thread
- Smart mode vs non-default modes (deep/rush/free where available)
- Local workspace with and without MCP/toolbox configuration

## Reporting Template
```text
Setting:
Configured Value:
Expected Behavior:
Observed Behavior:
Debug Evidence:
Conclusion: WORKS | PARTIAL | NO-OP
```
