import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import AuthService from "../services/auth.service";

import "./login.component.css";

const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        Dit veld mag niet leeg zijn
      </div>
    );
  }
};

class Login extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      username: "",
      password: "",
      loading: false,
      message: ""
    };
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  handleLogin(e) {
    e.preventDefault();

    this.setState({
      message: "",
      loading: true
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      AuthService.login(this.state.username, this.state.password).then(
        () => {
          window.location.reload();
        },
        error => {
          let resMessage = "";
          if (error.response === undefined) {
            resMessage = "Kan geen contact maken met de server.\nEr is misschien iets mis met je internetverbinding. Probeer het nogmaals.\nNeem contact op met de eigenaar van deze website als dit probleem zich blijft voordoen.";
          } else {
            resMessage =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();
            if (error.response.status === 401) {
              resMessage = "Onjuiste gebruikersnaam en/of wachtwoord";
            }
          }
          this.setState({
            loading: false,
            message: resMessage
          });
        }
      );
    } else {
      this.setState({
        loading: false
      });
    }
  }

  render() {
    return (
      <div className="container">
        <div className="LoginForm mx-auto">
          <div className="LoginForm-form">
            <Form
              onSubmit={this.handleLogin}
              ref={c => {
                this.form = c;
              }}
            >
              <div className="form-group">
                <label htmlFor="username">Gebruikersnaam</label>
                <Input
                  type="text"
                  className="form-control"
                  name="username"
                  value={this.state.username}
                  onChange={this.onChangeUsername}
                  validations={[required]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Wachtwoord</label>
                <Input
                  type="password"
                  className="form-control"
                  name="password"
                  value={this.state.password}
                  onChange={this.onChangePassword}
                  validations={[required]}
                />
              </div>

              <div className="form-group">
                <button
                  className="btn btn-primary btn-block"
                  disabled={this.state.loading}
                >
                  {this.state.loading && (
                    <span className="spinner-border spinner-border-sm"></span>
                  )}
                  <span>Login</span>
                </button>
              </div>

              {this.state.message && (
                <div className="form-group">
                  <div className="alert alert-danger" role="alert">
                    {this.state.message}
                  </div>
                </div>
              )}
              <CheckButton
                style={{ display: "none" }}
                ref={c => {
                  this.checkBtn = c;
                }}
              />
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;