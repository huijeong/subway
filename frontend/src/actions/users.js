import axios from 'axios'
import {createMessage, returnErrors}from './messages'
import {GET_USERS, ADD_USER, DELETE_USER} from './types'

import { tokenConfig } from './auth'

// GET USERS
export const getUser = () => (dispatch, getState) => {
    axios
        .get('/api/accounts', tokenConfig(getState))
        .then((res) => {
            // console.log('action users', res.data)
            dispatch({
                type: GET_USERS,
                payload: res.data,
            });
        })
        .catch((err)=> dispatch(returnErrors(err.response.data,err.response.status)))
};


// ADD USER
export const addUser = (user) => (dispatch, getState) => {
    axios 
        .post('/api/accounts/', user, tokenConfig(getState))
        .then((res)=>{
            dispatch(createMessage({addUser: 'User Added'}));
            dispatch({
                type: ADD_USER,
                payload: res.data
            })
        })
        .catch((err)=>dispatch(returnErrors(err.response.data, err.response.status)))
}

// DEL USER
export const deleteUser = (id) => (dispatch, getState) => {
    axios
        .delete(`/api/accounts/${id}`, tokenConfig(getState))
        .then((res)=>{
            dispatch(createMessage({deleteUser: 'User Deleted'}));
            dispatch({
                type: DELETE_USER,
                payload: id,
            })
        })
        .catch((err)=> console.log(err));
}
