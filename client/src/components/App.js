import React from 'react';
import { Route, Switch } from "react-router-dom";
import Chat from "./Chat/Chat"
import Login from "./RegisterLogin"
import Register from "./RegisterLogin/register";

function App() {
  return (
    <div >
      <Switch>
        <Route exact path="/" component={Chat} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
      </Switch>

    </div>
  );
}

export default App;
