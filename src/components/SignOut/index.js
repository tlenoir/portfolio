import React from 'react';
import { withRouter } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import app from 'firebase/app';
import 'firebase/auth';

function SignOutButton(props) {
  const value = props.user;

  function logout() {
    app.auth().signOut()
      .then(() =>
        props.history.push(ROUTES.HOME)
      );
  };

  return (
    <button className="btn btn-outline-success my-2 my-sm-0"
      type="submit" onClick={logout}>
      {value.displayName}
    </button>
  )
};

export default withRouter(SignOutButton);