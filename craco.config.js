const Dotenv = require('dotenv-webpack');
const path = require('path');
const webpack = require('webpack');

module.exports = {
  // babel: {
  //   presets: [
  //     [
  //       '@babel/preset-env',
  //       {
  //         targets: {
  //           browsers: 'last 2 versions',
  //         },
  //         modules: false,
  //         // loose: true,
  //         exclude: ['transform-async-to-generator'],
  //       },
  //     ],
  //     // ['@babel/plugin-transform-private-property-in-object', { loose: true }],
  //     [
  //       '@babel/preset-react',
  //       {
  //         throwIfNamespace: false,
  //       },
  //     ],
  //   ],
  //   plugins: [
  //     ['@babel/plugin-transform-private-property-in-object', { loose: true }],
  //     ['@babel/plugin-transform-class-properties', { loose: true }],
  //     ['@babel/plugin-transform-private-methods', { loose: true }],
  //     // '@babel/plugin-proposal-numeric-separator',
  //     // '@babel/plugin-transform-modules-commonjs',
  //     [
  //       '@babel/plugin-transform-react-jsx',
  //       {
  //         throwIfNamespace: false,
  //       },
  //     ],
  //   ],
  //   loaderOptions: (babelLoaderOptions, { env, paths }) => {
  //     return babelLoaderOptions;
  //   },
  // },
  webpack: {
    plugins: {
      add: [
        new Dotenv(),
        // new webpack.ProvidePlugin({
        //   process: 'process/browser',
        // }),
      ],
    },
    configure: (webpackConfig, { env, paths }) => {
      webpackConfig.resolve.fallback = {
        stream: require.resolve('stream-browserify'),
        crypto: require.resolve('crypto-browserify'),
        http: require.resolve('stream-http'),
        https: require.resolve('https-browserify'),
        os: require.resolve('os-browserify/browser'),
        buffer: require.resolve('buffer'),
      };
      webpackConfig.plugins = (webpackConfig.plugins || []).concat([
        new webpack.ProvidePlugin({
          process: 'process/browser',
          Buffer: ['buffer', 'Buffer'],
        }),
      ]);
      return webpackConfig;
    },
  },
  eslint: {
    enable: false,
  },
};
