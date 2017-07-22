import * as _ from 'lodash'
import * as bytes from 'bytes'

export function helloWorld() {
    console.log("Hello!");
}

export function round(value: number, precision: number) {
    if (_.isFinite(value) && _.isInteger(precision)) {
        return Number(Math.round(+(value+'e'+precision))+'e'+(-precision));
    }
    return null;
}

export function formatBytes(amount: number) {
    return bytes.format(amount, {unitSeparator: " "})
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

export {bytes}