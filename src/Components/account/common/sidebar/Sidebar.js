import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink, Link } from "react-router-dom";

const activeStyle = {
  color: "#fff",
  background: "#27a9f8",
};
export default function Sidebar(props) {
  return (
    <div className={`sidebar ${props.sidebarToggled ? "" : "hidden"}`}>
      <span
        className={`action-button close text-dark d-md-none ${
          props.sidebarToggled ? "" : "d-none"
        }`}
        onClick={props.toggleSide}
      >
        <FontAwesomeIcon icon="times"></FontAwesomeIcon>
      </span>
      <div className="content pt-5 pt-lg-0">
        <h1 className="lh-0 my-0 text-center d-none d-lg-block py-5">
          <Link to="/account" className="app-brand h5 text-dark">
            resultify
          </Link>
        </h1>
        <ul className="side-menu pt-md-5 list-unstyled">
          <li className="menu-item">
            <NavLink
              to="/account"
              className="nav-link d-md-inline-block d-lg-block mx-md-2 mx-lg-0 rounded"
              activeStyle={activeStyle}
              exact
            >
              <span className="link-icon">
                <FontAwesomeIcon icon="circle-notch"></FontAwesomeIcon>
              </span>
              <span className="link-text d-md-none d-lg-inline">Overview</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}
