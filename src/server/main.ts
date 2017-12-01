import { ConnectionOptions } from 'typeorm/connection/ConnectionOptions';
import { Parameter } from './database/entity/parameter';
import { Formula } from './database/entity/formula';
import { Model } from './database/entity/model';
import { logger, setGlobalLogger } from '../lib/logger';
import { backendLogger } from './modules/backend-logger';
import express = require('express');
import * as path from 'path';
const bodyParser = require('body-parser');
const compression = require('compression');
import { router } from "./rest/router";
import {createConnection} from "typeorm";
import {join} from 'path';

const dbUrl = process.env.MONGODB_URI;

const connectionConfig: ConnectionOptions = {
    "type": "mongodb",
    "url": dbUrl,
    "host": !dbUrl ? "localhost" : undefined,
    "database": "test",
    "synchronize": true,
    "logging": false,
    entities: [
        `${__dirname}/database/entity/*`
    ],
    "cli": {
      "entitiesDir": "src/server/database/entity"
    }
}

async function main() {
    setGlobalLogger(backendLogger);

    createConnection(connectionConfig).then(async connection => {
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
    
        const port = '3000';
        app.listen(port);
        logger.warn(`Server started on http://localhost:${port}`);

    }).catch(error => logger.error(`TypeORM connection error: ${error}`));
}

main();
