#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const ARTIFACT_PATH = process.argv[2] || "amp-extractions/meta/extraction-artifacts.json";
const MANUAL_PATH = process.argv[3] || "/Users/ben/.factory/artifacts/tool-outputs/fetch_url-call_ejpjvYCJy2RevcCs55GMldZO-71967669.log";
const artifact = JSON.parse(fs.readFileSync(ARTIFACT_PATH, "utf8"));
const manual = fs.existsSync(MANUAL_PATH) ? fs.readFileSync(MANUAL_PATH, "utf8") : "";

function ensureDir(filePath) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
}

function write(filePath, content) {
  ensureDir(filePath);
  fs.writeFileSync(filePath, content.endsWith("\n") ? content : `${content}\n`);
}

function code(value) {
  return `\`${String(value)}\``;
}

function esc(value) {
  return String(value ?? "").replace(/\|/g, "\\|").replace(/\n/g, " ");
}

function table(headers, rows) {
  return [
    `| ${headers.join(" | ")} |`,
    `| ${headers.map(() => "---").join(" | ")} |`,
    ...rows.map((row) => `| ${row.map(esc).join(" | ")} |`),
  ].join("\n");
}

function fmt(value) {
  if (value === undefined) return "(undefined)";
  if (typeof value === "string") return JSON.stringify(value);
  return JSON.stringify(value);
}

const build = artifact.metadata.buildVersion;
const bundle = artifact.metadata.bundlePath;
const publicSettings = new Set([...manual.matchAll(/`(amp\.[A-Za-z0-9._-]+)`/g)].map((m) => m[1]));

function normalizedRuntimeKey(key) {
  return key.startsWith("amp.") ? key : `amp.${key}`;
}

const registryRows = Object.entries(artifact.settings.z86Entries).map(([bareKey, entry]) => {
  const key = `amp.${bareKey}`;
  return {
    key,
    bareKey,
    source: "registry",
    visible: entry.visible === true,
    documented: publicSettings.has(key),
    defaultValue: fmt(entry.value),
    reads: (artifact.settings.runtimeReadCounts[bareKey] || 0) + (artifact.settings.runtimeReadCounts[key] || 0),
    description: entry.description || "",
  };
});

const registrySet = new Set(registryRows.map((row) => row.key));
const runtimeRows = artifact.settings.runtimeLikelyAmpKeys
  .map((key) => normalizedRuntimeKey(key))
  .filter((key) => !registrySet.has(key))
  .map((key) => ({
    key,
    bareKey: key.slice(4),
    source: "runtime-only",
    visible: false,
    documented: publicSettings.has(key),
    defaultValue: "(unknown)",
    reads: artifact.settings.runtimeReadCounts[key] || artifact.settings.runtimeReadCounts[key.slice(4)] || 0,
    description: "Read at runtime but absent from the extracted settings registry.",
  }));

const allSettingRows = [...registryRows, ...runtimeRows].sort((a, b) => a.key.localeCompare(b.key));
const undocumentedRows = allSettingRows.filter((row) => !row.documented);
const documentedRows = allSettingRows.filter((row) => row.documented);

const settingsDoc = `# Undocumented and Internal Amp Settings

- Build: ${code(build)}
- Source bundle: ${code(bundle)}
- Public comparison source: ${code("https://ampcode.com/manual")}

This file is the simple settings guide: it lists settings found in the bundle that are not documented in the public Owner's Manual. Use ${code("config/settings.md")} for the full raw registry table and ${code("config/settings-verification-status.md")} for extraction confidence.

## Summary

- Public manual settings matched: **${documentedRows.length}**
- Bundle settings not documented in the public manual: **${undocumentedRows.length}**
- Registry-backed undocumented settings: **${undocumentedRows.filter((row) => row.source === "registry").length}**
- Runtime-only undocumented candidates: **${undocumentedRows.filter((row) => row.source === "runtime-only").length}**

## Undocumented Settings

${table(["Setting", "Source", "Visible", "Default", "Static Reads", "Description"], undocumentedRows.map((row) => [
  code(row.key),
  row.source,
  String(row.visible),
  code(row.defaultValue),
  String(row.reads),
  row.description,
]))}

## Publicly Documented Settings Found in Bundle

${table(["Setting", "Source", "Visible", "Default", "Static Reads"], documentedRows.map((row) => [
  code(row.key),
  row.source,
  String(row.visible),
  code(row.defaultValue),
  String(row.reads),
]))}
`;

const modes = Object.values(artifact.modes.modes);
const subagents = Object.values(artifact.modes.subagents);
const publicModeKeys = new Set(["smart", "rush", "deep", "large"]);
const hiddenModeRows = modes.filter((mode) => !publicModeKeys.has(mode.key) || mode.serverOnly || mode.reasoningEffort === "low");
const publicSubagents = new Set(["finder", "oracle", "librarian", "task-subagent", "code-review"]);
const hiddenSubagentRows = subagents.filter((subagent) => !publicSubagents.has(subagent.key));

