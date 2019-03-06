import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navigation extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="#">Navbar</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto" data-toggle="collapse" data-target="#navbarSupportedContent">
              <li className="nav-item">
                <Link className="nav-link active" to='/animation'>Animation</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to='/gallery'>Gallery</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to='/shop'>Shop</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to='/animation'>Movie</Link>
              </li>
            </ul>
            <form className="form-inline my-2 my-lg-0">
              <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
              <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            </form>
          </div>
        </nav>
      </div>
    )
  }
}
