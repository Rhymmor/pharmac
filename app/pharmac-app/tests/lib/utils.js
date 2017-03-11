"use strict";
const helper_1 = require("../helper");
const utils_1 = require("../../src/lib/utils");
describe('Utils functions', () => {
    before(helper_1.dbInit);
    it("should round", () => {
        helper_1.expect(utils_1.round(1.501, 2)).to.equals(1.50);
        helper_1.expect(utils_1.round(-2.333, 0)).to.equals(-2);
        helper_1.expect(utils_1.round(13, -1)).to.equals(10);
    });
    it("shouldn't round", () => {
        helper_1.expect(utils_1.round(2.3, 2.3)).to.equals(null);
        helper_1.expect(utils_1.round(-Infinity, 2)).to.equals(null);
        helper_1.expect(utils_1.round(Infinity, 2)).to.equals(null);
        helper_1.expect(utils_1.round(NaN, 2)).to.equals(null);
        helper_1.expect(utils_1.round(null, 2)).to.equals(null);
        helper_1.expect(utils_1.round(undefined, 2)).to.equals(null);
    });
    it("should format bytes", () => {
        helper_1.expect(utils_1.formatBytes(1)).to.equals('1 B');
        helper_1.expect(utils_1.formatBytes(1023)).to.equals('1023 B');
        helper_1.expect(utils_1.formatBytes(1024)).to.equals('1 kB');
        helper_1.expect(utils_1.formatBytes(1024 * 1024)).to.equals('1 MB');
        helper_1.expect(utils_1.formatBytes(1024 * 1.5)).to.equals('1.5 kB');
    });
    it("shouldn't format bytes", () => {
        helper_1.expect(utils_1.formatBytes(undefined)).to.be.null;
        helper_1.expect(utils_1.formatBytes(null)).to.be.null;
        helper_1.expect(utils_1.formatBytes(NaN)).to.be.null;
        helper_1.expect(utils_1.formatBytes(Infinity)).to.be.null;
    });
});
//# sourceMappingURL=utils.js.map