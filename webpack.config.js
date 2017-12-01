var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin');
var LodashModuleReplacementPlugin = require('lodash-webpack-plugin') 

var path = require('path');

var node_modules = path.resolve(path.join(__dirname, 'node_modules'));
let babelOptions = {
    "presets": ["es2015", "stage-0"],
    "plugins": ["lodash", 'recharts']
};

var frontend = {
    entry: {
        app: "./src/client/main.tsx",
        vendor: [
            // ui
            "react",
            "react-dom",
            "react-dropzone",
            "react-router",
            "react-bootstrap",
            // utils
            "lodash", "jquery",
            "redux", "redux-thunk", "react-redux",
            "classnames",
            // dependencies - we don't explicitly use them in web
            "history",
            "joi",
            "sprintf-js",
            "bootstrap",
        ],
    },
    output: {
        path: path.resolve(__dirname, "browser-bundle/"),
        publicPath: '/',
        filename: "[name].js",
        chunkFilename: '[name].js',        
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    resolve: {
        extensions: [".js", ".ts", ".tsx"],
        modules: ['src', node_modules]
    },

    node: {
        dns: 'mock',
        net: 'mock'
    },

    module: {
        rules: [
            {
                test: /\.ts(x?)$/,
                exclude: /node_modules/,
                use: [
                    { loader: 'ts-loader' }
                ]
            }, 
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [{ loader: 'babel-loader', options: babelOptions }]
            },
            {
                test: /\.css$/,
                use: [{ loader: 'style-loader!css-loader' }]
            },
            {
                test: /\.scss$/,
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader' },
                    { loader: 'sass-loader' }
                ]
            },
            {
                test: /\.less$/,
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader' },
                    { loader: 'less-loader' }
                ]
            },
            {
                test: /\.(ttf|eot|svg|woff2?)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: [{ loader: 'file-loader' }]
            },
            {
                test: /\.json$/,
                use: [{ loader: 'json-loader' }]
            },
            {
                test: /\.(png|jpg)$/,
                use: [{ loader: 'url-loader' }]
            },
        ]
    },

    plugins: [
        new LodashModuleReplacementPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: "vendor",
	        filename: "[name].js",
            minChunks: Infinity,
        }),

        new webpack.ProvidePlugin({
          '$':             'jquery',
          'jQuery':        'jquery',
          'window.jQuery': 'jquery',
          '_':             'lodash',
          'ReactDOM':      'react-dom',
        }),
        new webpack.ProvidePlugin({
            bootstrap: "bootstrap.css",
        }),
        new HtmlWebpackPlugin({
            template: 'src/client/index.html'
        }),
        new webpack.optimize.ModuleConcatenationPlugin()        
    ]
};

module.exports = [
    frontend
]

