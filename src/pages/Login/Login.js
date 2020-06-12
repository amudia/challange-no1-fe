import React, { Component } from 'react'
import { withRouter } from "react-router-dom";
import FormLogin from "../../components/Auth/FormLogin"
import Cookie from 'js-cookie'

class Login extends Component {
  componentDidMount = () => {
    const token = Cookie.get("token");
    if (token) {
      this.props.history.push("/home");
    } else {
      this.props.history.push("/login");
    }
  };

    render() {
        
        return (
            <div>
                <FormLogin/>
            </div>
        )
    }
}

export default withRouter(Login);
