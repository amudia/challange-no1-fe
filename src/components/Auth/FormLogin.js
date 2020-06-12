import React, { Component } from 'react'
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Axios from 'axios'
import {APP_URL} from '../../resources/config'
import Cookie from 'js-cookie'


class FormLogin extends Component {
    state = {
        username: "",
        password: "",
        token: "",
      };
    login = async () => {
      const url = APP_URL.concat(`user/login`)
      await Axios.post(url, {
        username: this.state.username,
        password: this.state.password
      })
      .then((res) => {
        this.setState({
          token: res.data.auth
        })
        if (this.state.token) {
          Cookie.set("token",this.state.token)
          window.location="/home"
              }
              if (res.data.success === false) {
                alert('Incorrect Username or Password')
              }
          })
          .catch((err) => {
              console.log(err)
              alert(err)
            })
      }            
    render() {
      let { username, password } = this.state
      return (
            <div>
                <div className="middle-box text-center loginscreen animated fadeInDown">
                    <div>
                        <p>Login in. To see it in action.</p>
                        <form className="m-t">
                            <div className="form-group">
                                <input type="text" className="form-control" value={username} placeholder="Username" onChange={e => {this.setState({ username: e.target.value });}}/>
                            </div>
                            <div className="form-group">
                                <input type="password" className="form-control" value={password} placeholder="Password" onChange={e => {this.setState({ password: e.target.value });}}/>
                            </div>
                            <button type="submit" value="submit" className="btn btn-primary block full-width m-b" onClick={() => {this.login(); }}>Login</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = user => {
    return {
      user
    };
  };
  
export default withRouter(connect(mapStateToProps)(FormLogin));

