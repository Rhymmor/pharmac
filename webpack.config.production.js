var webpack = require('webpack');
var config = require('./webpack.config');
var MinifyPlugin = require("babel-minify-webpack-plugin");

var frontend = config[0];
frontend.devtool = 'none';
frontend.plugins.push(
    new webpack.DefinePlugin({
        'process.env': {
            'BABEL_ENV': JSON.stringify('production'),
            'NODE_ENV': JSON.stringify('production'),
        }
    }),
    new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false
    }),
    new MinifyPlugin({deadcode: true, evaluate: true, mangle: true})
);


module.exports = config

