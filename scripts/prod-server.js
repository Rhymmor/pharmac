const path = require('path');
const express = require('express');
const proxy = require('http-proxy-middleware');

const port = process.env.PORT || 5000;
const app = express();

const staticPath = path.join(path.dirname(__dirname), 'browser-bundle');
app.use(express.static(staticPath));
app.use('/api', proxy({target: 'http://localhost:3000'}))

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  }
  console.info('==> 🌎 Listening on port %s. Open up http://0.0.0.0:%s/ in your browser.', port, port);
});