'use strict';

const ts = require('rollup-plugin-typescript');
const angular = require('rollup-plugin-angular');
const ignoreImport = require('rollup-plugin-ignore-import');
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const sass = require('node-sass');
const CleanCSS = require('clean-css');
const { minify } = require('html-minifier');
const sassIncludePaths = require('./sass-include-paths');

const cssmin = new CleanCSS();
const htmlMinOpts = {
  caseSensitive: true,
  collapseWhitespace: true,
  removeComments: true
};

module.exports = {
  input: './src/index.ts',
  output: {
    file: 'release/esm.js',
    format: 'esm'
  },
  external: ['@angular/common', '@angular/core', '@angular/forms', '@angular/animations', 'rxjs'],
  plugins: [
    resolve({ modulesOnly: true }),
    commonjs(),
    angular({
      replace: false,
      preprocessors: {
        template: template => minify(template, htmlMinOpts),
        style: scss => {
          const { css } = sass.renderSync({
            data: scss,
            includePaths: sassIncludePaths
          });
          return cssmin.minify(css).styles;
        }
      }
    }),
    ts({ target: 'ES5', module: 'ES6' }),
    // These stylesheets are already prepared by webpack
    ignoreImport({ extensions: ['.scss', '.css'] })
  ]
};
