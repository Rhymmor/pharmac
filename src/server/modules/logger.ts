// common logger instance. use it instead of console.log

import winston = require('winston');

export const logger = new winston.Logger({
  transports: [
    new (winston.transports.Console)({
      colorize: 'all',
      timestamp: function() {return (new Date()).toLocaleString(); }
    })
  ]
});

logger.setLevels(winston.config.syslog.levels);
