import { FETCH_USER_INFO, 
	CHECK_IF_AUTHENTICATED, 
	LOG_OUT, 
	HIDE_ERROR_MODAL,
	GET_EMPLOYEES
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


