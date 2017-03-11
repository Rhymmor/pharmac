import * as React from "react";
import _ = require('lodash');

interface FetchDefinition {
    url: string;
    default?: any; // default value
    error?: any; // can be object or function
    interval?: number; // auto-update interval
    action?: string; // internal needs
}

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

function makeMap(key: any, value: any)
{
    let res: any = {};
    res[key] = value;
    return res;
}

function defEquals(val1: any, val2: any) {
    return JSON.stringify(val1) == JSON.stringify(val2);
}

const retry_on_error_delay = 5000;

export function fetchRefresh() {
    return {action: 'refresh', url: ''};
}

/* React component decorator. Makes async requests and fills fetched data into `props`.
 * request parameters can depend on props
 * to trigger updates you can use interval property(see FetchDefinition) or fetchRefresh function placeholder
 *
 * */
export function connectFetch<T>(connectProps: (props: any)=>any): any {
    return function(reactClass: any) {
        class ConnectedClass extends React.Component<T, any> {
            state: any = {};
            requests: any[];
            generation: number = 1;
            intervals: any[] = []; // array of setInterval objects
            propUrlsLast: any = {}; // Map<string, string> propName -> url mapping

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
                    const fetchDef: FetchDefinition = _.isString(value) ? { url: value} : value;
                    if (fetchDef.action == 'refresh') {
                        this.setState(makeMap(key, ()=> this.refresh() ));
			return;
		    }
                    const {url, interval} = fetchDef;

                    let requestTick = () => {
                        $.ajax({url: fetchDef.url})
                        .done( (resp: any) => {
                            if (generation == this.generation) {
                                this.setState(makeMap(key, resp));
                            }
                        })
                        .fail( () => {
                            if (generation == this.generation) {
				let errVal = _.has(fetchDef, 'error') ? fetchDef.error: fetchDef.default;
				if (_.isFunction(errVal)) {
				    errVal = errVal();
				}
                                this.setState(makeMap(key, errVal));
				setTimeout(requestTick, retry_on_error_delay);
                            }
                            console.log("Request failed", fetchDef.url);
                        });
                    }

                    if (!defEquals(propUrls[key], this.propUrlsLast[key])) {
                        this.setState(makeMap(key, fetchDef.default));
                    }
                    requestTick();

                    if (interval) {
                        this.intervals.push( setInterval(requestTick, interval) );
                    }
                });
                this.propUrlsLast = propUrls;
            }

            componentWillReceiveProps(nextProps: any) {
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

            render(): JSX.Element {
                let mergedProps = _.extend({}, this.props, this.state);
                return React.createElement(reactClass, mergedProps);
            }
        }

        return ConnectedClass;
    }
}

