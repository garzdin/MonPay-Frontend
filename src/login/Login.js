import React, { Component } from 'react';
import {
  FormGroup,
  ControlLabel,
  FormControl,
  HelpBlock,
  Button
} from 'react-bootstrap';
import './Login.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
    this.handleLogin = this.handleLogin.bind(this);
  }

  validateEmail() {
    const emailLength = this.state.email.length;
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const test = re.test(this.state.email);
    if (test) return 'success';
    else if (emailLength > 1) return 'error';
  }

  validatePassword() {
    const passwordLength = this.state.password.length;
    if (passwordLength >= 8) return 'success';
    else if (passwordLength > 0) return 'error';
  }

  handleLogin() {
    fetch("https://monpay.herokuapp.com/api/v1/auth/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password
      })
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error();
      }
    })
    .then(json => {
      localStorage.setItem("token", json.token);
      localStorage.setItem("refreshToken", json.refresh_token);
      this.props.app.setState({ authenticated: true });
    }).catch(error => {
      console.log(error);
    });
  }

  render() {
    return (
      <form className="Login-form" onSubmit={(e) => e.preventDefault()}>
        <FormGroup
          controlId="usernameField"
          validationState={this.validateEmail()}
        >
          <ControlLabel>Please enter your email below</ControlLabel>
          <FormControl
            type="text"
            value={this.state.email}
            placeholder="Enter email"
            onChange={(e) => this.setState({ email: e.target.value })}
          />
          <FormControl.Feedback />
          <HelpBlock>Enter a valid email (user@email.com).</HelpBlock>
        </FormGroup>
        <FormGroup
          controlId="passwordField"
          validationState={this.validatePassword()}
        >
        <ControlLabel>Please enter your password below</ControlLabel>
        <FormControl
          type="password"
          value={this.state.password}
          placeholder="Enter password"
          onChange={(e) => this.setState({ password: e.target.value })}
        />
        <FormControl.Feedback />
        <HelpBlock>Should be atleast 8 characters long.</HelpBlock>
        </FormGroup>
        <Button bsStyle="success" bsSize="large" block onClick={this.handleLogin}>Login</Button>
      </form>
    );
  }
}

export default Login;
