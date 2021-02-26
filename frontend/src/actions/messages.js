import {CREATE_MESSAGE, GET_ERRORS, AUTH_ERROR} from './types';

//CREATE MESSAGE
export const createMessage = (msg) => {
    return {
        type: CREATE_MESSAGE,
        payload: msg,
    }
}

//ERROR MESSAGE
export const returnErrors = (msg, status) =>{
    switch(status){
        case 401:
            return {
                type: AUTH_ERROR,
                payload: {msg, status}
            }
        default:
            return {
                type: GET_ERRORS,
                payload: {msg, status}
            }
    }
    
}