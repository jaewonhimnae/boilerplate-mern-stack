import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import { loginUser } from "../../actions/user_actions";

class RegisterLogin extends Component {
  state = {
    email: "",
    password: "",
    errors: []
  };

  componentDidMount() {
    document.title = "John Ahn | Login";
  }

  displayErrors = errors =>
    errors.map((error, i) => <p key={i}>{error}</p>);

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  submitForm = event => {
    event.preventDefault();

    let dataToSubmit = {
      email: this.state.email,
      password: this.state.password
    };

    if (this.isFormValid(this.state)) {
      this.setState({ errors: [] });

      this.props.dispatch(loginUser(dataToSubmit)).then(response => {
        if (response.payload.loginSuccess) {
          this.props.history.push("/");
        } else {
          this.setState({
            errors: this.state.errors.concat(
              "Failed to log in, You can check your Email and Password again."
            )
          });
        }
      });
    } else {
      this.setState({
        errors: this.state.errors.concat("Form is not valid")
      });
    }
  };

  isFormValid = ({ email, password }) => email && password;

  render() {
    return (
      <div className="container">
            <h2>Log In</h2>
            <div className="row">
              <form className="col s12" onSubmit={event => this.submitForm(event)}>
                <div className="row">
                  <div className="input-field col s12">
                    <input
                      name="email"
                      value={this.state.email}
                      onChange={e => this.handleChange(e)}
                      id="email"
                      type="email"
                      className="validate"
                    />
                    <label htmlFor="email">Email</label>
                    <span
                      className="helper-text"
                      data-error="Type a right type email"
                      data-success="right"
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="input-field col s12">
                    <input
                      name="password"
                      value={this.state.password}
                      onChange={e => this.handleChange(e)}
                      id="password"
                      type="password"
                      className="validate"
                    />
                    <label htmlFor="password">Password</label>
                    <span
                      className="helper-text"
                      data-error="wrong"
                      data-success="right"
                    />
                  </div>
                </div>

                {this.state.errors.length ? (
                  <div className="error_label">
                    {this.displayErrors(this.state.errors)}
                  </div>
                ) : null}

                <div className="row">
                  <div className="col 12">
                    <button
                      className="btn waves-effect red lighten-2"
                      type="submit"
                      name="action"
                      onClick={event => this.submitForm(event)}
                    >
                      Log in
                    </button>

                    <button
                      style={{ marginLeft: "10px" }}
                      className="btn waves-effect red lighten-2  signUpButton"
                      type="submit"
                      name="action"
                    ><Link to={'/register'}>Sign Up</Link>
                    </button>
                  </div>
                </div>
              </form>
            </div>
        <br />
        <br />
      </div>
    );
  };
};

function mapStateToprops(state) {
  return {
    user: state.user
  };
}

export default connect(mapStateToprops)(withRouter(RegisterLogin));
