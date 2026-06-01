import tseslint from 'typescript-eslint';
import path from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import pluginJs from '@eslint/js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: pluginJs.configs.recommended,
});

export default [
  {
    files: ['**/*.js'],
    languageOptions: { sourceType: 'script' },

    rules: {
      'no-unused-vars': 'warn',
      'no-console': 'warn',
      'eqeqeq': ['error', 'always'],
      'semi': ['error', 'always'],
      'quotes': ['error', 'single'],
      'indent': ['error', 2],
      'curly': 'error',
      'no-multiple-empty-lines': ['error', { max: 1 }],
    },
    overrides: [
      {
        env: {
          chai: true,
        },
      },
    ],
  },
  ...tseslint.configs.recommended,
];
