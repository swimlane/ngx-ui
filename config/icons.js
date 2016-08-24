var glob = require('glob');
var fs = require('fs');
var path = require('path');


var files = glob.sync('./src/assets/svgs/*.svg');
var names = [];

for(var file of files) {
  names.push(path.basename(file, '.svg'));
}

fs.writeFileSync('./dist/icons.json', JSON.stringify(names));

console.log('icons', names)
