// frontend/src/actions/auth.js

import axios from 'axios';
import { stopSubmit } from 'redux-form'

import {
    USER_LOADING,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
} from './types'

// LOAD USER
export const loadUser = () => async (dispath, getState) => {
    dispath({type: USER_LOADING});

    try{
        const res = await axios.get('/api/auth/user', tokenConfig(getState));
        dispath({
            type: USER_LOADED,
            payload: res.data
        })
    }catch(err){
        dispath({
            type: AUTH_ERROR
        });
    }
}


// LOGIN USER
export const login = ({ email, password }) => async dispath => {
    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    // Request Body
    const body = JSON.stringify({email, password});

    try{
        const res = await axios.post('/api/auth/login', body, config);
        dispath({
            type: LOGIN_SUCCESS,
            payload: res.data
        })
    }catch(err){
        dispath({
            type: LOGIN_FAIL
        });
        dispath(stopSubmit('loginForm', err.response.data));
    }
}


// Helper Function
export const tokenConfig = (getState) => {
    // Get token
    const token = getState().auth.token;

    // Headers
    const config = {
        headers: {
            'Content-Type' :'application/json'
        }
    };

    if(token){
        config.headers['Authorization'] = `Token ${token}`
    }

    return config;
}


// logout function
export const logout = () => async (dispatch, getState) => {
    await axios.post('/api/auth/logout', null, tokenConfig(getState));
    dispatch({
        type: LOGOUT_SUCCESS
    })
}

// register user
export const register = ({nickname, email, password}) => async dispatch => {
    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({nickname, email, password});
    try{
        const res = await axios.post('/api/auth/register', body, config);
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        });
    }catch(err){
        dispatch({
            type: REGISTER_FAIL
        });
        dispatch(stopSubmit('registerView', err.response.data))
    }
};