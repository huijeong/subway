import {combineReducers} from 'redux'
import users from './users'
import messages from './messages'
import errors from './errors'
import auth from './auth'
import todos from './todos'
import {reducer as formReducer} from 'redux-form';
import { LOGOUT_SUCCESS } from '../actions/types'

// export default combineReducers({
//     form: formReducer,
//     users,
//     messages,
//     errors,
//     auth,
// });


const appReducer = combineReducers({
    form: formReducer,
    users,
    messages,
    errors,
    auth,
    todos,
});

const rootReducer = (state, action) => {
    if(action.type === LOGOUT_SUCCESS) {
        state = undefined;
    }
    return appReducer(state, action);
};

export default rootReducer;

