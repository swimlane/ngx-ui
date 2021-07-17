const releaseItJson = require('./.release-it');

module.exports = {
  ...releaseItJson,
  plugins: {
    ...releaseItJson.plugins,
    '@release-it/bumper': {
      out: [
        'packages/ngx-ui/package*.json',
        'packages/ngx-ui/**/package*.json',
      ],
    },
  },
  git: {
    ...releaseItJson.git,
    commitMessage: '(release-ui): ${version}',
  },
  hooks: {
    'after:bump': 'git checkout -b release-ui/${version}',
    'after:release': [
      'git push origin HEAD --tags',
      'git checkout -',
      "git merge --no-edit -m='chore: release-ui/${version}' release-ui/${version}",
      'git push',
    ],
  },
};
