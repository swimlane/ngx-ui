const MomentLocalesPlugin = require('moment-locales-webpack-plugin');
const MomentTimezoneDataPlugin = require('moment-timezone-data-webpack-plugin');
const currentYear = new Date().getFullYear();

module.exports = {
  plugins: [
    new MomentLocalesPlugin(),
    new MomentTimezoneDataPlugin({
      startYear: currentYear - 15,
      endYear: currentYear + 15
    })
  ]
};
