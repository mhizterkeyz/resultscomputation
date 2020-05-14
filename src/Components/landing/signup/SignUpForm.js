import React from "react";
import { Link } from "react-router-dom";
import InputFormGroup from "../common/InputFormGroup";
import SelectFormGroup from "../common/selectFormGroup";

const LoginForm = ({ onSave, onChange, working, ...props }) => (
  <form onSubmit={onSave} className="main-shadow" autoComplete="off">
    <h2 className="sr-only">Login Form</h2>
    <h2 className="h5 text-dark text-center my-3 m-lg-none">Sign up</h2>
    <div
      className={`form-row intuitive-form-group pt-2  p-relative ${
        props.invitation_code.state === null
          ? ""
          : props.invitation_code.state
          ? "is-valid"
          : "is-invalid"
      }`}
    >
      <span className="circle d-block">
        <span className="__mark d-block"></span>
        <span className="_mark d-block"></span>
        <span className="__text">INVITATION CODE</span>
      </span>
      <InputFormGroup
        cols="col-md-6 offset-md-3"
        feedback={props.invitation_code.feedback}
        value={props.invitation_code.value}
        onChange={onChange}
        placeholder="Invitation code"
        name="invitation_code"
        type="text"
        valid={props.invitation_code.state}
        required={true}
      />
    </div>
    {!props.invitation_code.state ? (
      ""
    ) : (
      <div
        className={`form-row intuitive-form-group pt-2  p-relative ${
          props.login_data === null
            ? ""
            : props.login_data
            ? "is-valid"
            : "is-invalid"
        }`}
      >
        <span className="circle d-block">
          <span className="__mark d-block"></span>
          <span className="_mark d-block"></span>
          <span className="__text">Login information</span>
        </span>
        <InputFormGroup
          cols="col-md-6"
          feedback={props.username.feedback}
          value={props.username.value}
          onChange={onChange}
          placeholder="Username"
          name="username"
          type="text"
          valid={props.username.state}
          required={true}
        />
        <InputFormGroup
          cols="col-md-6"
          feedback={props.email.feedback}
          value={props.email.value}
          onChange={onChange}
          placeholder="Email"
          name="email"
          type="email"
          valid={props.email.state}
          required={true}
        />
        <InputFormGroup
          cols="col-md-6"
          feedback={props.password.feedback}
          value={props.password.value}
          onChange={onChange}
          placeholder="Password"
          name="password"
          type="password"
          valid={props.password.state}
          required={true}
        />
        <InputFormGroup
          cols="col-md-6"
          feedback={props.confirm_password.feedback}
          value={props.confirm_password.value}
          onChange={onChange}
          placeholder="Confirm password"
          name="confirm_password"
          type="password"
          valid={props.confirm_password.state}
          required={true}
        />
      </div>
    )}
    {!props.invitation_code.state || !props.login_data ? (
      ""
    ) : (
      <div
        className={`form-row intuitive-form-group pt-2  p-relative ${
          props.demographic_data === null
            ? ""
            : props.demographic_data
            ? "is-valid"
            : "is-invalid"
        }`}
      >
        <span className="circle d-block">
          <span className="__mark d-block"></span>
          <span className="_mark d-block"></span>
          <span className="__text">Demographic Data</span>
        </span>
        <InputFormGroup
          cols="col-md-6 offset-md-3"
          feedback={props.phone.feedback}
          value={props.phone.value}
          onChange={onChange}
          placeholder="Phone"
          name="phone"
          type="number"
          valid={props.phone.state}
          required={true}
        />
        <InputFormGroup
          cols="col-md-6"
          feedback={props.fullname.feedback}
          value={props.fullname.value}
          onChange={onChange}
          placeholder="Full name"
          name="fullname"
          type="text"
          valid={props.fullname.state}
          required={true}
        />
        <InputFormGroup
          cols="col-md-6"
          feedback={props.state_of_origin.feedback}
          value={props.state_of_origin.value}
          onChange={onChange}
          placeholder="State of origin"
          name="state_of_origin"
          type="state_of_origin"
          valid={props.state_of_origin.state}
          required={true}
        />
        <InputFormGroup
          cols="col-md-6"
          feedback={props.lga.feedback}
          value={props.lga.value}
          onChange={onChange}
          placeholder="L.G.A"
          name="lga"
          type="text"
          valid={props.lga.state}
          required={true}
        />
        <InputFormGroup
          cols="col-md-6"
          feedback={props.address.feedback}
          value={props.address.value}
          onChange={onChange}
          placeholder="Permanent address"
          name="address"
          type="text"
          valid={props.address.state}
          required={true}
        />
      </div>
    )}
    {!props.invitation_code.state ||
    !props.login_data ||
    !props.demographic_data ||
    props.academic_data === undefined ? (
      ""
    ) : (
      <div
        className={`form-row intuitive-form-group pt-3  p-relative ${
          props.academic_data === null
            ? ""
            : props.academic_data
            ? "is-valid"
            : "is-invalid"
        }`}
      >
        <span className="circle d-block">
          <span className="__mark d-block"></span>
          <span className="_mark d-block"></span>
          <span className="__text">Academic Data</span>
        </span>
        <SelectFormGroup
          cols="col-md-6"
          feedback={(props.faculty && props.faculty.feedback) || ""}
          value={(props.faculty && props.faculty.value) || ""}
          onChange={onChange}
          options={(props.groups && props.groups) || []}
          placeholder="Faculty"
          name="faculty"
          valid={(props.faculty && props.faculty.state) || null}
          required={true}
        />
        <SelectFormGroup
          cols="col-md-6"
          feedback={(props.department && props.department.feedback) || ""}
          value={(props.department && props.department.value) || ""}
          onChange={onChange}
          options={
            (props.departments &&
              ["__select a value__"].concat(
                props.departments[props.faculty.value]
              )) || ["__select a value__"]
          }
          placeholder="Department"
          name="department"
          valid={(props.department && props.department.state) || null}
          required={true}
        />
      </div>
    )}
    {!props.invitation_code.state ||
    !props.login_data ||
    !props.demographic_data ||
    !props.academic_data ||
    props.student_info === undefined ? (
      ""
    ) : (
      <div
        className={`form-row intuitive-form-group pt-3  p-relative ${
          props.student_info === null
            ? ""
            : props.student_info
            ? "is-valid"
            : "is-invalid"
        }`}
      >
        <span className="circle d-block">
          <span className="__mark d-block"></span>
          <span className="_mark d-block"></span>
          <span className="__text">Student Data</span>
        </span>
        <InputFormGroup
          cols="col-md-6 offset-md-3"
          feedback={(props.matric && props.matric.feedback) || ""}
          value={(props.matric && props.matric.value) || ""}
          onChange={onChange}
          placeholder="Matric"
          name="matric"
          type="text"
          valid={(props.matric && props.matric.state) || null}
          required={true}
        />
        <SelectFormGroup
          cols="col-md-6"
          feedback={(props.entry_year && props.entry_year.feedback) || ""}
          value={(props.entry_year && props.entry_year.value) || ""}
          onChange={onChange}
          options={[
            "__select a value__",
            new Date().getFullYear(),
            new Date().getFullYear() - 1,
            new Date().getFullYear() - 2,
            new Date().getFullYear() - 3,
            new Date().getFullYear() - 4,
          ]}
          placeholder="Entry year"
          name="entry_year"
          valid={(props.entry_year && props.entry_year.state) || null}
          required={true}
        />
        <SelectFormGroup
          cols="col-md-6"
          feedback={(props.academic_set && props.academic_set.feedback) || ""}
          value={(props.academic_set && props.academic_set.value) || ""}
          onChange={onChange}
          options={[
            "__select a value__",
            new Date().getFullYear(),
            new Date().getFullYear() - 1,
            new Date().getFullYear() - 2,
            new Date().getFullYear() - 3,
            new Date().getFullYear() - 4,
          ]}
          placeholder="Academic set"
          name="academic_set"
          valid={(props.academic_set && props.academic_set.state) || null}
          required={true}
        />
      </div>
    )}
    <div className="form-row">
      <div className="form-group col-md-6 offset-md-3 col-lg-4 offset-lg-4 px-5">
        <button
          className="btn btn-primary btn-block"
          type="submit"
          disabled={working}
        >
          Sign up
        </button>
      </div>
    </div>
    <Link to="/login" className="forgot">
      Already have an account?
    </Link>
  </form>
);

export default LoginForm;
