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