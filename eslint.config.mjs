import {dirname} from 'path'
import {fileURLToPath} from 'url'
import {FlatCompat} from '@eslint/eslintrc'
import pluginQuery from '@tanstack/eslint-plugin-query'
import jsxA11y from 'eslint-plugin-jsx-a11y'

import {defineConfig, globalIgnores} from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  ...pluginQuery.configs['flat/recommended'],
  // jsxA11y.flatConfigs.strict,
  // {
  //   plugins: {
  //     'jsx-a11y': jsxA11y,
  //   },
  //   rules: jsxA11y.configs.strict.rules,
  // },
  // ...compat.extends(
  //   // 'next/core-web-vitals',
  //   // 'next/typescript',
  //   // 'plugin:eslint-plugin-query/recommended',
  //   'plugin:jsx-a11y/recommended',
  // ),
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

// const eslintConfig = [
//   ...compat.extends(
//     'next/core-web-vitals',
//     'next/typescript',
//     'plugin:eslint-plugin-query/recommended',
//     'plugin:react-hooks/recommended',
//   ),
//   {
//     plugins: {
//       'jsx-a11y': jsxA11y,
//     },
//     rules: jsxA11y.configs.strict.rules,
//   },
//   {
//     ignores: ['node_modules', '.next', 'out/**', 'build/**', 'next-env.d.ts'],
//   },
// ]
