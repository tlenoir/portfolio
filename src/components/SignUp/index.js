import React, { useState } from 'react';
import './signup.css';
import * as moment from 'moment';
import * as ROUTES from '../../constants/routes';

import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const firebase = app;


function SignUpPage(props) {
  return (
    <div className="row">
      <div className="col"></div>
      <div className="col-lg-6 col-md-10 col-sm-10">

        <SignUpFormBase history={props.history} />

      </div>
      <div className="col"></div>
    </div>
  )
};

function SignUpFormBase({ history }) {
  /* administrateur */
  const [error, setError] = useState(null);
  const [isAdmin, setCheckbox] = useState(false);
  const [register, setRegister] = useState({
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    isAdmin: false,
    lastname: '',
    firstname: '',
  });
  function onChangeCheckbox(event) {
    setCheckbox(event.target.checked);
  };
  function onChange(event) {
    setRegister({
      ...register,
      [event.target.name]: event.target.value
    });
  };
  function capitalize(string) {
    return string.toLowerCase()
      .replace(/\b./g,
        function (firstletter) {
          return firstletter.toUpperCase();
        });
  };
  const isInvalid = register.passwordOne === '' ||
    register.passwordTwo === '' ||
    register.firstname === '' ||
    register.lastname === '' ||
    register.username === '' ||
    register.email === '' ||
    register.passwordOne !== register.passwordTwo;

  function onSubmit(event) {
    firebase.auth()
      .createUserWithEmailAndPassword(register.email, register.passwordOne)
      .then(authUser => {
        // Create a user in your Firebase Realtime database
        return firebase
          .database().ref(`users/${authUser.user.uid}`)
          .set({
            email: register.email,
            firstname: register.firstname,
            lastname: register.lastname,
            isAdmin: register.isAdmin,
            dateCreatedAccount: moment().format('DD MMMM YYYY kk mm ss'),
            username: register.username,
          });
      })
      .then(() => {
        return firebase.auth().currentUser.sendEmailVerification({
          url: process.env.REACT_APP_CONFIRMATION_EMAIL_REDIRECT,
        });
      })
      .then(() => {
        return firebase.auth().currentUser.updateProfile({
          displayName: register.username,
        });
      })
      .then(() => {
        setRegister({
          ...register,
          username: '',
          email: '',
          passwordOne: '',
          passwordTwo: '',
          isAdmin: false,
          lastname: '',
          firstname: '',
          dateCreatedAccount: ''
        });
        history.push(ROUTES.HOME);
      })
      .catch(error => {
        if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
          error.message = ERROR_MSG_ACCOUNT_EXISTS;
        };
        setError(error);
      });
    event.preventDefault();
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="form-group">
        <label htmlFor="formGroupExampleInput">Firstname</label>
        <input
          type="text"
          name="firstname"
          value={capitalize(register.firstname)}
          onChange={onChange}
          className="form-control"
          id="formGroupExampleInput"
          placeholder="Firstname" />
      </div>
      <div className="form-group">
        <label htmlFor="formGroupExampleInput2">Lastname</label>
        <input
          type="text"
          name="lastname"
          value={register.lastname.toUpperCase()}
          onChange={onChange}
          className="form-control"
          id="formGroupExampleInput2"
          placeholder="Lastname" />
      </div>
      <div className="form-group">
        <label htmlFor="formGroupExampleInput">Email</label>
        <input
          type="email"
          name="email"
          value={register.email}
          onChange={onChange}
          className="form-control"
          id="formGroupExampleInput"
          placeholder="Email" />
      </div>
      <div className="form-group">
        <label htmlFor="formGroupExampleInput2">Username</label>
        <input
          type="text"
          value={register.username}
          name="username"
          onChange={onChange}
          className="form-control"
          id="formGroupExampleInput2"
          placeholder="Username to login" />
      </div>
      <div className="form-group">
        <label htmlFor="formGroupExampleInput2">Password</label>
        <input
          type="password"
          name="passwordOne"
          value={register.passwordOne}
          onChange={onChange}
          className="form-control"
          id="formGroupExampleInput2"
          placeholder="Password" />
      </div>
      <div className="form-group">
        <label htmlFor="formGroupExampleInput">Confirm password</label>
        <input
          type="password"
          name="passwordTwo"
          value={register.passwordTwo}
          onChange={onChange}
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
            onChange={onChangeCheckbox}
            id="gridCheck" />
          <label className="form-check-label" htmlFor="gridCheck">
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

        <div className="alert alert-danger rao-paddingSignUp" role="alert">
          {error.message}
        </div>
      }
    </form>
  );
};


/* function SignUpLink() {
  return (
    <Link className="btn btn-link btn-sm ellipsis" to={ROUTES.SIGN_UP}>Sign Up</Link>
  );
}; */

const ERROR_CODE_ACCOUNT_EXISTS = 'auth/email-already-in-use';
const ERROR_MSG_ACCOUNT_EXISTS = `
                  An account with this E-Mail address already exists.
                  Try to login with this account instead. If you think the
                  account is already used from one of the social logins, try
                  to sign-in with one of them. Afterward, associate your accounts
                  on your personal account page.
                  `;
export default SignUpPage;