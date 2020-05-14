import React, { useState } from "react";
import LoginForm from "./LoginForm";
import { toast } from "react-toastify";
import * as user from "../../../api/userCalls";

const Login = (props) => {
  const [username, setusername] = useState({ state: null, value: "" });
  const [password, setpassword] = useState({ state: null, value: "" });
  const [working, setworking] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "username") setusername({ ...username, value });
    if (name === "password") setpassword({ ...password, value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (working) return;
    setworking(true);
    try {
      const login = await user.login({
        username: username.value,
        password: password.value,
      });
      if (!login) {
        setusername({ ...username, status: false });
        setpassword({ value: "", status: false });
        toast.error("Login failed: invalid credentials");
        setworking(false);
        return;
      }
      const data = login;
      localStorage["resultify_access_token"] = data.access_token;
      props.handleLogin({ ...data, status: true });
      if (login || !login) setworking(false);
    } catch (err) {
      console.log(new Error(err));
      setworking(false);
      toast.error("An unexpected error has occurred. Try again.");
    }
  };
  return (
    <LoginForm
      onChange={handleChange}
      {...{ username, password, working }}
      onSave={handleSubmit}
    />
  );
};

export default Login;
