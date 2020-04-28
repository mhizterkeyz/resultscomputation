import React from 'react';
import SignUpForm from './SignUpForm';

class Login extends React.Component {

  state = {
    invitationCode: {
      state: null,
      value: '',
      feedback: '',
    },
    email: {
      state: null,
      value: '',
      feedback: '',
    },
    fullName: {
      state: null,
      value: '',
      feedback: '',
    },
    password: {
      state: null,
      value: '',
      feedback: '',
    },
    confirmPassword: {
      state: null,
      value: '',
      feedback: '',
    },
    working: false,
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({[name] : {...this.state[name], value}});
  }

  handleSubmit = event => {
    event.preventDefault();
    if(this.state.working) return;
    this.setState({working: true});
    setTimeout(() => this.setState({working: false}), 2000);
  }

  render() {
    return (
      <div className="sign-up">
        <SignUpForm onChange={this.handleChange} {...this.state} onSave={this.handleSubmit} />
      </div>
    );
  }
}

export default Login;