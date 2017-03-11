var webpack = require("webpack");
var WebpackDevServer = require("webpack-dev-server");

var port = 8080;
var config = require("../webpack.config.js");

// enable inline mode. see https://webpack.github.io/docs/webpack-dev-server.html#inline-mode-with-node-js-api
var frontEndEntry = config[0];
var entry = frontEndEntry.entry;

entry['webpack_client'] =  "webpack-dev-server/client?http://localhost:" + port + "/";
entry['webpack_hot'] = "webpack/hot/dev-server";
frontEndEntry.plugins.push(new webpack.HotModuleReplacementPlugin());

var compiler = webpack(config);

console.log("Loading WebpackDevServer");

var server = new WebpackDevServer(compiler, {
  contentBase: "/dist",
  // Can also be an array, or: contentBase: "http://localhost/",
  //contentBase: "http://localhost:8080",

  // Enable special support for Hot Module Replacement(see 'inline' commend above)
  hot: true,

  // access dev server from arbitrary url for html5 router
  historyApiFallback: true,

  // Set this if you want to enable gzip compression for assets
  compress: false,

  // route /api calls to the API server (see https://github.com/webpack/webpack-dev-server/pull/127 )
  proxy: {
     "/api/**": "http://localhost:3000"
  },

  setup: function(app) {
    // express app custom handlers
  },

  // pass [static options](http://expressjs.com/en/4x/api.html#express.static) to inner express server
  staticOptions: {
  },

  clientLogLevel: "info",
  // Control the console log messages shown in the browser when using inline mode. Can be `error`, `warning`, `info` or `none`.

  // webpack-dev-middleware options
  quiet: false,
  noInfo: false,
  lazy: false,
  filename: "bundle.js",
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000
  },
  //publicPath: "/",
  headers: { "X-Custom-Header": "yes" },
  stats: { colors: true }
});

var base_url = "http://localhost:" + port;

server.listen(port, function() {
    console.log("Available entry routes:");
    console.log(base_url + "/");
    console.log(base_url + "/webpack-dev-server/");
});

