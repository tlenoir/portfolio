import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import './signup.css';
import * as moment from 'moment';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';


const SignUpPage = () => (
  <div className="row">
    <div className="col"></div>
    <div className="col-lg-6 col-md-10 col-sm-10">

      <SignUpForm />

    </div>
    <div className="col"></div>
  </div>
);
const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  isAdmin: false,
  error: null,
  lastname: '',
  firstname: '',
};

class SignUpFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }
  /* administrateur */
  onChangeCheckbox = event => {
    this.setState({ [event.target.name]: event.target.checked });
  };

  onSubmit = event => {
    const dateCreatedAccount = moment().locale('fr').format('DD MMMM YYYY kk mm ss');
    const { username, email, passwordOne, isAdmin, lastname, firstname, } = this.state;
    const roles = [];
    if (isAdmin) {
      roles.push(ROLES.ADMIN);
    } else {
      roles.push(ROLES.SURFER)
    }

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        // Create a user in your Firebase realtime database
        return this.props.firebase
          .user(authUser.user.uid)
          .set({
            /* juste username et email */
            username,
            email,
            roles,
            lastname,
            firstname,
            dateCreatedAccount
          });
      })
      .then(() => {
        return this.props.firebase.doSendEmailVerification();
      })
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
          error.message = ERROR_MSG_ACCOUNT_EXISTS;
        }
        this.setState({ error });
      });

    event.preventDefault();
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  capitalize(string) {
    return string.toLowerCase()
      .replace(/\b./g,
        function (firstletter) {
          return firstletter.toUpperCase();
        });
  };

  render() {

    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      isAdmin,
      error,
      lastname,
      firstname,
    } = this.state;
    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === '' ||
      lastname === '' ||
      firstname === '';

    return (
      <form onSubmit={this.onSubmit}>
        <div className="form-group">
          <label for="formGroupExampleInput">Firstname</label>
          <input
            type="text"
            name="firstname"
            value={this.capitalize(firstname)}
            onChange={this.onChange}
            className="form-control"
            id="formGroupExampleInput"
            placeholder="Firstname" />
        </div>
        <div className="form-group">
          <label for="formGroupExampleInput2">Lastname</label>
          <input
            type="text"
            name="lastname"
            value={lastname.toUpperCase()}
            onChange={this.onChange}
            className="form-control"
            id="formGroupExampleInput2"
            placeholder="Lastname" />
        </div>
        <div className="form-group">
          <label for="formGroupExampleInput">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={this.onChange}
            className="form-control"
            id="formGroupExampleInput"
            placeholder="Email" />
        </div>
        <div className="form-group">
          <label for="formGroupExampleInput2">Username</label>
          <input
            type="text"
            value={username}
            name="username"
            onChange={this.onChange}
            className="form-control"
            id="formGroupExampleInput2"
            placeholder="Username to login" />
        </div>
        <div className="form-group">
          <label for="formGroupExampleInput2">Password</label>
          <input
            type="password"
            name="passwordOne"
            value={passwordOne}
            onChange={this.onChange}
            className="form-control"
            id="formGroupExampleInput2"
            placeholder="Password" />
        </div>
        <div className="form-group">
          <label for="formGroupExampleInput">Confirm password</label>
          <input
            type="password"
            name="passwordTwo"
            value={passwordTwo}
            onChange={this.onChange}
            className="form-control"
            id="formGroupExampleInput"
            placeholder="Confirm password" />
        </div>
        <div className="form-group">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              name="isAdmin"
              checked={isAdmin}
              onChange={this.onChangeCheckbox}
              id="gridCheck" />
            <label className="form-check-label" for="gridCheck">
              Admin
              </label>
          </div>
        </div>

        <button
          disabled={isInvalid}
          type="submit"
          className="btn btn-block btn-primary">
          Sign Up
        </button>

        {error &&

          <div class="alert alert-danger rao-paddingSignUp" role="alert">
            {error.message}
          </div>
        }
      </form>
    );
  }
}

const SignUpLink = () => (

  <Link className="btn btn-link btn-sm ellipsis" to={ROUTES.SIGN_UP}>Sign Up</Link>

);
const SignUpForm = compose(
  withRouter,
  withFirebase,
)(SignUpFormBase);

const ERROR_CODE_ACCOUNT_EXISTS = 'auth/email-already-in-use';
const ERROR_MSG_ACCOUNT_EXISTS = `
                  An account with this E-Mail address already exists.
                  Try to login with this account instead. If you think the
                  account is already used from one of the social logins, try
                  to sign-in with one of them. Afterward, associate your accounts
                  on your personal account page.
                  `;
export default SignUpPage;

export { SignUpForm, SignUpLink };