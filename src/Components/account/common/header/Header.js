import React, { useState } from 'react';
import SearchForm from './SearchForm';
import NotificationBell from './NotificationBell';
import { Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';


export default function Header({ notificationCount }) {
  const [SearchFormToggled, setSearchFormToggled] = useState(false);
  const [overlayed, setOverlayed] = useState(false);
  function handleToggle() {
    if(SearchFormToggled){
      setSearchFormToggled(false);
    }else{
      setSearchFormToggled(true);
    }
  }
  notificationCount = notificationCount? notificationCount:1;
  return (
    <>
      <div className={ "overlay d-lg-none " + (overlayed? '':'hidden')}>
        <span className="close text-light" onClick={
          ()=>setOverlayed(false)
        }>
          <FontAwesomeIcon icon="times"></FontAwesomeIcon>
        </span>
        <ul className="list-unstyled content">
          <li className="right-column d-flex">
            <span className="user-circle mr-2 mt-1">
              <FontAwesomeIcon icon="user"></FontAwesomeIcon>
            </span>
            <Dropdown>
              <Dropdown.Toggle className="user-name">
                John Doe
              </Dropdown.Toggle>
              <Dropdown.Menu className="dropdown-menu">
                <Dropdown.Item href="#account_settings">Account Settings</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </li>
          <li className="mt-5">
            <SearchForm toggled={SearchFormToggled} onToggle={handleToggle} />
          </li>
        </ul>
      </div>
      <div className="container">
        <div className="row p-relative">
          <div className="col-lg-8 offset-lg-3 col-12">
            <div className="header py-lg-3 py-2 px-3">
              <div className="contianer row p-relative">
                <div className="col-8 d-none d-lg-flex">
                  <ul className="nav">
                    <li className="nav-item mr-4">
                      <SearchForm toggled={SearchFormToggled} onToggle={handleToggle} />
                    </li>
                    <li className="nav-item mt-2">
                      <NotificationBell count={notificationCount} />
                    </li>
                  </ul>
                </div>
                <div className="col-4 right-column d-none d-lg-flex">
                  <span className="user-circle"><FontAwesomeIcon icon="user"></FontAwesomeIcon></span>
                    <Dropdown>
                      <Dropdown.Toggle className="user-name">
                        John Doe
                      </Dropdown.Toggle>
                      <Dropdown.Menu className="dropdown-menu">
                        <Dropdown.Item href="#account_settings">Account Settings</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                </div>
                <div className="col-12 d-lg-none row container px-0 mx-0">
                  <h1 className="lh-0 my-0 col-4 offset-4 d-flex justify-content-center"><Link to="/account" className="app-brand h5 text-light">Academia</Link></h1>
                  <div className="col-4 d-flex justify-content-end">
                    <NotificationBell count={notificationCount} />
                    <span className="user-circle ml-2" onClick={
                      ()=>setOverlayed(true)
                    }>
                      <FontAwesomeIcon className="text-light" icon="ellipsis-v"></FontAwesomeIcon>
                    </span>
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