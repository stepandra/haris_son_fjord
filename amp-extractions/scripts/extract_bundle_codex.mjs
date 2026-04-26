#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const BUNDLE_PATH = process.argv[2] || 'npm-packages/0.0.1777185893-gae6d40/node_modules/@sourcegraph/amp/dist/main.js';
const OUTPUT_PATH = process.argv[3] || 'amp-extractions/meta/extraction-artifacts.json';

const source = fs.readFileSync(BUNDLE_PATH, 'utf8');

function escapeRegExp(str) {
  return str.replace(/[.*+?^${}()|[\\]\\]/g, '\\$&');
}

function extractEnclosed(text, startIndex) {
  const open = text[startIndex];
  const close = open === '{' ? '}' : open === '[' ? ']' : open === '(' ? ')' : null;
  if (!close) {
    throw new Error(`Unsupported enclosure start '${open}' at ${startIndex}`);
  }

  let i = startIndex;
  let depth = 0;
  let inDouble = false;
  let inSingle = false;
  let inTemplate = false;
  let escaped = false;
  let templateExprDepth = 0;

  for (; i < text.length; i += 1) {
    const ch = text[i];

    if (inDouble) {
      if (escaped) {
        escaped = false;
      } else if (ch === '\\') {
        escaped = true;
      } else if (ch === '"') {
        inDouble = false;
      }
      continue;
    }

    if (inSingle) {
      if (escaped) {
        escaped = false;
      } else if (ch === '\\') {
        escaped = true;
      } else if (ch === "'") {
        inSingle = false;
      }
      continue;
    }

    if (inTemplate) {
      if (escaped) {
        escaped = false;
        continue;
      }
      if (ch === '\\') {
        escaped = true;
        continue;
      }
      if (ch === '`' && templateExprDepth === 0) {
        inTemplate = false;
        continue;
      }
      if (ch === '$' && text[i + 1] === '{') {
        templateExprDepth += 1;
        i += 1;
        continue;
      }
      if (ch === '{' && templateExprDepth > 0) {
        templateExprDepth += 1;
        continue;
      }
      if (ch === '}' && templateExprDepth > 0) {
        templateExprDepth -= 1;
        continue;
      }
      continue;
    }

    if (ch === '"') {
      inDouble = true;
      continue;
    }
    if (ch === "'") {
      inSingle = true;
      continue;
    }
    if (ch === '`') {
      inTemplate = true;
      continue;
    }

    if (ch === open) {
      depth += 1;
      continue;
    }

    if (ch === close) {
      depth -= 1;
      if (depth === 0) {
        return text.slice(startIndex, i + 1);
      }
      continue;
    }
  }

  throw new Error(`Unterminated enclosure starting at ${startIndex}`);
}

function findAndExtract(marker, openChar = '{') {
  const idx = source.indexOf(marker);
  if (idx < 0) {
    return null;
  }
  const openIdx = source.indexOf(openChar, idx + marker.length - 1);
  if (openIdx < 0) {
    return null;
  }
  return {
    marker,
    index: idx,
    openIndex: openIdx,
    text: extractEnclosed(source, openIdx),
  };
}

function findAssignedObjectContaining(needle, nameHint = 'object') {
  let needleIdx = source.indexOf(needle);
  while (needleIdx >= 0) {
    let searchIdx = needleIdx;
    while (searchIdx > 0) {
      const openIdx = source.lastIndexOf('{', searchIdx);
      if (openIdx < 0) {
        break;
      }

      const prefix = source.slice(Math.max(0, openIdx - 80), openIdx);
      const assignMatch = prefix.match(/(?:var\s+)?([A-Za-z0-9_$]+)\s*=\s*$/);
      if (assignMatch) {
        const text = extractEnclosed(source, openIdx);
        if (text.includes(needle)) {
          return {
            marker: `${assignMatch[1]}={`,
            name: assignMatch[1],
            index: openIdx - assignMatch[0].length,
            openIndex: openIdx,
            text,
          };
        }
      }

      searchIdx = openIdx - 1;
    }
    needleIdx = source.indexOf(needle, needleIdx + needle.length);
  }

  throw new Error(`Failed to locate assigned ${nameHint} containing ${needle}`);
}

