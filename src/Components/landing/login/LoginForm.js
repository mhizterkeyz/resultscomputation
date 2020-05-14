import React from "react";
import { Link } from "react-router-dom";
import InputFormGroup from "../common/InputFormGroup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const LoginForm = ({ onSave, onChange, username, password, working }) => (
  <form onSubmit={onSave} className="main-shadow" autoComplete="off">
    <h2 className="sr-only">Login Form</h2>
    <h2 className="h5 text-dark text-center my-3 m-lg-none">Login</h2>
    <p className="text-center d-none d-lg-block">
      <FontAwesomeIcon className="illustration" icon="lock" />
    </p>
    <InputFormGroup
      type="text"
      valid={username.state}
      feedback={username.feedback}
      value={username.value}
      onChange={onChange}
      placeholder="Username or Email"
      name="username"
      required={true}
    />
    <InputFormGroup
      type="password"
      valid={password.state}
      feedback={password.feedback}
      value={password.value}
      onChange={onChange}
      placeholder="Password"
      name="password"
      required={true}
    />
    <div className="form-group">
      <button
        className="btn btn-primary btn-block"
        type="submit"
        disabled={working}
      >
        {working ? "Logging in..." : "Log in"}
      </button>
    </div>
    <Link to="/forgot" className="forgot">
      Forgot your password?
    </Link>
  </form>
);

export default LoginForm;
