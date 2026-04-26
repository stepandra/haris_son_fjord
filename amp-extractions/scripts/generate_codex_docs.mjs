#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const ARTIFACT_PATH = process.argv[2] || 'amp-extractions/meta/extraction-artifacts.json';
const artifact = JSON.parse(fs.readFileSync(ARTIFACT_PATH, 'utf8'));

function ensureDir(filePath) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
}

function mdEscape(text) {
  return String(text).replace(/\|/g, '\\|').replace(/\n/g, ' ');
}

function code(text) {
  return `\`${String(text)}\``;
}

function fmtValue(v) {
  if (v === undefined) return '(undefined)';
  if (v === null) return 'null';
  if (typeof v === 'string') return JSON.stringify(v);
  if (typeof v === 'number' || typeof v === 'boolean') return String(v);
  try {
    return JSON.stringify(v);
  } catch {
    return String(v);
  }
}

function fmtTypeFromValue(v) {
  if (v === undefined) return 'undefined';
  if (v === null) return 'null';
  if (Array.isArray(v)) return 'array';
  return typeof v;
}

function writeFile(filePath, content) {
  ensureDir(filePath);
  fs.writeFileSync(filePath, content.endsWith('\n') ? content : `${content}\n`);
}

function table(headers, rows) {
  const head = `| ${headers.join(' | ')} |`;
  const sep = `| ${headers.map(() => '---').join(' | ')} |`;
  const body = rows.map((r) => `| ${r.map((c) => mdEscape(c)).join(' | ')} |`).join('\n');
  return [head, sep, body].filter(Boolean).join('\n');
}

function buildSettingsDoc() {
  const z86Entries = artifact.settings.z86Entries;
  const z86Keys = artifact.settings.z86Keys;
  const runtimeCounts = artifact.settings.runtimeReadCounts;
  const runtimeLikely = artifact.settings.runtimeLikelyAmpKeys;

  const z86Set = new Set(z86Keys);

  const cliRows = z86Keys
    .slice()
    .sort()
    .map((k) => {
      const e = z86Entries[k];
      const fullKey = `amp.${k}`;
      const runtimeReads = runtimeCounts[k] || runtimeCounts[fullKey] || 0;
      return [
        code(fullKey),
        code(fmtTypeFromValue(e.value)),
        code(fmtValue(e.value)),
        e.visible ? 'true' : 'false',
        String(runtimeReads),
        e.description || '',
      ];
    });

  const runtimeOnlyCandidates = runtimeLikely.filter((key) => {
    if (key.startsWith('amp.')) {
      const bare = key.slice(4);
      return !z86Set.has(bare);
    }
    return !z86Set.has(key);
  });

  const runtimeOnlyRows = runtimeOnlyCandidates.map((key) => {
    const normalized = key.startsWith('amp.') ? key.slice(4) : key;
    return [
      code(key.startsWith('amp.') ? key : `amp.${key}`),
      code(normalized),
      String(runtimeCounts[key] || 0),
      z86Set.has(normalized) ? 'yes' : 'no',
    ];
  });

  const envList = artifact.settings.envVarsAmpRelevant.map((v) => `- ${code(v)}`).join('\n');
  const editorSchemaNote = artifact.anchors.vscodeProperties === null
    ? '- No VS Code extension `contributes.configuration.properties` settings block was found in this CLI bundle.'
    : `- Legacy VS Code extension settings block found at byte offset ${code(artifact.anchors.vscodeProperties)} but is not treated as canonical CLI settings documentation.`;

  return `# AMP CLI Settings Reference (Audited)

- Source bundle: ${code(artifact.metadata.bundlePath)}
- Build version: ${code(artifact.metadata.buildVersion)}
- Generated: ${code(artifact.metadata.generatedAt)}
- Extraction artifact: ${code(ARTIFACT_PATH)}
- Source anchors:
  - settings registry object at byte offset ${code(artifact.anchors.z86)}

## Summary
- CLI settings registry entries (${code('z86')}): **${artifact.settings.z86Count}**
- Distinct runtime reads (broad static scan): **${artifact.settings.runtimeReadCountDistinct}**
- Distinct runtime reads (likely Amp settings): **${artifact.settings.runtimeLikelyAmpCount}**
- Amp-relevant environment variables: **${artifact.settings.envVarsAmpRelevant.length}**

## Method
- CLI registry extracted from object literal ${code('z86')}.
- Runtime reads extracted from static patterns ${code('settings["..."]')}, ${code('.get("...")')}, and ${code('settings?.prop')}.
- Runtime metrics are static evidence and can undercount dynamic key construction.
${editorSchemaNote}

## CLI Registry (${code('z86')})
${table(['Key', 'Type', 'Default', 'Visible', 'Runtime Reads', 'Description'], cliRows)}

## Runtime-Only Candidates
These keys are likely read at runtime but are not present in ${code('z86')}.

${table(['Presented Key', 'Bare Key', 'Read Count', 'In z86'], runtimeOnlyRows)}

## Environment Variables (Amp-Relevant)
${envList}

## Notes
- The CLI settings registry currently contains **${artifact.settings.z86Count}** keys in this build.
- IDE integration still exists in Amp, but this CLI bundle does not include a VS Code extension settings contribution schema.
`;
}

