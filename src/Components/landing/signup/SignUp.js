import React from "react";
import SignUpForm from "./SignUpForm";
import _ from "lodash";
import {
  verify_invite,
  get_groups,
  verify_cred,
  sign_up,
} from "../../../api/userCalls";
import { toast } from "react-toastify";
import * as validate from "./validator";

class Login extends React.Component {
  state = {
    ...this.__([
      "invitation_code",
      "username",
      "email",
      "password",
      "confirm_password",
      "fullname",
      "state_of_origin",
      "address",
      "lga",
      "phone",
    ]),
    login_data: null,
    demographic_data: null,
    working: false,
  };

  __(name) {
    // if (Array.isArray(name))
    return name.reduce(
      (acc, cur) => ({
        ...acc,
        [cur]: {
          state: null,
          value: "",
          feedback: "",
        },
      }),
      {}
    );
    // return {
    //   [name]: {
    //     state: null,
    //     value: "",
    //     feedback: "",
    //   },
    // };
  }

  verifyToken = _.debounce(async () => {
    try {
      const invite = await verify_invite(this.state.invitation_code.value);
      let update = {
        invitation_code: {
          ...this.state.invitation_code,
          state: this.state.invitation_code.value ? false : null,
          feedback: this.state.invitation_code.value
            ? "invalid invite token"
            : "",
        },
      };
      if (!invite) {
        this.setState(update);
        return;
      }
      update = _.merge(update, {
        invitation_code: {
          state: true,
          feedback: "",
        },
        validation_level: invite.role,
      });
      if (
        invite.role !== "administrator" &&
        invite.role !== "groupAdministrator"
      ) {
        if (!this.state.groups || !this.state.departments) {
          this.setState({ working: true });
          const departments = await get_groups();
          const groups = Object.keys(departments);
          groups.unshift("__select a value__");
          this.setState({ groups, departments });
          this.setState({ working: false });
        }
        update = _.merge(
          update,
          {
            ...this.__(["department", "faculty"]),
            academic_data: null,
          },
          { faculty: { value: this.state.groups[0] } }
        );
      }
      if (invite.role === "student") {
        update = _.merge(update, {
          student_info: null,
          ...this.__(["matric", "entry_year", "academic_set"]),
        });
      }
      this.setState(update);
    } catch (err) {
      this.setState({ working: false });
      toast.error("An unexpected error has occurred. Try again");
    }
  }, 500);
  verifyCred = _.debounce(async (name) => {
    const feedback = validate[name](this.state[name].value);
    const new_state = { [name]: { ...this.state[name] } };
    if (typeof feedback !== typeof true && this.state[name].value.length)
      return this.setState(
        _.merge(new_state, { [name]: { feedback, state: false } })
      );
    const ver = await verify_cred(this.state[name].value);
    if (ver)
      return this.setState(
        _.merge(new_state, {
          [name]: { feedback: `a user exists with this ${name}`, state: false },
        })
      );
    this.setState(
      _.merge(new_state, {
        [name]: {
          state: this.state[name].value.length ? true : null,
          feedback: "",
        },
      })
    );
  }, 500);
  update_checks = () =>
    setTimeout(() => {
      if (
        this.state.username.state &&
        this.state.email.state &&
        this.state.password.state &&
        this.state.confirm_password.state
      )
        this.setState({ login_data: true });
      else if (
        this.state.username.state === null ||
        this.state.email.state === null ||
        this.state.password.state === null ||
        this.state.confirm_password.state === null
      )
        this.setState({ login_data: null });
      else this.setState({ login_data: false });
      if (
        this.state.phone.state &&
        this.state.fullname.state &&
        this.state.state_of_origin.state &&
        this.state.lga.state
      )
        this.setState({ demographic_data: true });
      else this.setState({ demographic_data: null });
      if (
        this.state.faculty &&
        this.state.faculty.state &&
        this.state.department.state
      )
        this.setState({ academic_data: true });
      else if (this.state.academic_data !== undefined)
        this.setState({ academic_data: null });
      if (
        this.state.matric &&
        this.state.matric.state &&
        this.state.entry_year.state &&
        this.state.academic_set.state
      )
        this.setState({ student_info: true });
      else if (this.state.student_info !== undefined)
        this.setState({ student_info: null });
    }, 300);
  validateLogin(name) {
    if (name === "email" || name === "username") this.verifyCred(name);
    else if (name === "password") {
      const feedback = validate[name](this.state[name].value);
      if (typeof feedback !== typeof true && this.state.password.value.length)
        this.setState({
          password: { ...this.state.password, feedback, state: false },
        });
      else
        this.setState({
          password: {
            ...this.state.password,
            feedback: "",
            state: this.state.password.value.length ? true : null,
          },
        });
    } else if (name === "confirm_password") {
      if (this.state[name].value !== this.state.password.value)
        this.setState({
          [name]: {
            ...this.state[name],
            feedback: "passwords do not match",
            state: false,
          },
        });
      else
        this.setState({
          [name]: {
            ...this.state[name],
            feedback: "",
            state: true,
          },
        });
    }
  }
  constructor(props) {
    super(props);
    const value = this.props.match.params.id || false;
    if (value)
      this.state.invitation_code = {
        ...this.state.invitation_code,
        value,
      };
  }
  componentDidMount() {
    this.state.invitation_code.value && this.verifyToken();
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState(
      {
        [name]: { ...this.state[name], value },
      },
      () => {
        this.update_checks();
        if (name === "invitation_code") this.verifyToken();
        if (
          name === "username" ||
          name === "email" ||
          name === "password" ||
          name === "confirm_password"
        )
          this.validateLogin(name);
        if (
          name === "fullname" ||
          name === "phone" ||
          name === "state_of_origin" ||
          name === "lga" ||
          name === "address" ||
          name === "faculty" ||
          name === "department" ||
          name === "matric" ||
          name === "entry_year" ||
          name === "academic_set"
        )
          this.setState({
            [name]: {
              ...this.state[name],
              state: this.state[name].value.length ? true : null,
            },
          });
      }
    );
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    if (this.state.working) return;
    if (
      !Object.keys(this.state).reduce((acc, cur) => {
        if (
          (typeof this.state[cur] === typeof true ||
            this.state[cur] === null) &&
          !this.state[cur] &&
          cur !== "working"
        )
          return false;
        return acc;
      }, true)
    )
      return toast.error("Fix the errors on the form");
    this.setState({ working: true });
    const to_be_submitted = _.merge(
      Object.keys(this.state).reduce((acc, cur) => {
        if (this.state[cur].value)
          return { ...acc, [cur]: this.state[cur].value };
        return acc;
      }, {}),
      { validation_level: this.state.validation_level }
    );
    try {
      const trial = await sign_up(to_be_submitted);
      const res = await trial.json();
      if (trial.status !== 200) {
        toast.error(
          `${res.message}: ${Object.values(res.data).reduce(
            (acc, cur) => `${acc} ${cur}`,
            ""
          )}`
        );
        this.setState({ working: false });
        return;
      }
      localStorage["resultify_access_token"] = res.access_token;
      this.props.handleLogin({ ...res, status: true });
      this.setState({ working: false });
    } catch (error) {
      toast.error("An unexpected error has occured. Try again.");
      this.setState({ working: false });
    }
  };

  render() {
    return (
      <div className="sign-up">
        <SignUpForm
          onChange={this.handleChange}
          {...this.state}
          onSave={this.handleSubmit}
        />
      </div>
    );
  }
}

export default Login;
