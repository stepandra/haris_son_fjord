# Agent Tools Inventory (CODEX)

- Build version: `0.0.1770366910-g1852ef`
- Source bundle: `npm-packages/0.0.1770366910-g1852ef/node_modules/@sourcegraph/amp/dist/main.js`
- Generated at: `2026-02-06T09:30:38.714Z`

## Wrapper Tools
- `librarian` (const: `R$`)
- `oracle` (const: `p9`)

## Oracle Subtool Allowlist
- `Read`
- `Grep`
- `glob`
- `web_search`
- `read_web_page`
- `read_thread`
- `find_thread`

## GitHub Librarian Tool Schemas

| Tool Name | Required Fields | Optional Fields |
| --- | --- | --- |
| `read_github` | `path, repository` | `read_range` |
| `search_github` | `pattern, repository` | `path, limit, offset` |
| `commit_search` | `repository` | `query, author, since, until, path, limit, offset` |
| `list_directory_github` | `path, repository` | `limit` |
| `list_repositories` | (none) | `pattern, organization, language, limit, offset` |
| `glob_github` | `filePattern, repository` | `limit, offset` |
| `diff` | `base, head, repository` | `includePatches` |

### read_github

Read the contents of a file from a GitHub repository.

WHEN TO USE THIS TOOL:
- When you need to examine the contents of a specific file
- When you want to understand implementation details
- When you need to see the actual code or configuration

