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
class Form_create_tenant extends Component {
    constructor(props){
        super(props)
        this.onSubmit = this.onSubmit.bind(this);
        this.state={       
            roles: decode.roles,
            id_user:'',
            name_tenant:'',
      }
      }

      onSubmit =async ()=>{
        // const roles = decode.roles
        const url = APP_URL.concat(`tenant`)
        await Axios.post(url, {
             name_tenant :this.state.name_tenant,
            },
        {headers: {
            Authorization: 'Bearer ' + token,
            // id_role:roles
            }})
            alert('success')
            window.location="/home"
        }       
    
    render() {
        return (
            <div>
                <div className="row wrapper border-bottom white-bg page-heading">
                    <div className="col-lg-10">
                        <h2>Edit Tenant</h2>
                        <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <Link to ="/">Home</Link>
                        </li>
                        <li className="breadcrumb-item">
                            <span>Form</span>
                        </li>
                        <li className="breadcrumb-item active">
                            <strong>Edit Tenant</strong>
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
                                <div className="form-group  row"><label className="col-sm-2 col-form-label">Name Tenant</label>
                                <div className="col-sm-10"><input type="text" className="form-control" value={this.state.name_tenant} onChange={(e)=>this.setState({name_tenant:e.target.value})}  /></div>
                                </div>
                                <div className="hr-line-dashed" />
                                <div className="form-group row">
                                <div className="col-sm-4 col-sm-offset-2">
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
  
  
  export default connect (mapStateToProps) (Form_create_tenant)
  