import axios from 'axios'
import {APP_URL} from '../../resources/config'
import Cookie from 'js-cookie'
import Jwt from 'jwt-decode'

const token = Cookie.get('token')
let decode = '' 
if (token) {
    decode = Jwt(token)
}

export const getTenant = ()=>{ 
    const url = APP_URL.concat(`tenant`)
    return {
        type: 'GET_TENANT',
        payload: axios.get(url, {
            headers: {
                Authorization: 'Bearer ' + token,
            }
          })
        }
    }


    export const getTenantByID = (id) => {
        const url = APP_URL.concat(`tenant/${id}`)
        return {
            type: 'GET_TENANTBYID',
            payload: axios.get(url, {
                headers: {
                    Authorization: 'Bearer ' + token,
                }
              })
        }
    }