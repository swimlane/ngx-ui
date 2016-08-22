var path = require('path');

// Webpack
var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var WebpackNotifierPlugin = require('webpack-notifier');

// PostCSS
var autoprefixer = require('autoprefixer');

// Utils
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
      bootstrap: './src/demo/bootstrap.js',
      vendor: './src/demo/vendor.js',
      polyfills: './src/demo/polyfills.js'
    },

    devServer: {
      outputPath: root('dist'),
      watchOptions: {
        poll: true
      },
      port: 9999,
      hot: options.HMR,
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
          loaders: [
            'babel?cacheDirectory',
            '@angularclass/hmr-loader'
          ],
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
          loader: 'style!css?sourceMap'
        },
        {
          test: /\.scss$/,
          loaders: [
            'style',
            'css',
            'postcss?sourceMap',
            'sass?sourceMap'
          ]
        },
        {
          test: /icons-font.js/,
          loaders: ['style', 'css', 'fontgen']
        },
        {
          test: /\.html$/,
          loader: 'raw'
        }
      ]
    },

    plugins: [
      new webpack.HotModuleReplacementPlugin(),

      new webpack.NamedModulesPlugin(),

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
        'APP_VERSION': VERSION,
        'HMR': options.HMR
      }),

      new WebpackNotifierPlugin({
        alwaysNotify: true
      })
    ],

    sassLoader: {
      includePaths: [
        root('src', 'common', 'styles')
      ]
    },

    postcss: function() {
      return [ autoprefixer ];
    }

  }

};

module.exports = webpackConfig;
