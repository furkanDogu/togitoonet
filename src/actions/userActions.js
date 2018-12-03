import { FETCH_USER_INFO, CHECK_IF_AUTHENTICATED, LOG_OUT, HIDE_ERROR_MODAL } from './types'

export const fetchUserInfo = ({ email, password }) => {
    return {
        type: FETCH_USER_INFO,
        payload: { email, password }
    }
}

export const checkIfAuthenticated = () => {
    return {
        type: CHECK_IF_AUTHENTICATED
    }
}
export const logOut = () => ({
    type: LOG_OUT
});

export const hideLoginErrorModal = () => ({
    type: HIDE_ERROR_MODAL
});