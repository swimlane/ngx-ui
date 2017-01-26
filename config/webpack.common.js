const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const { ENV, IS_PRODUCTION, IS_DEV, APP_VERSION, dir, DEPS } = require('./helpers');

module.exports = function(options = {}) {
  return {
    context: dir(),
    resolve: {
      extensions: ['.ts', '.js', '.json', '.css', '.scss', '.html'],
      modules: [
        'node_modules',
        dir('src'),
        dir('demo')
      ]
    },
    output: {
      path: dir('dist'),
      filename: '[name].js',
      sourceMapFilename: '[name].map',
      chunkFilename: '[id].chunk.js',
      devtoolModuleFilenameTemplate: 'webpack:///[absolute-resource-path]'
    },
    performance: {
      hints: false
    },
    module: {
      exprContextCritical: false,
      rules: [
        {
          test: /\.html$/,
          loader: 'raw-loader'
        },
        {
          test: /\.json/,
          loader: 'json-loader'
        },
        {
          test: /\.(png|woff|woff2|eot|ttf|svg|jpeg|jpg|gif)$/,
          loader: 'file-loader'
        },
        {
          test: /\.css/,
          loaders: [
            ExtractTextPlugin.extract({ 
              fallbackLoader: "style-loader",
              loader: 'css-loader'
            }),
            'to-string-loader',
            'css-loader',
            'postcss-loader?sourceMap',
          ]
        },
        {
          test: /\.scss$/,
          exclude: /\.component.scss$/,
          loaders: [
            ExtractTextPlugin.extract({ 
              fallbackLoader: 'style-loader',
              loader: 'css-loader'
            }),
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
            'postcss-loader?sourceMap',
            'sass-loader?sourceMap'
          ]
        }
      ]
    },
    plugins: [
      new ExtractTextPlugin({
        filename: '[name].css',
        allChunks: true
      }),
      new webpack.NamedModulesPlugin(),
      new webpack.DefinePlugin({
        ENV,
        IS_PRODUCTION,
        DEPS,
        IS_DEV,
        APP_VERSION,
        HMR: options.HMR
      }),
      new CopyWebpackPlugin([
        {
          from: 'src/assets',
          to: 'assets'
        },
        {
          from: 'src/styles',
          to: 'styles'
        }
      ]),
      new webpack.LoaderOptionsPlugin({
        options: {
          context: dir(),
          tslint: {
            emitErrors: false,
            failOnHint: false,
            resourcePath: 'src'
          },
          postcss: function() {
            return [ 
              autoprefixer({ browsers: ['last 2 versions'] })
            ];
          },
          sassLoader: {
            includePaths: [
              dir('src', 'components'),
              dir('src', 'styles'),
              dir('src', 'assets')
            ]
          }
        }
      })
    ]
  };

};
