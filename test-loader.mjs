// Node strips TS types natively but doesn't resolve the bundler-style imports Next uses: '@/' alias and extensionless paths.
import { existsSync } from 'node:fs'
import { registerHooks } from 'node:module'
import { fileURLToPath, pathToFileURL } from 'node:url'

const srcUrl = pathToFileURL(`${process.cwd()}/src/`).href

registerHooks({
  resolve(specifier, context, nextResolve) {
    const aliased = specifier.startsWith('@/') ? srcUrl + specifier.slice(2) : specifier
    const isPath = aliased.startsWith('.') || aliased.startsWith('file:')
    if (!isPath || /\.[cm]?[jt]sx?$/.test(aliased)) return nextResolve(aliased, context)

    const base = new URL(aliased, context.parentURL)
    for (const suffix of ['.ts', '.tsx', '/index.ts', '/index.tsx']) {
      const candidate = new URL(base.href + suffix)
      if (existsSync(fileURLToPath(candidate))) return nextResolve(candidate.href, context)
    }
    return nextResolve(aliased, context)
  },
})
