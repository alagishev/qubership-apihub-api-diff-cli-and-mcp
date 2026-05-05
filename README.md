# APIHUB API Diff CLI

Standalone CLI for categorized API diffs powered by `@netcracker/qubership-apihub-api-processor`.

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
