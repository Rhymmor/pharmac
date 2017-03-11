var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin');

var path = require('path');

var node_modules = path.resolve(path.join(__dirname, 'node_modules'));

var frontend = {
    entry: {
        app: "./src/client/main.tsx",
        vendor: [
            // ui
            "chart.js",
            "react",
            "react-dom",
            "react-dropzone",
            "react-router",
            "react-chartjs-2",
            "react-bootstrap",
            "react-bootstrap-table",
            // utils
            "lodash", "jquery",
            "redux", "redux-thunk", "react-redux",
            "core-decorators",
            "classnames",
            // dependencies - we don't explicitly use them in web
            "tether",
            "history",
            "moment",
            "joi",
            "lodash.find",
            "lodash.merge",
            "lodash.padstart",
            "lodash.repeat",
            "sprintf-js",
            "bootstrap",
            "toastr",
            "toastr/package/toastr.css",
            "validator",
            "ip-address",
        ],
    },
    output: {
        path: path.resolve(__dirname, "browser-bundle/"),
        publicPath: '/',
        filename: "[name].js",
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    resolve: {
        extensions: [".js", ".ts", ".tsx"],
        modules: ['src', node_modules],

        alias: {
            //'lodash': path.resolve(path.join(__dirname, 'node_modules', 'lodash'))
        },
    },

    node: {
        dns: 'mock',
        net: 'mock'
    },

    module: {
        loaders: [
            {
                test: /\.tsx?$/,
                loader: "ts-loader",
                options: {
                    compilerOptions: {
                        "target": "es2015",
                    }
                }
            },
            { test: /\.css$/, loader: "style-loader!css-loader" },
            { test: /\.scss$/, loaders: [ 'style-loader', 'css-loader', 'sass-loader' ] },
            { test: /\.less$/, loaders: [ 'style-loader', 'css-loader', 'less-loader' ] },
            { test: /\.(ttf|eot|svg|woff2?)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" },
            { test: /\.json$/, loader: "json-loader" },
        ]
    },

    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: "vendor",
	    filename: "[name].js",
            minChunks: 2,
        }),

        new webpack.ProvidePlugin({
          '$':             'jquery',
          'jQuery':        'jquery',
          'window.jQuery': 'jquery',
          '_':             'lodash',
          'toastr':        'toastr',
          'ReactDOM':      'react-dom',
          "window.Tether": 'tether',
        }),
        new webpack.ProvidePlugin({
            bootstrap: "bootstrap.css",
        }),
        new HtmlWebpackPlugin({
            template: 'src/client/index.html'
        }),
    ],

    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    /*
    externals: {
        "react": "React",
        "react-dom": "ReactDOM",
    },
    */
};

module.exports = [
    frontend
]

