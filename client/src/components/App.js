import React from 'react';
import { Route, Switch } from "react-router-dom";
import Login from "./RegisterLogin"
import Register from "./RegisterLogin/register";
import Auth from "../hoc/auth";

function App() {
  return (
    <div >
      <Switch>
        <Route path="/login" component={Auth(Login, null)}  />
        <Route path="/register" component={Auth(Register, null)} />
      </Switch>

    </div>
  );
}

export default App;
