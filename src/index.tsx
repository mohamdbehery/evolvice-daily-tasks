import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import * as serviceWorker from './serviceWorker';
import { HashRouter, Switch, Route } from 'react-router-dom';
import App from './app';
import Login from './components/login';
import Profile from './components/profile';
import Tasks from './components/tasks';
import NewTask from './components/new-task';
import PrivateRoute from './components/private-route';
import { store } from './store/store';

export class Index extends Component<any, any> {

  render() {
    return (
      <HashRouter>
        <App>
          <Switch>
            <PrivateRoute path='/profile'>
              <Route component={Profile} />
            </PrivateRoute>
            <PrivateRoute path='/tasks'>
              <Route component={Tasks} />
            </PrivateRoute>
            <PrivateRoute path='/new-task/:id?'>
              <Route component={NewTask} />
            </PrivateRoute>
            <Route path='/index' component={Login} />
            <Route path='/login' component={Login} />
            <Route exact path='/' component={Login} />
          </Switch>
        </App>
      </HashRouter>
    )
  }
}

ReactDOM.render(
  <Provider store={store}>
    <Index />
  </Provider>
  , document.getElementById('root'));
serviceWorker.register();