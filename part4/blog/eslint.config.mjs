import js from '@eslint/js'
import globals from 'globals'
import { defineConfig } from 'eslint/config'
import eslintConfigPrettier from 'eslint-config-prettier/flat'

export default defineConfig([
  eslintConfigPrettier,
  {
    files: ['**/*.{js,mjs,cjs}'],
    plugins: { js },
    extends: ['js/recommended'],
    languageOptions: { globals: globals.node, ecmaVersion: 'latest' },
    rules: {
      eqeqeq: 'error',
      'no-trailing-spaces': 'error',
      'object-curly-spacing': ['error', 'always'],
      'arrow-spacing': ['error', { before: true, after: true }],
      'no-unused-vars': ['error', { ignoreRestSiblings: true }]
    }
  },
  {
    files: ['**/*.js'],
    languageOptions: { sourceType: 'commonjs' }
  },
  {
    ignores: ['dist/**', 'eslint.config.mjs']
  }
])
