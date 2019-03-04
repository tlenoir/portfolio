import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Navigation from "../Navigation";
import Animation from "../Animation";
import Gallery from "../Gallery";

export default class AppComponent extends Component {
  render() {
    return (
      <BrowserRouter>
      <div>
        <Navigation />
        <div className="container-fluid">
        <Switch>
          <Route exact path="/animation" component={Animation} />
          <Route exact path="/" component={Gallery} />
        </Switch>
        </div>
      </div>
      </BrowserRouter>
    )
  }
}
