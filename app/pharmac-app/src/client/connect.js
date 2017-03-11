"use strict";
const React = require("react");
const _ = require("lodash");
/* Usage example
+import {connectFetch, connectRefresh} from '../../connect';

interface MyProps {
    selectedNode: number;
    nodes: Node[];
    selectedNodeInterfaces: Interface[];
    refreshNodes: Function;
}

+@connectFetch(
+    (props: MyProps) => ({
+        nodes: {url: '/api/nodes', interval: 3000}
+        selectedNodeInterfaces: {url: `/api/nodes/${props.selectedNode}/interfaces', interval: 5000},
         refreshNodes: fetchRefresh(), // this will create a corresponding refresh function in props
+    })
+)
 export class MyComponent extends React.Component<MyProps, any> {
     render() {
         return (
             <div className="card">
+        <pre onClick={this.props.refreshNodes()}>{JSON.stringify((this.props as any).nodes, undefined, 2)}</pre>

connectFetch decorator can be chained if needed
*/
function makeMap(key, value) {
    let res = {};
    res[key] = value;
    return res;
}
function defEquals(val1, val2) {
    return JSON.stringify(val1) == JSON.stringify(val2);
}
const retry_on_error_delay = 5000;
function fetchRefresh() {
    return { action: 'refresh', url: '' };
}
exports.fetchRefresh = fetchRefresh;
/* React component decorator. Makes async requests and fills fetched data into `props`.
 * request parameters can depend on props
 * to trigger updates you can use interval property(see FetchDefinition) or fetchRefresh function placeholder
 *
 * */
function connectFetch(connectProps) {
    return function (reactClass) {
        class ConnectedClass extends React.Component {
            constructor() {
                super(...arguments);
                this.state = {};
                this.generation = 1;
                this.intervals = []; // array of setInterval objects
                this.propUrlsLast = {}; // Map<string, string> propName -> url mapping
            }
            componentWillMount() {
                this.refresh();
            }
            componentWillUnmount() {
                this.cancel();
            }
            refresh() {
                this.cancel();
                let propUrls = connectProps(this.props);
                const generation = ++this.generation;
                _.forIn(propUrls, (value, key) => {
                    const fetchDef = _.isString(value) ? { url: value } : value;
                    if (fetchDef.action == 'refresh') {
                        this.setState(makeMap(key, () => this.refresh()));
                        return;
                    }
                    const { url, interval } = fetchDef;
                    let requestTick = () => {
                        $.ajax({ url: fetchDef.url })
                            .done((resp) => {
                            if (generation == this.generation) {
                                this.setState(makeMap(key, resp));
                            }
                        })
                            .fail(() => {
                            if (generation == this.generation) {
                                let errVal = _.has(fetchDef, 'error') ? fetchDef.error : fetchDef.default;
                                if (_.isFunction(errVal)) {
                                    errVal = errVal();
                                }
                                this.setState(makeMap(key, errVal));
                                setTimeout(requestTick, retry_on_error_delay);
                            }
                            console.log("Request failed", fetchDef.url);
                        });
                    };
                    if (!defEquals(propUrls[key], this.propUrlsLast[key])) {
                        this.setState(makeMap(key, fetchDef.default));
                    }
                    requestTick();
                    if (interval) {
                        this.intervals.push(setInterval(requestTick, interval));
                    }
                });
                this.propUrlsLast = propUrls;
            }
            componentWillReceiveProps(nextProps) {
                // TODO: can keep unchanged parts here
                let propUrls = connectProps(this.props);
                if (!defEquals(propUrls, this.propUrlsLast)) {
                    this.refresh();
                }
            }
            cancel() {
                ++this.generation; // this will prevent setState from updating
                _.each(this.intervals, clearInterval);
                this.intervals = [];
            }
            render() {
                let mergedProps = _.extend({}, this.props, this.state);
                return React.createElement(reactClass, mergedProps);
            }
        }
        return ConnectedClass;
    };
}
exports.connectFetch = connectFetch;
//# sourceMappingURL=connect.js.map