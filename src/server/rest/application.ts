// application API: version, update, maintanance functions

import {Router} from 'express'
import os = require('os');
export const app_router = Router();

app_router.get('/api/version', (req, res) => {
    res.json({
        application: "pharmac",
        version: "1.0.0",
        platform: `${os.platform()} ${os.arch()}`,
    });
});
