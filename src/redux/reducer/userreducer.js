const initialState ={
    data:[],
    isLoading: false,
    isError:false,
    isSuccess: true
}

const userreducer = (state = initialState, action) => {
    switch(action.type){
        case 'GET_USER_PENDING':
            return {
                ...state,
                isLoading:true,
                isError:false,
            }
        case 'GET_USER_REJECTED':
            return {
                ...state,
                isLoading: false,
                isError:true,
            }
        case 'GET_USER_FULFILLED':
            return{
                ...state,        
                data: action.payload.data.data,
                isLoading:false,
                isError:false,
                  }
        case 'GET_USERBYID_PENDING':
            return {
                ...state,
                isLoading:true,
                isError:false,
            }
        case 'GET_USERBYID_REJECTED':
            return {
                ...state,
                isLoading: false,
                isError:true,
            }
        case 'GET_USERBYID_FULFILLED':
            return{
                ...state,        
                data: action.payload.data.data,
                isLoading:false,
                isError:false,
                  }
                  case 'PUT_USER_PENDING':
                    return {
                      ...state,
                      isLoading: true,
                    }
                  case 'PUT_USER_REJECTED':
                    return {
                      ...state,
                      isError: true
                    }
                  case 'PUT_USER_FULFILLED':
                    return {
                      data: action.payload.data.data,
                    }
        default :
        return state
    }
}

export default userreducer