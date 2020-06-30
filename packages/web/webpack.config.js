const webpackConfig = require('@Streeterxs/webpack');
const merge = require('webpack-merge');

module.exports = merge(webpackConfig, {
  entry: './src/App.tsx'
});