const webpack = require('webpack');
const { NoErrorsPlugin, BannerPlugin } = require('webpack');
const webpackMerge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const { CheckerPlugin, TsConfigPathsPlugin } = require('awesome-typescript-loader');
const commonConfig = require('./webpack.common');
const { ENV, dir, APP_VERSION } = require('./helpers');
const externalLibs = require('./external-libs');

const banner = `/**
 * swui v${APP_VERSION} (https://github.com/swimlane/ngx-ui)
 * Copyright 2017
 * Licensed under MIT
 */`;

module.exports = function(env) {
  return webpackMerge(commonConfig({ env: ENV }), {
    devtool: 'source-map',
    module: {
      exprContextCritical: false,
      rules: [
        {
          test: /\.ts$/,
          loaders: ['awesome-typescript-loader', 'angular2-template-loader'],
          exclude: [/\.(spec|e2e|d)\.ts$/]
        }
      ]
    },
    entry: {
      index: './src/index.ts'
    },
    output: {
      path: dir('release'),
      libraryTarget: 'umd',
      library: 'swui',
      umdNamedDefine: true
    },
    externals: externalLibs.reduce((externals, libname) => {
      externals[libname] = libname;
      return externals;
    }, {}),
    plugins: [
      new webpack.optimize.ModuleConcatenationPlugin(),
      new NoErrorsPlugin(),
      new CheckerPlugin(),
      new TsConfigPathsPlugin({
        configFileName: 'tsconfig.package.json'
      }),
      new BannerPlugin({
        banner: banner,
        raw: true,
        entryOnly: true
      })
      /*
      new CleanWebpackPlugin(['release'], {
        root: dir(),
        verbose: false,
        dry: false
      })
      */
    ]
  });
};
