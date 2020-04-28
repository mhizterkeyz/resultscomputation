import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <span class="action-button open text-light d-lg-none">
        <FontAwesomeIcon icon="bars"></FontAwesomeIcon>
      </span>
      <span class="action-button close text-light d-lg-none">
        <FontAwesomeIcon icon="times"></FontAwesomeIcon>
      </span>
      <div className="content"></div>
    </div>
  );
}
