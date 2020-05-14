import React from "react";

const PreLoader = ({ busy = true }) => (
  <div className={`pre-loader ${busy ? "" : "d-none"}`}>
    <div className="ripple"></div>
    <div className="_ripple"></div>
    <div className="__ripple"></div>
  </div>
);

export default PreLoader;
