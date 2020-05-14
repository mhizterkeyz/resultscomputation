import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Home() {
  return (
    <div className="container hero">
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <h1 className="text-center">Revolutionizing the Academic world...</h1>
          <Link
            role="button"
            className="btn long-arrow-hover d-block ml-auto mr-auto btn-primary action-button"
            to="/signup"
          >
            Join Today{" "}
            <FontAwesomeIcon className="icon" icon="long-arrow-alt-right" />
          </Link>
        </div>
      </div>
    </div>
  );
}
