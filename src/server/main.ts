import { logger } from './modules/logger';
import express = require('express');
import * as path from 'path';
const bodyParser = require('body-parser');
const compression = require('compression');

import { synchronize, migrate } from './database/database';
import { router } from "./rest/router";

async function main() {
    // Synchronize DB
    await synchronize();
    // Migrate DB
    await migrate();
    const app = express();

    const project_root = process.cwd();
    logger.info(`Root: ${project_root}`);

    app.use(bodyParser.json({limit: '1024mb'})); // for parsing application/json
    app.use(compression());

    // API
    app.use(router);

    // serve webpack-packed resources
    app.use('/', express.static(path.join(project_root, '/browser-bundle')));

    // serve static resources(like favicon)
    app.use('/', express.static(path.join(project_root, '/public')));

    // send index.html for html5 router
    app.get('*', (req, res) => {
        res.sendFile(path.join(project_root, '/browser-bundle', 'index.html'));
    });

    const port = process.env.PORT || '3000';
    app.listen(port);
    logger.notice(`Server started on http://localhost:${port}`);
}

main();
