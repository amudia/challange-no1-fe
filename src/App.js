import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import Main from "./components/Main/Main";
import Content from "./components/Content";

class App extends Component {
  render() {
    return (
      <div id="wrapper">
          <Router>
            <Switch>
              <Route path="/" exact render={props => <Main {...props} />} />
              <Route path="/login" render={props => <Login {...props} />} />
              <Route path="/home" render={props => <Home {...props} />} />
              <Content/>
            </Switch>
          </Router>
      </div>
    );
  }
}

export default App;
