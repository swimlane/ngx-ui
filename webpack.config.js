var path = require('path');

// Webpack
var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var WebpackNotifierPlugin = require('webpack-notifier');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin;

// PostCSS
var autoprefixer = require('autoprefixer');

// Constants
var pkg = require('./package.json');
var VERSION = JSON.stringify(pkg.version);
var ENV = process.env.NODE_ENV;
var IS_PRODUCTION = ENV === 'production';
var IS_PKG_BUILD = ENV === 'package';
var DEPS = JSON.stringify(pkg.dependencies);

// Utils
function root(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [__dirname].concat(args));
}

var BANNER =
`/**
 * swui v${VERSION} (https://github.com/swimlane/swui)
 * Copyright 2016
 */`;

function webpackConfig(options = {}) {

  var IS_HMR = options.HMR;

  var config = {
    context: root(),
    devtool: IS_PRODUCTION || IS_PKG_BUILD  ?
      'source-map' : 'eval-source-map',

    resolve: {
      extensions: ['.js', '.ts', '.json', '.css', '.scss', '.html'],
      modules: [
        'node_modules',
        root('src')
      ]
    },

    entry: {
      bootstrap: './demo/bootstrap.ts',
      vendor: './demo/vendor.ts',
      polyfills: './demo/polyfills.ts'
    },

    devServer: {
      outputPath: root('dist'),
      watchOptions: {
        poll: true
      },
      port: 9999,
      hot: IS_HMR,
      inject: true,
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
      exprContextCritical: false,
      rules: [
        {
          enforce: 'pre',
          test: /\.js$/,
          loader: 'source-map',
          exclude: /(node_modules)/
        },
        {
          enforce: 'pre',
          test: /\.ts$/,
          loader: 'tslint',
          exclude: /(node_modules|release|dist)/
        },
        {
          test: /\.ts$/,
          loaders: [
            'awesome-typescript-loader',
            '@angularclass/hmr-loader'
          ],
          exclude: /(node_modules\/)/
        },
        {
          test: /\.(png|woff|woff2|eot|ttf|svg|jpeg|jpg|gif)$/,
          loader: 'file'
        },
        {
          test: /\.css/,
          loader:
            IS_HMR ?
              'style!css?sourceMap' :
              ExtractTextPlugin.extract({
                fallbackLoader: 'style',
                loader: !IS_PRODUCTION && !IS_PKG_BUILD ?
                  'css?sourceMap' :
                  'css?sourceMap&minimize'
              })
        },
        {
          test: /\.scss$/,
          loader:
            IS_HMR ?
              'style!css!postcss?sourceMap!sass?sourceMap' :
              ExtractTextPlugin.extract({
                fallbackLoader: 'style',
                loader: !IS_PRODUCTION && !IS_PKG_BUILD ?
                  'css?sourceMap!postcss?sourceMap!sass?sourceMap' :
                  'css?sourceMap&minimize!postcss?sourceMap!sass?sourceMap'
              })
        },
        {
          test: /\.html$/,
          loader: 'raw'
        },
        {
          test: /\.json/,
          loader: 'json'
        }
      ]
    },

    plugins: [

      new ForkCheckerPlugin(),

      new webpack.NamedModulesPlugin(),

      // https://github.com/angular/angular/issues/11580#issuecomment-246880731
      new webpack.ContextReplacementPlugin(
        // The (\\|\/) piece accounts for path separators in *nix and Windows
        /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
        root('src') // location of your src
      ),

      new CopyWebpackPlugin([
        {
          from: 'src/assets',
          to: 'assets'
        },{
          from: 'src/styles',
          to: 'styles'
        }
      ]),

      new webpack.DefinePlugin({
        'APP_VERSION': VERSION,
        'HMR': options.HMR,
        'ENV': ENV,
        'DEPS': DEPS
      }),

      new WebpackNotifierPlugin({
        alwaysNotify: true
      }),

      new HtmlWebpackPlugin({
        template: 'src/index.html',
        chunksSortMode: 'dependency',
        title: 'swui'
  		}),

      new webpack.LoaderOptionsPlugin({
        options: {
          context: root(),
          tslint: {
            emitErrors: false,
            failOnHint: false,
            resourcePath: 'src'
          },
          sassLoader: {
            includePaths: [
              root('src', 'styles'),
              root('src', 'assets')
            ]
          },
          postcss: function() {
            return [ autoprefixer ];
          }
        }
      })
    ]
  };

  if(IS_HMR) {
    config.plugins.push(new webpack.HotModuleReplacementPlugin());
  } else {
    config.plugins.push(new CleanWebpackPlugin(['dist', 'release'], {
      root: root(),
      verbose: false,
      dry: false
    }));

    config.plugins.push(new ExtractTextPlugin({
      filename: '[name].css',
      allChunks: true
    }));
  }

  if(IS_PKG_BUILD) {
    config.entry = {
      'index': './src/index.ts'
    };

    config.output.path = root('release');
    config.output.libraryTarget = 'umd';
    config.output.library = 'swui';
    config.output.umdNamedDefine = true;
    config.externals = {
      '@angular/platform-browser-dynamic': '@angular/platform-browser-dynamic',
      '@angular/platform-browser': '@angular/platform-browser',
      '@angular/core': '@angular/core',
      '@angular/common': '@angular/common',
      '@angular/forms': '@angular/forms',
      'core-js': 'core-js',
      'rxjs': 'rxjs',
      'zone.js/dist/zone': 'zone.js/dist/zone'
    };

    config.plugins.push(new webpack.BannerPlugin({
      banner: BANNER,
      raw: true,
      entryOnly: true
    }));
  } else {
    config.plugins.push(new webpack.optimize.CommonsChunkPlugin({
      name: ['vendor', 'polyfills'],
      minChunks: Infinity
    }));
  }

  return config;
};

module.exports = webpackConfig;
