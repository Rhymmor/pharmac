const winston = require('winston');

import { LogLevels, Logger, LogTypes, logType, logSide } from '../../lib/logger';

const logLevels: LogLevels<LogTypes> = {
    trace: 'trace',
    debug: 'debug',
    info: 'info',
    warn: 'warn',
    error: 'error',
    fatal: 'fatal'
};

const winstonLogger = new winston.Logger({
    transports: [
        new (winston.transports.Console)({
        colorize: 'all',
        timestamp: function() {return (new Date()).toLocaleString(); }
        })
    ]
});
winstonLogger.setLevels({ fatal: 0, error: 1, warn: 2, info: 3, debug: 4, trace: 5 });
winstonLogger.level = logLevels.debug;

export const backendLogger: Logger = {
    trace: (message: string) => {
        winstonLogger.trace(message);
    },
    debug: (message: string) => {
        winstonLogger.debug(message);
    },
    info: (message: string) => {
        winstonLogger.info(message);
    },
    warn: (message: string) => {
        winstonLogger.warn(message);
    },
    error: (message: string) => {
        winstonLogger.error(message);
    },
    fatal: (message: string) => {
        winstonLogger.error(message);
    },
    setLevel: (level: LogTypes) => {
        winstonLogger.level = logLevels[level];
    }
};
