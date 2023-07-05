import React from "react";

import "./css/App.css";
import HomeScreen from "./HomeScreen";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./Login"

function App() {
  var user = null;

  return (
    <div className="app">
      <Router>
        {user ? (
          <Switch>
          <Route exact path="/">
            <HomeScreen />
          </Route>
          <Route path="/hello">
            <h1>Hello World</h1>
          </Route>
        </Switch>
        ):(
          <Switch>
          <Route exact path="/">
            <Login/>
          </Route>
          <Route path="/login">
            <Login login={true}/>
          </Route>
        </Switch>
        )}
        
      </Router>
    </div>
  );
}

export default App;
