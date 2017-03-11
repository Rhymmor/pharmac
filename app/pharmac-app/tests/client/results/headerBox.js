"use strict";
const shallowDOM = require('../dom');
shallowDOM('<html><body></body></html>');
const React = require("react");
const index_1 = require("../../../src/client/components/results/index");
const helper_1 = require("../../helper");
var jsdom = require('mocha-jsdom');
const enzyme_1 = require("enzyme");
describe('<ResultsHeaderBox/>', () => {
    jsdom({ skipWindowCheck: true });
    let wrapper;
    let generalInfo;
    beforeEach(() => {
        wrapper = enzyme_1.shallow(React.createElement(index_1.ResultsHeaderBox, { showConfigs: undefined, testId: undefined, changeShowConfigsState: undefined }));
        generalInfo = wrapper.instance();
    });
    it("should have test label without brackets", () => {
        const expected = 'Test #1';
        helper_1.expect(generalInfo.getTestLabel(1, { label: '', note: '' })).to.eq(expected);
        helper_1.expect(generalInfo.getTestLabel(1, { label: undefined, note: undefined })).to.eq(expected);
        helper_1.expect(generalInfo.getTestLabel(1, undefined)).to.eq(expected);
    });
});
//# sourceMappingURL=headerBox.js.map