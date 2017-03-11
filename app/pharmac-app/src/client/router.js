"use strict";
const React = require("react");
const react_router_1 = require("react-router");
const react_redux_1 = require("react-redux");
const store_1 = require("./redux/store");
//<Route path="/home" component={Home} />
exports.AppRouter = () => (React.createElement(react_redux_1.Provider, { store: store_1.store },
    React.createElement(react_router_1.Router, { history: react_router_1.browserHistory },
        React.createElement(react_router_1.Redirect, { from: '/', to: '/nodes' }),
        React.createElement(react_router_1.Redirect, { from: '*', to: '/' }))));
//# sourceMappingURL=router.js.map