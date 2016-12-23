const { NoErrorsPlugin, BannerPlugin } = require('webpack');
const webpackMerge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const { CheckerPlugin, TsConfigPathsPlugin } = require('awesome-typescript-loader');
const commonConfig = require('./webpack.common');
const { ENV, dir, APP_VERSION } = require('./helpers');

const banner =
`/**
 * swui v${APP_VERSION} (https://github.com/swimlane/swui)
 * Copyright 2016
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
          loaders: [
            'awesome-typescript-loader',
            'angular2-template-loader'
          ],
          exclude: [/\.(spec|e2e|d)\.ts$/]
        },
        {
          test: /\.css/,
          loaders: [
            ExtractTextPlugin.extract({ 
              fallbackLoader: "style-loader",
              loader: 'css-loader'
            }),
            'to-string-loader',
            'css-loader'
          ]
        },
        {
          test: /\.scss$/,
          exclude: /\.component.scss$/,
          loaders: [
            'style-loader',
            'css-loader',
            'postcss-loader?sourceMap',
            'sass-loader?sourceMap'
          ]
        },
        {
          test: /\.component.scss$/,
          loaders: [
            ExtractTextPlugin.extract({ 
              fallbackLoader: 'style-loader',
              loader: 'css-loader'
            }),
            'to-string-loader',
            'css-loader',
            'sass-loader'
          ]
        }
      ]
    },
    entry: {
      'index': './src/index.ts'
    },
    output: {
      path: dir('release'),
      libraryTarget: 'umd',
      library: 'swui',
      umdNamedDefine: true
    },
    externals: {
      '@angular/platform-browser-dynamic': '@angular/platform-browser-dynamic',
      '@angular/platform-browser': '@angular/platform-browser',
      '@angular/core': '@angular/core',
      '@angular/common': '@angular/common',
      '@angular/forms': '@angular/forms',
      'core-js': 'core-js',
      'core-js/es6': 'core-js/es6',
      'core-js/es7/reflect': 'core-js/es7/reflect',
      'rxjs': 'rxjs',
      'rxjs/Rx': 'rxjs/Rx',
      'rxjs/Subscription': 'rxjs/Subscription',
      'zone.js/dist/zone': 'zone.js/dist/zone'
    },
    plugins: [
      new NoErrorsPlugin(),
      new CheckerPlugin(),
      new TsConfigPathsPlugin({
        configFileName: 'tsconfig.package.json'
      }),
      new ExtractTextPlugin({
        filename: '[name].css',
        allChunks: true
      }),
      new BannerPlugin({
        banner: banner,
        raw: true,
        entryOnly: true
      }),
      new CleanWebpackPlugin(['release'], {
        root: dir(),
        verbose: false,
        dry: false
      })
    ]
  });

};
