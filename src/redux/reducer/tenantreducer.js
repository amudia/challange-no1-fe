const initialState ={
    data:[],
    isLoading: false,
    isError:false,
    isSuccess: true
}

const tenantreducer = (state = initialState, action) => {
    switch(action.type){
        case 'GET_TENANT_PENDING':
            return {
                ...state,
                isLoading:true,
                isError:false,
            }
        case 'GET_TENANT_REJECTED':
            return {
                ...state,
                isLoading: false,
                isError:true,
            }
        case 'GET_TENANT_FULFILLED':
            return{
                ...state,        
                data: action.payload.data.data,
                isLoading:false,
                isError:false,
                  }
                  case 'GET_TENANTBYID_PENDING':
            return {
                ...state,
                isLoading:true,
                isError:false,
            }
        case 'GET_TENANTBYID_REJECTED':
            return {
                ...state,
                isLoading: false,
                isError:true,
            }
        case 'GET_TENANTBYID_FULFILLED':
            return{
                ...state,        
                data: action.payload.data.data,
                isLoading:false,
                isError:false,
                  }
        default :
        return state
    }
}

export default tenantreducer