function findSettingsRegistry() {
  const legacy = findAndExtract('var z86={', '{') || findAndExtract('fr4={', '{');
  if (legacy) {
    return legacy;
  }
  let idx = source.indexOf('"agent.deepReasoningEffort"');
  while (idx >= 0) {
    const candidate = findAssignedObjectContaining('"agent.deepReasoningEffort"', 'settings registry');
    try {
      const value = runObjectLiteral(candidate.text, {});
      if (value['agent.deepReasoningEffort']?.description) {
        return candidate;
      }
    } catch {
      // Try the next occurrence below.
    }
    idx = source.indexOf('"agent.deepReasoningEffort"', idx + 1);
  }
  return null;
}

function findAssignedObject(marker, nameHint = 'object') {
  const idx = source.indexOf(marker);
  if (idx < 0) {
    return null;
  }
  const eqIdx = source.indexOf('=', idx);
  const open = source.indexOf('{', eqIdx + 1);
  if (eqIdx < 0 || open < 0) {
    return null;
  }
  return {
    marker,
    name: marker.replace(/=.*$/, ''),
    index: idx,
    openIndex: open,
    text: extractEnclosed(source, open),
  };
}

function runObjectLiteral(literal, context = {}) {
  return vm.runInNewContext(`(${literal})`, context, { timeout: 2000 });
}

function normalizeMaybeTemplate(raw) {
  if (!raw) return null;
  const t = raw.trim();
  if ((t.startsWith('"') && t.endsWith('"')) || (t.startsWith("'") && t.endsWith("'"))) {
    try {
      return JSON.parse(t.startsWith("'") ? `"${t.slice(1, -1).replace(/\\"/g, '"').replace(/"/g, '\\"')}"` : t);
    } catch {
      return t.slice(1, -1);
    }
  }
  if (t.startsWith('`') && t.endsWith('`')) {
    return t.slice(1, -1);
  }
  return null;
}

function extractQuotedLiteral(text, startIndex) {
  const quote = text[startIndex];
  const supportedQuotes = new Set([String.fromCharCode(34), String.fromCharCode(39), '`']);
  if (!supportedQuotes.has(quote)) {
    throw new Error(`Unsupported quote '${quote}' at ${startIndex}`);
  }

  let i = startIndex + 1;
  let escaped = false;
  let templateExprDepth = 0;

  while (i < text.length) {
    const ch = text[i];

    if (escaped) {
      escaped = false;
      i += 1;
      continue;
    }

    if (ch === '\\\\') {
      escaped = true;
      i += 1;
      continue;
    }

    if (quote === '`') {
      if (ch === '$' && text[i + 1] === '{') {
        templateExprDepth += 1;
        i += 2;
        continue;
      }
      if (ch === '{' && templateExprDepth > 0) {
        templateExprDepth += 1;
        i += 1;
        continue;
      }
      if (ch === '}' && templateExprDepth > 0) {
        templateExprDepth -= 1;
        i += 1;
        continue;
      }
      if (ch === '`' && templateExprDepth === 0) {
        return text.slice(startIndex, i + 1);
      }
      i += 1;
      continue;
    }

    if (ch === quote) {
      return text.slice(startIndex, i + 1);
    }
    i += 1;
  }

  throw new Error(`Unterminated quoted literal at ${startIndex}`);
}

function findVarLiteral(name) {
  const re = new RegExp(`\\b${escapeRegExp(name)}=(\\"|\\'|\\\`)`, 'g');
  const match = re.exec(source);
  if (!match) {
    return null;
  }
  const quote = match[1];
  const start = source.indexOf(quote, match.index + `${name}=`.length);
  if (start < 0) {
    return null;
  }
  return extractQuotedLiteral(source, start);
}

function parseAliasAssignments() {
  const taskIdx = source.indexOf('"Task"');
  if (taskIdx < 0) {
    return {};
  }
  const start = Math.max(0, source.lastIndexOf('var ', taskIdx));
  const endCandidates = [
    source.indexOf('cL={', taskIdx),
    source.indexOf('p3={', taskIdx),
    source.indexOf('function ', taskIdx),
  ].filter((idx) => idx > taskIdx);
  const end = endCandidates.length > 0 ? Math.min(...endCandidates) : taskIdx + 12000;
  const seg = source.slice(start, end);
  const out = {};
  for (const m of seg.matchAll(/([A-Za-z0-9_$]+)="([^"]+)"/g)) {
    out[m[1]] = m[2];
  }
  return out;
}