PARAMETERS:
- path: The file path to read (absolute or relative)
- read_range: Optional [start_line, end_line] to read only specific lines
- repository: Repository URL (e.g., https://github.com/owner/repo)

The contents are returned with each line prefixed by its line number. For example, if a file has contents "abc\
", you will receive "1: abc\
".
The maximum file size is 128KB. If the file is larger, you will need to specify a read_range parameter to read only specific lines.

<examples>
<example>
	<user>Read the main configuration file from the repository</user>
	<response>Calls the read tool with path: "package.json" or similar config file</response>
</example>
<example>
	<user>Show me lines 50-100 of the authentication service</user>
	<response>Calls the read tool with path: "src/auth/service.ts", read_range: [50, 100]</response>
</example>
<example>
	<user>Read the README from https://github.com/owner/repo</user>
	<response>Calls the read tool with path: "README.md", repository: "https://github.com/owner/repo"</response>
</example>
</examples>

Parameters:
- `path` (string, required): The path to the file to read
- `read_range` (array, optional): Optional [start_line, end_line] to read only specific lines
- `repository` (string, required): Repository URL (e.g., https://github.com/owner/repo)

### search_github

Search for code patterns and content in repositories with structured results.

This tool searches for text patterns within repository code and returns structured results grouped by file,
with code chunks that include line numbers and surrounding context.

WHEN TO USE THIS TOOL:
- When you need to find code patterns across a repository with contextual information
- When you want to understand how certain functionality is implemented across multiple files
- When you need to see code snippets with surrounding context, not just individual matching lines
- When building comprehensive answers about code implementation across a codebase

FEATURES:
- Groups results by file for better organization
- Provides code chunks with surrounding context
- Returns structured data suitable for detailed analysis
- Preserves surrounding code context around matches
- Supports GitHub search operators (AND, OR, NOT) with up to 5 operators per query
- Validates queries against GitHub API limits (256 character max, requires search terms)
- Supports pagination with limit and offset parameters

SEARCH PATTERN TIPS:
- Use specific function names, class names, or unique identifiers
- Add quotes around exact phrases: "function myFunction"
- Use language-specific syntax patterns
- Combine terms with operators: "handleAuth AND typescript", "function OR method", "auth NOT test"
- Use GitHub qualifiers: "language:typescript", "path:src/", "extension:ts"
- Start with broader searches and then combine multiple terms to narrow down results

SEARCH OPERATORS:
- AND: Both terms must be present (e.g., "auth AND login")
- OR: Either term can be present (e.g., "function OR method")
- NOT: Exclude results with the term (e.g., "auth NOT test")
- Maximum 5 operators per query

GITHUB QUALIFIERS:
- language:LANGUAGE (e.g., "language:typescript")
- path:PATH (e.g., "path:src/components")
- extension:EXT (e.g., "extension:ts")
- in:file or in:path (search in file content vs filename)

QUERY VALIDATION:
- Maximum 256 characters per query
- Must include at least one search term (not just qualifiers)
- Maximum 5 AND, OR, NOT operators

RESULT STRUCTURE:
The tool returns structured data with:
- results: Array of {file: string, chunks: string[]} objects
- totalCount: Total number of matches found across all files

Each chunk contains lines showing the matching code with context.

<examples>
<example>
	<user>Find the handleAuth function definition in the src directory</user>
	<response>Calls the search tool with pattern: "function handleAuth path:src"</response>
</example>
<example>
	<user>Find the UserManager class definition in TypeScript files</user>
	<response>Calls the search tool with pattern: "class UserManager language:typescript"</response>
</example>
<example>
	<user>Find React imports but exclude test files</user>
	<response>Calls the search tool with pattern: "import from react NOT test"</response>
</example>
<example>
	<user>Find authentication functions or methods</user>
	<response>Calls the search tool with pattern: "auth AND (function OR method)"</response>
</example>
</examples>

Parameters:
- `pattern` (string, required): The search pattern to find in code. Supports GitHub search operators (AND, OR, NOT) and qualifiers (language:, path:, extension:, etc.). Max 256 characters, max 5 operators, must include at least one search term.
- `path` (string, optional): Optional path to limit search to specific directory or file pattern
- `repository` (string, required): Repository URL (e.g., https://github.com/owner/repo)
- `limit` (number, optional): Maximum number of search results to return (default: 30, max: 100)
- `offset` (number, optional): Number of results to skip for pagination (default: 0). Must be divisible by limit.

### commit_search

Search for commits in repositories with detailed commit information and metadata.

WHEN TO USE THIS TOOL:
- When you need to understand the evolution of specific features or code sections
- When investigating when certain changes were made and by whom
- When looking for commits related to specific functionality, bug fixes, or features
- When building historical context about code changes and development patterns

RESULT STRUCTURE:
The tool returns structured data with:
- commits: Array of commit objects with full metadata (SHA, message, author, date)
- totalCount: Number of matching commits found

<examples>
<example>
	<user>Find commits about authentication features added since January 2024</user>
	<response>Calls the commit search tool with query: "authentication", since: "2024-01-01T00:00:00Z"</response>
</example>
<example>
	<user>Show me commits by john@example.com that changed files in the src/auth directory</user>
	<response>Calls the commit search tool with author: "john@example.com", path: "src/auth"</response>
</example>
<example>
	<user>Find bug fix commits between January and February 2024</user>
	<response>Calls the commit search tool with query: "bug fix", since: "2024-01-01T00:00:00Z", until: "2024-02-01T00:00:00Z"</response>
</example>
</examples>

Parameters:
- `query` (string, optional): Search query to find in commit messages and author information. If empty, returns all commits.
- `author` (string, optional): Filter commits by author username or email
- `since` (string, optional): ISO 8601 date string for earliest commit date (e.g., "2024-01-01T00:00:00Z")
- `until` (string, optional): ISO 8601 date string for latest commit date (e.g., "2024-02-01T00:00:00Z")
- `path` (string, optional): Filter commits that changed specific files or directories
- `repository` (string, required): Repository URL (e.g., https://github.com/owner/repo)
- `limit` (number, optional): Maximum number of commits to return (default: 50, max: 100)
- `offset` (number, optional): Number of commits to skip for pagination (default: 0). Must be divisible by limit.

### list_directory_github

List the contents of a directory in a GitHub repository.

WHEN TO USE THIS TOOL:
- When you need to understand the structure of a directory
- When exploring a codebase to find relevant files
- When you want to see what files and subdirectories exist in a specific location

PARAMETERS:
- path: The directory path to list (absolute or relative, defaults to root)
- repository: Repository URL (e.g., https://github.com/owner/repo)
- limit: Maximum number of entries to return (default: 100, max: 1000)

The tool returns a list of files and directories, with directories having a trailing slash.

<examples>
<example>
	<user>List the contents of the src directory</user>
	<response>Calls the list_directory tool with path: "src"</response>
</example>
<example>
	<user>Show me what's in the root of the repository</user>
	<response>Calls the list_directory tool with path: "" or "."</response>
</example>
<example>
	<user>Explore the components folder in https://github.com/owner/repo</user>
	<response>Calls the list_directory tool with path: "src/components", repository: "https://github.com/owner/repo"</response>
</example>
</examples>

Parameters:
- `path` (string, required): The path to the directory to list
- `repository` (string, required): Repository URL (e.g., https://github.com/owner/repo)
- `limit` (number, optional): Maximum number of entries to return (default: 100, max: 1000)

### list_repositories

List and search for repositories, prioritizing your own repositories.

This tool uses a hybrid approach to find repositories:
1. First, it searches your repositories (owned, collaborator, or organization member)
2. If needed, it supplements results with public GitHub repositories
3. Your repositories are always shown first for maximum relevance

WHEN TO USE THIS TOOL:
- When you need to find repositories based on name patterns
- When you want to explore repositories in a specific organization
- When you need to filter repositories by programming language
- When you need repository metadata (stars, forks, descriptions)

FEATURES:
- Prioritizes your repositories over public ones
- Search by repository name patterns
- Filter by organization
- Filter by programming language
- Sort by popularity (stars)
- Returns comprehensive repository metadata
- Hybrid search ensures both relevance and discovery

SEARCH BEHAVIOR:
- Your repositories matching the criteria are shown first
- If insufficient results from your repositories, public repositories are added to reach the limit
- Results are sorted by star count within each category (your repos first, then public)

RESULT STRUCTURE:
The tool returns:
- repositories: Array of repository objects with name, description, language, stars, etc.
- totalCount: Combined count of your repositories and public repositories found

Each repository includes full metadata like star count, fork count, primary language, and description.

<examples>
<example>
	<user>Find repositories with "api" in the name in the "myorg" organization</user>
	<response>Calls the list_repositories tool with pattern: "api", organization: "myorg"</response>
</example>
<example>
	<user>List TypeScript repositories in the "facebook" organization</user>
	<response>Calls the list_repositories tool with organization: "facebook", language: "TypeScript"</response>
</example>
<example>
	<user>Find my repositories containing "frontend"</user>
	<response>Calls the list_repositories tool with pattern: "frontend"</response>
</example>
</examples>

Parameters:
- `pattern` (string, optional): Optional pattern to match in repository names
- `organization` (string, optional): Optional organization name to filter repositories
- `language` (string, optional): Optional programming language to filter repositories
- `limit` (number, optional): Maximum number of repositories to return (default: 30, max: 100)
- `offset` (number, optional): Number of results to skip for pagination (default: 0). Must be divisible by limit.

### glob_github

Find files matching a glob pattern in a repository.

WHEN TO USE THIS TOOL:
- When you need to find specific file types (e.g., all JavaScript files)
- When you want to find files in specific directories or following specific patterns
- When you need to explore the codebase structure quickly

PARAMETERS:
- filePattern: Glob pattern to match files (e.g., "**/*.ts", "src/**/*.test.js")
- limit: Maximum number of results to return (optional)
- offset: Number of results to skip for pagination (optional)
- repository: Repository URL (e.g., https://github.com/owner/repo)

The tool returns a list of file paths that match the specified pattern.

PATTERN EXAMPLES:
- `**/*.js` - All JavaScript files in any directory
- `src/**/*.ts` - All TypeScript files under the src directory (searches only in src)
- `*.json` - All JSON files in the current directory
- `**/*test*` - All files with "test" in their name
- `web/src/**/*` - All files under the web/src directory
- `**/*.{js,ts}` - All JavaScript and TypeScript files (alternative patterns)
- `src/[a-z]*/*.ts` - TypeScript files in src subdirectories that start with lowercase letters

<examples>
<example>
	<user>Find all TypeScript test files</user>
	<response>Calls the glob tool with filePattern: "**/*.test.ts"</response>
</example>
<example>
	<user>List all configuration files in the root</user>
	<response>Calls the glob tool with filePattern: "*.{json,yaml,yml,toml}"</response>
</example>
<example>
	<user>Find React components in https://github.com/owner/repo</user>
	<response>Calls the glob tool with filePattern: "**/*.tsx", repository: "https://github.com/owner/repo"</response>
</example>
</examples>

Parameters:
- `filePattern` (string, required): Glob pattern to match files (e.g., "**/*.ts", "src/**/*.test.js")
- `limit` (number, optional): Maximum number of results to return (default = 100).
- `offset` (number, optional): Number of results to skip for pagination
- `repository` (string, required): Repository URL (e.g., https://github.com/owner/repo)

### diff

Get a diff between two commits, branches, or tags in a repository.

This tool compares two points in repository history and returns structured information about changed files,
including additions, deletions, and optionally the actual diff patches for each file.

WHEN TO USE THIS TOOL:
- When you need to understand what changed between two commits, branches, or tags
- When investigating the scope of changes in a pull request or feature branch
- When you need the actual diff patches for code review or analysis (use includePatches parameter)

WHEN NOT TO USE THIS TOOL:
- To find commits by message, author, or date - use commit search instead
- To view complete file contents - use read instead (diff shows what changed, not the full file)

FEATURES:
- Returns detailed file-level change information with statistics
- Includes optional line-by-line diff patches (token-heavy, controlled by includePatches parameter)
- Supports comparing commits, branches, and tags
- Shows file status (added, removed, modified, renamed, etc.)
- Patches are automatically truncated at ~4k characters to save tokens
- Note: GitHub may omit patches for binary or very large files

PARAMETERS:
- base: The base commit SHA, branch name, or tag (e.g., "main", "v1.0.0", or commit SHA)
- head: The head commit SHA, branch name, or tag to compare against base
- repository: Repository URL (e.g., https://github.com/owner/repo)
- includePatches: Optional boolean to include diff patches (default false). Patches consume many tokens and are truncated to ~4k characters per file.

<examples>
<example>
	<user>Show me what changed between main and the feature-auth branch</user>
	<response>Calls the diff tool with base: "main", head: "feature-auth"</response>
</example>
<example>
	<user>What files were modified in commit abc123 compared to its parent?</user>
	<response>Calls the diff tool with base: "abc123^", head: "abc123"</response>
</example>
<example>
	<user>Compare version v1.0.0 to v2.0.0</user>
	<response>Calls the diff tool with base: "v1.0.0", head: "v2.0.0"</response>
</example>
</examples>

Parameters:
- `base` (string, required): The base commit SHA, branch name, or tag to compare from (e.g., "main", "v1.0.0", or commit SHA)
- `head` (string, required): The head commit SHA, branch name, or tag to compare to (e.g., "feature-branch", "v2.0.0", or commit SHA)
- `repository` (string, required): Repository URL (e.g., https://github.com/owner/repo)
- `includePatches` (boolean, optional): Include unified diff patches per file (token heavy, truncated to ~4k characters per file). Default false.

## Bitbucket Enterprise Librarian Tool Schemas

| Tool Name | Required Fields | Optional Fields |
| --- | --- | --- |
| `read_bitbucket_enterprise` | `path, repository` | `read_range, ref` |
| `search_bitbucket_enterprise` | `pattern, repository` | `path, ref, limit, offset` |
| `commit_search_bitbucket_enterprise` | `repository` | `query, author, since, until, path, ref, limit, offset` |
| `list_directory_bitbucket_enterprise` | `path, repository` | `ref, limit` |
| `list_repositories_bitbucket_enterprise` | `instanceUrl` | `project, pattern, limit, offset` |
| `glob_bitbucket_enterprise` | `filePattern, repository` | `limit, offset, ref` |
| `diff_bitbucket_enterprise` | `base, head, repository` | `includePatches` |

### read_bitbucket_enterprise

Read the contents of a file from a Bitbucket Enterprise repository.

WHEN TO USE THIS TOOL:
- When you need to examine the contents of a specific file in a Bitbucket Enterprise repository
- When you want to understand implementation details
- When you need to see the actual code or configuration

PARAMETERS:
- path: The file path to read (relative to repository root)
- read_range: Optional [start_line, end_line] to read only specific lines
- repository: Repository URL (use the instance URL from the system prompt, e.g., https://{instance}/projects/PROJ/repos/repo-name/browse)
- ref: Optional branch or commit reference (default: default branch)

The contents are returned with each line prefixed by its line number. For example, if a file has contents "abc\
", you will receive "1: abc\
".
The maximum file size is 128KB. If the file is larger, you will need to specify a read_range parameter to read only specific lines.

<examples>
<example>
	<user>Read the main configuration file from the repository</user>
	<response>Calls the read tool with path: "package.json" or similar config file</response>
</example>
<example>
	<user>Show me lines 50-100 of the authentication service</user>
	<response>Calls the read tool with path: "src/auth/service.ts", read_range: [50, 100]</response>
</example>
<example>
	<user>Read the README from a specific branch</user>
	<response>Calls the read tool with path: "README.md", ref: "develop"</response>
</example>
</examples>

Parameters:
- `path` (string, required): The path to the file to read (relative to repository root)
- `read_range` (array, optional): Optional [start_line, end_line] to read only specific lines
- `repository` (string, required): Repository URL (use the instance URL from the system prompt, e.g., https://{instance}/projects/PROJ/repos/repo-name/browse)
- `ref` (string, optional): Optional branch or commit reference (default: default branch)

### search_bitbucket_enterprise

Search for code patterns and content in a Bitbucket Enterprise repository with structured results.

This tool searches for text patterns within repository code and returns structured results grouped by file,
with code chunks that include line numbers and surrounding context.

NOTE: This tool requires the Bitbucket Code Search plugin to be installed on the Bitbucket Enterprise instance.
If the plugin is not available, the search will fail with an error message.

WHEN TO USE THIS TOOL:
- When you need to find code patterns across a repository with contextual information
- When you want to understand how certain functionality is implemented across multiple files
- When you need to see code snippets with surrounding context, not just individual matching lines
- When building comprehensive answers about code implementation across a codebase

PARAMETERS:
- pattern: The search pattern to find in code
- path: Optional path to limit search to specific directory or file pattern
- repository: Repository URL (use the instance URL from the system prompt, e.g., https://{instance}/projects/PROJ/repos/repo-name/browse)
- ref: Optional branch or commit reference (default: default branch)
- limit: Maximum number of search results to return (default: 30, max: 100)
- offset: Number of results to skip for pagination (default: 0)

RESULT STRUCTURE:
The tool returns structured data with:
- results: Array of {file: string, chunks: string[]} objects
- totalCount: Total number of matches found across all files

Each chunk contains lines showing the matching code with context.

<examples>
<example>
	<user>Find the handleAuth function definition in the src directory</user>
	<response>Calls the search tool with pattern: "handleAuth", path: "src"</response>
</example>
<example>
	<user>Find all imports of the authentication module</user>
	<response>Calls the search tool with pattern: "import.*authentication"</response>
</example>
<example>
	<user>Search for TODO comments on the develop branch</user>
	<response>Calls the search tool with pattern: "TODO", ref: "develop"</response>
</example>
</examples>

Parameters:
- `pattern` (string, required): The search pattern to find in code.
- `path` (string, optional): Optional path to limit search to specific directory or file pattern
- `repository` (string, required): Repository URL (use the instance URL from the system prompt, e.g., https://{instance}/projects/PROJ/repos/repo-name/browse)
- `ref` (string, optional): Optional branch or commit reference (default: default branch)
- `limit` (number, optional): Maximum number of search results to return (default: 30, max: 100)
- `offset` (number, optional): Number of results to skip for pagination (default: 0). Must be divisible by limit.

### commit_search_bitbucket_enterprise

Search for commits in a Bitbucket Enterprise repository with detailed commit information and metadata.

WHEN TO USE THIS TOOL:
- When you need to understand the evolution of specific features or code sections
- When investigating when certain changes were made and by whom
- When looking for commits related to specific functionality, bug fixes, or features
- When building historical context about code changes and development patterns

PARAMETERS:
- query: Optional text to search in commit messages and author information
- author: Optional filter by author name or email
- since: Optional ISO 8601 date string for earliest commit date (e.g., "2024-01-01T00:00:00Z")
- until: Optional ISO 8601 date string for latest commit date
- path: Optional filter commits that changed specific files or directories
- repository: Repository URL (use the instance URL from the system prompt, e.g., https://{instance}/projects/PROJ/repos/repo-name/browse)
- ref: Optional branch or commit reference to start from
- limit: Maximum number of commits to return (default: 50, max: 100)
- offset: Number of commits to skip for pagination (default: 0)

RESULT STRUCTURE:
The tool returns structured data with:
- commits: Array of commit objects with full metadata (SHA, message, author, date)
- totalCount: Number of matching commits found

<examples>
<example>
	<user>Find commits about authentication features added since January 2024</user>
	<response>Calls the commit search tool with query: "authentication", since: "2024-01-01T00:00:00Z"</response>
</example>
<example>
	<user>Show me commits by john@example.com that changed files in the src/auth directory</user>
	<response>Calls the commit search tool with author: "john@example.com", path: "src/auth"</response>
</example>
<example>
	<user>Find bug fix commits between January and February 2024</user>
	<response>Calls the commit search tool with query: "bug fix", since: "2024-01-01T00:00:00Z", until: "2024-02-01T00:00:00Z"</response>
</example>
</examples>

Parameters:
- `query` (string, optional): Search query to find in commit messages and author information. If empty, returns all commits.
- `author` (string, optional): Filter commits by author name or email
- `since` (string, optional): ISO 8601 date string for earliest commit date (e.g., "2024-01-01T00:00:00Z")
- `until` (string, optional): ISO 8601 date string for latest commit date (e.g., "2024-02-01T00:00:00Z")
- `path` (string, optional): Filter commits that changed specific files or directories
- `repository` (string, required): Repository URL (use the instance URL from the system prompt, e.g., https://{instance}/projects/PROJ/repos/repo-name/browse)
- `ref` (string, optional): Optional branch or commit reference to start from
- `limit` (number, optional): Maximum number of commits to return (default: 50, max: 100)
- `offset` (number, optional): Number of commits to skip for pagination (default: 0). Must be divisible by limit.

### list_directory_bitbucket_enterprise

List the contents of a directory in a Bitbucket Enterprise repository.

WHEN TO USE THIS TOOL:
- When you need to understand the structure of a directory
- When exploring a codebase to find relevant files
- When you want to see what files and subdirectories exist in a specific location

PARAMETERS:
- path: The directory path to list (relative to repository root, empty string for root)
- repository: Repository URL (use the instance URL from the system prompt, e.g., https://{instance}/projects/PROJ/repos/repo-name/browse)
- ref: Optional branch or commit reference (default: default branch)
- limit: Maximum number of entries to return (default: 100, max: 1000)

The tool returns a list of files and directories, with directories having a trailing slash.

<examples>
<example>
	<user>List the contents of the src directory</user>
	<response>Calls the list_directory tool with path: "src"</response>
</example>
<example>
	<user>Show me what's in the root of the repository</user>
	<response>Calls the list_directory tool with path: ""</response>
</example>
<example>
	<user>Explore the components folder on the develop branch</user>
	<response>Calls the list_directory tool with path: "src/components", ref: "develop"</response>
</example>
</examples>

Parameters:
- `path` (string, required): The path to the directory to list (relative to repository root)
- `repository` (string, required): Repository URL (use the instance URL from the system prompt, e.g., https://{instance}/projects/PROJ/repos/repo-name/browse)
- `ref` (string, optional): Optional branch or commit reference (default: default branch)
- `limit` (number, optional): Maximum number of entries to return (default: 100, max: 1000)

### list_repositories_bitbucket_enterprise

List repositories from a Bitbucket Enterprise instance.

This tool lists repositories accessible to the authenticated user.

WHEN TO USE THIS TOOL:
- When you need to find repositories in a Bitbucket Enterprise instance
- When you want to explore repositories in a specific project
- When you need to search for repositories by name pattern

PARAMETERS:
- instanceUrl: The Bitbucket Enterprise instance URL (use the URL from the system prompt)
- project: Optional project key to filter repositories (e.g., "PROJ")
- pattern: Optional pattern to match in repository names
- limit: Maximum number of repositories to return (default: 30, max: 100)
- offset: Number of results to skip for pagination (default: 0)

RESULT STRUCTURE:
The tool returns:
- repositories: Array of repository objects with name, description, project, cloneUrl
- totalCount: Total number of repositories matching the criteria

<examples>
<example>
	<user>List repositories in the CORE project</user>
	<response>Calls list_repositories with instanceUrl and project: "CORE"</response>
</example>
<example>
	<user>Find repositories with "api" in the name</user>
	<response>Calls list_repositories with instanceUrl and pattern: "api"</response>
</example>
<example>
	<user>List all accessible repositories</user>
	<response>Calls list_repositories with just instanceUrl</response>
</example>
</examples>

Parameters:
- `instanceUrl` (string, required): The Bitbucket Enterprise instance URL (use the URL from the system prompt)
- `project` (string, optional): Optional project key to filter repositories (e.g., "PROJ")
- `pattern` (string, optional): Optional pattern to match in repository names
- `limit` (number, optional): Maximum number of repositories to return (default: 30, max: 100)
- `offset` (number, optional): Number of results to skip for pagination (default: 0)

### glob_bitbucket_enterprise

Find files matching a glob pattern in a Bitbucket Enterprise repository.

WHEN TO USE THIS TOOL:
- When you need to find specific file types (e.g., all JavaScript files)
- When you want to find files in specific directories or following specific patterns
- When you need to explore the codebase structure quickly

PARAMETERS:
- filePattern: Glob pattern to match files (e.g., "**/*.ts", "src/**/*.test.js")
- limit: Maximum number of results to return (default: 100)
- offset: Number of results to skip for pagination (default: 0)
- repository: Repository URL (use the instance URL from the system prompt, e.g., https://{instance}/projects/PROJ/repos/repo-name/browse)
- ref: Optional branch or commit reference (default: default branch)

The tool returns a list of file paths that match the specified pattern.

PATTERN EXAMPLES:
- `**/*.js` - All JavaScript files in any directory
- `src/**/*.ts` - All TypeScript files under the src directory
- `*.json` - All JSON files in the root directory
- `**/*test*` - All files with "test" in their name
- `**/*.{js,ts}` - All JavaScript and TypeScript files

<examples>
<example>
	<user>Find all TypeScript test files</user>
	<response>Calls the glob tool with filePattern: "**/*.test.ts"</response>
</example>
<example>
	<user>List all configuration files in the root</user>
	<response>Calls the glob tool with filePattern: "*.{json,yaml,yml,toml}"</response>
</example>
<example>
	<user>Find React components on the develop branch</user>
	<response>Calls the glob tool with filePattern: "**/*.tsx", ref: "develop"</response>
</example>
</examples>

Parameters:
- `filePattern` (string, required): Glob pattern to match files (e.g., "**/*.ts", "src/**/*.test.js")
- `limit` (number, optional): Maximum number of results to return (default: 100)
- `offset` (number, optional): Number of results to skip for pagination (default: 0)
- `repository` (string, required): Repository URL (use the instance URL from the system prompt, e.g., https://{instance}/projects/PROJ/repos/repo-name/browse)
- `ref` (string, optional): Optional branch or commit reference (default: default branch)

### diff_bitbucket_enterprise

Get a diff between two commits, branches, or tags in a Bitbucket Enterprise repository.

This tool compares two points in repository history and returns structured information about changed files,
including optionally the actual diff patches for each file.

WHEN TO USE THIS TOOL:
- When you need to understand what changed between two commits, branches, or tags
- When investigating the scope of changes in a pull request or feature branch
- When you need the actual diff patches for code review or analysis (use includePatches parameter)

WHEN NOT TO USE THIS TOOL:
- To find commits by message, author, or date - use commit search instead
- To view complete file contents - use read instead (diff shows what changed, not the full file)

FEATURES:
- Returns detailed file-level change information
- Includes optional line-by-line diff patches (token-heavy, controlled by includePatches parameter)
- Supports comparing commits, branches, and tags
- Shows file status (added, removed, modified, renamed)
- Patches are automatically truncated at ~4k characters to save tokens

PARAMETERS:
- base: The base commit SHA, branch name, or tag (e.g., "main", "v1.0.0", or commit SHA)
- head: The head commit SHA, branch name, or tag to compare against base
- repository: Repository URL (use the instance URL from the system prompt, e.g., https://{instance}/projects/PROJ/repos/repo-name/browse)
- includePatches: Optional boolean to include diff patches (default false)

<examples>
<example>
	<user>Show me what changed between main and the feature-auth branch</user>
	<response>Calls the diff tool with base: "main", head: "feature-auth"</response>
</example>
<example>
	<user>What files were modified in commit abc123 compared to its parent?</user>
	<response>Calls the diff tool with base: "abc123^", head: "abc123"</response>
</example>
<example>
	<user>Compare version v1.0.0 to v2.0.0</user>
	<response>Calls the diff tool with base: "v1.0.0", head: "v2.0.0"</response>
</example>
</examples>

Parameters:
- `base` (string, required): The base commit SHA, branch name, or tag to compare from (e.g., "main", "v1.0.0", or commit SHA)
- `head` (string, required): The head commit SHA, branch name, or tag to compare to (e.g., "feature-branch", "v2.0.0", or commit SHA)
- `repository` (string, required): Repository URL (use the instance URL from the system prompt, e.g., https://{instance}/projects/PROJ/repos/repo-name/browse)
- `includePatches` (boolean, optional): Include unified diff patches per file (token heavy, truncated to ~4k characters per file). Default false.

## Tool Constant Map (Relevant)
- `dd` -> `read_github`
- `cd` -> `search_github`
- `ld` -> `commit_search`
- `id` -> `list_directory_github`
- `nd` -> `list_repositories`
- `ad` -> `glob_github`
- `od` -> `diff`
- `dW0` -> `read_bitbucket_enterprise`
- `nW0` -> `search_bitbucket_enterprise`
- `oW0` -> `commit_search_bitbucket_enterprise`
- `cW0` -> `list_directory_bitbucket_enterprise`
- `lW0` -> `list_repositories_bitbucket_enterprise`
- `iW0` -> `glob_bitbucket_enterprise`
- `aW0` -> `diff_bitbucket_enterprise`
- `R$` -> `librarian`
- `p9` -> `oracle`
- `WG` -> `web_search`
- `gZ` -> `read_web_page`
- `OK` -> `mermaid`
- `h8` -> `finder`
- `A$` -> `get_diagnostics`
- `k9` -> `Bash`
- `w6` -> `Read`
- `x8` -> `Grep`