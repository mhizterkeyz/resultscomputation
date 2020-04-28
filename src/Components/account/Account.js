import React from "react";
//import { Route, Switch } from 'react-router';
import Header from "./common/header/Header";
import Sidebar from "./common/sidebar/Sidebar";

const Account = () => {
  return (
    <div className="account">
      <Header />
      <Sidebar />
    </div>
  );
};

export default Account;
