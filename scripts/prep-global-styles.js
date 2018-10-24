'use strict';

const fs = require('fs');
const sass = require('node-sass');
const CleanCss = require('clean-css');
const cpx = require('cpx');
const { version } = require('../projects/swimlane/ngx-ui/package.json');

const compileCss = () =>
  new Promise((resolve, reject) => {
    console.log('Compliing index.css...');
    fs.readFile('dist/swimlane/ngx-ui/styles/index.scss', (err, data) => {
      if (err) {
        reject(err);
      }
      sass.render(
        {
          data: `$pkgVersion: '${version}';${data}`,
          includePaths: ['dist/swimlane/ngx-ui/styles', 'dist/swimlane/ngx-ui/assets']
        },
        (err, result) => {
          if (err) {
            reject(err);
          }
          const cssMinifier = new CleanCss();
          const css = cssMinifier.minify(result.css).styles;
          fs.writeFile('dist/swimlane/ngx-ui/index.css', css, err => {
            if (err) {
              reject(err);
            }
            resolve();
          });
        }
      );
    });
  });

const copyDir = dir =>
  new Promise((resolve, reject) => {
    console.log(`Copying ${dir}...`);
    cpx.copy(`projects/swimlane/ngx-ui/src/lib/${dir}/**/*`, `dist/swimlane/ngx-ui/${dir}`, err => {
      if (err) {
        reject(err);
      }
      resolve();
    });
  });

Promise.all(['assets', 'styles'].map(dir => copyDir(dir)))
  .then(() => compileCss())
  .then(() => {
    console.log('Done.');
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
