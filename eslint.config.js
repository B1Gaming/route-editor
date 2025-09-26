import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import perfectionist from 'eslint-plugin-perfectionist';
import stylistic from '@stylistic/eslint-plugin';

export default tseslint.config(
    {ignores: ['dist']},
    {
      extends: [
        js.configs.recommended,
        ...tseslint.configs.recommended,
        perfectionist.configs['recommended-alphabetical'],
      ],
      files: ['**/*.{ts,tsx}'],
      languageOptions: {
        ecmaVersion: 2020,
        globals: globals.browser,
      },
      plugins: {
        '@stylistic': stylistic,
        'react-hooks': reactHooks,
        'react-refresh': reactRefresh,
      },
      rules: {
        ...reactHooks.configs.recommended.rules,
        'react-refresh/only-export-components': [
          'warn',
          {allowConstantExport: true}],
        '@typescript-eslint/no-unused-vars': [
          'error',
          {
            args: 'all',
            argsIgnorePattern: '^_',
            caughtErrors: 'all',
            caughtErrorsIgnorePattern: '^_',
            destructuredArrayIgnorePattern: '^_',
            varsIgnorePattern: '^_',
            ignoreRestSiblings: true,
          },
        ],
        '@stylistic/semi': ['error', 'always'],
        'perfectionist/sort-imports': [
          'error',
          {
            internalPattern: [
              '^~/.+',
              '@(base|components|context|entities|img|model|utils).+.(?!css)'],
          },
        ],
      },
    },
);
