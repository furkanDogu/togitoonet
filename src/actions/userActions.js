import { FETCH_USER_INFO, 
	CHECK_IF_AUTHENTICATED, 
	LOG_OUT, 
	HIDE_ERROR_MODAL,
	GET_EMPLOYEES,
	GET_CANDIDATES_AND_USERS,
	ADD_NEW_USER,
	GET_REGISTERED_BY_USER,
	GET_EMPLOYEES_INC_PASSIVE,
	GET_REGISTERED_BY_DEPARTMENT,
	GET_DEPARTMENTS,
	CLOSE_SUCCESS_MODAL,
	CLOSE_FAIL_MODAL
} from './types';

export const fetchUserInfo = ({ email, password }) => ({
	type: FETCH_USER_INFO,
	payload: { email, password },
});

export const checkIfAuthenticated = () => ({
	type: CHECK_IF_AUTHENTICATED,
});
export const logOut = () => ({
	type: LOG_OUT,
});

export const hideLoginErrorModal = () => ({
	type: HIDE_ERROR_MODAL,
});

export const getEmployees = () => ({
	type: GET_EMPLOYEES
});

export const getCandidatesAndUsers = () => ({
	type: GET_CANDIDATES_AND_USERS
});

export const addNewUser = (user) => ({
	type: ADD_NEW_USER,
	payload: user
});

export const getRegisteredByUser = (id) => ({
	type: GET_REGISTERED_BY_USER,
	payload: id
});

export const getRegisteredByDepartment = (departmentID) => ({
	type: GET_REGISTERED_BY_DEPARTMENT,
	payload: departmentID
});

export const getDepartments = () => ({
	type: GET_DEPARTMENTS
});

export const getEmployeesIncPassive = () => ({
	type: GET_EMPLOYEES_INC_PASSIVE
});

export const closeSuccessModal = () => ({
	type: CLOSE_SUCCESS_MODAL// send type
});

export const closeFailModal = () => ({
	type: CLOSE_FAIL_MODAL//send type
});



