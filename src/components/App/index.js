import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import * as ROUTES from '../../constants/routes';
import Navigation from "../Navigation";

export default function AppComponent() {
  return (
    <BrowserRouter>
      <div>
        <Navigation>
          <div className="container-fluid">
            <Switch>
              <Route exact path={ROUTES.ANIMATION} component={ROUTES.ANIMATION_COMPONENT} />
              <Route exact path={ROUTES.SHOP} component={ROUTES.SHOP_COMPONENT} />
              <Route exact path={ROUTES.RANDOM} component={ROUTES.RANDOM_COMPONENT} />
              <Route exact path={ROUTES.GALLERY} component={ROUTES.GALLERY_COMPONENT} />
              <Route exact path={ROUTES.MOVIE} component={ROUTES.MOVIE_COMPONENT} />
              <Route exact path={ROUTES.BAKA} component={ROUTES.BAKA_COMPONENT} />
              <Route exact path={ROUTES.SIGN_IN} component={ROUTES.SIGN_IN_COMPONENT} />
              <Route exact path={ROUTES.SIGN_UP} component={ROUTES.SIGN_UP_COMPONENT} />
            </Switch>
          </div>
        </Navigation>
      </div>
    </BrowserRouter>
  )
};
