import React, { Component } from 'react'
import { Link } from  'react-router-dom'
import Axios from 'axios';
import Cookie from 'js-cookie';
import Jwt from 'jwt-decode';

const token = Cookie.get('token')

let decode = ''
if(token){
  decode = Jwt(token)
}
export default class Sidebar extends Component {
    constructor(props){
        super(props)
        this.state = {
          isOpen: false,
          id : decode.id,
          username: '',
          password: '',
          token: ''
        }
      }
    render() {
        return (
            <div>
                    <nav className="navbar-default navbar-static-side" role="navigation">
                        <div className="sidebar-collapse">
                            <ul className="nav metismenu" id="side-menu">
                            <li className="nav-header">
                                <div className="dropdown profile-element">
                                <img alt="User" className="rounded-circle" src="img/profile_small.jpg" />
                                <a data-toggle="dropdown" className="dropdown-toggle" href="fake_url">
                                    <span className="block m-t-xs font-bold">Amudia Kalpa Taruna</span>
                                    <span className="text-muted text-xs block">Admin<b className="caret" /></span>
                                </a>
                                <ul className="dropdown-menu animated fadeInRight m-t-xs">
                                    <li><Link className="dropdown-item" to="/profile">Profile</Link></li>
                                    <li><Link className="dropdown-item" to="/contact">Contacts</Link></li>
                                    <li><Link className="dropdown-item" to="/mailbox">Mailbox</Link></li>
                                    <li className="dropdown-divider" />
                                    <li><Link className="dropdown-item" to="/logout">Logout</Link></li>
                                </ul>
                                </div>
                                <div className="logo-element">
                                BS
                                </div>
                            </li>                            
                            <li>
                                <a href="fake_url"><i className="fa fa-bar-chart-o" /> <span className="nav-label">User Services</span><span className="fa arrow" /></a>
                                <ul className="nav nav-second-level collapse">
                                <li><Link to={`/listuser/${this.state.id}`}>List Users</Link></li>
                                <li><Link to="/cdmarket">Create Users</Link></li>
                                </ul>
                            </li>
                            </ul>
                        </div>
                        </nav>
            </div>

        )
    }
}
