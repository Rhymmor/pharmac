import log4javascript = require('log4javascript');

import { LogLevels, Logger, LogTypes } from '../lib/logger';

const logLevels: LogLevels<log4javascript.Level> = {
    trace: log4javascript.Level.TRACE,
    debug: log4javascript.Level.DEBUG,
    info: log4javascript.Level.INFO,
    warn: log4javascript.Level.WARN,
    error: log4javascript.Level.ERROR,
    fatal: log4javascript.Level.FATAL
};

const jsLogger = log4javascript.getLogger("browser-logger");
const appender = new log4javascript.BrowserConsoleAppender();
const layout = new log4javascript.PatternLayout("[%p] %m");
appender.setLayout(layout);
jsLogger.addAppender(appender);
jsLogger.setLevel(log4javascript.Level.DEBUG);

export const browserLogger: Logger = {
    trace: (message: string) => {
        jsLogger.trace(message);
    },
    debug: (message: string) => {
        jsLogger.debug(message);
    },
    info: (message: string) => {
        jsLogger.info(message);
    },
    warn: (message: string) => {
        jsLogger.warn(message);
    },
    error: (message: string) => {
        jsLogger.error(message);
    },
    fatal: (message: string) => {
        jsLogger.error(message);
    },
    setLevel: (level: LogTypes) => {
        jsLogger.setLevel(logLevels[level]);
    }
};
