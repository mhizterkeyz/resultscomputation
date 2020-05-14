import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function SearchForm() {
  return (
    <div className={"animated-search p-relative "}>
      <form>
        <button type="submit" className="btn btn-default">
          <FontAwesomeIcon
            className="fa fa-search"
            icon="search"
          ></FontAwesomeIcon>
        </button>
        <input
          aria-label="search input"
          type="search"
          name="searchQuery"
          id="searchQuery"
          placeholder="Type in to search..."
        />
      </form>
    </div>
  );
}
