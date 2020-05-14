import React, { useState } from "react";
import { Route, Switch } from "react-router";
import { Redirect } from "react-router-dom";
import Header from "./common/header/Header";
import Sidebar from "./common/sidebar/Sidebar";
import Overview from "./Overview";
//import { toast } from "react-toastify";

const Account = (props) => {
  const [sidebarToggled, setSidebarToggled] = useState(false);
  const handleSidebarToggle = () => {
    setSidebarToggled(!sidebarToggled);
  };
  return (
    <>
      {props.logged_in ? "" : <Redirect to="login" />}
      <div className="account p-relative">
        <Header toggleSide={handleSidebarToggle} />
        <Sidebar
          toggleSide={handleSidebarToggle}
          sidebarToggled={sidebarToggled}
        />
        <main id="main">
          <Switch>
            <Route render={(routeProps) => <Overview {...routeProps} />} />
          </Switch>
        </main>
      </div>
    </>
  );
};

export default Account;
