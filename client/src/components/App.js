import React, { Suspense } from 'react';
import { Route, Switch } from "react-router-dom";
import Auth from "../hoc/auth";
// pages for this product
import LandingPage from "./views/LandingPage/LandingPage.js";
import LoginPage from "./views/LoginPage/LoginPage.js";
import RegisterPage from "./views/RegisterPage/RegisterPage.js";

function App() {
  return (
    <Switch>
      <Suspense fallback={(<div>Loading</div>)}>
        <Route exact path="/" component={Auth(LandingPage, null)} />
        <Route exact path="/login" component={Auth(LoginPage, null)} />
        <Route exact path="/register" component={Auth(RegisterPage, null)} />
      </Suspense>
    </Switch>
  );
}

export default App;
