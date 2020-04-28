import React from 'react';
import LoginForm from './LoginForm';

class Login extends React.Component {

  state = {
    email: {
      state: null,
      value: '',
      feedback: '',
    },
    password: {
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
    return <LoginForm onChange={this.handleChange} {...this.state} onSave={this.handleSubmit} />;
  }
}

export default Login;