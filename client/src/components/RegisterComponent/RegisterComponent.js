// Register.js

import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { registerUser } from "../../actions/auth";
import classnames from "classnames";
import "./Register.css";
import { Link } from "react-router-dom";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password_confirm: "",
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
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password_confirm: this.state.password_confirm,
    };
    this.props.registerUser(user, this.props.history);
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

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="col-md-12">
        <div className="card card-container">
          <div className="register_text">
            <h2>Registration</h2>
          </div>
          <p className="sign-in-text">Create New Account</p>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                id="userIcon"
                placeholder="Name"
                className={classnames("form-control form-control-lg", {
                  "is-invalid": errors.name,
                })}
                name="name"
                onChange={this.handleInputChange}
                value={this.state.name}
              />
              {errors.name && (
                <div className="invalid-feedback alert alert-danger">
                  {errors.name}
                </div>
              )}
            </div>
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
              <input
                type="password"
                id="confirmPasswordIcon"
                placeholder="Confirm Password"
                className={classnames("form-control form-control-lg", {
                  "is-invalid": errors.password_confirm,
                })}
                name="password_confirm"
                onChange={this.handleInputChange}
                value={this.state.password_confirm}
              />
              {errors.password_confirm && (
                <div className="invalid-feedback alert alert-danger">
                  {errors.password_confirm}
                </div>
              )}
            </div>
            <div className="form-group">
              <button
                type="submit"
                className="btn btn-primary btn-block button_login"
              >
                Register User
              </button>
            </div>
            <div className="forgot_password">
              <span>Already Have an Account. Click below to Sing In</span>
            </div>

            <div className="form-group_register">
              <Link
                to={"/login"}
                className="btn btn-primary btn-block register_button"
              >
                <span>Sign In</span>
              </Link>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));