const agentsDoc = `# Amp Agents and Subagents

- Build: ${code(build)}
- Source bundle: ${code(bundle)}
- Public comparison sources: ${code("https://ampcode.com/manual")} and ${code("https://ampcode.com/models")}

This is the simple map of agent modes, true subagents, and less-public/internal entries. Full prompt text lives in the individual ${code("agents/*system-prompt.md")} files.

## Agent Modes

${table(["Key", "Display", "Model", "Public?", "Notes", "Tools"], modes.map((mode) => [
  code(mode.key),
  mode.displayName,
  code(mode.primaryModel),
  publicModeKeys.has(mode.key) ? "yes" : "no/hidden",
  mode.serverOnly ? "server-only" : mode.reasoningEffort ? `reasoning=${mode.reasoningEffort}` : "",
  (mode.includeTools || []).map((tool) => code(tool)).join(", "),
]))}

## True Subagents

${table(["Key", "Display", "Model", "Public/default?", "MCP", "Toolbox", "Tools"], subagents.map((subagent) => [
  code(subagent.key),
  subagent.displayName,
  code(subagent.model ?? "inherits"),
  publicSubagents.has(subagent.key) ? "yes/known" : "internal or support",
  String(subagent.allowMcp),
  String(subagent.allowToolbox),
  (subagent.includeTools || []).map((tool) => code(tool)).join(", "),
]))}

## Internal, Hidden, Test, or Support Entries

### Agent modes
${hiddenModeRows.map((mode) => `- ${code(mode.key)} (${mode.displayName}) uses ${code(mode.primaryModel)}${mode.serverOnly ? "; server-only" : ""}${mode.reasoningEffort ? `; reasoning=${mode.reasoningEffort}` : ""}.`).join("\n") || "- (none)"}

### Subagents
${hiddenSubagentRows.map((subagent) => `- ${code(subagent.key)} (${subagent.displayName}) uses ${code(subagent.model ?? "inherits")}; tools: ${(subagent.includeTools || []).map((tool) => code(tool)).join(", ")}.`).join("\n") || "- (none)"}

## Prompt Files

- Smart/Rush/Deep/Large/Frontier/Nostromo/Agg mode prompts: ${code("agents/smart-system-prompt.md")}
- Agg Man standalone prompt: ${code("agents/aggman-system-prompt.md")}
- Finder/Search: ${code("agents/finder-system-prompt.md")}
- Oracle: ${code("agents/oracle-system-prompt.md")}
- Librarian: ${code("agents/librarian-system-prompt.md")}
- Review and check subagents: ${code("agents/code-review-system-prompt.md")}
- Code Tour: ${code("agents/code-tour-system-prompt.md")}
- Look At, Painter, Handoff, Titling model instructions: ${code("agents/system-model-instructions.md")}
`;

const modelUsage = new Map();
for (const mode of modes) {
  if (mode.primaryModel) {
    const values = modelUsage.get(mode.primaryModel) || [];
    values.push(`mode:${mode.key}`);
    modelUsage.set(mode.primaryModel, values);
  }
}
for (const subagent of subagents) {
  if (subagent.model) {
    const values = modelUsage.get(subagent.model) || [];
    values.push(`subagent:${subagent.key}`);
    modelUsage.set(subagent.model, values);
  }
}

const providerRows = Object.entries(artifact.models.providers).sort((a, b) => a[0].localeCompare(b[0]));
const modelRows = Object.entries(artifact.models.models)
  .sort((a, b) => String(a[1].provider).localeCompare(String(b[1].provider)) || a[0].localeCompare(b[0]))
  .map(([key, model]) => [
    code(key),
    code(model.provider),
    code(model.name),
    model.displayName,
    String(model.contextWindow ?? ""),
    String(model.maxOutputTokens ?? ""),
    Object.keys(model.capabilities || {}).filter((cap) => model.capabilities[cap]).join(", "),
    (modelUsage.get(key) || []).map((value) => code(value)).join(", "),
  ]);

const modelsDoc = `# Amp Providers and Models

- Build: ${code(build)}
- Source bundle: ${code(bundle)}

This is the simple provider/model catalog. The bundle also exposes a hidden CLI model override option: ${code("--model")} accepts ${code("provider:model")} and mode-specific forms like ${code("smart=provider:model,deep=provider:model")}. I did not find a public registry setting that directly changes the Oracle model; Oracle is wired in the subagent registry to ${code(artifact.modes.subagents.oracle?.model)} for this build.

## Providers

${table(["Enum", "Provider ID"], providerRows.map(([key, value]) => [code(key), code(value)]))}

## Models

${table(["Key", "Provider", "Model Name", "Display", "Context", "Max Output", "Capabilities", "Used By"], modelRows)}
`;

write("amp-extractions/agents-and-subagents.md", agentsDoc);
write("amp-extractions/settings-undocumented.md", settingsDoc);
write("amp-extractions/providers-and-models.md", modelsDoc);

console.log("Generated simple docs:");
console.log("- amp-extractions/agents-and-subagents.md");
console.log("- amp-extractions/settings-undocumented.md");
console.log("- amp-extractions/providers-and-models.md");
