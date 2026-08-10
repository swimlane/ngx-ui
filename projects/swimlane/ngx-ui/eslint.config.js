// @ts-check
const path = require('node:path');
const tseslint = require('typescript-eslint');
const rootConfig = require('../../../eslint.config.js');

module.exports = tseslint.config(
  ...rootConfig,
  {
    files: ['**/*.ts'],
    languageOptions: {
      parserOptions: {
        project: ['projects/swimlane/ngx-ui/tsconfig.eslint.json'],
        tsconfigRootDir: path.resolve(__dirname, '../../..')
      }
    },
    rules: {
      '@angular-eslint/component-selector': 'off',
      '@angular-eslint/directive-selector': 'off'
    }
  },
  {
    files: ['**/*.html'],
    rules: {}
  }
);
