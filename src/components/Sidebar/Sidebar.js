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
export default class Sidebar extends Component {
    constructor(props){
        super(props)
        this.state = {
          roles : decode.roles,
          id : decode.id,
          iduser: decode.iduser,
          token: '',
          isFetched:false,
          data:null
        }
      }
    async componentDidMount(){
    const {iduser} = this.state
    const url = APP_URL.concat(`user/profile/${iduser}`)
    if(iduser == decode.iduser){
        const users = await Axios.get(url, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
        const {data} = users
        this.setState({data, isFetched:!this.state.isFetched})
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
        const {isFetched, data}=this.state
        return (
            <div>
                <nav className="navbar-default navbar-static-side" role="navigation">
                    <div className="sidebar-collapse">
                        <ul className="nav metismenu" id="side-menu">
                        <li className="nav-header">
                        {isFetched&&data.data.map(v=>{
                        return(
                            <div key={v.id_user} className="dropdown profile-element">
                            <img alt="User" className="rounded-circle" src="img/profile_small.jpg" />
                            <a data-toggle="dropdown" className="dropdown-toggle" href="/">
                                <span className="block m-t-xs font-bold">{v.fullname} </span>
                                <span className="block m-t-xs font-bold">{v.name_tenant} </span>
                                <span className="text-muted text-xs block">{v.name_role}<b className="caret" /></span>
                            </a>
                            <ul className="dropdown-menu animated fadeInRight m-t-xs">
                                <li><Link className="dropdown-item" to="/">Profile</Link></li>
                                <li className="dropdown-divider" />
                                <li><Link onClick={() => {this.logout(); }} type="submit" value="submit">Logout</Link></li>
                            </ul>
                            </div>
                            )
                        })}
                            <div className="logo-element">
                            BS
                            </div> 
                        </li> 
                        {this.state.roles===1 || this.state.roles===2?                           
                        <li>
                            <a style={{color:'#fff'}}><i className="fa fa-bar-chart-o" /> <span className="nav-label">User Services</span><span className="fa arrow" /></a>
                            <ul className="nav nav-second-level collapse">
                            <li><Link to={`/listuser/${this.state.id}`}>List Users</Link></li>
                            <li><Link to="/createuser">Create Users</Link></li>
                            </ul>
                        </li>
                        :
                        <li>
                            <a style={{color:'#fff'}}><i className="fa fa-bar-chart-o" /> <span className="nav-label">User Services</span><span className="fa arrow" /></a>
                            <ul className="nav nav-second-level collapse">
                            <li><Link to={`/listuser/${this.state.id}`}>List Users</Link></li>
                        </ul>
                        </li>
                        }
                        </ul>
                    </div>
                </nav>
            </div>

        )
    }
}
