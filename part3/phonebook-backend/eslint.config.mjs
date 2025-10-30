import js from '@eslint/js'
import globals from 'globals'
import { defineConfig } from 'eslint/config'
import stylisticJs from '@stylistic/eslint-plugin-js'

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs}'],
    plugins: {
      js,
      '@stylistic/js': stylisticJs
    },
    extends: ['js/recommended'],
    languageOptions: {
      globals: globals.node,
      ecmaVersion: 'latest',
    },
    rules: {
      '@stylistic/js/indent': ['error', 2],
      '@stylistic/js/linebreak-style': ['error', 'unix'],
      '@stylistic/js/quotes': ['error', 'single'],
      '@stylistic/js/semi': ['error', 'never'],
      eqeqeq: 'error',
      'no-trailing-spaces': 'error',
      'object-curly-spacing': ['error', 'always'],
      'arrow-spacing': ['error', { before: true, after: true }]
    },
  },
  {
    files: ['**/*.js'],
    languageOptions: {
      sourceType: 'commonjs'
    },
  },
  {
    ignores: ['dist/**'],
  }
])
