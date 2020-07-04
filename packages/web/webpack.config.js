const webpackConfig = require('@Streeterxs/webpack');
const merge = require('webpack-merge');
const path = require('path');

module.exports = merge((() => {
    return webpackConfig;
})());
