"use strict";
const shallowDOM = require('../dom');
shallowDOM('<html><body></body></html>');
const React = require("react");
const index_1 = require("../../../src/client/components/results/index");
const helper_1 = require("../../helper");
var jsdom = require('mocha-jsdom');
const enzyme_1 = require("enzyme");
const _ = require("lodash");
describe('<Summary/>', () => {
    jsdom({ skipWindowCheck: true });
    let wrapper;
    let summary;
    beforeEach(() => {
        wrapper = enzyme_1.shallow(React.createElement(index_1.Summary, { clientSummary: {} }));
        summary = wrapper.instance();
    });
    it("should get rounded percentage", () => {
        helper_1.expect(summary.getPercentage(99.999, 100)).to.equals('100%');
        helper_1.expect(summary.getPercentage(0, 123)).to.equals('0%');
        helper_1.expect(summary.getPercentage(1, 3)).to.equals('33.33%');
        helper_1.expect(summary.getPercentage(2, Infinity)).to.equals('0%');
    });
    it("shouldn't get percentage", () => {
        helper_1.expect(summary.getPercentage(1, 0)).to.equals('');
        helper_1.expect(summary.getPercentage(NaN, 2)).to.equals('');
        helper_1.expect(summary.getPercentage(Infinity, Infinity)).to.equals('');
    });
    it("should have 3 <SummaryCard/>", () => {
        const summaryCards = wrapper.find(index_1.SummaryCard);
        helper_1.expect(summaryCards.length).to.equals(3);
    });
    it("should have <SummaryCard/> with ok props", () => {
        const summaryCards = wrapper.find(index_1.SummaryCard);
        summaryCards.forEach((card) => {
            helper_1.expect(_.isFinite(card.props().number)).to.be.true;
            if (card.props().text !== "Total requests") {
                const percentNumber = parseFloat(card.props().percent);
                const isValid = card.props().percent == '' || _.isFinite(percentNumber);
                helper_1.expect(isValid).to.be.true;
            }
        });
    });
    it('should have <SummaryCard/> with proper percentage props', () => {
        const wrapperWithProps = enzyme_1.shallow(React.createElement(index_1.Summary, { clientSummary: { requests_total: 100, responses_total: 1, errors_total: 99 } }));
        const cardsTest = [
            {
                expected: '1%',
                text: 'Total responses'
            },
            {
                expected: '99%',
                text: 'Total errors'
            },
            {
                expected: undefined,
                text: 'Total requests'
            }
        ];
        const summaryCards = wrapperWithProps.find(index_1.SummaryCard);
        summaryCards.forEach((card) => {
            const index = _(cardsTest).map(test => test.text).indexOf(card.props().text);
            if (index >= 0) {
                helper_1.expect(card.props().percent).to.equals(cardsTest[index].expected);
            }
        });
    });
});
//# sourceMappingURL=summary.js.map