"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const logger_1 = require("./modules/logger");
const express = require("express");
const path = require("path");
const bodyParser = require('body-parser');
const compression = require('compression');
const database_1 = require("./database/database");
const router_1 = require("./rest/router");
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        // Synchronize DB
        yield database_1.synchronize();
        // Migrate DB
        yield database_1.migrate();
        const app = express();
        const project_root = process.cwd();
        logger_1.logger.info(`Root: ${project_root}`);
        app.use(bodyParser.json({ limit: '1024mb' })); // for parsing application/json
        app.use(compression());
        // API
        app.use(router_1.router);
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
        logger_1.logger.notice(`Server started on http://localhost:${port}`);
    });
}
main();
//# sourceMappingURL=main.js.map