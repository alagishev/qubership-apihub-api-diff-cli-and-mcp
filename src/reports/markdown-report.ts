import { DiffResult, OperationDiff } from '../schema/diff-result.js'

export const renderMarkdownReport = (result: DiffResult): string => {
  const lines: string[] = [
    `# ${result.title}`,
    '',
    `Generated at: ${result.generatedAt}`,
    '',
    '## Summary',
    '',
    `- Total changes: ${result.summary.totalChanges}`,
    `- Changed operations: ${result.summary.changedOperations}`,
    `- By severity: ${formatCounts(result.summary.bySeverity)}`,
    `- By action: ${formatCounts(result.summary.byAction)}`,
    `- By API type: ${formatCounts(result.summary.byApiType)}`,
    '',
  ]

  if (result.notifications.length) {
    lines.push('## Notifications', '')
    for (const notification of result.notifications) {
      lines.push(`- ${notification.message}`)
    }
    lines.push('')
  }

  lines.push('## Changes', '')

  if (!result.changes.length) {
    lines.push('No changes detected.', '')
    return `${lines.join('\n')}\n`
  }

  for (const change of result.changes) {
    lines.push(...renderOperationChange(change), '')
  }

  return `${lines.join('\n')}\n`
}

const renderOperationChange = (change: OperationDiff): string[] => {
  const operationName = change.operationId ?? change.previousOperationId ?? '<unknown operation>'
  const lines = [
    `### ${operationName}`,
    '',
    `- API type: ${change.apiType}`,
  ]

  if (change.previousOperationId && change.previousOperationId !== change.operationId) {
    lines.push(`- Previous operation ID: ${change.previousOperationId}`)
  }

  lines.push('', '| Severity | Action | Scope | Description |')
  lines.push('| --- | --- | --- | --- |')

  for (const diff of change.diffs) {
    lines.push(`| ${escapeTable(diff.severity)} | ${escapeTable(diff.action)} | ${escapeTable(diff.scope)} | ${escapeTable(diff.description ?? '')} |`)
  }

  return lines
}

const formatCounts = (counts: Record<string, number>): string => {
  const entries = Object.entries(counts)
  return entries.length ? entries.map(([key, value]) => `${key}: ${value}`).join(', ') : 'none'
}

const escapeTable = (value: string): string => value.replace(/\|/g, '\\|').replace(/\n/g, '<br>')
