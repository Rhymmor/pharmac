export type LogTypes = 'trace' | 'debug' | 'info' | 'warn' | 'error' | 'fatal';

export type LogLevels<T> = {
    [K in LogTypes]: T;
}

export const logType = Object.freeze<LogLevels<LogTypes>>({
    trace: 'trace',
    debug: 'debug',
    info: 'info',
    warn: 'warn',
    error: 'error',
    fatal: 'fatal'
});

export interface Logger {
    trace: (message: string) => void;
    debug: (message: string) => void;
    info: (message: string) => void;
    warn: (message: string) => void;
    error: (message: string) => void;
    fatal: (message: string) => void;
    setLevel: (level: LogTypes) => void;
}

export type LogSide = 'backend' | 'frontend' | 'agent';

export type LogSides<T> = {
    [K in LogSide]: T;
}

export const logSide = Object.freeze<LogSides<LogSide>>({
    backend: 'backend',
    frontend: 'frontend',
    agent: 'agent'
});

export interface ILogData {
    side: LogSide
    level: LogTypes
    message: string
}

const defaultLogger: Logger = {
    trace: (message: string) => {
        console.log(message);
    },
    debug: (message: string) => {
        console.log(message);
    },
    info: (message: string) => {
        console.log(message);
    },
    warn: (message: string) => {
        console.log(message);
    },
    error: (message: string) => {
        console.error(message);
    },
    fatal: (message: string) => {
        console.error(message);
    },
    setLevel: (level: LogTypes) => {
    }
}

export let logger = defaultLogger;

export function setGlobalLogger(newLogger: Logger) {
    logger = newLogger;
}
