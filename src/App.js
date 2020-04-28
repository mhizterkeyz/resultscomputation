import React from "react";
import { Route, Switch } from "react-router";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Components/landing/common/FontAwesomeLibrary";
import Landing from "./Components/landing/Landing";
import Account from "./Components/account/Account";

function App() {
  return (
    <>
      <Switch>
        <Route path="/account" component={Account} />
        <Route path="/" component={Landing} />
      </Switch>
    </>
  );
}

export default App;
