import eslint from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import globals from 'globals';
import playwrightPlugin from 'eslint-plugin-playwright';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  eslint.configs.recommended,
  {
    files: ['**/*.ts'],
    plugins: {
      '@typescript-eslint': tseslint,
    },
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: 'module',
        project: './tsconfig.json',
      },
      globals: {
        ...globals.node,
        ...globals.es2021,
      },
    },
    rules: {
      ...tseslint.configs.recommended.rules,
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    },
  },
  {
    files: ['**/*.spec.ts', '**/tests/**/*.ts', '**/fixtures/**/*.ts'],
    plugins: {
      playwright: playwrightPlugin,
    },
    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },
    rules: {
      ...playwrightPlugin.configs.recommended.rules,
      'playwright/no-skipped-test': 'off',
      'playwright/no-conditional-expect': 'error',
      'playwright/no-conditional-in-test': 'error',
      'playwright/valid-expect': 'error',
      'playwright/prefer-web-first-assertions': 'off',
      'playwright/max-nested-describe': 'off',
    },
  },
  {
    files: ['**/*.ts', '**/*.js'],
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      ...prettierConfig.rules,
      'prettier/prettier': 'error',
    },
  },
  {
    ignores: ['node_modules/**', 'dist/**', '**/*.js', '!eslint.config.js'],
  },
];
