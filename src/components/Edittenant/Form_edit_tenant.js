import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {APP_URL} from '../../resources/config'
import Axios from 'axios';
import Cookie from 'js-cookie'
import Jwt from 'jwt-decode'
import { getUserByID } from '../../redux/action/useraction';
import { getTenant, getTenantByID } from '../../redux/action/tenantaction';
import { connect } from 'react-redux';

const token = Cookie.get('token')
let decode = ''
if(token){
    decode = Jwt(token)
}
class Form_edit_tenant extends Component {
    constructor(props){
        super(props)
        this.onSubmit = this.onSubmit.bind(this);
        this.state={
            data : null,
            id_tenant:"",
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
        const url = APP_URL.concat(`tenant/${id}`)
        if(id){
            this.props.dispatch(getTenantByID(id))
            const item = await Axios.get(url, {
                headers: {
                    Authorization: 'Bearer ' + token
                }
              })
            const {data} = item
            this.setState({
                name_tenant:data.data[0].name_tenant, 
                id_tenant:data.data[0].id_tenant,
                 
            })
            this.setState({
                isFetchedDataItem:true,
                paramsId_item : id, 
                isLoading:true,
                  
            })
        }  
    }

    onSubmit =async (id_tenant)=>{
        // const roles = decode.roles
        const {id} = this.props.match.params
        const url = APP_URL.concat(`tenant/${id}`)
        await Axios.put(url, {
            name_tenant : this.state.name_tenant,
            id : id_tenant,
        },
        {headers: {
            Authorization: 'Bearer ' + token,
            // id_role:roles
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
                            <div className="ibox-title">
                            </div>
                            {
                            !this.props.tenantreducer.isLoading&&
                            this.props.tenantreducer.data.map((v, i)=>(
                            <div key={v.id_tenant} className="ibox-content">
                            <form method="get">
                                <div className="form-group  row"><label className="col-sm-2 col-form-label">Name Tenant</label>
                                <div className="col-sm-10"><input type="text" className="form-control" value={this.state.name_tenant} onChange={(e)=>this.setState({name_tenant:e.target.value})} /></div>
                                </div>
           
                                <div className="hr-line-dashed" />
                                <div className="form-group row">
                                <div className="col-sm-4 col-sm-offset-2">
                                    <button className="btn btn-primary btn-sm" type="submit" onClick =  {() => this.onSubmit(this.state.id_tenant)}>Save changes</button>
                                </div>
                                </div>
                            </form>

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
  
  
  export default connect (mapStateToProps) (Form_edit_tenant)
  