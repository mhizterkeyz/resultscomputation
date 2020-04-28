import React from 'react';
import { Link } from 'react-router-dom';
import InputFormGroup from '../common/InputFormGroup';

const LoginForm = ({ onSave, onChange, email, password, working }) => (
  <form onSubmit={onSave} autoComplete="off">
    <h2 className="sr-only">Login Form</h2>
    <InputFormGroup type="email" valid={email.state} feedback={email.feedback} value={email.value} onChange={onChange} placeholder="Email" name="email" required={true}/>
    <InputFormGroup type="password" valid={password.state} feedback={password.feedback} value={password.value} onChange={onChange} placeholder="Password" name="password" required={true}/>
    <div className="form-group">
      <button className="btn btn-primary btn-block" type="submit" disabled={working}>{working? "Logging in...":"Log in"}</button>
    </div>
    <Link to="/forgot" className="forgot">Forgot your email or password?</Link>
  </form>
);

export default LoginForm;