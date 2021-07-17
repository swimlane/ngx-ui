const releaseItJson = require('./.release-it');

module.exports = {
  ...releaseItJson,
  plugins: {
    ...releaseItJson.plugins,
    '@release-it/bumper': {
      out: ['packages/ngx-doc/package*.json']
    }
  },
  git: {
    ...releaseItJson.git,
    commitMessage: '(release-doc): ${version}'
  },
  hooks: {
    'after:bump': 'git checkout -b release-doc/${version}',
    'after:release': [
      'git push origin HEAD --tags',
      'git checkout -',
      'git merge --no-edit -m=\'chore: release-doc/${version}\' release-doc/${version}',
      'git push'
    ]
  }
};
