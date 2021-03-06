import { takeLatest, all } from 'redux-saga/effects';
import {
    checkIfAuthAsync, 
    fetchUserInfoAsync, 
    getUnregisteredProductsAsync, 
    getEmployeesAsync,
    registerProductsAsync,
    getRegisteredProductsAsync,
    removeRegisterationAsync,
    addBrokenProductAsync,
    getBrokenProductsAsync,
    getBrandsAsync,
    getCategoriesAsync,
    getSuppliersAsync,
    addBrandAsync,
    addCategoryAsync,
    getCitiesAsync,
    getTownsAsync,
    addSupplierAsync,
    addNewComponentAsync,
    addNewAllOneAsync,
    getCandidatesAndUsersAsync,
    addNewUserAsync,
    getRegisteredByUserAsync,
    getEmployeesIncPassiveAsync,
    getDepartmentsAsync,
    getRegisteredByDepartment
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
    GET_BROKEN_PRODUCTS,
    GET_BRANDS,
    GET_CATEGORIES,
    GET_SUPPLIERS,
    ADD_BRAND,
    ADD_CATEGORY,
    GET_CITIES,
    GET_TOWNS,
    ADD_SUPPLIER,
    ADD_NEW_COMPONENT,
    ADD_NEW_ALL_ONE,
    GET_CANDIDATES_AND_USERS,
    ADD_NEW_USER,
    GET_REGISTERED_BY_USER,
    GET_EMPLOYEES_INC_PASSIVE,
    GET_DEPARTMENTS,
    GET_REGISTERED_BY_DEPARTMENT
} from '../actions/types';



// Watcher is responsible for listening listed actions below. Whenever one of those actions are caught, it will fire another action which will do
// async works in generator functions for us. We use constants here to prevent typos. 
// takeLatest function just takes the latest caught action meaning that if user clicks 100 times to a button it will just catch the last click.
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
        takeLatest(GET_BROKEN_PRODUCTS, getBrokenProductsAsync),
        takeLatest(GET_BRANDS, getBrandsAsync),
        takeLatest(GET_CATEGORIES, getCategoriesAsync),
        takeLatest(GET_SUPPLIERS, getSuppliersAsync),
        takeLatest(ADD_BRAND, addBrandAsync),
        takeLatest(ADD_CATEGORY, addCategoryAsync),
        takeLatest(GET_CITIES, getCitiesAsync),
        takeLatest(GET_TOWNS, getTownsAsync),
        takeLatest(ADD_SUPPLIER, addSupplierAsync),
        takeLatest(ADD_NEW_COMPONENT, addNewComponentAsync),
        takeLatest(ADD_NEW_ALL_ONE, addNewAllOneAsync),
        takeLatest(GET_CANDIDATES_AND_USERS, getCandidatesAndUsersAsync),
        takeLatest(ADD_NEW_USER, addNewUserAsync),
        takeLatest(GET_REGISTERED_BY_USER, getRegisteredByUserAsync),
        takeLatest(GET_EMPLOYEES_INC_PASSIVE, getEmployeesIncPassiveAsync),
        takeLatest(GET_DEPARTMENTS, getDepartmentsAsync),
        takeLatest(GET_REGISTERED_BY_DEPARTMENT, getRegisteredByDepartment),
    ]);
}