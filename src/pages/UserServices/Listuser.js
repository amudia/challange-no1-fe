import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {APP_URL} from '../../resources/config'
import axios from 'axios';
import Cookie from 'js-cookie'
import Jwt from 'jwt-decode'
import { getUser } from '../../redux/action/useraction'
import { connect } from 'react-redux';

const token = Cookie.get('token')
let decode = ''
if(token){
  decode = Jwt(token)
}

class Listuser extends Component {
    constructor(props){
        super(props)
        this.state={
            data: null,
            paramsId_item:null,
            paramsId_roles:null,
            iduser:decode.iduser,
            roles:decode.roles,
            isFetched:false,
            isLoading:false,
            isFetchedDataItem:false,

        }
    }

    componentDidMount(){
        const {id} =this.props.match.params
        const {iduser} =this.props.match.params
        const token = Cookie.get("token");
        if (token) {
          this.props.history.push(`/listuser/${id}`);
        } else {
          this.props.history.push("/login");
        }
        this.props.dispatch(getUser(id))
        console.log(this.state.roles)
        this.setState(
          {isFetchedDataItem:true, paramsId_item : id})
        }

    deleteCart = async (id) =>{
        const roles = decode.roles
        const url = APP_URL.concat(`user/${id}`)
        await axios.delete(url, {
            headers: {
                Authorization: 'Bearer ' + token,
                id_role: roles
            }
          })  
        this.setState({isFetchedDataItem: false})
        this.componentDidMount();
        alert('Thanks')
        }
        
    render() {
        const iduser = this.props
        return (
            <div>
                <div className="row wrapper border-bottom white-bg page-heading">
                    <div className="col-lg-10">
                        <h2>Users</h2>
                        <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <Link to="/">Home</Link>
                        </li>
                        <li className="breadcrumb-item">
                            <span>Table</span>
                        </li>
                        <li className="breadcrumb-item active">
                            <strong>User</strong>
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
                            <div className="ibox-title">
                            <h5>Users</h5>
                          
                            </div>
                            <div  className="ibox-content">

                            <div className="table-responsive">
                                <table className="table table-striped table-bordered table-hover dataTables-example">
                                <thead>
                                    <tr>
                                    <th>Username</th>
                                    <th>Full Name</th>
                                    <th>Roles</th>
                                    <th>Tenant</th>
                                    <th>Created On</th>
                                    <th>Updated On</th>
                                    {this.state.roles===1 || this.state.roles===2?
                                    <th className="text-center">Action</th>
                                    :
                                    <text></text>
                                    }
                                    </tr>
                                </thead>
                            {
                             !this.props.userreducer.isLoading&&this.props.userreducer.data&&
                             this.props.userreducer.data.map((v, i)=>(
                                <tbody key={v.id_role} >
                                    <tr className="gradeX">
                                    <td>{v.username}</td>
                                    <td>{v.fullname}</td>
                                    <td>{v.name_role}</td>
                                    <td>{v.name_tenant}</td>
                                    <td>{v.created_on}</td>
                                    <td>{v.updated_on}</td>
                                    {this.state.roles===1 || this.state.roles===2?
                                    <td class="text-center">
                                        <div class="btn-group">
                                            <Link to={`/edituser/${v.id_user}`} class="btn-success btn btn-xs">Edit</Link>
                                            <button onClick = {()=>this.deleteCart(v.id_user)} class="btn-danger btn btn-xs">Delete</button>
                                        </div>
                                    </td>
                                    :
                                    <br/>
                                    }
                                    </tr>
                                </tbody>
                                ))}
                                </table>
                            </div>
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
export default connect (mapStateToProps) (Listuser)
  