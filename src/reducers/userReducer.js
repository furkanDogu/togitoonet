import {
    ON_LOGIN_SUCCESS,
    ON_LOGIN_FAIL,
    LOG_OUT,
    HIDE_ERROR_MODAL,
    SET_EMPLOYEES
} from '../actions/types';
const INITIAL_STATE = {
    email: '',
    token: '',
    name: '',
    userID: '',
    role: '',
    isLoginFailed: false,
    employees: []
};

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case ON_LOGIN_SUCCESS:
            sessionStorage.setItem('jwtToken', action.payload.token);
            return {...state, 
                token: action.payload.token,
                name: action.payload.name,
                userID: action.payload.userID,
                email: action.payload.email,
                role: action.payload.role
             };
        case LOG_OUT:
            sessionStorage.removeItem('jwtToken');
            return {...state, token: ''};
        case ON_LOGIN_FAIL:
             return {...state, isLoginFailed: true };
        case HIDE_ERROR_MODAL:
             return {...state, isLoginFailed: false };
        case SET_EMPLOYEES: 
             return {...state, employees: action.payload.result }
        default: return state;

    }
}