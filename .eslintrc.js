module.exports = {
  'root': true,

  ignorePatterns: [
    'projects/**/*'
  ],

  overrides: [
    {
      files: [
        '*.ts'
      ],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: [
          'tsconfig.json'
        ],
        createDefaultProgram: true
      },
      extends: [
        '@swimlane/eslint-config/typescript',
        'plugin:@angular-eslint/ng-cli-compat',
        'plugin:@angular-eslint/ng-cli-compat--formatting-add-on',
        'plugin:@angular-eslint/template/process-inline-templates',
        'prettier',
        'prettier/@typescript-eslint'
      ],
      rules: {
        'no-underscore-dangle': 'off',  // move to eslint-config?
        '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],

        'security/detect-object-injection': 'off',  // too strict?

        // fix these
        '@angular-eslint/no-input-rename': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/member-ordering': 'off',
        '@angular-eslint/use-lifecycle-interface': 'off',
        '@angular-eslint/no-host-metadata-property': 'off',
        '@angular-eslint/no-output-native': 'off',
        '@typescript-eslint/naming-convention': 'off',
        '@angular-eslint/component-class-suffix': 'off',
        'prefer-arrow/prefer-arrow-functions': 'off',
        'guard-for-in': 'off',
        '@angular-eslint/directive-class-suffix': 'off',
        '@angular-eslint/no-output-on-prefix': 'off',

        // bugs
        'no-shadow': 'off',

        'security/detect-non-literal-fs-filename': 'off'  // many false positives
      }
    },
    {
      'files': [
        '*.html'
      ],
      'extends': [
        'plugin:@angular-eslint/template/recommended'
      ],
      'rules': {}
    }
  ]
};