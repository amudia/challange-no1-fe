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

export const addUser = (id_role, id_tenant, fullname, username, password)=>{
    // const roles = decode.roles
    const url = APP_URL.concat(`user/add`)
    return {
      type: 'POST_USER',
      payload: axios.post(url,{
        id_role, id_tenant, fullname, username, password,
        headers: {
            Authorization: 'Bearer ' + token,
            // id_role: roles
        }
    })
    }
  }
