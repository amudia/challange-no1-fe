import React from "react";
import { withRouter } from "react-router-dom";
import Cookie from 'js-cookie'

class Main extends React.Component {
  componentDidMount() {
    const token = Cookie.get("token");
    if (token) {
      this.props.history.push("/home");
    } else {
      this.props.history.push("/login");
    }
  }

  render() {
    return null;
  }
}

export default withRouter(Main);
