import React from 'react';
import { Route, Switch } from "react-router-dom";
import Chat from "./Chat/Chat"

function App() {
  return (
    <div >
      <Switch>
        <Route path="/" component={Chat} />
      </Switch>

    </div>
  );
}

export default App;
