import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Overview = (props) => {
  return (
    <div className="row">
      <h2 className="page-title h4 col-12">Overview</h2>

      <div className="col-md-6 my-2">
        <div className="chart main-shadow dash-section rounded bg-lighter p-3">
          <h4 className="h6 page-title">Students Performance</h4>
        </div>
      </div>
      <div className="head-counts col-md-6 row my-2">
        <div className="col-md-6 pb-3">
          <div className="p-3  main-shadow dash-section count rounded bg-lighter mb-3">
            <span className="icon">
              <FontAwesomeIcon icon="building"></FontAwesomeIcon>
            </span>
            <span className="number">32</span>
            <span className="text">Departments</span>
          </div>
        </div>
        <div className="col-md-6 pb-3">
          <div className="p-3  main-shadow dash-section count rounded bg-lighter mb-3">
            <span className="icon">
              <FontAwesomeIcon icon="users"></FontAwesomeIcon>
            </span>
            <span className="number">8K</span>
            <span className="text">Students</span>
          </div>
        </div>
        <div className="col-md-6 pb-3 pb-md-none">
          <div className="p-3 mb-3 mb-md-none  main-shadow dash-section count rounded bg-lighter">
            <span className="icon">
              <FontAwesomeIcon icon="university"></FontAwesomeIcon>
            </span>
            <span className="number">8</span>
            <span className="text">Faculties</span>
          </div>
        </div>
        <div className="col-md-6 pb-3 pb-md-none">
          <div className="p-3 mb-3 mb-md-none  main-shadow dash-section count rounded bg-lighter">
            <span className="icon">
              <FontAwesomeIcon icon="user-graduate"></FontAwesomeIcon>
            </span>
            <span className="number">80</span>
            <span className="text">Lecturers</span>
          </div>
        </div>
      </div>
      <div className="col-md-6 my-2">
        <div className="ranking main-shadow dash-section rounded bg-lighter p-3">
          <h4 className="h6 page-title">Top Students</h4>
          <ul className="list-unstyled">
            <li className="rank row">
              <div className="col-1">
                <span className="user-circle">
                  <FontAwesomeIcon icon="user"></FontAwesomeIcon>
                </span>
              </div>
              <div className="col-6">
                <span className="user d-inline-block text-bold">
                  <span className="name d-block">Pablo Upson</span>
                  <span className="dept d-block">Mathematical Science</span>
                </span>
              </div>
              <div className="col-4">
                <span className="cgpa">4.78 CGPA</span>
              </div>
            </li>
            <li className="rank row">
              <div className="col-1">
                <span className="user-circle">
                  <FontAwesomeIcon icon="user"></FontAwesomeIcon>
                </span>
              </div>
              <div className="col-6">
                <span className="user d-inline-block text-bold">
                  <span className="name d-block">Jamila Upson</span>
                  <span className="dept d-block">Law</span>
                </span>
              </div>
              <div className="col-4">
                <span className="cgpa">4.76 CGPA</span>
              </div>
            </li>
            <li className="rank row">
              <div className="col-1">
                <span className="user-circle">
                  <FontAwesomeIcon icon="user"></FontAwesomeIcon>
                </span>
              </div>
              <div className="col-6">
                <span className="user d-inline-block text-bold">
                  <span className="name d-block">Andreas Ukeje</span>
                  <span className="dept d-block">Mass Communication</span>
                </span>
              </div>
              <div className="col-4">
                <span className="cgpa">4.76 CGPA</span>
              </div>
            </li>
            <li className="rank row">
              <div className="col-1">
                <span className="user-circle">
                  <FontAwesomeIcon icon="user"></FontAwesomeIcon>
                </span>
              </div>
              <div className="col-6">
                <span className="user d-inline-block text-bold">
                  <span className="name d-block">Maryanne Udonsek</span>
                  <span className="dept d-block">Phylosophy</span>
                </span>
              </div>
              <div className="col-4">
                <span className="cgpa">4.76 CGPA</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div className="col-md-6 my-2">
        <div className="chart main-shadow dash-section rounded bg-lighter p-3">
          <h4 className="h6 page-title">Tag graph for the session</h4>
        </div>
      </div>
    </div>
  );
};

export default Overview;
