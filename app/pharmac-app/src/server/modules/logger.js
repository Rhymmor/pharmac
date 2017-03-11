// common logger instance. use it instead of console.log
"use strict";
const winston = require("winston");
exports.logger = new winston.Logger({
    transports: [
        new (winston.transports.Console)({
            colorize: 'all',
            timestamp: function () { return (new Date()).toLocaleString(); }
        })
    ]
});
exports.logger.setLevels(winston.config.syslog.levels);
//# sourceMappingURL=logger.js.map