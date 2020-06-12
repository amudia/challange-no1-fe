import React, { Component } from 'react'
import { Link } from  'react-router-dom'
import Axios from 'axios';
import Cookie from 'js-cookie';
import Jwt from 'jwt-decode';
import {APP_URL} from '../../resources/config'

const token = Cookie.get('token')

let decode = ''
if(token){
  decode = Jwt(token)
}
export default class Header extends Component {
    constructor(props){
        super(props)
        this.state = {
          token: ''
        }
      }

    logout = async () => {
        const url = APP_URL.concat(`user/logout`)
        await Axios.get(url, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
            .then((res) => {
                console.log(token)
                if (res.data.success === true) {
                    Cookie.remove('token')
                    window.location="/"
                }
            })
            .catch((err) => {
                console.log(err)
                alert(err)
            })
    }
    render() {
        return (
            <div>
                <div className="row border-bottom">
                <nav className="navbar navbar-static-top white-bg" role="navigation" style={{marginBottom: 0}}>
                    <div className="navbar-header">
                    <a className="navbar-minimalize minimalize-styl-2 btn btn-primary " href="/"><i className="fa fa-bars" /> </a>
                    <form role="search" className="navbar-form-custom" action="">
                        <div className="form-group">
                        <input type="text" placeholder="Search for something..." className="form-control" name="top-search" id="top-search" />
                        </div>
                    </form>
                    </div>
                    <ul className="nav navbar-top-links navbar-right">
                    <li>
                        <Link onClick={() => {this.logout(); }}>
                        <i className="fa fa-sign-out" /> Log out
                        </Link>
                    </li>
                    <li>
                        <a  className="right-sidebar-toggle">
                        <i className="" />
                        </a>
                    </li>
                    </ul>
                </nav>
                </div>
            </div>
        )
    }
}
