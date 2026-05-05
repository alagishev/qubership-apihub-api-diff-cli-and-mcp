import { build } from 'esbuild'
import { chmod } from 'node:fs/promises'

await build({
  entryPoints: ['src/cli.ts'],
  outfile: 'dist/cli.js',
  bundle: true,
  platform: 'node',
  target: 'node20',
  format: 'esm',
  banner: {
    js: '#!/usr/bin/env node',
  },
  sourcemap: true,
  legalComments: 'external',
})

await chmod('dist/cli.js', 0o755)
