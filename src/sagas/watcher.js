import { takeLatest, all } from 'redux-saga/effects';
import {checkIfAuthAsync, fetchUserInfoAsync, getUnregisteredProductsAsync } from './workers';
import {
    FETCH_USER_INFO,
    CHECK_IF_AUTHENTICATED,
    GET_UNREGISTERED_PRODUCTS
} from '../actions/types';


export default function* rootSaga() {
    yield all([
        takeLatest(CHECK_IF_AUTHENTICATED, checkIfAuthAsync),
        takeLatest(FETCH_USER_INFO, fetchUserInfoAsync),
        takeLatest(GET_UNREGISTERED_PRODUCTS, getUnregisteredProductsAsync)
    ]);
}