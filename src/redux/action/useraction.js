import axios from 'axios'
import {APP_URL} from '../../resources/config'
import Cookie from 'js-cookie'
import Jwt from 'jwt-decode'

const token = Cookie.get('token')
let decode = '' 
if (token) {
    decode = Jwt(token)
}
export const getUser = (id) => {
    const roles = decode.roles
    const url = APP_URL.concat(`user/${id}`)
    return {
      type: 'GET_USER',
      payload: axios.get(url, {
          headers: {
              Authorization: 'Bearer ' + token,
              id_role: roles
          }
        })      
    }
}

export const getUserByID = (id) => {
    const url = APP_URL.concat(`user/profile/${id}`)
    return {
        type: 'GET_USERBYID',
        payload: axios.get(url, {
            headers: {
                Authorization: 'Bearer ' + token,
            }
          })
    }
}

export const editUser = (fullname, id_tenant,id)=>{
    const roles = decode.roles
    const url = APP_URL.concat(`user/edit/${id}`)
    return {
      type: 'PUT_USER',
      payload: axios.post(url,{
        fullname, id_tenant, id,
        headers: {
            Authorization: 'Bearer ' + token,
            id_role: roles

        }
    })
    }
  }
