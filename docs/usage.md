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
