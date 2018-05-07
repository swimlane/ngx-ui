const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const chalk = require('chalk');
const commonConfig = require('./webpack.common');
const { ENV, dir } = require('./helpers');

module.exports = function(env) {
  return webpackMerge(commonConfig({ env: ENV }), {
    devtool: 'inline-source-map',
    entry: {
      app: './demo/index.ts',
      libs: './demo/libs.ts'
    },
    module: {
      exprContextCritical: false,
      rules: [
        {
          enforce: 'pre',
          test: /\.js$/,
          use: 'source-map-loader',
          exclude: /(node_modules)/
        },
        {
          test: /\.ts$/,
          use: 'awesome-typescript-loader',
          query: {
            sourceMap: false,
            inlineSourceMap: true,
            compilerOptions: {
              removeComments: true
            }
          },
          exclude: [/\.e2e\.ts$/, /(node_modules)/]
        },
        {
          enforce: 'post',
          test: /\.(js|ts)$/,
          use: 'istanbul-instrumenter-loader',
          include: dir('src'),
          exclude: [/\.(e2e|spec)\.ts$/, /node_modules/]
        }
      ]
    },
    node: {
      global: true,
      process: false,
      crypto: 'empty',
      module: false,
      clearImmediate: false,
      setImmediate: false
    }
  });
};
