import React from "react";
import { NavLink, Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";

const activeStyle = {
  color: "#333333",
  fontWeight: "bold",
};
const Header = () => {
  return (
    <Navbar bg="light" expand="lg">
      <div className="container py-2">
        <Link className="navbar-brand" to="/">
          resultify
        </Link>
        <Navbar.Toggle className="navbar-toggler" />
        <Navbar.Collapse>
          <Nav className="ml-auto mr-lg-5">
            <li className="nav-item" role="presentation">
              <NavLink
                to="/"
                className="nav-link"
                activeStyle={activeStyle}
                exact
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item" role="presentation">
              <NavLink
                to="/about"
                className="nav-link"
                activeStyle={activeStyle}
              >
                About
              </NavLink>
            </li>
            <li className="nav-item" role="presentation">
              <NavLink
                to="/contact"
                className="nav-link"
                activeStyle={activeStyle}
              >
                Contact
              </NavLink>
            </li>
          </Nav>
          <span className="navbar-text">
            <Link to="/login" className="login">
              Login
            </Link>
          </span>
          <Link
            className="btn btn-primary action-button"
            role="button"
            to="/signup"
          >
            Sign up
          </Link>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
};

export default Header;
