import React, { Component } from "react";
import { connect } from "react-redux";
import { signup, clearAuthState } from "../actions/auth";
import { Redirect } from "react-router-dom";

export class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    };
  }
  componentWillUnmount() {
    this.props.dispatch(clearAuthState());
  }

  handleNameChange = (e) => {
    this.setState({
      name: e.target.value,
    });
  };
  handleEmailChange = (e) => {
    this.setState({
      email: e.target.value,
    });
  };
  handlePasswordChange = (e) => {
    this.setState({
      password: e.target.value,
    });
  };
  handleConfirmPasswordChange = (e) => {
    this.setState({
      confirmPassword: e.target.value,
    });
  };
  handleSignup = (e) => {
    e.preventDefault();
    console.log(this.state);
    const { name, email, password, confirmPassword } = this.state;
    if (password == confirmPassword) {
      console.log(password == confirmPassword);
      this.props.dispatch(signup(email, password, confirmPassword, name));
    }
  };
  render() {
    const { error, inProgress, isLoggedIn } = this.props.auth;
    if (isLoggedIn) {
      return <Redirect to="/" />;
    }
    return (
      <div>
        <form className="login-form">
          {error && <div>{error}</div>}
          <span className="login-signup-header">Signup</span>
          <div className="field">
            <input
              type="text"
              placeholder="name"
              required
              onChange={this.handleNameChange}
            />
          </div>
          <div className="field">
            <input
              type="email"
              placeholder="email"
              required
              onChange={this.handleEmailChange}
            />
          </div>
          <div className="field">
            <input
              type="password"
              placeholder="password"
              required
              onChange={this.handlePasswordChange}
            />
          </div>
          <div className="field">
            <input
              type="password"
              placeholder="confirm password"
              required
              onChange={this.handleConfirmPasswordChange}
            />
          </div>
          <div className="field">
            {inProgress ? (
              <button onClick={this.handleSignup}>Signing Up</button>
            ) : (
              <button onClick={this.handleSignup}>Sign up</button>
            )}
          </div>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}
export default connect(mapStateToProps)(Signup);
