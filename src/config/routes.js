import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from '../views/Home';
import NotFound from '../views/404';

import SingleTV from '../views/SingleTV';

const publicPath = '/';

export const routeCodes = {
  HOME: publicPath,
  SINGLETV: `${ publicPath }tv`,
};

export default () => (
  <Switch>
    <Route exact path={ routeCodes.HOME } component={ Home } />
    <Route path={ `${ routeCodes.SINGLETV }/:id` } component={ SingleTV } /> */}
    <Route path='*' component={ NotFound } />
  </Switch>
);
