import { takeLatest, all } from 'redux-saga/effects';
import {
    checkIfAuthAsync, 
    fetchUserInfoAsync, 
    getUnregisteredProductsAsync, 
    getEmployeesAsync,
    registerProductsAsync,
    getRegisteredProductsAsync,
    removeRegisterationAsync,
    addBrokenProductAsync
} from './workers';

import {
    FETCH_USER_INFO,
    CHECK_IF_AUTHENTICATED,
    GET_UNREGISTERED_PRODUCTS,
    GET_EMPLOYEES,
    REGISTER_PRODUCT,
    GET_REGISTERED_PRODUCTS,
    REMOVE_REGISTERATION,
    ADD_BROKEN_PRODUCT,
    GET_BROKEN_PRODUCTS
} from '../actions/types';


export default function* rootSaga() {
    yield all([
        takeLatest(CHECK_IF_AUTHENTICATED, checkIfAuthAsync),
        takeLatest(FETCH_USER_INFO, fetchUserInfoAsync),
        takeLatest(GET_UNREGISTERED_PRODUCTS, getUnregisteredProductsAsync),
        takeLatest(GET_EMPLOYEES, getEmployeesAsync),
        takeLatest(REGISTER_PRODUCT, registerProductsAsync),
        takeLatest(GET_REGISTERED_PRODUCTS, getRegisteredProductsAsync),
        takeLatest(REMOVE_REGISTERATION, removeRegisterationAsync),
        takeLatest(ADD_BROKEN_PRODUCT, addBrokenProductAsync),
        takeLatest(GET_BROKEN_PRODUCTS, getBrokenProductsAsync)
    ]);
}