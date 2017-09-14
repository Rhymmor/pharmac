import {expect, dbInit} from '../helper';
import {round} from '../../src/lib/utils'

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
});
