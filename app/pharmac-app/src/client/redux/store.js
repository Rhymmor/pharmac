"use strict";
const redux_1 = require("redux");
const thunk = require('redux-thunk').default;
const reducers_1 = require("./reducers");
//const middleware = applyMiddleware(thunk);
const reduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
const middleware = reduxDevTools ? redux_1.compose(redux_1.applyMiddleware(thunk), reduxDevTools) : redux_1.applyMiddleware(thunk);
exports.store = redux_1.createStore(reducers_1.rootReducer, middleware);
//# sourceMappingURL=store.js.map