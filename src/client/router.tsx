import * as React from 'react';
import { Router, Route, Redirect, browserHistory } from 'react-router';
import { Provider } from 'react-redux'
import { store } from './redux/store'

import {Home} from './pages/home';
import {Compartments} from './pages/compartments';

const routes = (
  <Route>
    <Route path="/compartments" component={Compartments}/>
    <Route path="/home" component={Home}/>
    <Redirect from='/' to='/compartments' />
    <Redirect from='*' to='/' />
  </Route>
);

export const AppRouter = () => (
  <Provider store={store}>
    <Router history={browserHistory} createElement={this.createElement}>
      {routes}
    </Router>
  </Provider>
);