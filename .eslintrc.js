
module.exports = {
  'root': true,

  ignorePatterns: [
    'projects/**/*',
    'dist/**/*',
    'cypress/**/*'
  ],

  extends: [
    '@swimlane',
    'prettier',
    'prettier/@typescript-eslint'
  ],

  rules: {
    // add to @swimlane/eslint-config
    'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
  },

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
        // add to @swimlane/eslint-config
        'no-underscore-dangle': 'off',

        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],

        'no-shadow': 'off',
        '@typescript-eslint/no-shadow': ['error'],

        '@typescript-eslint/naming-convention': [
          'error',
          { selector: 'enumMember', format: null }
        ],

        'security/detect-object-injection': 'off',  // too strict?
        'security/detect-non-literal-fs-filename': 'off',  // many false positives

        // fix these
        '@angular-eslint/no-input-rename': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/member-ordering': 'off',
        '@angular-eslint/use-lifecycle-interface': 'off',
        '@angular-eslint/no-host-metadata-property': 'off',
        '@angular-eslint/no-output-native': 'off',
        '@angular-eslint/component-class-suffix': 'off',
        'prefer-arrow/prefer-arrow-functions': 'off',
        'guard-for-in': 'off',
        '@angular-eslint/directive-class-suffix': 'off',
        '@angular-eslint/no-output-on-prefix': 'off'
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