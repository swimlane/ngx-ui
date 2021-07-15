'use strict';
const fs = require('fs'),
  path = require('path'),
  sass = require('sass'),
  CleanCss = require('clean-css'),
  cpx = require('cpx'),
  postcss = require('postcss'),
  autoprefixer = require('autoprefixer'),
  url = require('postcss-url');

const { version } = require('./packages/ngx-ui/package.json');

const copyDir = dir =>
  new Promise((resolve, reject) => {
    console.log(`Copying ${dir}...`);
    cpx.copy(`packages/ngx-ui/${dir}/**/*`, `dist/packages/ngx-ui/${dir}`, err => {
      if (err) {
        return reject(err);
      }
      resolve();
    });
  });

const compileCss = () =>
  new Promise((resolve, reject) => {
    console.log('Compiling index.css...');
    fs.readFile('dist/packages/ngx-ui/styles/index.scss', (err, data) => {
      if (err) {
        return reject(err);
      }
      sass.render(
        {
          data: `$pkgVersion:'${version}';${data}`,
          includePaths: ['dist/packages/ngx-ui/styles', 'dist/packages/ngx-ui/assets']
        },
        (err, result) => {
          if (err) {
            return reject(err);
          }
          postcss()
            .use(autoprefixer())
            .use(
              url([
                {
                  filter: '../../assets/**/*',
                  url: 'copy',
                  basePath: path.resolve(__dirname, './dist/packages/ngx-ui/styles/fonts'),
                  assetsPath: path.resolve(__dirname, './dist/packages/ngx-ui'),
                  useHash: true
                },
                {
                  filter: '../../assets/**/*',
                  url: ({ url }) => path.basename(url),
                  multi: true
                },
                {
                  filter: '../fonts/**/*',
                  url: 'copy',
                  basePath: path.resolve(__dirname, './dist/packages/ngx-ui/assets/icons/iconfont/scss'),
                  assetsPath: path.resolve(__dirname, './dist/packages/ngx-ui'),
                  useHash: true
                },
                {
                  filter: '../fonts/**/*',
                  url: ({ url }) => path.basename(url),
                  multi: true
                }
              ])
            )
            .process(result.css, { from: undefined })
            .then(({ css }) => {
              const cssMinifier = new CleanCss();
              const minifiedCss = cssMinifier.minify(css).styles;
              fs.writeFile('dist/packages/ngx-ui/ngx-ui.css', minifiedCss, err => {
                if (err) {
                  return reject(err);
                }
                resolve();
              });
            });
        }
      );
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
