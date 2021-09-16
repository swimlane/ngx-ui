// @ts-ignore
const { version, peerDependencies } = require('../../../ngx-ui/package.json');

export const environment = {
  production: true,
  version: `v${version}`,
  peerDependencies,
};
