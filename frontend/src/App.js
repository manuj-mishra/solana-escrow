import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import SetID from "./components/Configure";
import Trade from "./components/Trade";

function App() {
  return (
    <div>
      <Router>
          <Switch>
              <Route path = "/" exact component = {() => <Trade/>}/>
              <Route path = "/configure" exact component = {() => <SetID/>}/>
          </Switch>
      </Router>
    </div>
  );
}

export default App;
