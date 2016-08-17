var path = require('path');

var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');

var cssnext = require('postcss-cssnext');
var nested = require('postcss-nested');
var stylelint = require("stylelint");
var reporter = require("postcss-reporter");

var VERSION = JSON.stringify(require('./package.json').version);
function root(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [__dirname].concat(args));
}

function webpackConfig(options = {}) {

  return {
    context: root(),
    debug: true,
    devtool: 'cheap-module-eval-source-map',

    resolve: {
      extensions: ['', '.js', '.json', '.css', '.scss', '.html'],
      root: root('src'),
      modules: [
        'node_modules',
        root('src')
      ]
    },

    entry: {
      bootstrap: './src/bootstrap.js',
      vendor: './src/vendor.js',
      polyfills: './src/polyfills.js'
    },

    devServer: {
      outputPath: root('dist'),
      watchOptions: {
        poll: true
      },
      port: 9999,
      hot: true,
      stats: {
        modules: false,
        cached: false,
        chunk: false
      }
    },

    output: {
      path: root('dist'),
      filename: '[name].js',
      sourceMapFilename: '[name].map',
      chunkFilename: '[id].chunk.js'
    },

    module: {
      /*
      https://github.com/stylelint/stylelint/issues/1676
      preLoaders: [
        { test: /\.(css)$/, loader: 'stylelint' }
      ],
      */
      loaders: [
        {
          test: /\.js$/,
          loader: 'babel?cacheDirectory',
          exclude: /(node_modules\/)/
        },
        {
          test: /\.(png|woff|woff2|eot|ttf|svg|jpeg|jpg|gif)$/,
          loader: 'url',
          query: {
            limit: '100000'
          }
        },
        {
          test: /\.css/,
          loader: 'style!css?sourceMap!postcss?sourceMap',
          /*
          loader: 'style!css?sourceMap!csslint!postcss?sourceMap',
          loader: 'style-loader!css-loader?modules&importLoaders=1!postcss-loader'
          loader: ExtractTextPlugin.extract({
            fallbackLoader: 'style',
            loader: 'css?sourceMap!postcss?sourceMap'
          })
          */
        }
      ]
    },

    plugins: [
      new webpack.HotModuleReplacementPlugin(),

      new webpack.optimize.CommonsChunkPlugin({
        name: ['vendor', 'polyfills'],
        minChunks: Infinity
      }),

      new CopyWebpackPlugin([
        {
          from: 'src/assets',
          to: 'assets'
        }
      ]),

      new webpack.DefinePlugin({
        'APP_VERSION': VERSION
      })
    ],

    postcss: function(webpack) {
      return [
        nested,
        cssnext(),
        stylelint(),
        reporter({ clearMessages: true })
      ];
    }

  }

};

module.exports = webpackConfig;
