import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { Provider } from "react-redux";
import store from "./redux/store";

import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import Main from "./components/Main/Main";
// import Listuser from "./pages/UserServices/listuser";
import Content from "./components/Content";

class App extends Component {
  render() {
    return (
      <div>
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
