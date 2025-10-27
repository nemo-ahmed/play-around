// @ts-check

import pluginQuery from '@tanstack/eslint-plugin-query'
import {defineConfig, globalIgnores} from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'
import prettier from 'eslint-config-prettier/flat'
import {importX} from 'eslint-plugin-import-x'

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  ...pluginQuery.configs['flat/recommended'],
  importX.flatConfigs.typescript,
  {
    rules: {
      'import-x/order': [
        'error',
        {
          pathGroups: [
            {
              pattern: '@/**',
              group: 'external',
              position: 'after',
            },
          ],
          groups: ['builtin', 'external', 'parent', 'sibling', 'index', 'type'],
          alphabetize: {order: 'asc'},
          'newlines-between': 'always',
        },
      ],
    },
  },
  prettier,

  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
  ]),
])

export default eslintConfig
