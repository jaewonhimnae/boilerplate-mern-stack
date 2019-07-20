import React from 'react';
import { Route, Switch } from "react-router-dom";
import Chat from "./Chat/Chat"
import Login from "./RegisterLogin"
import Register from "./RegisterLogin/register";
import Auth from "../hoc/auth";

function App() {
  return (
    <div >
      <Switch>
        <Route exact path="/" component={Auth(Chat, null)} />
        <Route path="/login" component={Auth(Login, null)}  />
        <Route path="/register" component={Auth(Register, null)} />
      </Switch>

    </div>
  );
}

export default App;