function buildEndpointsDoc() {
  const providers = artifact.models.providers;
  const models = artifact.models.models;

  const providerRows = Object.entries(providers).map(([enumKey, value]) => [code(enumKey), code(value)]);

  const proxyRows = artifact.endpoints.providerProxyPaths.map((p) => [code(p)]);

  const modelRows = Object.entries(models)
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([key, m]) => {
      const pricing = m.pricing
        ? `input=${m.pricing.input ?? '-'}, output=${m.pricing.output ?? '-'}, cached=${m.pricing.cached ?? '-'}`
        : '(none)';
      const caps = m.capabilities ? Object.keys(m.capabilities).filter((k) => m.capabilities[k]).join(', ') : '(none)';
      return [
        code(key),
        code(m.provider ?? '(none)'),
        code(m.name ?? '(none)'),
        m.displayName ?? '(none)',
        String(m.contextWindow ?? '(none)'),
        String(m.maxOutputTokens ?? '(none)'),
        code(pricing),
        code(caps || '(none)'),
      ];
    });

  const ampUrls = artifact.endpoints.urlsAmpRelevant.map((u) => `- ${code(u)}`).join('\n');

  const likelyApiPaths = artifact.endpoints.apiPathStrings.filter((p) =>
    /^\/(api\/(provider|threads|internal|telemetry)|rest\/api\/1\.0)/.test(p)
  );

  const likelyApiList = likelyApiPaths.map((p) => `- ${code(p)}`).join('\n');

  return `# AMP CLI Endpoints and Models (Audited)

- Source bundle: ${code(artifact.metadata.bundlePath)}
- Build version: ${code(artifact.metadata.buildVersion)}
- Generated: ${code(artifact.metadata.generatedAt)}
- Extraction artifact: ${code(ARTIFACT_PATH)}

## Summary
- Provider enum values: **${artifact.models.providerCount}**
- Model catalog entries: **${artifact.models.modelCount}**
- Provider proxy endpoints: **${artifact.endpoints.providerProxyPaths.length}**
- Amp-relevant absolute URLs: **${artifact.endpoints.urlsAmpRelevant.length}**

## Provider Enum (${code('O4')})
${table(['Enum Key', 'Value'], providerRows)}

## Provider Proxy Endpoints
${table(['Path'], proxyRows)}

## Model Catalog (${code('D4')})
${table(['Model Key', 'Provider', 'Model Name', 'Display Name', 'Context Window', 'Max Output Tokens', 'Pricing', 'Capabilities'], modelRows)}

## Amp-Relevant Absolute URLs
${ampUrls}

## Likely Amp API Paths (String Literals)
${likelyApiList || '- (none)'}

## Notes
- OpenRouter remains direct via ${code('https://openrouter.ai/api/v1')} while most providers are proxied via ${code('/api/provider/*')} paths.
- Provider enum key ${code('BASENTEN')} is spelled that way in this minified build, while its value is ${code('baseten')}.
`;
}

