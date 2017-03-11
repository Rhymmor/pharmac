import * as React from 'react';
import { Router, Route, Redirect, browserHistory } from 'react-router';
import { Provider } from 'react-redux'
import { store } from './redux/store'

import {Compartments} from './pages/compartments'

//<Route path="/home" component={Home} />

export const AppRouter = () => (
  <Provider store={store}>
  <Router history={browserHistory}>
    <Route path="/compartments" component={Compartments}/>
    <Redirect from='/' to='/compartments' />
    <Redirect from='*' to='/' />
  </Router>
  </Provider>
);