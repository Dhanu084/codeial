import React from "react";
import { connect } from "react-redux";
import { login, clearAuthState } from "../actions/auth";
import { Redirect } from "react-router-dom";

export class Login extends React.Component {
  constructor(props) {
    super(props);
    // this.emailRef = React.createRef;
    // this.passwordRef = React.createRef;
    this.state = {
      email: "",
      password: "",
    };
  }
  componentWillUnmount() {
    this.props.dispatch(clearAuthState());
  }

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
  handleFormSubmit = (e) => {
    e.preventDefault();
    let { email, password } = this.state;
    this.props.dispatch(login(email, password));
  };
  render() {
    //console.log(this.props.auth, "Login");
    const { error, inProgress, isLoggedIn } = this.props.auth;
    const { from } = this.props.location.state || {
      //if the state exists go to that path eg. go to settings page
      from: { pathname: "/" }, //else got to the home page
    };
    if (isLoggedIn) {
      return <Redirect to={from} />;
    }
    return (
      <form className="login-form">
        <span className="login-signup-header">Login</span>
        {error && <div className="alert-error-dialog">{error}</div>}
        <div className="field">
          <input
            type="email"
            placeholder="email"
            required
            //ref={this.emailRef}
            onChange={this.handleEmailChange}
          />
        </div>
        <div className="field">
          <input
            type="password"
            placeholder="password"
            required
            //ref={this.passwordRef}
            onChange={this.handlePasswordChange}
          />
        </div>
        <div className="field">
          {inProgress ? (
            <button onClick={this.handleFormSubmit} disabled={inProgress}>
              Logging In
            </button>
          ) : (
            <button onClick={this.handleFormSubmit}>Log In</button>
          )}
        </div>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps)(Login);
