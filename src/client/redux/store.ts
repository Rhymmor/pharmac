import { createStore, applyMiddleware, compose } from 'redux';
const thunk = require('redux-thunk').default

import { rootReducer } from './reducers';
import { initialize, addTranslation } from 'react-localize-redux';
const localeJson = require('../localization/global.json');
/* Redux store with middleware
 *
 * you can use Redux DevTools Chrome/FF extensions to view contents and dispatched actions
 *
 * */
declare var window: any;

//const middleware = applyMiddleware(thunk);

const reduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

const middleware = reduxDevTools ? compose( applyMiddleware(thunk), reduxDevTools) : applyMiddleware(thunk);

export let store = createStore(
    rootReducer,
    middleware
);

const languages = ['en', 'ru'];
store.dispatch(initialize(languages, {defaultLanguage: languages[0]}));
store.dispatch(addTranslation(localeJson));