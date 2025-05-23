import pixie from '@pixie-cheeks/eslint-config';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  { files: ['**/*.ts,js,cjs'] },
  { ignores: ['dist'] },
  ...pixie.base,
  {
    files: ['eslint.config.js'],
    rules: {
      'import-x/no-default-export': 'off',
    },
  },
  {
    files: ['src/**/*'],
    rules: {
      'no-console': 'off',
    },
  },
  pixie.prettier,
]);
