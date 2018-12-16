import {
    ON_LOGIN_SUCCESS,
    ON_LOGIN_FAIL,
    LOG_OUT,
    HIDE_ERROR_MODAL,
    SET_EMPLOYEES,
    SET_CANDIDATES_AND_USERS,
    SET_REGISTERED_BY_USER
} from '../actions/types';
const INITIAL_STATE = {
    email: '',
    token: '',
    name: '',
    userID: '',
    role: '',
    departmanID: '',
    isLoginFailed: false,
    employees: [],
    candidates: [],
    users: [],
    registeredProductsByUser: []
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
                role: action.payload.role,
                departmanID: action.payload.departmanID
             };
        case LOG_OUT:
            sessionStorage.removeItem('jwtToken');
            return {...state, token: ''};
        case ON_LOGIN_FAIL:
             return {...state, isLoginFailed: true };
        case HIDE_ERROR_MODAL:
             return {...state, isLoginFailed: false };
        case SET_EMPLOYEES: 
             return {...state, employees: action.payload.result };
        case SET_CANDIDATES_AND_USERS:
             return {...state, 
                users: action.payload.users,
                candidates: action.payload.candidates
            };
        case SET_REGISTERED_BY_USER:
            console.log(action.payload.result);
            return {...state, registeredProductsByUser: action.payload.result };
        default: return state;

    }
}