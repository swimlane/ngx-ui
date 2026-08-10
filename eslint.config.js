// @ts-check
const eslint = require('@eslint/js');
const tseslint = require('typescript-eslint');
const angular = require('angular-eslint');
const security = require('eslint-plugin-security');

module.exports = tseslint.config(
  {
    ignores: ['dist/**/*', 'cypress/**/*']
  },
  {
    files: ['**/*.ts'],
    extends: [eslint.configs.recommended, ...tseslint.configs.recommended, ...angular.configs.tsRecommended],
    processor: angular.processInlineTemplates,
    plugins: {
      security
    },
    linterOptions: {
      // Historical inline disables remain for rules still off below; keep from failing lint
      reportUnusedDisableDirectives: 'off'
    },
    languageOptions: {
      parserOptions: {
        project: [
          'tsconfig.json',
          'src/tsconfig.app.json',
          'tsconfig.spec.json',
          'cypress/tsconfig.json',
          'projects/swimlane/ngx-ui/tsconfig.eslint.json'
        ],
        tsconfigRootDir: __dirname
      }
    },
    rules: {
      // Preserved from previous .eslintrc.js overrides
      'no-console': 'off',
      'guard-for-in': 'off',
      '@angular-eslint/no-output-native': 'off',
      '@angular-eslint/component-class-suffix': 'off',
      '@angular-eslint/directive-class-suffix': 'off',
      '@angular-eslint/no-output-on-prefix': 'off',
      '@angular-eslint/prefer-standalone': 'off',
      '@angular-eslint/prefer-inject': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'off'
      // Angular 22 recommended rules (prefer-on-push, no-unused-vars, etc.) stay enforced;
      // existing violations are silenced with inline eslint-disable comments.
    }
  },
  {
    files: ['**/*.html'],
    extends: [...angular.configs.templateRecommended],
    rules: {}
  }
);
