// application API: version, update, maintanance functions
"use strict";
const express_1 = require("express");
const os = require("os");
exports.app_router = express_1.Router();
exports.app_router.get('/api/version', (req, res) => {
    res.json({
        application: "pharmac",
        version: "1.0.0",
        platform: `${os.platform()} ${os.arch()}`,
    });
});
//# sourceMappingURL=application.js.map