function buildAgentToolsDoc() {
  const aliases = artifact.tools.aliases;
  const aliasRows = Object.entries(aliases)
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([k, v]) => [code(k), code(v)]);

  const sW0Rows = artifact.tools.sW0Tools.map((name, i) => [String(i + 1), code(name)]);

  const modes = artifact.modes.modes;
  const modeRows = Object.values(modes)
    .sort((a, b) => String(a.key).localeCompare(String(b.key)))
    .map((m) => [
      code(m.key),
      m.displayName ?? '(none)',
      m.description ?? '(none)',
      code(m.primaryModel ?? '(none)'),
      String((m.includeTools || []).length),
      String((m.deferredTools || []).length),
      m.visible === true ? 'true' : 'false',
    ]);

  const modeToolSections = Object.values(modes)
    .sort((a, b) => String(a.key).localeCompare(String(b.key)))
    .map((m) => {
      const include = (m.includeTools || []).map((t) => `- ${code(t)}`).join('\n') || '- (none)';
      const deferred = (m.deferredTools || []).map((t) => `- ${code(t)}`).join('\n') || '- (none)';
      return `### Mode ${code(m.key)}\n\nInclude tools:\n${include}\n\nDeferred tools:\n${deferred}`;
    })
    .join('\n\n');

  const subagents = artifact.modes.subagents;
  const subagentRows = Object.values(subagents)
    .sort((a, b) => String(a.key).localeCompare(String(b.key)))
    .map((s) => [
      code(s.key),
      s.displayName ?? '(none)',
      code(s.model ?? '(inherited)'),
      String((s.includeTools || []).length),
      s.allowMcp ? 'true' : 'false',
      s.allowToolbox ? 'true' : 'false',
    ]);

  const specRows = artifact.tools.specs.map((s) => [
    code(s.resolvedName ?? '(unresolved)'),
    code(s.nameExpr),
    code(s.inputSchemaType),
    code(s.sourceExpr),
    s.descriptionPreview ? `${s.descriptionPreview.slice(0, 120)}...` : '(none)',
  ]);

  const sW0Set = new Set(artifact.tools.sW0Tools);
  const resolvedSet = new Set(artifact.tools.resolvedSpecNames);

  const inSW0NotResolved = artifact.tools.sW0Tools.filter((n) => !resolvedSet.has(n));
  const resolvedNotInSW0 = artifact.tools.resolvedSpecNames.filter((n) => !sW0Set.has(n));

  const inSW0NotResolvedList = inSW0NotResolved.map((n) => `- ${code(n)}`).join('\n') || '- (none)';
  const resolvedNotInSW0List = resolvedNotInSW0.map((n) => `- ${code(n)}`).join('\n') || '- (none)';

  return `# AMP Agent Tools and Modes (Audited)

- Source bundle: ${code(artifact.metadata.bundlePath)}
- Build version: ${code(artifact.metadata.buildVersion)}
- Generated: ${code(artifact.metadata.generatedAt)}
- Extraction artifact: ${code(ARTIFACT_PATH)}
- Source anchors:
  - static/fallback tool list source at byte offset ${code(artifact.anchors.sW0)}
  - mode registry at byte offset ${code(artifact.anchors.modesHL)}
  - subagent registry at byte offset ${code(artifact.anchors.subagentsD5)}

## Summary
- Static known tool-name list (${code('sW0')}): **${artifact.tools.sW0Count}**
- Parsed tool specs (${code('spec:{name:...}')}) entries: **${artifact.tools.specCount}**
- Resolved spec tool names: **${artifact.tools.resolvedSpecNameCount}**
- Agent modes (${code('HL')}): **${artifact.modes.modeCount}**
- Subagent modes (${code('D5')}): **${artifact.modes.subagentCount}**

## Tool Alias Map
${table(['Variable', 'Resolved Name'], aliasRows)}

## Static Known Tool Names (${code('sW0')})
${table(['#', 'Tool'], sW0Rows)}

## Mode Matrix (${code('HL')})
${table(['Mode Key', 'Display Name', 'Description', 'Primary Model Key', 'Include Tools', 'Deferred Tools', 'Visible'], modeRows)}

${modeToolSections}

## Subagent Matrix (${code('D5')})
${table(['Subagent Key', 'Display Name', 'Model Key', 'Include Tools', 'allowMcp', 'allowToolbox'], subagentRows)}

## Parsed Tool Spec Entries
${table(['Resolved Name', 'Name Expression', 'Input Schema Type', 'Source Expression', 'Description Preview'], specRows)}

## Coverage Deltas
### In ${code('sW0')} but not in resolved parsed spec names
${inSW0NotResolvedList}

### In resolved parsed spec names but not in ${code('sW0')}
${resolvedNotInSW0List}

## Notes
- ${code('sW0')} is a static list and does not include every possible dynamic source (MCP/toolbox/custom subagents).
- Parsed spec coverage includes builtins and dynamic registration paths where a literal ${code('spec:{name:...}')} object appears in bundle source.
`;
}

