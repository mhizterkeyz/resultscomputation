import React, { useState } from "react";
import SearchForm from "./SearchForm";
import NotificationBell from "./NotificationBell";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

export default function Header({ notificationCount, toggleSide }) {
  const [overlayed, setOverlayed] = useState(false);
  notificationCount = notificationCount ? notificationCount : 1;
  return (
    <>
      <div className="app-header">
        <div className="container">
          <div className="row d-md-none">
            <div className="col-3">
              <span className="text-dark sidebar-toggler" onClick={toggleSide}>
                <FontAwesomeIcon icon="bars"></FontAwesomeIcon>
              </span>
            </div>
            <h1 className="lh-0 my-0 col-6 text-center">
              <Link to="/account" className="app-brand h5 text-dark">
                resultify
              </Link>
            </h1>
            <div className="col-3 text-center">
              <span
                className="user-circle ml-2"
                onClick={() => setOverlayed(!overlayed)}
              >
                <FontAwesomeIcon
                  className="text-light"
                  icon="ellipsis-v"
                ></FontAwesomeIcon>
              </span>
            </div>
          </div>
          <div className={`overlay ${overlayed ? "" : "hidden"}`}>
            <span
              className="close text-dark"
              onClick={() => setOverlayed(!overlayed)}
            >
              <FontAwesomeIcon icon="times"></FontAwesomeIcon>
            </span>
            <div className="container">
              <div className="ml-auto col-md-9 col-lg-8 col-xl-6">
                <div className="row">
                  <div className="search-bit header-section justify-content-center col-md-6 my-5 my-md-0">
                    <SearchForm />
                  </div>
                  <div className="notification-bit header-section col-1 offset-3 offset-md-0 my-5 my-md-0">
                    <NotificationBell count={notificationCount} />
                  </div>
                  <div className="user-circle-bit header-section col-md-4 col-6 my-5 my-md-0">
                    <Link className="user-circle" to="/account">
                      <FontAwesomeIcon icon="user"></FontAwesomeIcon>
                    </Link>
                    <span className="user-name">John Doe</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
