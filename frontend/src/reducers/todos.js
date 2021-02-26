import _ from 'lodash';
// import actions from 'redux-form/lib/actions';
import {  
    GET_TODOS,
    GET_TODO,
    ADD_TODO,
    DELETE_TODO,
    EDIT_TODO,
} from '../actions/types';

const initialState = {
    todos: []
}

export default (state=initialState, action) => {
    console.log('reducer', 'todos.js', action.type, action.payload);
    switch(action.type) {
        case GET_TODOS:
            console.log('reducer', 'GET_TODS', action.payload)
            return {
                ...state,
                todos: action.payload,
                ..._.mapKeys(action.payload, 'id')
            };
        case GET_TODO:
            return {
                ...state,
                todo: action.payload
            };
        case ADD_TODO:
        case EDIT_TODO:
            return {
                ...state,
                [action.payload.id] : action.payload
            };
        case DELETE_TODO:
            return _.omit(state, action.payload);
        default:
            return state;
    }
}