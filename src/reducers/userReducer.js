import {
    ON_LOGIN_SUCCESS,
    ON_LOGIN_FAIL,
    LOG_OUT,
    HIDE_ERROR_MODAL,
    SET_EMPLOYEES,
    SET_CANDIDATES_AND_USERS,
    SET_REGISTERED_BY_USER,
    SET_EMPLOYEES_INC_PASSIVE,
    SET_DEPARTMENTS,
    SET_REGISTERED_BY_DEPARTMENT,
    CLOSE_SUCCESS_MODAL,
    CLOSE_FAIL_MODAL,
    OPEN_FAIL_MODAL,
    OPEN_SUCCESS_MODAL
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
    employeesIncPassive: [],
    departments: [],
    candidates: [],
    users: [],
    registeredProductsByUser: [],
    registeredProductsByDepartment: [],
    isFailModalOpen: false,
    isSuccessModalOpen: false,
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
            return {...state, registeredProductsByUser: action.payload.result };
        case SET_EMPLOYEES_INC_PASSIVE:
            return {...state, employeesIncPassive: action.payload.result };
        case SET_DEPARTMENTS: 
            return {...state, departments: action.payload.result };
        case SET_REGISTERED_BY_DEPARTMENT:
            return {...state, registeredProductsByDepartment: action.payload.result }; 
        case CLOSE_SUCCESS_MODAL:
            return {...state, isSuccessModalOpen: false };
        case CLOSE_FAIL_MODAL: 
            return {...state, isFailModalOpen: false };
        case OPEN_FAIL_MODAL: 
            return {...state, isFailModalOpen: true };
        case OPEN_SUCCESS_MODAL: 
            return {...state, isSuccessModalOpen: true };
        default: return state;

    }
}