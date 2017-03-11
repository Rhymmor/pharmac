"use strict";
const shallowDOM = require('../dom');
shallowDOM('<html><body></body></html>');
const React = require("react");
const index_1 = require("../../../src/client/components/results/index");
const helper_1 = require("../../helper");
var jsdom = require('mocha-jsdom');
const enzyme_1 = require("enzyme");
describe('<GeneralInfo/>', () => {
    jsdom({ skipWindowCheck: true });
    let wrapper;
    let generalInfo;
    beforeEach(() => {
        wrapper = enzyme_1.shallow(React.createElement(index_1.GeneralInfo, { date_created: undefined, date_started: undefined, date_stopped: undefined, state: undefined }));
        generalInfo = wrapper.instance();
    });
    it("should get duration in ms", () => {
        const start = new Date('2016-01-01T00:00:00.000Z');
        const finish = new Date('2016-01-01T00:00:00.001Z');
        helper_1.expect(generalInfo.getDurationMs(start, finish)).to.eq(1);
        helper_1.expect(generalInfo.getDurationMs(start)).to.be.above(0);
    });
    it("shouldn't get duration in ms", () => {
        const finish = new Date('2016-01-01T00:00:00.001Z');
        helper_1.expect(generalInfo.getDurationMs(undefined, finish)).to.be.null;
        helper_1.expect(generalInfo.getDurationMs(null, finish)).to.be.null;
        helper_1.expect(generalInfo.getDurationMs(undefined)).to.be.null;
        helper_1.expect(generalInfo.getDurationMs(null)).to.be.null;
    });
    it("should get formatted duration", () => {
        const start = new Date('2016-01-01T00:00:00.000Z');
        const finish = new Date('2016-01-01T00:00:00.001Z');
        helper_1.expect(generalInfo.getFormattedDuration(start, finish)).to.eq('0h 0m 0sec');
        finish.setSeconds(2);
        helper_1.expect(generalInfo.getFormattedDuration(start, finish)).to.eq('0h 0m 2sec');
        finish.setMinutes(3);
        helper_1.expect(generalInfo.getFormattedDuration(start, finish)).to.eq('0h 3m 2sec');
        finish.setUTCHours(4);
        helper_1.expect(generalInfo.getFormattedDuration(start, finish)).to.eq('4h 3m 2sec');
    });
    it("shouldn't get formatted duration", () => {
        const finish = new Date('2016-01-01T00:00:00.001Z');
        helper_1.expect(generalInfo.getFormattedDuration(undefined, finish)).to.be.null;
        helper_1.expect(generalInfo.getFormattedDuration(null, finish)).to.be.null;
        helper_1.expect(generalInfo.getFormattedDuration(undefined)).to.be.null;
        helper_1.expect(generalInfo.getFormattedDuration(null)).to.be.null;
    });
    it('all <span/> should have text', () => {
        const spans = wrapper.find('span');
        spans.forEach((span) => {
            helper_1.expect(span.text()).to.be.not.empty;
        });
    });
});
//# sourceMappingURL=generalInfo.js.map