function extractArrayNear(index, windowBefore = 2200, windowAfter = 2200) {
  const segStart = Math.max(0, index - windowBefore);
  const segEnd = Math.min(source.length, index + windowAfter);
  const seg = source.slice(segStart, segEnd);
  const out = {};

  for (const m of seg.matchAll(/([A-Za-z0-9_$]+)=\[/g)) {
    const name = m[1];
    const arrStart = segStart + m.index + m[0].length - 1;
    try {
      const arrText = extractEnclosed(source, arrStart);
      const values = [...arrText.matchAll(/"([^"]+)"/g)].map((x) => x[1]);
      out[name] = values;
    } catch {
      // Ignore malformed local matches.
    }
  }

  for (const m of seg.matchAll(/([A-Za-z0-9_$]+)=Array\.from\(new Set\(\[([^\]]+)\]\)\)/g)) {
    const name = m[1];
    const refs = [...m[2].matchAll(/\.\.\.([A-Za-z0-9_$]+)/g)].map((x) => x[1]);
    const values = refs.flatMap((ref) => out[ref] || []);
    out[name] = uniqueSorted(values);
  }

  return out;
}

function extractContextNear(index, windowBefore = 6000, windowAfter = 1200) {
  const segStart = Math.max(0, index - windowBefore);
  const segEnd = Math.min(source.length, index + windowAfter);
  const seg = source.slice(segStart, segEnd);
  const out = {};

  for (const [name, values] of Object.entries(extractArrayNear(index, windowBefore, windowAfter))) {
    out[name] = values;
  }

  for (const m of seg.matchAll(/([A-Za-z0-9_$]+)="([^"]*)"/g)) {
    out[m[1]] = m[2];
  }

  for (const m of seg.matchAll(/([A-Za-z0-9_$]+)=(-?\d+(?:\.\d+)?)/g)) {
    if (!(m[1] in out)) {
      out[m[1]] = Number(m[2]);
    }
  }

  return out;
}

function parseModeLikeObjectCandidate(candidate, extraContext = {}) {
  if (!candidate) {
    return null;
  }
  const arrays = extractContextNear(candidate.index);
  const ctx = {
    ...arrays,
    ...extraContext,
  };
  ctx.$9 = (value) => value;
  ctx.c5 = (value) => value;
  const value = runObjectLiteral(candidate.text, ctx);
  return {
    index: candidate.index,
    marker: candidate.marker,
    name: candidate.name,
    text: candidate.text,
    arrays,
    value,
  };
}

function parseModeLikeObject(assignMarker, extraContext = {}) {
  const idx = source.indexOf(assignMarker);
  if (idx < 0) {
    return null;
  }
  const eqIdx = source.indexOf('=', idx);
  const open = source.indexOf('{', eqIdx + 1);
  return parseModeLikeObjectCandidate({
    index: idx,
    marker: assignMarker,
    name: assignMarker.replace(/=.*$/, ''),
    text: extractEnclosed(source, open),
  }, extraContext);
}

function tryParseModeLikeObject(assignMarker, extraContext = {}) {
  try {
    return parseModeLikeObject(assignMarker, extraContext);
  } catch {
    return null;
  }
}

function parseModeLikeObjectContaining(needle, nameHint, extraContext = {}) {
  try {
    return parseModeLikeObjectCandidate(findAssignedObjectContaining(needle, nameHint), extraContext);
  } catch {
    return null;
  }
}

function parseModelCatalog() {
  const modelNeedle = 'GPT_5_2_CODEX:{provider:';
  const idx = source.indexOf(modelNeedle);
  if (idx < 0) {
    return null;
  }

  const providerRefMatch = source.slice(idx, idx + 80).match(/provider:([A-Za-z0-9_$]+)\./);
  if (!providerRefMatch) {
    return null;
  }
  const providerVar = providerRefMatch[1];
  const providerIdx = source.lastIndexOf(`${providerVar}={`, idx);
  const providerOpen = source.indexOf('{', providerIdx + providerVar.length);
  const providerText = extractEnclosed(source, providerOpen);
  const providers = runObjectLiteral(providerText, {});

  const modelAssign = source.lastIndexOf('={', idx);
  const modelOpen = modelAssign + 1;
  const modelText = extractEnclosed(source, modelOpen);
  const models = runObjectLiteral(modelText, { [providerVar]: providers });

  return {
    providerIndex: providerIdx,
    modelIndex: modelAssign,
    providerObjectText: providerText,
    modelObjectText: modelText,
    providers,
    models,
  };
}

