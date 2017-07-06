const sass = require('node-sass');
const fs = require('fs-extra');
const glob = require('glob').sync;
const path = require('path');

const files = glob('./src/components/**/*.scss');
for(let file of files) {
  const result = sass.renderSync({
    file: path.resolve(file),
    includePaths: ['src/styles', 'src/assets', 'src/components']
  });

  file = file.replace('src', 'build').replace('scss', 'css');
  fs.ensureFileSync(file);
  fs.writeFileSync(file, result.css.toString());
}