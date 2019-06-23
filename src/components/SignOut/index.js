import React from 'react';
import { withRouter } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import app from 'firebase/app';
import { useAuthState } from 'react-firebase-hooks/auth';
import 'firebase/auth';

const firebase = app;
export default withRouter(SignOutButton);

function SignOutButton(props) {
  const [user] = useAuthState(firebase.auth());
  function logout() {
    firebase.auth().signOut()
      .then(() =>
        props.history.push(ROUTES.HOME)
      );
  };
  return (
    <button className="btn btn-outline-success my-2 my-sm-0"
      type="submit" onClick={logout}>
      {user.displayName}
    </button>
  )
};