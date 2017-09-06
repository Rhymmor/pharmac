const path = require('path');
const express = require('express');

const port = process.env.PORT || 3000;
const app = express();

const staticPath = path.join(path.dirname(__dirname), 'browser-bundle');
console.log(staticPath)
app.use(express.static(staticPath));

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  }
  console.info('==> 🌎 Listening on port %s. Open up http://0.0.0.0:%s/ in your browser.', port, port);
});