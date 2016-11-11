const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const commonConfig = require('./webpack.common');
const { ENV, dir } = require('./helpers');

module.exports = function(env) {
  return webpackMerge(commonConfig({ env: ENV }), {
    devtool: 'source-map',
    entry: {
      'app': './demo/index.ts',
      'libs': './demo/libs.ts'
    },
    module: {
      exprContextCritical: false,
      rules: [
        {
          enforce: 'pre',
          test: /\.js$/,
          loader: 'source-map',
          exclude: /(node_modules)/
        },
        {
          test: /\.ts$/,
          loaders: [
            'awesome-typescript-loader'
          ],
          exclude: [/\.(spec|e2e|d)\.ts$/]
        },
        {
          test: /\.css/,
          loader:
            ExtractTextPlugin.extract({
              fallbackLoader: 'style',
              loader:'css?sourceMap'
            })
        },
        {
          test: /\.scss$/,
          loader:
            ExtractTextPlugin.extract({
              fallbackLoader: 'style',
              loader: 'css?sourceMap!postcss?sourceMap!sass?sourceMap'
            })
        }
      ]
    },
    plugins: [
      new ExtractTextPlugin({
        filename: '[name].css',
        allChunks: true
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: ['libs'],
        minChunks: Infinity
      }),
      new HtmlWebpackPlugin({
        template: 'demo/index.html',
        chunksSortMode: 'dependency',
        title: 'swui'
      }),
      new CleanWebpackPlugin(['dist'], {
        root: dir(),
        verbose: false,
        dry: false
      }),
      new webpack.optimize.UglifyJsPlugin()
    ]
  });

};
