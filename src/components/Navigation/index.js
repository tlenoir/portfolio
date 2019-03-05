import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navigation extends Component {
  render() {
    return (
      <div>
        <ul className="nav justify-content-center">
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
      </div>
    )
  }
}