function buildAuditDoc() {
  return `# Extraction Audit

- Artifact: ${code(ARTIFACT_PATH)}
- Generated: ${code(artifact.metadata.generatedAt)}
- Build version: ${code(artifact.metadata.buildVersion)}
- Bundle path: ${code(artifact.metadata.bundlePath)}
- Bundle size: ${code(artifact.metadata.bundleSizeBytes)} bytes

## Verified High-Signal Counts
- ${code('z86')} settings keys: **${artifact.settings.z86Count}**
- ${code('sW0')} tool-name entries: **${artifact.tools.sW0Count}**
- Agent modes (${code('HL')}): **${artifact.modes.modeCount}**
- Subagent modes (${code('D5')}): **${artifact.modes.subagentCount}**
- Model catalog (${code('D4')}): **${artifact.models.modelCount}**

## Editor Settings Schema
- No VS Code extension settings contribution block was found in this CLI bundle. IDE integration is still present, but settings documentation is based on the CLI settings registry and runtime reads.

## Reproduction
\`\`\`bash
node amp-extractions/scripts/extract_bundle_codex.mjs
node amp-extractions/scripts/generate_codex_docs.mjs
\`\`\`
`;
}

function collectSettingsClassification() {
  const z86Keys = artifact.settings.z86Keys;
  const runtimeCounts = artifact.settings.runtimeReadCounts;
  const z86Set = new Set(z86Keys);
  const likely = artifact.settings.runtimeLikelyAmpKeys;

  const cliSchemaRead = [];
  const cliSchemaOnly = [];
  for (const key of z86Keys) {
    const reads = (runtimeCounts[key] || 0) + (runtimeCounts[`amp.${key}`] || 0);
    if (reads > 0) cliSchemaRead.push({ key, reads });
    else cliSchemaOnly.push({ key, reads: 0 });
  }

  const runtimeOnly = likely
    .filter((key) => {
      if (key.startsWith('amp.')) {
        const bare = key.slice(4);
        return !z86Set.has(bare);
      }
      return !z86Set.has(key);
    })
    .map((key) => ({ key, reads: runtimeCounts[key] || 0 }));

  return {
    cliSchemaRead,
    cliSchemaOnly,
    runtimeOnly,
  };
}

function buildSettingsVerificationDoc() {
  const c = collectSettingsClassification();
  const asList = (items, formatKey = (x) => x) => items.map((x) => `- ${code(formatKey(x))} (reads: ${x.reads})`).join('\n') || '- (none)';

  return `# AMP CLI Settings Verification Status (Audited)

- Source bundle: ${code(artifact.metadata.bundlePath)}
- Build version: ${code(artifact.metadata.buildVersion)}
- Generated: ${code(artifact.metadata.generatedAt)}
- Extraction artifact: ${code(ARTIFACT_PATH)}

## Classification Model
- ${code('CLI-SCHEMA+READ')}: key exists in ${code('z86')} and has at least one static runtime read.
- ${code('CLI-SCHEMA-ONLY')}: key exists in ${code('z86')} with no static runtime read hit.
- ${code('RUNTIME-ONLY-CANDIDATE')}: likely Amp setting key read at runtime but absent from ${code('z86')}.
- No VS Code extension settings contribution block was found in this CLI bundle, so verification is based on the CLI registry and runtime reads.

## Totals
- ${code('CLI-SCHEMA+READ')}: **${c.cliSchemaRead.length}**
- ${code('CLI-SCHEMA-ONLY')}: **${c.cliSchemaOnly.length}**
- ${code('RUNTIME-ONLY-CANDIDATE')}: **${c.runtimeOnly.length}**

## CLI-SCHEMA+READ
${asList(c.cliSchemaRead, (x) => `amp.${x.key}`)}

## CLI-SCHEMA-ONLY
${asList(c.cliSchemaOnly, (x) => `amp.${x.key}`)}

## RUNTIME-ONLY-CANDIDATE
${asList(c.runtimeOnly, (x) => (x.key.startsWith('amp.') ? x.key : `amp.${x.key}`))}

## Caveat
- This is static analysis evidence. Dynamic key construction and indirect config plumbing can hide real runtime usage.
`;
}

