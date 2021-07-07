
module.exports = {
  'root': true,

  ignorePatterns: [
    'projects/**/*',
    'dist/**/*',
    'cypress/**/*'
  ],

  extends: [
    '@swimlane',
    'prettier'
  ],

  rules: {
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
        'plugin:@angular-eslint/recommended',
        'plugin:@angular-eslint/template/process-inline-templates',
        'prettier'
      ],
      rules: {
        // off for demo packages
        'no-console': 'off',
        
        // fix these in this repo, warn for now
        'guard-for-in': 'warn',
        '@typescript-eslint/explicit-module-boundary-types': 'warn',
        '@angular-eslint/no-host-metadata-property': 'warn',
        '@angular-eslint/no-output-native': 'warn',
        '@angular-eslint/component-class-suffix': ['error', { suffixes: ['Component', 'Fixture'] }],
        '@angular-eslint/directive-class-suffix': 'warn',
        '@angular-eslint/no-output-on-prefix': 'warn'
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