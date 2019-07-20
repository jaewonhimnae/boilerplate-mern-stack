import React, { Component } from "react";
import moment from "moment";

import { connect } from "react-redux";
import { registerUser } from "../../actions/user_actions";

class Register extends Component {
  state = {
    lastname: "",
    name: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    errors: []
  };

  componentDidMount() {
    document.title = "John Ahn | Register";
  }

  isFormValid = () => {
    let errors = [];
    let error;

    if (this.isFormEmpty(this.state)) {
      error = { message: "Fill in all fields" };
      this.setState({ errors: errors.concat(error) });
      return false;
    } else if (!this.isPasswordValid(this.state)) {
      error = { message: "Password is invalid" };
      this.setState({ errors: errors.concat(error) });
      return false;
    } else {
      return true;
    }
  };

  isFormEmpty = ({ name, lastname, email, password, passwordConfirmation }) => {
    return (
      !name.length ||
      !lastname.length ||
      !email.length ||
      !password.length ||
      !passwordConfirmation.length
    );
  };

  isPasswordValid = ({ password, passwordConfirmation }) => {
    if (password.length < 6 || passwordConfirmation.length < 6) {
      return false;
    } else if (password !== passwordConfirmation) {
      return false;
    } else {
      return true;
    }
  };

  displayErrors = errors =>
    errors.map((error, i) => <p key={i}>{error.message}</p>);

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  submitForm = event => {
    event.preventDefault();

    let dataToSubmit = {
      email: this.state.email,
      password: this.state.password,
      name: this.state.name,
      lastname: this.state.lastname,
      image: `http://gravatar.com/avatar/${moment().unix()}?d=identicon`
    };

    if (this.isFormValid()) {
      this.setState({ errors: [] });
      this.props
        .dispatch(registerUser(dataToSubmit))
        .then(response => {
          if (response.payload.success) {
            setTimeout(() => {
              this.props.history.push("/");
            }, 3000);
          } else {
            this.setState({
              errors: this.state.errors.concat(
                "your attempt to send data to DB was failed"
              )
            });
          }
        })
        .catch(err => {
          this.setState({
            errors: this.state.errors.concat(err)
          });
        });
    } else {
      console.log("Form is invalid");
    }
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <form className="col s12" onSubmit={event => this.submitForm(event)}>
            <h2>Personal information</h2>
            <div className="row">
              <div className="input-field col s12">
                <input
                  name="lastname"
                  onChange={e => this.handleChange(e)}
                  value={this.state.lastname}
                  id="lastname"
                  type="text"
                  className="validate"
                />
                <label htmlFor="lastname">LastName</label>
              </div>
            </div>

            <div className="row">
              <div className="input-field col s12">
                <input
                  name="name"
                  onChange={e => this.handleChange(e)}
                  value={this.state.name}
                  id="name"
                  type="text"
                  className="validate"
                />
                <label htmlFor="name">Name</label>
              </div>
            </div>

            <div className="row">
              <div className="input-field col s12">
                <input
                  name="email"
                  onChange={e => this.handleChange(e)}
                  value={this.state.email}
                  id="email"
                  type="email"
                  className="validate"
                />
                <label htmlFor="email">Email</label>
              </div>
            </div>
            <h2>Verify password</h2>

            <div className="row">
              <div className="input-field col s12">
                <input
                  name="password"
                  onChange={e => this.handleChange(e)}
                  value={this.state.password}
                  id="password"
                  type="password"
                  className="validate"
                />
                <label htmlFor="password">Password</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input
                  name="passwordConfirmation"
                  onChange={e => this.handleChange(e)}
                  value={this.state.passwordConfirmation}
                  id="passwordConfirmation"
                  type="password"
                  className="validate"
                />
                <label htmlFor="passwordConfirmation">Password Confirmation</label>
              </div>
            </div>

            {this.state.errors.length > 0 ? (
              <div className="error_label">
                {this.displayErrors(this.state.errors)}
              </div>
            ) : null}

            <div>
              <button
                className="btn waves-effect red lighten-2"
                type="submit"
                name="action"
                onClick={event => this.submitForm(event)}
              >
                Create an account
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default connect()(Register);
