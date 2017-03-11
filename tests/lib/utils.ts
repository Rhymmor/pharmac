import {expect, dbInit} from '../helper';
import {round, formatBytes} from '../../src/lib/utils'

describe('Utils functions', ()=>{
    before(dbInit);

    it("should round", () => {
        expect(round(1.501, 2)).to.equals(1.50);
        expect(round(-2.333, 0)).to.equals(-2);
        expect(round(13, -1)).to.equals(10);
    })

    it("shouldn't round", () => {
        expect(round(2.3, 2.3)).to.equals(null);
        expect(round(-Infinity, 2)).to.equals(null);
        expect(round(Infinity, 2)).to.equals(null);
        expect(round(NaN, 2)).to.equals(null);
        expect(round(null, 2)).to.equals(null);
        expect(round(undefined, 2)).to.equals(null);
    })

    it("should format bytes", () => {
        expect(formatBytes(1)).to.equals('1 B');
        expect(formatBytes(1023)).to.equals('1023 B');
        expect(formatBytes(1024)).to.equals('1 kB');
        expect(formatBytes(1024 * 1024)).to.equals('1 MB');
        expect(formatBytes(1024 * 1.5)).to.equals('1.5 kB');
    })

    it("shouldn't format bytes", () => {
        expect(formatBytes(undefined)).to.be.null;
        expect(formatBytes(null)).to.be.null;
        expect(formatBytes(NaN)).to.be.null;
        expect(formatBytes(Infinity)).to.be.null;
    })
});
