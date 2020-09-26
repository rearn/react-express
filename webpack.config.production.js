const merge = require('webpack-merge');
const webpackConfig = require('./webpack.config.js');

module.exports = merge.merge(webpackConfig, {
  mode: 'production',
});
