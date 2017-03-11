"use strict";
const _ = require("lodash");
const bytes = require("bytes");
exports.bytes = bytes;
function helloWorld() {
    console.log("Hello!");
}
exports.helloWorld = helloWorld;
function round(value, precision) {
    if (_.isFinite(value) && _.isInteger(precision)) {
        return Number(Math.round(+(value + 'e' + precision)) + 'e' + (-precision));
    }
    return null;
}
exports.round = round;
function formatBytes(amount) {
    return bytes.format(amount, { unitSeparator: " " });
}
exports.formatBytes = formatBytes;
function withCapital(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
exports.withCapital = withCapital;
//# sourceMappingURL=utils.js.map