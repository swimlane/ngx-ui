const {
  version,
  dependencies,
  peerDependencies,
} = require('../../../ngx-ui/package.json');

export const environment = {
  production: true,
  version: `v${version}`,
  dependencies,
  peerDependencies,
};
