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
  },
  npm: {
    publish: false,
  },
  git: {
    push: false,
  },
  github: {
    releaseNotes: true,
  },
};
