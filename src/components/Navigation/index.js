import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import SignOut from '../SignOut';
import { FirebaseContext, withFirebase } from '../Firebase/';

export default withFirebase(Navigation);

function Navigation() {
  const value = useContext(FirebaseContext);
  const user = value.authUser;
  return (
    <>
      {
        user ? <NavigationAuth user={user} /> : <NavigationNonAuth />
      }
    </>
  );
};

function NavigationNonAuth() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="/">Navbar</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto" data-toggle="collapse" data-target="#navbarSupportedContent">
            <li className="nav-item">
              <Link className="nav-link active" to={ROUTES.ANIMATION}>{ROUTES.ANIMATION_NAME}</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" to={ROUTES.GALLERY}>{ROUTES.GALLERY_NAME}</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" to={ROUTES.RANDOM}>{ROUTES.RANDOM_NAME}</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" to={ROUTES.MOVIE}>{ROUTES.MOVIE_NAME}</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" to={ROUTES.BAKA}>{ROUTES.BAKA_NAME}</Link>
            </li>
          </ul>
          <Link to={ROUTES.SIGN_IN}>
            <button className="btn btn-outline-success my-2 my-sm-0"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              type="submit">
              {ROUTES.SIGN_IN_NAME}
            </button>
          </Link>
          <Link to={ROUTES.SIGN_UP}>
            <button className="btn btn-outline-success my-2 my-sm-0"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              type="submit">
              {ROUTES.SIGN_UP_NAME}
            </button>
          </Link>
        </div>
      </nav>
    </div>
  );
};

function NavigationAuth({ user }) {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="/">Navbar</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto" data-toggle="collapse" data-target="#navbarSupportedContent">
            <li className="nav-item">
              <Link className="nav-link active" to={ROUTES.ANIMATION}>{ROUTES.ANIMATION_NAME}</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" to={ROUTES.GALLERY}>{ROUTES.GALLERY_NAME}</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" to={ROUTES.RANDOM}>{ROUTES.RANDOM_NAME}</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" to={ROUTES.MOVIE}>{ROUTES.MOVIE_NAME}</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" to={ROUTES.BAKA}>{ROUTES.BAKA_NAME}</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" to={ROUTES.SHOP}>{ROUTES.SHOP_NAME}</Link>
            </li>
          </ul>
          <SignOut user={user} />
        </div>
      </nav>
    </div>
  );
};