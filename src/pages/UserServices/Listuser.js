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

            roles:decode.roles,
            isFetched:false,
            isLoading:false,
            isFetchedDataItem:false,

            }
    }

    async componentDidMount(){
    //     const {id} = this.props.match.params
    //     // const roles = this.state.roles
    //     const url = APP_URL.concat(`user/${id}`)
    //     if((id == decode.id)){
    //     this.props.dispatch(getUser(id))
    //     const item = await axios.get(url, {
    //       headers: {
    //           Authorization: 'Bearer ' + token,
    //         //   id_role: roles  
    //       }
          
    //     })
    //     const {data} = item
    //     this.setState({data, isFetched:!this.state.isFetched})
    // }
    // console.log(roles)

        const {id} =this.props.match.params
        // const {roles} = this.props.match.params
        this.props.dispatch(getUser(id))
        console.log(this.state.roles)
        this.setState(
          {isFetchedDataItem:true, paramsId_item : id})
        }
    render() {
        return (
            <div>
                <div className="row wrapper border-bottom white-bg page-heading">
                    <div className="col-lg-10">
                        <h2>Data Tables</h2>
                        <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <Link to="/dashboard">Home</Link>
                        </li>
                        <li className="breadcrumb-item">
                            <span>Tables</span>
                        </li>
                        <li className="breadcrumb-item active">
                            <strong>Users</strong>
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
                            <h5>Users Table</h5>
                            <div className="ibox-tools">
                                <a href="fake_url" className="collapse-link">
                                <i className="fa fa-chevron-up" />
                                </a>
                                <a className="dropdown-toggle" data-toggle="dropdown" href="fake_url">
                                <i className="fa fa-wrench" />
                                </a>
                                <ul className="dropdown-menu dropdown-user">
                                <li><a href="fake_url" className="dropdown-item">Config option 1</a>
                                </li>
                                <li><a href="fake_url" className="dropdown-item">Config option 2</a>
                                </li>
                                </ul>
                                <a href="fake_url" className="close-link">
                                <i className="fa fa-times" />
                                </a>
                            </div>
                            </div>
                            <div  className="ibox-content">

                            <div className="table-responsive">
                                <table className="table table-striped table-bordered table-hover dataTables-example">
                                <thead>
                                    <tr>
                                    <th>ID User</th>
                                    <th>Roles</th>
                                    <th>Tenant</th>
                                    <th>Full Name</th>
                                    <th>Created On</th>
                                    <th>Updated On</th>
                                    <th className="text-center">Action</th>
                                    </tr>
                                </thead>
                            {
                             !this.props.userreducer.isLoading&&this.props.userreducer.data&&
                             this.props.userreducer.data.map((v, i)=>(
                                <tbody key={v.id_role} >
                                    <tr className="gradeX">
                                    <td>{v.id_user}</td>
                                    <td>{v.name_role}</td>
                                    <td>{v.name_tenant}</td>
                                    <td>{v.fullname}</td>
                                    <td>{v.created_on}</td>
                                    <td>{v.updated_on}</td>
                                    <td class="text-center">
                                        <div class="btn-group">
                                            <Link to="/edit_user" class="btn-success btn btn-xs">Edit</Link>
                                            <button class="btn-danger btn btn-xs">Delete</button>
                                        </div>
                                    </td>

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
  