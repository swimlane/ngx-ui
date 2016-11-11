const path = require('path');

const ENV = process.env.NODE_ENV;
const pkg = require('../package.json');
const ROOT = path.resolve(__dirname, '..');

exports.dir = function(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [ROOT].concat(args));
}

exports.ENV = JSON.stringify(ENV);
exports.IS_PRODUCTION = ENV === 'production';
exports.APP_VERSION = JSON.stringify(pkg.version);
exports.DEPS = JSON.stringify(pkg.dependencies);