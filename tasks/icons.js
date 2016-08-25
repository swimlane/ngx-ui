'use strict';

var glob = require('glob');
var fs = require('fs');
var path = require('path');
var webfontsGenerator = require('webfonts-generator');

// Get the paths
var files = glob.sync('./src/assets/svgs/*.svg');
var destDir = path.resolve(path.join(__dirname, '../', 'src', 'assets', 'fonts', 'icons'));

// Path them in a array
var names = [];
for(var file of files) {
  names.push(path.basename(file, '.svg'));
}

// Options
var options = {
  files: files,
  dest: destDir,
  fontName: 'icon',

  css: true,
  cssTemplate: path.resolve(__dirname, 'template.css'),

  templateOptions: {
    classPrefix : 'icon-',
    baseClass : 'icon',
    normalize: true,
    fontHeight: 1001,
    fixedWidth: true,
    types: ['ttf', 'eot', 'woff', 'svg']
  }
};

// Generate font
webfontsGenerator(options, function(error) {
  if (error) throw new Error('Icon Generator Failed!', error);
});

// Generate json map
var jsonFile = path.join(destDir, 'icons.json');
fs.writeFileSync(jsonFile, JSON.stringify(names, null, ' '));
