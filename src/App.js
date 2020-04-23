import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import "./App.css";
import Home from "./routes/Home";
import Login from "./routes/Login";
import Register from "./routes/Register";

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path={"/Register"} component={Register} />
          <Route path={"/Login"} component={Login} />
          <Route path={"/Home"} component={Home} />
          <Redirect from="/" to={"/login"} />
        </Switch>
      </Router>
    );
  }
}

export default App;
