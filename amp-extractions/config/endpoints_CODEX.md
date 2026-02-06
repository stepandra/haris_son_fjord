# AMP CLI Endpoint Reference (CODEX)

- Source bundle: `npm-packages/0.0.1770366910-g1852ef/node_modules/@sourcegraph/amp/dist/main.js`
- Build version: `0.0.1770366910-g1852ef`
- Generated at: `2026-02-06T09:30:38.714Z`

## Provider Endpoints (Amp-Hosted Proxy Paths)
- `/api/provider/anthropic`
- `/api/provider/baseten/v1`
- `/api/provider/cerebras`
- `/api/provider/fireworks/v1`
- `/api/provider/google`
- `/api/provider/groq`
- `/api/provider/kimi`
- `/api/provider/openai/v1`
- `/api/provider/xai/v1`

## Core Amp API Paths
- `/api/internal`
- `/api/internal/github-auth-status`
- `/api/internal/github-proxy/`
- `/api/provider/anthropic`
- `/api/provider/baseten/v1`
- `/api/provider/cerebras`
- `/api/provider/fireworks/v1`
- `/api/provider/google`
- `/api/provider/groq`
- `/api/provider/kimi`
- `/api/provider/openai/v1`
- `/api/provider/xai/v1`
- `/api/telemetry`
- `/api/threads`
- `/api/threads/`
- `/api/threads/find`
- `/api/threads/sync`

## Bitbucket Enterprise REST Paths
- `/rest/api/1.0/projects/`
- `/rest/api/1.0/repos`

## Direct External URLs Found In Bundle
- `https://ampcode.com`
- `https://ampcode.com/`
- `https://ampcode.com/manual`
- `https://ampcode.com/manual/appendix`
- `https://ampcode.com/manual/sdk`
- `https://ampcode.com/models`
- `https://ampcode.com/news/large-mode`
- `https://ampcode.com/news/stick-a-fork-in-it`
- `https://ampcode.com/settings`
- `https://ampcode.com/threads/`
- `https://ampcode.com/threads/T-3f1beb2b-bded-4fda-96cc-1af7192f24b6`
- `https://ampcode.com/threads/T-5928a90d-d53b-488f-a829-4e36442142ee`
- `https://ampcode.com/threads/T-95e73a95-f4fe-4f22-8d5c-6297467c97a5`
- `https://ampcode.com/threads/T-f916b832-c070-4853-8ab3-5e7596953bec`
- `https://ampcode.com/threads/T-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`
- `https://openrouter.ai/api/v1`
- `https://static.ampcode.com/schemas/permissions.schema.json`

## Literal `/api/*` Paths Likely From Examples/Dependencies
- `/api/routes.ts`
- `/api/types.ts`
- `/api/users.ts`
- `/api/v2/`
- `/api/v2/spans`

## Notes
- OpenRouter remains a direct endpoint (`https://openrouter.ai/api/v1`) in this build.
- Most other model-provider calls are wrapped with `new URL("/api/provider/...", ampUrl)` and route through Amp server settings.