import React from 'react';

import {
  Switch,
  Route,
  Redirect
} from 'react-router-dom';

import Characters from '../Characters';
import Planets from '../Planets';

const AppRoutes = () => (
  <Switch>
    <Route path="/characters" component={ Characters }/>
    <Route path="/planets" component={ Planets }/>
    <Redirect from="/" to="/characters" exact={ true }/>
  </Switch>
);

export default AppRoutes;
