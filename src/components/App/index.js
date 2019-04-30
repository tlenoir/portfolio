import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Navigation from "../Navigation";
import Animation from "../Animation";
import GalleryComponent from "../Gallery";
import ShopComponent from "../Shop";
import MovieComponent from "../Movie";
import Baka from "../Baka";
import * as ROUTES from '../../constants/routes';
import SignIn from '../SignIn';

export default function AppComponent() {
  return (
    <BrowserRouter>
      <div>
        <Navigation />
        <div className="container-fluid">
          <Switch>
            <Route exact path={ROUTES.ANIMATION} component={Animation} />
            <Route exact path={ROUTES.SHOP} component={ShopComponent} />
            <Route exact path={ROUTES.GALLERY} component={GalleryComponent} />
            <Route exact path={ROUTES.MOVIE} component={MovieComponent} />
            <Route exact path={ROUTES.BAKA} component={Baka} />
            <Route exact path={ROUTES.SIGN_IN} component={SignIn} />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  )
};
