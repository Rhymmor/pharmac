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

export {bytes}