function parseToolSpecs(aliasMap) {
  const specs = [];
  const seenStart = new Set();

  for (const m of source.matchAll(/spec:\{name:/g)) {
    const specOpen = source.indexOf('{', m.index + 5);
    if (specOpen < 0 || seenStart.has(specOpen)) {
      continue;
    }
    seenStart.add(specOpen);

    let specText;
    try {
      specText = extractEnclosed(source, specOpen);
    } catch {
      continue;
    }

    const match = specText.match(/^\{name:([\s\S]*?),description:([\s\S]*?),inputSchema:([\s\S]*?),source:([\s\S]*?)(?:,executionProfile:([\s\S]*))?\}$/);
    if (!match) {
      continue;
    }

    const [, nameExprRaw, descriptionExprRaw, inputSchemaExprRaw, sourceExprRaw, executionProfileExprRaw] = match;
    const nameExpr = nameExprRaw.trim();
    const descriptionExpr = descriptionExprRaw.trim();
    const inputSchemaExpr = inputSchemaExprRaw.trim();
    const sourceExpr = sourceExprRaw.trim();
    const executionProfileExpr = executionProfileExprRaw?.trim() || null;

    let resolvedName = normalizeMaybeTemplate(nameExpr);
    if (!resolvedName && /^[A-Za-z0-9_$]+$/.test(nameExpr) && aliasMap[nameExpr]) {
      resolvedName = aliasMap[nameExpr];
    }

    let descriptionText = normalizeMaybeTemplate(descriptionExpr);
    if (!descriptionText && /^[A-Za-z0-9_$]+$/.test(descriptionExpr)) {
      const literal = findVarLiteral(descriptionExpr);
      descriptionText = normalizeMaybeTemplate(literal);
    }

    let inputSchemaType = 'expression';
    let inputSchemaParsed = null;
    if (inputSchemaExpr.startsWith('{')) {
      try {
        inputSchemaParsed = runObjectLiteral(inputSchemaExpr, {});
        inputSchemaType = 'object';
      } catch {
        inputSchemaType = 'object-unparsed';
      }
    }

    specs.push({
      index: m.index,
      specText,
      nameExpr,
      resolvedName,
      descriptionExpr,
      descriptionPreview: descriptionText ? descriptionText.slice(0, 220) : null,
      inputSchemaExpr,
      inputSchemaType,
      inputSchemaParsed,
      sourceExpr,
      executionProfileExpr,
    });
  }

  // Sort by appearance in source for deterministic docs.
  specs.sort((a, b) => a.index - b.index);
  return specs;
}

function countBy(array, keyFn) {
  const out = {};
  for (const value of array) {
    const key = keyFn(value);
    out[key] = (out[key] || 0) + 1;
  }
  return out;
}

function uniqueSorted(values) {
  return [...new Set(values)].sort();
}

const buildVersionMatch = source.match(/zD0\("([0-9.]+-[^\"]+)"\)/) || source.match(/"([0-9]+\.[0-9]+\.[0-9]+-g[0-9a-f]+)"/);
const buildVersion = buildVersionMatch ? buildVersionMatch[1] : null;
const timestampLiterals = uniqueSorted(source.match(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z/g) || []);

const z86Raw = findSettingsRegistry();
if (!z86Raw) {
  throw new Error('Failed to locate settings registry');
}
const z86 = runObjectLiteral(z86Raw.text, {});
const z86Keys = Object.keys(z86);

const vscodeIdx = source.indexOf('properties:{"amp.url"');
const vscodeRaw = vscodeIdx >= 0
  ? {
      index: vscodeIdx,
      openIndex: vscodeIdx + 'properties:'.length,
      text: extractEnclosed(source, vscodeIdx + 'properties:'.length),
    }
  : null;
const vscodeProps = vscodeRaw ? runObjectLiteral(vscodeRaw.text, {}) : {};
const vscodeKeys = Object.keys(vscodeProps).filter((k) => k.startsWith('amp.')).sort();

const runtimeMatches = [];
for (const m of source.matchAll(/settings\["([A-Za-z0-9._-]+)"\]/g)) {
  runtimeMatches.push({ key: m[1], kind: 'settings[]', index: m.index });
}
for (const m of source.matchAll(/\.get\("([A-Za-z0-9._-]+)"/g)) {
  runtimeMatches.push({ key: m[1], kind: '.get()', index: m.index });
}
for (const m of source.matchAll(/settings\?\.([A-Za-z0-9_$]+)/g)) {
  runtimeMatches.push({ key: m[1], kind: 'settings?.prop', index: m.index });
}

const runtimeCounts = countBy(runtimeMatches, (m) => m.key);
const runtimeKeys = Object.keys(runtimeCounts).sort();

const ampRuntimeKeysDirect = runtimeKeys.filter((k) => k.startsWith('amp.'));
const bareRuntimeKeys = runtimeKeys.filter((k) => !k.startsWith('amp.'));

const z86Set = new Set(z86Keys);
const vscodeSet = new Set(vscodeKeys);

const bareRuntimeInZ86 = bareRuntimeKeys.filter((k) => z86Set.has(k)).sort();
const bareRuntimeNotInZ86 = bareRuntimeKeys.filter((k) => !z86Set.has(k)).sort();
const ampRuntimeInVscode = ampRuntimeKeysDirect.filter((k) => vscodeSet.has(k)).sort();
const ampRuntimeNotInVscode = ampRuntimeKeysDirect.filter((k) => !vscodeSet.has(k)).sort();

const likelyPrefixSet = new Set([
  'agent',
  'anthropic',
  'bitbucket',
  'console',
  'dangerouslyAllowAll',
  'debug',
  'debugLogs',
  'experimental',
  'fuzzy',
  'gemini',
  'git',
  'guardedFiles',
  'hooks',
  'internal',
  'jetbrains',
  'mcpPermissions',
  'mcpServers',
  'mcpTrustedServers',
  'model',
  'network',
  'notifications',
  'openrouter',
  'permissions',
  'proxy',
  'review',
  'showCosts',
  'skills',
  'submitOnEnter',
  'systemPrompt',
  'terminal',
  'toolbox',
  'tools',
  'ui',
  'updates',
  'url',
  'workerUrl',
  'workspaces',
]);

function isLikelyAmpSettingKey(key) {
  if (key.startsWith('amp.')) {
    return isLikelyAmpSettingKey(key.slice(4));
  }
  if (z86Set.has(key)) {
    return true;
  }
  const root = key.split('.')[0];
  return likelyPrefixSet.has(root);
}

const runtimeLikelyAmpKeys = runtimeKeys.filter((k) => isLikelyAmpSettingKey(k)).sort();

const envVarsAll = uniqueSorted([...source.matchAll(/process\.env\.([A-Z0-9_]+)/g)].map((m) => m[1]));
const envVarsAmpRelevant = envVarsAll.filter(
  (name) =>
    name.startsWith('AMP_') ||
    name === 'OPENROUTER_API_KEY' ||
    name === 'NO_ANIMATION' ||
    name === 'TOOLBOX_ACTION'
);

const rawUrls = [...source.matchAll(/https?:\/\/[^\s"'`<>]+/g)].map((m) => m[0]);
const urls = uniqueSorted(rawUrls.map((u) => u.replace(/[),.;]+$/g, '')));
const urlsAmpRelevant = urls.filter((u) => /(ampcode\.com|ampworkers\.com|openrouter\.ai)/.test(u));

const apiPathStrings = uniqueSorted(
  [
    ...[...source.matchAll(/"(\/(?:api|rest\/api)\/[^"\\]*)"/g)].map((m) => m[1]),
    ...[...source.matchAll(/'(\/(?:api|rest\/api)\/[^'\\]*)'/g)].map((m) => m[1]),
    ...[...source.matchAll(/`(\/(?:api|rest\/api)\/[^`\\]*)`/g)].map((m) => m[1]),
  ].filter(Boolean)
);

const providerProxyPaths = uniqueSorted([...source.matchAll(/new URL\("(\/api\/provider\/[^\"]+)"/g)].map((m) => m[1]));

const aliasMap = parseAliasAssignments();

let sW0Idx = source.indexOf('sW0=[');
let sW0Tools = [];
if (sW0Idx >= 0) {
  const sW0Open = source.indexOf('[', sW0Idx);
  const sW0Text = extractEnclosed(source, sW0Open);
  sW0Tools = [...sW0Text.matchAll(/"([^"]+)"/g)].map((m) => m[1]);
}

const modeObj =
  parseModeLikeObjectContaining('key:"smart",displayName:"Smart"', 'agent mode registry') ||
  parseModeLikeObjectContaining('key:"deep",displayName:"Deep"', 'agent mode registry') ||
  tryParseModeLikeObject('HL=', {}) ||
  tryParseModeLikeObject('cL=', {});
const subagentObj =
  parseModeLikeObjectContaining('"task-subagent"', 'subagent registry') ||
  parseModeLikeObjectContaining('key:"oracle",displayName:"Oracle"', 'subagent registry') ||
  tryParseModeLikeObject('p3=', {}) ||
  tryParseModeLikeObject('D5=', {});
const modelCatalog = parseModelCatalog();
const toolSpecs = parseToolSpecs(aliasMap);

const resolvedSpecNames = uniqueSorted(toolSpecs.map((s) => s.resolvedName).filter(Boolean));
const unresolvedSpecNames = toolSpecs.filter((s) => !s.resolvedName).map((s) => s.nameExpr);

if (sW0Tools.length === 0) {
  const modeTools = modeObj
    ? Object.values(modeObj.value).flatMap((m) => [...(m.includeTools || []), ...(m.deferredTools || [])])
    : [];
  const subagentTools = subagentObj
    ? Object.values(subagentObj.value).flatMap((s) => [...(s.includeTools || [])])
    : [];
  sW0Tools = uniqueSorted([...modeTools, ...subagentTools, ...resolvedSpecNames]);
  sW0Idx = modeObj?.index ?? subagentObj?.index ?? null;
}

const output = {
  metadata: {
    generatedAt: new Date().toISOString(),
    bundlePath: BUNDLE_PATH,
    bundleSizeBytes: fs.statSync(BUNDLE_PATH).size,
    buildVersion,
    timestampLiterals,
  },
  anchors: {
    z86: z86Raw.index,
    vscodeProperties: vscodeRaw?.index ?? null,
    sW0: sW0Idx,
    modesHL: modeObj?.index ?? null,
    subagentsD5: subagentObj?.index ?? null,
    modelCatalog: modelCatalog?.modelIndex ?? null,
  },
  settings: {
    z86Count: z86Keys.length,
    z86Keys,
    z86Entries: z86,
    vscodeCount: vscodeKeys.length,
    vscodeKeys,
    vscodeEntries: Object.fromEntries(vscodeKeys.map((k) => [k, vscodeProps[k]])),
    runtimeReadCountDistinct: runtimeKeys.length,
    runtimeReadCounts: runtimeCounts,
    runtimeLikelyAmpKeys,
    runtimeLikelyAmpCount: runtimeLikelyAmpKeys.length,
    runtimeReads: {
      ampPrefixed: ampRuntimeKeysDirect,
      bare: bareRuntimeKeys,
      bareInZ86: bareRuntimeInZ86,
      bareNotInZ86: bareRuntimeNotInZ86,
      ampInVscode: ampRuntimeInVscode,
      ampNotInVscode: ampRuntimeNotInVscode,
    },
    envVarsAll,
    envVarsAmpRelevant,
  },
  tools: {
    aliases: aliasMap,
    sW0Count: sW0Tools.length,
    sW0Tools,
    specCount: toolSpecs.length,
    resolvedSpecNameCount: resolvedSpecNames.length,
    resolvedSpecNames,
    unresolvedSpecNames,
    specs: toolSpecs,
  },
  modes: {
    modeCount: modeObj ? Object.keys(modeObj.value).length : 0,
    modes: modeObj ? modeObj.value : {},
    subagentCount: subagentObj ? Object.keys(subagentObj.value).length : 0,
    subagents: subagentObj ? subagentObj.value : {},
  },
  models: {
    providerCount: modelCatalog ? Object.keys(modelCatalog.providers).length : 0,
    providers: modelCatalog ? modelCatalog.providers : {},
    modelCount: modelCatalog ? Object.keys(modelCatalog.models).length : 0,
    models: modelCatalog ? modelCatalog.models : {},
  },
  endpoints: {
    providerProxyPaths,
    apiPathStrings,
    urls,
    urlsAmpRelevant,
  },
};

fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true });
fs.writeFileSync(OUTPUT_PATH, JSON.stringify(output, null, 2));

const summary = {
  buildVersion: output.metadata.buildVersion,
  z86Count: output.settings.z86Count,
  vscodeCount: output.settings.vscodeCount,
  runtimeDistinct: output.settings.runtimeReadCountDistinct,
  envVarCountAll: output.settings.envVarsAll.length,
  envVarCountAmpRelevant: output.settings.envVarsAmpRelevant.length,
  sW0Count: output.tools.sW0Count,
  toolSpecCount: output.tools.specCount,
  modeCount: output.modes.modeCount,
  subagentCount: output.modes.subagentCount,
  modelCount: output.models.modelCount,
  providerCount: output.models.providerCount,
  providerProxyPathCount: output.endpoints.providerProxyPaths.length,
  urlCountAll: output.endpoints.urls.length,
  urlCountAmpRelevant: output.endpoints.urlsAmpRelevant.length,
};

console.log(JSON.stringify(summary, null, 2));
