import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import app from 'firebase/app';
import 'firebase/auth';
import * as ROUTES from '../../constants/routes';
import './signin.css';

export default withRouter(SignInSession);

function SignInSession(props) {
  const [user, setUser] = useState({
    email: '',
    password: '',
    error: null,
  });

  function onSubmit(event) {
    app.auth().signInWithEmailAndPassword(user.email, user.password)
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
    <form onSubmit={onSubmit} >
      <div className="form-group">
        <label htmlFor="exampleInputEmail1">Ton mail bro</label>
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
      <div className="form-group">
        <label for="exampleInputPassword1">ton pass bro</label>
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
        className="btn btn-block btn-primary">
        Se co bro
        </button>

      {user.error &&

        <div class="alert alert-danger rao-paddingSign" role="alert">
          {user.error}
        </div>
      }
    </form >
  );
};