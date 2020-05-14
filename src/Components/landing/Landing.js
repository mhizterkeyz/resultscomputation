import React from "react";
import { Route, Switch } from "react-router";
import { Redirect } from "react-router-dom";
import PageNotFound from "../../PageNotFound";
import Header from "./common/Header";
import Home from "./home/Home";
import Login from "./login/Login";
import SignUp from "./signup/SignUp";

function Landing(props) {
  if (
    props.logged_in &&
    (props.location.pathname === "/signup" ||
      props.location.pathname === "/login")
  ) {
    return <Redirect to="account" />;
  }
  return (
    <div className="login-dark">
      <div className="header-dark">
        <Header />
        <Switch>
          <Route path="/" exact component={Home}></Route>
          <Route
            path="/login"
            render={(ownProps) => (
              <Login {...ownProps} handleLogin={props.handleLogin} />
            )}
          ></Route>
          <Route
            path="/signup/:id"
            render={(ownProps) => (
              <SignUp {...ownProps} handleLogin={props.handleLogin} />
            )}
          ></Route>
          <Route
            path="/signup"
            render={(ownProps) => (
              <SignUp {...ownProps} handleLogin={props.handleLogin} />
            )}
          ></Route>
          <Route component={PageNotFound}></Route>
        </Switch>
      </div>
    </div>
  );
}

export default Landing;
