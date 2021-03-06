"use strict";
const path = require('path');
const express = require('express');
const proxy = require('http-proxy-middleware');
const compression = require('compression');

function run_fork() {
    const port = process.env.PORT || 5000;
    const app = express();
    
    app.use(compression());
    
    const projectPath = path.dirname(path.dirname(__dirname));
    const staticPath = path.join(projectPath, 'browser-bundle');
    app.use(express.static(staticPath));
    app.use('/api', proxy({target: 'http://localhost:3000'}));
    app.get('*', (req, res) => {
      res.sendFile(path.join(projectPath, '/browser-bundle', 'index.html'));
    });

    app.listen(port, (err) => {
        if (err) {
            console.log(err);
        }
        console.info('==> 🌎 Listening on port %s. Open up http://0.0.0.0:%s/ in your browser.', port, port);
    });
}

module.exports = run_fork;