import React, { useState, useContext } from 'react';
import { withRouter, Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import { withFirebase, FirebaseContext } from '../Firebase';
import './signin.css';

export default withFirebase(withRouter(SignInSession));

function SignInSession(props) {
  const [user, setUser] = useState({
    email: '',
    password: '',
    error: null,
  });
  const value = useContext(FirebaseContext);
  const firebase = value.app;

  function onSubmit(event) {
    firebase.auth().signInWithEmailAndPassword(user.email, user.password)
      .then(() => {
        props.history.push(ROUTES.HOME);
      })
      .catch(err => {
        setUser({
          ...user,
          error: err
        });
      });

    event.preventDefault();
  };

  function onChange(event) {
    setUser({
      ...user,
      [event.target.name]: event.target.value
    });
  };

  const isInvalid = user.password === '' || user.email === '';

  return (
    <form className="portfolio-content-center" onSubmit={onSubmit}>
      <div className="form-group mb-2">
        <input type="email"
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          placeholder="Enter email"
          name="email"
          value={user.email}
          onChange={onChange}
        />
      </div>
      <div className="form-group mb-2">
        <input type="password"
          name="password"
          value={user.password}
          onChange={onChange}
          className="form-control"
          id="exampleInputPassword1"
          placeholder="Password" />
      </div>
      <button
        disabled={isInvalid}
        type="submit"
        className="btn btn-block btn-primary mb-2">
        Se co bro
        </button>

        <hr />
        <Link className="btn btn-danger" to={ROUTES.SIGN_UP} >creer un compte</Link>

      {user.error &&

        <div className="alert alert-danger rao-paddingSign" role="alert">
          {user.error.message}
        </div>
      }
    </form >
  );
};