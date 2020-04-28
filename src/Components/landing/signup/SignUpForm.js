import React from 'react';
import { Link } from 'react-router-dom';
import InputFormGroup from '../common/InputFormGroup';

const LoginForm = ({ onSave, onChange, email, password, working, ...props }) => (
  <form onSubmit={onSave} autoComplete="off">
    <h2 className="sr-only">Login Form</h2>
    <div className="form-row">
      <InputFormGroup type="text" valid={props.invitationCode.state} feedback={props.invitationCode.feedback} value={props.invitationCode.value} onChange={onChange} placeholder="Invitation code" name="invitationCode" required={true} cols="col-md-12"/>
      <InputFormGroup type="email" valid={email.state} feedback={email.feedback} value={email.value} onChange={onChange} placeholder="Email" name="email" required={true} cols="col-md-6"/>
      <InputFormGroup type="text" valid={props.fullName.state} feedback={props.fullName.feedback} value={props.fullName.value} onChange={onChange} placeholder="Full name" name="fullName" required={true} cols="col-md-6"/>
      <InputFormGroup type="password" valid={password.state} feedback={password.feedback} value={password.value} onChange={onChange} placeholder="Password" name="password" required={true} cols="col-md-6" />
      <InputFormGroup type="password" valid={props.confirmPassword.state} feedback={props.confirmPassword.feedback} value={props.confirmPassword.value} onChange={onChange} placeholder="Retype password" name="confirmPassword" required={true} cols="col-md-6" />
      <div className="form-group col-12">
        <button className="btn btn-primary btn-block" type="submit" disabled={working}>{working? "Signing up...":"Sign up"}</button>
      </div>
    </div>
    <Link to="/forgot" className="forgot">Forgot your email or password?</Link>
  </form>
);

export default LoginForm;