import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function SearchForm({ toggled, onToggle }) {
  return (
    <div className={"animated-search p-relative " + (toggled? '':'hidden')}>
      <form>
        <div className="input">
          <input type="search" name="searchQuery" id="searchQuery" placeholder="Search" />
          <button type="submit" className="btn btn-primary"><FontAwesomeIcon className="fa fa-search" icon="search"></FontAwesomeIcon></button>
        </div>
      </form>
      <button className="animated-search-toggle" onClick={onToggle}><FontAwesomeIcon className="fa fa-search" icon={toggled? "times":"search"}></FontAwesomeIcon></button>
    </div>
  );
}