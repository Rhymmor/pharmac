var webpack = require('webpack');
var config = require('./webpack.config');
var WebpackShellPlugin = require('webpack-shell-plugin');

var frontend = config[0];
frontend.devtool = 'cheap-module-source-map';
// TODO: replace with tsc -> js -> babel rules
frontend.plugins.push(
    new WebpackShellPlugin({
        onBuildEnd: ['sh scripts/compile-browser-bundle-js.sh']
    }),
    new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify('production')
        }
    })
);

// async/await polyfill
var vendor = frontend.entry.vendor;
vendor.unshift('babel-polyfill')


module.exports = config

