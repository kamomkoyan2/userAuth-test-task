import React, { Component } from "react";
import "./Login.css";
import "bootstrap/dist/css/bootstrap.min.css";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/auth";
import { Link } from "react-router-dom";
import classnames from "classnames";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {},
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = {
      email: this.state.email,
      password: this.state.password,
    };
    this.props.loginUser(user);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/");
    }
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
      });
    }
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="col-md-12">
        <div className="card card-container">
          <div className="login_text">
            <h2>Login</h2>
          </div>
          <p className="sign-in-text">Sign In Your Account</p>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <input
                type="email"
                id="emailIcon"
                placeholder="Email"
                className={classnames("form-control form-control-lg", {
                  "is-invalid": errors.email,
                })}
                name="email"
                onChange={this.handleInputChange}
                value={this.state.email}
              />
              {errors.email && (
                <div className="invalid-feedback alert alert-danger">
                  {errors.email}
                </div>
              )}
            </div>
            <div className="form-group">
              <input
                type="password"
                id="passwordIcon"
                placeholder="Password"
                className={classnames("form-control form-control-lg", {
                  "is-invalid": errors.password,
                })}
                name="password"
                onChange={this.handleInputChange}
                value={this.state.password}
              />
              {errors.password && (
                <div className="invalid-feedback alert alert-danger">
                  {errors.password}
                </div>
              )}
            </div>
            <div className="form-group">
              <button
                type="submit"
                className="btn btn-primary btn-block button_login"
              >
                Login User
              </button>
            </div>
            <div className="forgot_password">
              <span>I Didn't Have an Account. Click below to register</span>
            </div>

            <div className="form-group_register">
              <Link
                to={"/register"}
                className="btn btn-primary btn-block register_button"
              >
                <span>Register New Account</span>
              </Link>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { loginUser })(Login);
