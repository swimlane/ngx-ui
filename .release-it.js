module.exports = {
  plugins: {
    '@release-it/conventional-changelog': {
      preset: {
        name: 'conventionalcommits',
        types: [
          {
            type: 'feat',
            section: 'Features',
          },
          {
            type: 'fix',
            section: 'Bug Fixes',
          },
          {
            type: 'perf',
            section: 'Performances',
          },
          {
            type: 'refactor',
            section: 'Refactor',
          },
          {
            type: 'docs',
            section: 'Documentations',
          },
        ],
      },
      infile: 'CHANGELOG.md',
    },
    '@release-it/bumper': {
      out: ['packages/ngx-ui/package.json', 'packages/ngx-doc/package.json'],
    },
  },
  npm: {
    publish: false,
  },
  git: {
    push: false,
    commitMessage: '(release): ${version}',
    tagName: '${version}',
  },
  github: {
    releaseNotes: true,
  },
  hooks: {
    'after:bump': [
      'git checkout -- package-lock.json',
      'git checkout -- package.json',
      'git checkout -b release/${version}',
    ],
    'after:release': [
      'git push origin HEAD --tags',
      'git checkout -',
      "git merge --no-edit -m='chore: release/${version}' release/${version}'",
      'git push',
    ],
  },
};
