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

// an action to send user info
// parameters: an object with email: string, password: string attributes
export const fetchUserInfo = ({ email, password }) => ({
	type: FETCH_USER_INFO,
	payload: { email, password },
});

// whenever user refreshes the page, we need to check if user is authenticated. So action does that
export const checkIfAuthenticated = () => ({
	type: CHECK_IF_AUTHENTICATED,
});

// an action to log out
export const logOut = () => ({
	type: LOG_OUT,
});

// an action to hide error modal
export const hideLoginErrorModal = () => ({
	type: HIDE_ERROR_MODAL,
});

// an action to get employees from store
export const getEmployees = () => ({
	type: GET_EMPLOYEES
});

// an action to get candidatates and users from store
export const getCandidatesAndUsers = () => ({
	type: GET_CANDIDATES_AND_USERS
});

// an action to add new user to the system
// parameters: user: object
export const addNewUser = (user) => ({
	type: ADD_NEW_USER,
	payload: user
});

// an action to get registered products to a user
// parameters: id: int (id of user)
export const getRegisteredByUser = (id) => ({
	type: GET_REGISTERED_BY_USER,
	payload: id
});

// an action to get registered products to a department
// parameters: id : int (id of department)
export const getRegisteredByDepartment = (departmentID) => ({
	type: GET_REGISTERED_BY_DEPARTMENT,
	payload: departmentID
});

// an action to get all departments from store
export const getDepartments = () => ({
	type: GET_DEPARTMENTS
});

// an action to get all employes including passive (former) emplooyes.
// those employees will be used in reporting screen.
export const getEmployeesIncPassive = () => ({
	type: GET_EMPLOYEES_INC_PASSIVE
});

// an action to close success modal that opens when something good happens
export const closeSuccessModal = () => ({
	type: CLOSE_SUCCESS_MODAL// send type
});

// an action to close fail modal that opens when something bad happens
export const closeFailModal = () => ({
	type: CLOSE_FAIL_MODAL//send type
});



