import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {APP_URL} from '../../resources/config'
import Axios from 'axios';
import Cookie from 'js-cookie'
import Jwt from 'jwt-decode'
import { connect } from 'react-redux';
import { addUser } from '../../redux/action/useraction';

const token = Cookie.get('token')
let decode = ''
if(token){
    decode = Jwt(token)
}
class Form_create_user extends Component {
    constructor(props){
        super(props)
        this.onSubmit = this.onSubmit.bind(this);
        this.state={       
            roles: decode.roles,
            id_user:'',
            id_role:'',
            id_tenant:'',
            fullname:'',
            username:'',
            password:'',
      }
      }

    //   async onSubmit(){
    //     // event.preventDefault();
    //     const id_role = this.state.id_role
    //     const id_tenant = this.state.id_tenant
    //     const fullname = this.state.fullname
    //     const username = this.state.username
    //     const password = this.state.password
    //     await this.props.dispatch(addUser(id_role, id_tenant, fullname, username, password))
    //     console.log(id_role,id_tenant,fullname, username, password)
    //     alert('success')
    //     window.location='/'
    //   }

      onSubmit =async ()=>{
        const roles = decode.roles
        const url = APP_URL.concat(`user/add`)
        await Axios.post(url, {
             id_role :this.state.id_role,
             id_tenant : this.state.id_tenant,
             fullname : this.state.fullname,
             username : this.state.username,
             password  :this.state.password,
            },
        {headers: {
            Authorization: 'Bearer ' + token,
            id_role:roles
            }})
            alert('success')
            window.location="/home"
        }
        
    //   async onSubmit (event){
    //     event.preventDefault();
    //     const id_role = await this.state.roles
    //     const id_tenant = await this.state.id_tenant
    //     const fullname = await this.state.fullname
    //     const username = await this.state.username
    //     const password = await this.state.password
    //     await this.props.dispatch(addUser({id_role, id_tenant, fullname, username, password}))
    //     alert('Account Success Created!')
    //     window.location = '/'
    //     }
    
    render() {
        return (
            <div>
                <div className="row wrapper border-bottom white-bg page-heading">
                    <div className="col-lg-10">
                        <h2>Edit User</h2>
                        <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <Link to ="/">Home</Link>
                        </li>
                        <li className="breadcrumb-item">
                            <span>Form</span>
                        </li>
                        <li className="breadcrumb-item active">
                            <strong>Edit User</strong>
                        </li>
                        </ol>
                    </div>
                    <div className="col-lg-2">
                    </div>
                </div>
                <div className="wrapper wrapper-content animated fadeInRight">
                    <div className="row">
                        <div className="col-lg-12">
                        <div className="ibox ">
           
                            <div  className="ibox-content">
                            <form method="get">
                                <div className="form-group  row"><label className="col-sm-2 col-form-label">Role</label>
                                <div className="col-sm-10"><input type="text" className="form-control" value={this.state.id_role} onChange={(e)=>this.setState({id_role:e.target.value})}  /></div>
                                </div>
                                <div className="hr-line-dashed" />
                                <div className="form-group  row"><label className="col-sm-2 col-form-label">Tenant</label>
                                <div className="col-sm-10"><input type="text" className="form-control" value={this.state.id_tenant} onChange={(e)=>this.setState({id_tenant:e.target.value})}  /></div>
                                </div>
                                <div className="hr-line-dashed" />
                                <div className="form-group  row"><label className="col-sm-2 col-form-label">Fullname</label>
                                <div className="col-sm-10"><input type="text" className="form-control" value={this.state.fullname} onChange={(e)=>this.setState({fullname:e.target.value})} /></div>
                                </div>
                                <div className="hr-line-dashed" />
                                <div className="form-group  row"><label className="col-sm-2 col-form-label">Username</label>
                                <div className="col-sm-10"><input type="text" className="form-control" value={this.state.username} onChange={(e)=>this.setState({username:e.target.value})} /></div>
                                </div>
                                <div className="hr-line-dashed" />
                                <div className="form-group  row"><label className="col-sm-2 col-form-label">Password</label>
                                <div className="col-sm-10"><input type="text" className="form-control" value={this.state.password} onChange={(e)=>this.setState({password:e.target.value})} /></div>
                                </div>
                                <div className="hr-line-dashed" />
                                <div className="form-group row">
                                <div className="col-sm-4 col-sm-offset-2">
                                    <button className="btn btn-white btn-sm" type="submit">Cancel</button>
                                    <button className="btn btn-primary btn-sm" value="submit" onClick =  {() => this.onSubmit()} >Save changes</button>
                                </div>
                                </div>
                            </form>

                            </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}
const mapStateToProps = state =>{
    return{
      userreducer : state.userreducer,
    }
  }
  
  
  export default connect (mapStateToProps) (Form_create_user)
  