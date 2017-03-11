import * as React from 'react';
import { Router, Route, Redirect, browserHistory } from 'react-router';
import { Provider } from 'react-redux'

import { store } from './redux/store'

//<Route path="/home" component={Home} />

export const AppRouter = () => (
  <Provider store={store}>
  <Router history={browserHistory}>
    <Redirect from='/' to='/nodes' />
    <Redirect from='*' to='/' />
  </Router>
  </Provider>
);