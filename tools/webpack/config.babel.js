const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const MinifyPlugin = require('babel-minify-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
const loaderUtils = require('loader-utils');

const nodeEnv = process.env.NODE_ENV || 'development';
const isDev = nodeEnv === 'development';
const webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(
  require('./WIT.config')
).development(isDev);

// Disable CSSModules here
const CSSModules = true;
// Enable build process terminated while there's an eslint error
const eslint = false;
// Enable build process terminated while there's a stylelint error
const stylelint = false;

// Setup the plugins for development/prodcution
const getPlugins = () => {
  // Common
  const plugins = [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks(module) {
        return module.context && module.context.indexOf('node_modules') !== -1;
      }
    }),
    new ExtractTextPlugin({
      filename: '[name].[contenthash:8].css',
      allChunks: true,
      disable: isDev // Disable css extracting on development
    }),
    new webpack.LoaderOptionsPlugin({
      options: {
        // Javascript lint
        eslint: { failOnError: eslint },
        debug: isDev,
        minimize: !isDev
      }
    }),
    // Style lint
    new StyleLintPlugin({ failOnError: stylelint }),
    // Setup enviorment variables for client
    new webpack.EnvironmentPlugin({
      NODE_ENV: JSON.stringify(nodeEnv),
      BASE_URL: JSON.stringify('http://api.getcoins.ca/api/')
    }),
    // Setup global variables for client
    new webpack.DefinePlugin({
      __CLIENT__: true,
      __SERVER__: false,
      __DEV__: isDev
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    webpackIsomorphicToolsPlugin
  ];

  if (isDev) {
    // Development
    plugins.push(
      new webpack.HotModuleReplacementPlugin(),
      // Prints more readable module names in the browser console on HMR updates
      new webpack.NamedModulesPlugin(),
      new webpack.IgnorePlugin(/webpack-stats\.json$/)
    );
  } else {
    plugins.push(
      // Production
      new MinifyPlugin({}, { test: /\.jsx?$/, comments: false }),
      new webpack.HashedModuleIdsPlugin(),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        minChunks: Infinity
      }),
      new webpack.optimize.ModuleConcatenationPlugin(),
      new CompressionPlugin({
        asset: '[path].gz[query]',
        algorithm: 'gzip',
        test: /\.jsx?$|\.css$|\.(scss|sass)$|\.html$/,
        threshold: 10240,
        minRatio: 0.8
      }),
      // Visualize all of the webpack bundles
      // Check "https://github.com/webpack-contrib/webpack-bundle-analyzer#options-for-plugin"
      // for more configurations
      new BundleAnalyzerPlugin({
        analyzerMode: process.env.NODE_ENV === 'stats' ? 'server' : 'disabled'
      })
    );
  }

  return plugins;
};

// Setup the entry for development/prodcution
const getEntry = () => {
  // Development
  const entry = [
    // Allows you to use the full set of ES6 features on client-side (place it before anything else)
    'babel-polyfill',
    './src/client.js'
  ];

  if (isDev) {
    entry.push('webpack-hot-middleware/client?reload=true');
  }

  return entry;
};

// Webpack configuration
module.exports = {
  name: 'client',
  target: 'web',
  cache: isDev,
  devtool: isDev ? 'eval-source-map' : 'cheap-module-source-map',
  context: path.resolve(process.cwd()),
  entry: getEntry(),
  output: {
    path: path.resolve(process.cwd(), 'public/assets'),
    publicPath: '/assets/',
    // Don't use chunkhash in development it will increase compilation time
    filename: isDev ? '[name].js' : '[name].[chunkhash:8].js',
    chunkFilename: isDev ? '[name].chunk.js' : '[name].[chunkhash:8].chunk.js',
    pathinfo: isDev
  },
  module: {
    rules: [
      // {
      //   test: /\.jsx?$/,
      //   enforce: 'pre',
      //   exclude: /node_modules/,
      //   loader: 'eslint'
      // },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel',
        options: {
          cacheDirectory: isDev,
          babelrc: false,
          presets: [
            ['env', { modules: false, useBuiltIns: true }],
            'react',
            'stage-0',
            'flow'
          ],
          plugins: [
            'react-hot-loader/babel',
            'loadable-components/babel',
            'lodash'
          ],
          env: { production: { plugins: ['transform-remove-console'] } }
        }
      },
      {
        test: /\.css$/,
        exclude: /\.module\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style',
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
                importLoaders: 1,
                minimize: !isDev
              }
            },
            'postcss'
          ]
        })
      },

      {
        test: /\.module\.css$/,
        // exclude: path.resolve(process.cwd(), 'src/css'),
        loader: ExtractTextPlugin.extract({
          fallback: 'style',
          use: [
            {
              loader: 'css',
              options: {
                importLoaders: 1,
                sourceMap: true,
                modules: CSSModules,
                context: path.resolve(process.cwd(), 'src'),
                getLocalIdent: (
                  context,
                  localIdentName,
                  localName,
                  options
                ) => {
                  // Use the filename or folder name, based on some uses the index.js / index.module.css project style
                  const fileNameOrFolder = context.resourcePath.endsWith(
                    'index.module.css'
                  )
                    ? '[folder]'
                    : '[name]';
                  // Create a hash based on a the file location and class name. Will be unique across a project, and close to globally unique.
                  const hash = loaderUtils.getHashDigest(
                    context.resourcePath + localName,
                    'md5',
                    'base64',
                    5
                  );
                  // Use loaderUtils to find the file or folder name
                  const className = loaderUtils.interpolateName(
                    context,
                    `${fileNameOrFolder}_${localName}__${hash}`,
                    options
                  );
                  // remove the .module that appears in every classname when based on the file.
                  return className.replace('.module_', '_');
                },
                minimize: !isDev
              }
            },
            { loader: 'postcss', options: { sourceMap: true } }
          ]
        })
      },
      {
        test: /\.(scss|sass)$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style',
          use: [
            {
              loader: 'css',
              options: {
                importLoaders: 2,
                sourceMap: true,
                modules: CSSModules,
                context: path.resolve(process.cwd(), 'src'),
                localIdentName: '[name]__[local]__[hash:base64:5]',
                minimize: !isDev
              }
            },
            { loader: 'postcss', options: { sourceMap: true } },
            {
              loader: 'sass',
              options: {
                outputStyle: 'expanded',
                sourceMap: true,
                sourceMapContents: !isDev
              }
            }
          ]
        })
      },
      {
        test: /\.(woff2?|ttf|eot|svg)$/,
        loader: 'url',
        options: { limit: 10000 }
      },
      {
        test: webpackIsomorphicToolsPlugin.regular_expression('images'),
        // Any image below or equal to 10K will be converted to inline base64 instead
        use: [
          {
            loader: 'url',
            options: { limit: 10240 }
          },
          // Using for image optimization
          {
            loader: 'image-webpack',
            options: { bypassOnDebug: true }
          }
        ]
      }
    ]
  },
  plugins: getPlugins(),
  resolveLoader: {
    // Use loaders without the -loader suffix
    moduleExtensions: ['-loader']
  },
  resolve: {
    modules: ['src', 'node_modules'],
    descriptionFiles: ['package.json'],
    extensions: ['.js', '.jsx', '.json']
  },
  // Some libraries import Node modules but don't use them in the browser.
  // Tell Webpack to provide empty mocks for them so importing them works.
  // https://webpack.github.io/docs/configuration.html#node
  // https://github.com/webpack/node-libs-browser/tree/master/mock
  node: {
    fs: 'empty',
    vm: 'empty',
    net: 'empty',
    tls: 'empty'
  }
};
