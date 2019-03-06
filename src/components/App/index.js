import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Navigation from "../Navigation";
import Animation from "../Animation";
import GalleryComponent from "../Gallery";
import ShopComponent from "../Shop";
import MovieComponent from "../Movie";

export default class AppComponent extends Component {
  render() {
    return (
      <BrowserRouter>
      <div>
        <Navigation />
        <div className="container-fluid">
        <Switch>
          <Route exact path="/animation" component={Animation} />
          <Route exact path="/shop" component={ShopComponent} />
          <Route exact path="/gallery" component={GalleryComponent} />
          <Route exact path="/movie" component={MovieComponent} />
        </Switch>
        </div>
      </div>
      </BrowserRouter>
    )
  }
}
