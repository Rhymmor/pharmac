"use strict";
const shallowDOM = require('../dom');
shallowDOM('<html><body></body></html>');
const React = require("react");
const alerts_1 = require("../../../src/client/components/tests/alerts");
const nodes_interfaces_1 = require("../../../src/lib/model/nodes_interfaces");
const helper_1 = require("../../helper");
var jsdom = require('mocha-jsdom');
const enzyme_1 = require("enzyme");
const _ = require("lodash");
describe('<TestAlerts/>', () => {
    jsdom({ skipWindowCheck: true });
    let wrapper;
    let testAlerts;
    beforeEach(() => {
        wrapper = enzyme_1.shallow(React.createElement(alerts_1.TestAlertsImpl, null));
        testAlerts = wrapper.instance();
    });
    it("should not have any nodes config alerts (undefined parameters)", () => {
        const defaultNodeConfig = { nodeId: 1, interfaceName: 'test' };
        const testCases = [
            { newConfig: undefined, ifaces: undefined },
            { newConfig: null, ifaces: undefined },
            { newConfig: {}, ifaces: undefined },
            { newConfig: { client: {}, server: {} }, ifaces: undefined },
        ];
        _.forEach(testCases, (testCase) => {
            const alerts = testAlerts.getNodesConfigAlerts(testCase.newConfig, testCase.ifaces);
            helper_1.expect(alerts).to.have.length(0);
        });
    });
    it("should not have any nodes config alerts (busy state is undefined)", () => {
        const defaultNodeConfig = { nodeId: 1, interfaceName: 'test' };
        const testCases = [
            {
                newConfig: {
                    client: defaultNodeConfig,
                    server: defaultNodeConfig
                },
                ifaces: new Map().set(1, [{ iface: defaultNodeConfig.interfaceName, busy: undefined }])
            },
            {
                newConfig: {
                    client: defaultNodeConfig,
                    server: defaultNodeConfig
                },
                ifaces: new Map().set(1, [{ iface: defaultNodeConfig.interfaceName, busy: null }])
            },
            {
                newConfig: {
                    client: defaultNodeConfig,
                    server: defaultNodeConfig
                },
                ifaces: new Map().set(1, [{ iface: undefined, busy: true }])
            },
        ];
        _.forEach(testCases, (testCase) => {
            const alerts = testAlerts.getNodesConfigAlerts(testCase.newConfig, testCase.ifaces);
            helper_1.expect(alerts).to.have.length(0);
        });
    });
    it("should not have any nodes config alerts (busy state is false)", () => {
        const defaultNodeConfig = { nodeId: 1, interfaceName: 'test' };
        const testCases = [
            {
                newConfig: {
                    client: defaultNodeConfig,
                    server: defaultNodeConfig
                },
                ifaces: new Map().set(1, [{ iface: defaultNodeConfig.interfaceName, busy: false }])
            }
        ];
        _.forEach(testCases, (testCase) => {
            const alerts = testAlerts.getNodesConfigAlerts(testCase.newConfig, testCase.ifaces);
            helper_1.expect(alerts).to.have.length(0);
        });
    });
    it("should have 2 nodes config alerts (busy ifaces)", () => {
        const defaultNodeConfig = { nodeId: 1, interfaceName: 'test' };
        const testCases = [
            {
                newConfig: {
                    client: defaultNodeConfig,
                    server: defaultNodeConfig
                },
                ifaces: new Map().set(1, [{ iface: defaultNodeConfig.interfaceName, busy: true }])
            }
        ];
        _.forEach(testCases, (testCase) => {
            const alerts = testAlerts.getNodesConfigAlerts(testCase.newConfig, testCase.ifaces);
            helper_1.expect(alerts).to.have.length(2);
        });
    });
    it("should not have any config alerts (undefined parameters)", () => {
        const testCases = [
            { newConfig: { receivers: undefined, scenarios: undefined } },
            { newConfig: { receivers: null, scenarios: null } },
            { newConfig: { receivers: {}, scenarios: {} }, },
        ];
        _.forEach(testCases, (testCase) => {
            const alerts = testAlerts.getConfigAlerts(testCase.newConfig.receivers, testCase.newConfig.scenarios);
            helper_1.expect(alerts).to.have.length(0);
        });
    });
    it("should not have any config alerts (equal urls)", () => {
        const defaultReceivers = nodes_interfaces_1.defaultConfig.receivers;
        const defaultScenarios = nodes_interfaces_1.defaultConfig.loader.scenarios;
        const testCases = [
            { newConfig: { receivers: defaultReceivers, scenarios: defaultScenarios }, oldConfig: undefined },
            {
                newConfig: {
                    receivers: [{ routes: [{ url: '1' }, { url: '2' }] }],
                    scenarios: [{ routes: [{ url: '2' }, { url: '1' }] }]
                },
                oldConfig: undefined
            },
        ];
        _.forEach(testCases, (testCase) => {
            const alerts = testAlerts.getConfigAlerts(testCase.newConfig.receivers, testCase.newConfig.scenarios);
            helper_1.expect(alerts).to.have.length(0);
        });
    });
    it("should have config alert (unequal urls)", () => {
        const testReceivers = _.cloneDeep([nodes_interfaces_1.defaultReceivers.HTTP]);
        testReceivers[0].routes[0] = nodes_interfaces_1.defaultServerRoute;
        const testCases = [
            {
                newConfig: {
                    receivers: _.map(nodes_interfaces_1.defaultReceivers, receiver => {
                        const customReceiver = _.cloneDeep(receiver);
                        customReceiver.routes = customReceiver.routes.concat({ url: '/123123' });
                        return customReceiver;
                    }),
                    scenarios: [nodes_interfaces_1.defaultScenarios.HTTP]
                },
                oldConfig: undefined
            },
            {
                newConfig: {
                    receivers: [],
                    scenarios: [nodes_interfaces_1.defaultScenarios.HTTP]
                },
                oldConfig: undefined
            },
            {
                newConfig: {
                    receivers: testReceivers,
                    scenarios: []
                },
                oldConfig: undefined
            },
        ];
        _.forEach(testCases, (testCase) => {
            const alerts = testAlerts.getConfigAlerts(testCase.newConfig.receivers, testCase.newConfig.scenarios);
            helper_1.expect(alerts).to.have.length(1);
        });
    });
});
//# sourceMappingURL=alerts.js.map