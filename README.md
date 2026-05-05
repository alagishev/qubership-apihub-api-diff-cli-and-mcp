# APIHUB API Diff CLI and MCP

Standalone CLI and local MCP server for categorized API diffs powered by `@netcracker/qubership-apihub-api-processor`.

## Usage

```bash
apihub-api-diff previous.yaml current.yaml --format json
apihub-api-diff previous.yaml current.yaml --format md --output diff.md
apihub-api-diff previous.yaml current.yaml --format html --output diff.html
```

## Options

```text
apihub-api-diff <previous-file> <current-file> [options]

  -f, --format <json|md|html>       Output format. Default: json
  -o, --output <file>               Output file. Default: stdout for json/md, diff.html for html
      --output-dir <directory>      Directory for the default output file
      --fail-on <level>             Exit with code 2 on breaking, risky, any, or never. Default: never
      --include-values              Include raw before/after values in JSON output
      --title <text>                Report title
  -q, --quiet                       Suppress status messages
  -h, --help                        Show help
```

## Development

The repository resolves `@netcracker/*` packages from GitHub Packages. Configure an npm token with access to the organization before installing dependencies.

```bash
npm install
npm run typecheck
npm test
npm run build
```

Create a standalone binary for the current platform:

```bash
npm run build:binary
```

The binary is written to `dist/apihub-api-diff` or `dist/apihub-api-diff.exe`.

## MCP Server

The same binary can run as a local MCP server over stdio:

```bash
apihub-api-diff mcp
```

Cursor MCP configuration example:

```json
{
  "mcpServers": {
    "apihub-api-diff": {
      "command": "apihub-api-diff",
      "args": [
        "mcp"
      ]
    }
  }
}
```

The server exposes one tool, `apihub_api_diff`, with these arguments:

- `previousPath` - path to the previous API document.
- `currentPath` - path to the current API document.
- `format` - `json`, `md`, or `html`; default is `json`.
- `includeValues` - include raw before/after values in JSON output.
- `title` - optional report title.

## GitHub Actions

Add a repository secret named `NPMRC` with the full `.npmrc` content required to install `@netcracker/*` packages. Example:

```text
@netcracker:registry=https://npm.pkg.github.com/
//npm.pkg.github.com/:_authToken=<github-token>
registry=https://registry.npmjs.org/
```

Push a tag like `v0.1.0` to create a GitHub Release. The release workflow builds Linux, Windows, and macOS binaries and attaches them to the release.
