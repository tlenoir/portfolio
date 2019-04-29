import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Navigation from "../Navigation";
import Animation from "../Animation";
import GalleryComponent from "../Gallery";
import ShopComponent from "../Shop";
import MovieComponent from "../Movie";
import Baka from "../Baka";
import * as ROUTES from '../../constants/routes';
import app from 'firebase/app';
import SignIn from '../SignIn';

/* 
import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';
 */
const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEYS,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
};
/* firebase initialize */
app.initializeApp(config);

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
