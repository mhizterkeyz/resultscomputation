import React from 'react';
import { Route, Switch } from 'react-router';
import PageNotFound from '../../PageNotFound';
import Header from './common/Header';
import Home from './home/Home';
import Login from './login/Login';
import SignUp from './signup/SignUp';

export default function Landing() {
  return (
    <div className="login-dark">
      <div className="header-dark">
        <Header />
        <Switch>
          <Route path="/" exact component={Home}></Route>
          <Route path="/login" component={Login}></Route>
          <Route path="/signup" component={SignUp}></Route>
          <Route component={PageNotFound}></Route>
        </Switch>
      </div>
    </div>
  );
}