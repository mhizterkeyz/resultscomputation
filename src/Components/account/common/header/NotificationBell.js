import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

export default function Notification({ count }) {
  const active = count > 0; 
  return (
    <>
      <Link className={ "notification " + (active? 'active':'')} to="/account">
        <FontAwesomeIcon className="bell" icon="bell"></FontAwesomeIcon><span className={active? '':'d-none'}>{count}</span>
      </Link>
    </>
  );
} 