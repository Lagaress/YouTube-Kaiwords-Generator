import js from '@eslint/js';
import nxPlugin from '@nx/eslint-plugin';
import stylistic from '@stylistic/eslint-plugin';
import * as typescript from '@typescript-eslint/eslint-plugin';
import * as typescriptParser from '@typescript-eslint/parser';
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const eslintConfig = [
  // Base configurations
  js.configs.recommended,
  
  // Global configuration that applies to all files
  {
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        sourceType: 'module',
        project: ['tsconfig.base.json'],
      },
    },
    plugins: {
      '@typescript-eslint': typescript,
      '@stylistic': stylistic,
      '@nx': nxPlugin,
    },
    settings: {
      'import/resolver': {
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
      },
    },
    rules: {
      // Stylistic rules
      '@stylistic/comma-spacing': ['error', { before: false, after: true }],
      '@stylistic/jsx-closing-bracket-location': ['error', {
        nonEmpty: 'line-aligned',
        selfClosing: 'line-aligned',
      }],
      // ... other stylistic rules remain the same ...

      // TypeScript rules
      '@typescript-eslint/array-type': 'error',
      '@typescript-eslint/await-thenable': 'error',
      // ... other typescript rules remain the same ...

      // Custom syntax restrictions
      'no-restricted-syntax': [
        'error',
        {
          selector: 'VariableDeclaration[kind = "let"] > VariableDeclarator[init = null]:not([id.typeAnnotation])',
          message: 'Type must be added at variable declaration',
        },
        // ... other syntax restrictions remain the same ...
      ],
    },
  },

  // Override configurations for specific file patterns
  {
    files: ['*.ts', '*.tsx', '*.js', '*.jsx'],
    rules: {
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: true,
          allow: [],
          depConstraints: [
            {
              sourceTag: '*',
              onlyDependOnLibsWithTags: ['*'],
            },
          ],
        },
      ],
    },
  },

  {
    files: ['*.ts', '*.tsx'],
    rules: {
      '@stylistic/no-extra-semi': 'error',
    },
  },

  {
    files: ['*.js', '*.jsx'],
    rules: {
      '@stylistic/no-extra-semi': 'error',
    },
  },

  {
    files: ['**/config/*.ts', '*.config.ts'],
    rules: {
      'no-process-env': 'off',
    },
  },

  {
    files: ['*.test.ts', '*.test.tsx', '*.test.setup.tsx', '*.builder.ts'],
    rules: {
      '@typescript-eslint/no-magic-numbers': 'off',
    },
  },

  // Ignore patterns (replacing ignorePatterns)
  {
    ignores: ['**/*'],
  },
];

export default eslintConfig;