function buildTestingGuideDoc() {
  const c = collectSettingsClassification();
  const topRuntimeOnly = c.runtimeOnly
    .slice()
    .sort((a, b) => b.reads - a.reads || a.key.localeCompare(b.key))
    .slice(0, 12)
    .map((x) => (x.key.startsWith('amp.') ? x.key : `amp.${x.key}`));

  const targets = topRuntimeOnly.map((k) => `- ${code(k)}`).join('\n') || '- (none)';

  return `# AMP CLI Settings Testing Guide (Audited)

- Source bundle: ${code(artifact.metadata.bundlePath)}
- Build version: ${code(artifact.metadata.buildVersion)}
- Generated: ${code(artifact.metadata.generatedAt)}

## Goal
Manually validate behavior for keys with weaker static evidence, especially ${code('RUNTIME-ONLY-CANDIDATE')} settings.

## Baseline Procedure
1. Back up settings:
\`\`\`bash
cp ~/.amp/settings.json ~/.amp/settings.json.bak
\`\`\`
2. Capture baseline behavior:
\`\`\`bash
amp "sanity check"
\`\`\`
3. Toggle one target key and rerun the same workflow.
4. Capture debug evidence:
\`\`\`bash
export AMP_LOG_LEVEL=debug
export AMP_CLI_STDOUT_DEBUG=1
amp "sanity check"
\`\`\`
5. Restore original settings after each test.

## Recommended Targets (Highest Static Runtime Read Frequency)
${targets}

## Suggested Matrix
- Interactive mode vs execute mode.
- New thread vs resumed thread.
- Smart mode vs rush/free/deep where relevant.
- With and without MCP/toolbox settings.

## Reporting Template
\`\`\`text
Setting:
Configured Value:
Expected Behavior:
Observed Behavior:
Debug Evidence:
Conclusion: WORKS | PARTIAL | NO-OP
\`\`\`
`;
}

function buildErrataDoc() {
  return `# Documentation Errata (Audited)

- Source bundle: ${code(artifact.metadata.bundlePath)}
- Build version: ${code(artifact.metadata.buildVersion)}
- Generated: ${code(artifact.metadata.generatedAt)}

## Corrected High-Impact Drift
1. ${code('z86')} setting count corrected to **${artifact.settings.z86Count}**.
2. Static known tool-name list ${code('sW0')} count corrected to **${artifact.tools.sW0Count}**.
3. Settings/config docs now come from machine-generated artifact data instead of manual partial extraction.
4. No VS Code extension settings contribution block was found in this CLI bundle; VS Code IDE integration should not be conflated with an extension settings schema.

## Artifact-Backed Sources
- ${code('amp-extractions/meta/extraction-artifacts.json')}
- ${code('amp-extractions/meta/extraction-audit.md')}
- ${code('amp-extractions/config/settings.md')}
- ${code('amp-extractions/config/endpoints.md')}
- ${code('amp-extractions/agents/agent-tools.md')}
`;
}

function buildConfigReadmeDoc() {
  return `# AMP Config Docs Index (Audited)

This directory contains artifact-backed configuration documentation for build ${code(artifact.metadata.buildVersion)}.

## Primary Docs
- ${code('settings.md')}: full settings registry + runtime-read crosswalk.
- ${code('settings-verification-status.md')}: static evidence classification by schema/read status.
- ${code('testing-guide.md')}: manual validation workflow for ambiguous settings.
- ${code('endpoints.md')}: provider endpoints, model catalog, and API path inventory.
- ${code('ERRATA.md')}: corrected drift and audit notes.

## Audit Artifacts
- ${code('../meta/extraction-artifacts.json')}
- ${code('../meta/extraction-audit.md')}

## Reproduction
\`\`\`bash
node amp-extractions/scripts/extract_bundle_codex.mjs
node amp-extractions/scripts/generate_codex_docs.mjs
\`\`\`
`;
}

writeFile('amp-extractions/config/settings.md', buildSettingsDoc());
writeFile('amp-extractions/config/endpoints.md', buildEndpointsDoc());
writeFile('amp-extractions/agents/agent-tools.md', buildAgentToolsDoc());
writeFile('amp-extractions/meta/extraction-audit.md', buildAuditDoc());
writeFile('amp-extractions/config/settings-verification-status.md', buildSettingsVerificationDoc());
writeFile('amp-extractions/config/testing-guide.md', buildTestingGuideDoc());
writeFile('amp-extractions/config/ERRATA.md', buildErrataDoc());
writeFile('amp-extractions/config/README.md', buildConfigReadmeDoc());

console.log('Generated:');
console.log('- amp-extractions/config/settings.md');
console.log('- amp-extractions/config/endpoints.md');
console.log('- amp-extractions/agents/agent-tools.md');
console.log('- amp-extractions/meta/extraction-audit.md');
console.log('- amp-extractions/config/settings-verification-status.md');
console.log('- amp-extractions/config/testing-guide.md');
console.log('- amp-extractions/config/ERRATA.md');
console.log('- amp-extractions/config/README.md');
