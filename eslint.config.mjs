import {dirname} from 'path'
import {fileURLToPath} from 'url'
import {FlatCompat} from '@eslint/eslintrc'
import pluginQuery from '@tanstack/eslint-plugin-query'
import jsxA11y from 'eslint-plugin-jsx-a11y'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  ...pluginQuery.configs['flat/recommended'],
  {
    plugins: {
      'jsx-a11y': jsxA11y,
    },
    rules: jsxA11y.configs.strict.rules,
  },
  {
    ignores: ['node_modules', '.next', 'out/**', 'build/**', 'next-env.d.ts'],
  },
]

export default eslintConfig
