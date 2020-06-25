import React from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import ArticlesPage from '../components/ArticlesPage';
import Login from '../components/Login';
import history from '../history';
import { PrivateRoute } from '../routes/PrivateRoute';

export default () => (
  <Router history={history}>
    <Switch>
      <Route path="/login" component={Login} exact />
      <PrivateRoute path={["/", "/articles"]} component={ArticlesPage} exact />
    </Switch>
  </Router>
);