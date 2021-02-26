// frontend/src/actions/todos.js

import axios from 'axios';
import { tokenConfig } from './auth';
import { reset } from 'redux-form';
import {  
    GET_TODOS,
    GET_TODO,
    ADD_TODO,
    DELETE_TODO,
    EDIT_TODO,
} from './types';
import {createMessage, returnErrors}from './messages'

// GET TODOS
export const getTodos = () => async (dispatch, getState) => {
    console.log('action', 'getTodos');
    try{
        const res = await axios.get('/api/todos', tokenConfig(getState))
        console.log('action', 'getTodos', res.data)
        dispatch({
            type: GET_TODOS,
            payload: res.data
        });
    }catch(err){
        console.log(err.response.status)
        dispatch(returnErrors(err.response.data,err.response.status))
    }
    
}


// GET TODO
export const getTodo = (id) => async (dispatch, getState) => {
    const res = await axios.get(`/api/todos/${id}`, tokenConfig(getState));
    dispatch({
        type: GET_TODO,
        payload: res.data
    });
}


// ADD TODO
export const addTodo = (formValues) => async (dispatch, getState) => {
    const res = await axios.post(
        '/api/todos/',
        {...formValues},
        tokenConfig(getState)
    )
    try{
        dispatch({
            type: ADD_TODO,
            payload: res.data
        });
    }catch(e){
        
    }
}


// DELETE TODO
export const deleteTodo = (id) => async (dispatch, getState) => {
    await axios.delete(`/api/todos/${id}`, tokenConfig(getState))
    dispatch({
        type: DELETE_TODO
    })
}

// EDIT TODO
export const editTodo = (id, formValues) => async (dispatch, getState) => {
    const res = axios.patch(
        `/api/todos/${id}/`,
        formValues,
        tokenConfig(getState)
    );
    try{
        dispatch({
            type: EDIT_TODO,
            payload: res.data
        })
    }catch(e){
        
    }
}