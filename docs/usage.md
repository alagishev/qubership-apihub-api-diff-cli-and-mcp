# Usage

The CLI compares two API documents and emits a categorized diff report.

```bash
apihub-api-diff old.yaml new.yaml
```

By default the report is JSON and is written to stdout. Use `--format md` or `--format html` for human-readable reports.

For CI, use `--fail-on`:

```bash
apihub-api-diff old.yaml new.yaml --fail-on breaking
```

Exit codes:

- `0` means the command completed and the selected threshold did not match.
- `1` means the command failed.
- `2` means the diff matched the `--fail-on` threshold.

## MCP Mode

Run the same binary as a local MCP server over stdio:

```bash
apihub-api-diff mcp
```

The MCP server exposes the `apihub_api_diff` tool. It accepts local `previousPath` and `currentPath` arguments and returns a JSON, Markdown, or HTML report as text content.
