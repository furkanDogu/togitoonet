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
    addNewComponentAsync
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
    ADD_NEW_COMPONENT
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
    ]);
}