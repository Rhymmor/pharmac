import * as _ from 'lodash';

export function cutFraction(value: number, count = 3) {
    const parts = String(value).split('.');
    if (parts.length < 2) {
        return value;
    }
    const fractionParts = parts[1].split('e');
    if (fractionParts.length < 2) {
        return value;
    }
    fractionParts[0] = fractionParts[0].slice(0, count);
    return parseFloat(parts[0] + '.' + fractionParts.join('e'));
}

export function round(value: number, precision: number) {
    if (_.isFinite(value) && _.isInteger(precision)) {
        return Number(Math.round(+(value+'e'+precision))+'e'+(-precision));
    }
    return null;
}

export function withCapital(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export function safeEval<TResult>(evalFunc: ()=>TResult, defaultVal?: TResult) {
    try {
        const res = evalFunc();
        return res !== undefined ? res : defaultVal;
    } catch (e) {
        return defaultVal;
    }
}

export function safeGet<TSrc, TResult>(source: TSrc, mapFunc: (v: TSrc)=>TResult, defaultVal?: TResult) {
    try {
        const res = mapFunc(source);
        return res !== undefined ? res : defaultVal;
    } catch (e) {
        return defaultVal;
    }
}

export type UseKeys<K, T> = {
    [keys in keyof K]: T;
}

export type UseStrings<K extends string, T> = {
    [keys in K]: T;
}

export type Enum<S extends string> = {
    readonly [key in S]: key;
}

export function tryParseJSON(text: string, handleError?: Function) {
    try {
        return JSON.parse(text);
    } catch (e) {
        handleError(e);
    }
}

export function isOk<T>(obj: T) {
    return obj !== undefined && obj !== null;
}