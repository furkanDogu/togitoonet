import { FETCH_USER_INFO, 
	CHECK_IF_AUTHENTICATED, 
	LOG_OUT, 
	HIDE_ERROR_MODAL,
	GET_EMPLOYEES,
	GET_CANDIDATES_AND_USERS,
	ADD_NEW_USER,
	GET_REGISTERED_BY_USER
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



