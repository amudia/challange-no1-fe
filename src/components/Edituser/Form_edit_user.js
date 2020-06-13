import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {APP_URL} from '../../resources/config'
import Axios from 'axios';
import Cookie from 'js-cookie'
import Jwt from 'jwt-decode'
import { getUserByID } from '../../redux/action/useraction';
import { getTenant } from '../../redux/action/tenantaction';
import { connect } from 'react-redux';

const token = Cookie.get('token')
let decode = ''
if(token){
    decode = Jwt(token)
}
class Form_edit_user extends Component {
    constructor(props){
        super(props)
        this.onSubmit = this.onSubmit.bind(this);
        this.state={
            data : null,
            id_tenant:"",
            fullname:"",
            id_user:"",
            name_tenant:"",
            iduser:decode.iduser,
            roles:decode.roles,
            isFetched:false,
            isFetchedDataItem:false,
            paramsId_item : null,
            isLoading: false,
            id: this.props.match.params
      }
      }

    async componentDidMount(){
        const {id} =this.props.match.params
        this.props.dispatch(getTenant())
        const url = APP_URL.concat(`user/profile/${id}`)
        if(id){
            this.props.dispatch(getUserByID(id))
            const item = await Axios.get(url, {
                headers: {
                    Authorization: 'Bearer ' + token
                }
              })
            const {data} = item
            this.setState({
                fullname:data.data[0].fullname, 
                name_tenant:data.data[0].name_tenant, 
                id_tenant:data.data[0].id_tenant,
                id_user:data.data[0].id_user,
                 
            })
            console.log(data)
            this.setState({
                isFetchedDataItem:true,
                paramsId_item : id, 
                isLoading:true,
                  
            })
        }  
    }

    onSubmit =async (id_user)=>{
        const roles = decode.roles
        const {id} = this.props.match.params
        const url = APP_URL.concat(`user/edit/${id}`)
        await Axios.post(url, {
            fullname : this.state.fullname,
            id_tenant : this.state.id_tenant,
            id : id_user,
        },
        {headers: {
            Authorization: 'Bearer ' + token,
            id_role:roles
            }})
            window.location="/home"
        }
        
    render() {
        const {paramsId_item } = this.state
        if (paramsId_item != this.props.match.params.id && paramsId_item != null){
            this.componentDidMount()
        }
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
                            <div className="ibox-title">
                            </div>
                            {
                            !this.props.userreducer.isLoading&&
                            this.props.userreducer.data.map((v, i)=>(
                            <div key={v.id_user} className="ibox-content">
                            {this.state.roles===1?                           
                            <form method="get">
                                <div className="form-group  row"><label className="col-sm-2 col-form-label">Fullname</label>
                                <div className="col-sm-10"><input type="text" className="form-control" value={this.state.fullname} onChange={(e)=>this.setState({fullname:e.target.value})} /></div>
                                </div>
                                <div className="hr-line-dashed" />
                                <div class="form-group row"><label class="col-sm-2 col-form-label">Name Tenant</label>
                                <div key={v.id_tenant} class="col-sm-10">
                                    <select class="form-control m-b" name="account" onChange={(e) => this.setState({id_tenant: e.target.value})} >
                                    <option defaultValue value={v.id_tenant}>{v.name_tenant} </option>
                                {
                                this.props.tenantreducer.data.map(v=>(
                                    <option value={v.id_tenant}>{v.name_tenant}</option>
                                    ))}
                                </select>
                                </div>
                                </div>
                                <div className="hr-line-dashed" />
                                <div className="form-group row">
                                <div className="col-sm-4 col-sm-offset-2">
                                    <button className="btn btn-white btn-sm" type="submit">Cancel</button>
                                    <button className="btn btn-primary btn-sm" type="submit" onClick =  {() => this.onSubmit(this.state.id_user)}>Save changes</button>
                                </div>
                                </div>
                            </form>
                            :
                            <form method="get">
                            <div className="form-group  row"><label className="col-sm-2 col-form-label">Fullname</label>
                            <div className="col-sm-10"><input type="text" className="form-control" value={this.state.fullname} onChange={(e)=>this.setState({fullname:e.target.value})} /></div>
                            </div>
                            {/* <div className="form-group  row"><label className="col-sm-2 col-form-label">Name Tenant</label>
                            <div className="col-sm-10"><input type="text" className="form-control" value={this.state.id_tenant} onChange={(e)=>this.setState({id_tenant:e.target.value})} /></div>
                            </div> */}
                            <div className="hr-line-dashed" />
                            <div className="form-group  row"><label className="col-sm-2 col-form-label">Name Tenant</label>
                            <div className="col-sm-10"><input type="text" disabled="text" className="form-control" value={this.state.id_tenant} onChange={(e)=>this.setState({id_tenant:e.target.value})} /></div>
                            </div>
                            <div className="hr-line-dashed" />
                            <div className="form-group row">
                            <div className="col-sm-4 col-sm-offset-2">
                                <button className="btn btn-white btn-sm" type="submit">Cancel</button>
                                <button className="btn btn-primary btn-sm" type="submit" onClick =  {() => this.onSubmit(this.state.id_user)}>Save changes</button>
                            </div>
                            </div>
                        </form>
                                }
                            </div>
                            ))}                        
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
      tenantreducer : state.tenantreducer
    }
  }
  
  
  export default connect (mapStateToProps) (Form_edit_user)
  