const { dir } = require('./helpers');

const sassIncludePaths = [dir('src', 'components'), dir('src', 'styles'), dir('src', 'assets')];

module.exports = sassIncludePaths;
