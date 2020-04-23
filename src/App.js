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
          <Route path={"/reg"} component={Register} />
          <Route path={"/login"} component={Login} />
          <Route path={"/home"} component={Home} />
          <Redirect from="/" to={"/login"} />
        </Switch>
      </Router>
    );
  }
}

export default App;
