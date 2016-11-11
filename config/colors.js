var sassColorJson = require('sass-color-json');
var path = require('path');
var fs = require('fs');

var scssPath = path.resolve(__dirname, '../src/styles/colors/hues.scss');
var colors = sassColorJson.sync({
  input: scssPath
});

var jsonPath = path.join(__dirname, '../src/styles/colors/colors.json');
fs.writeFileSync(jsonPath, JSON.stringify(colors, null, ' '));
