import {
    ON_LOGIN_SUCCESS,
    ON_LOGIN_FAIL,
    SET_UNREGISTERED_PRODUCTS
} from '../actions/types';
import axios from 'axios';
import { put } from 'redux-saga/effects';

export function* fetchUserInfoAsync(action) {
    try {
        console.log(action.payload);
        const response = yield axios.post(
            'http://localhost:3001/user/login',
            action.payload
        ).then(response => response)
        .catch(err => null);
        if (response) {
            yield put({ type: ON_LOGIN_SUCCESS, payload: response.data });
    
        } else {
            yield put({ type: ON_LOGIN_FAIL });
        }
        
    } catch(e) {
        console.log(e);
    }
}

export function* checkIfAuthAsync() {
    let token = sessionStorage.getItem('jwtToken');
    if(!token || token === '') {
        return;
    }
    try {
        const URL = 'http://localhost:3001/user/check'
        const response = yield axios.post(URL, { token })
        .then(response => response)
        .catch(err => { 
            if (err) throw err; 
        });
        yield put({ type: ON_LOGIN_SUCCESS, payload: response.data });
    } catch(e) {
        console.log(e);
    }
}

export function* getUnregisteredProductsAsync(action) {
    let config = {
        headers: {
          'web-token': action.token
        }
    }
    try {
        const URL = 'http://localhost:3001/product/unregistered';
        const response = yield axios.get(URL, { }, config);
        yield put({ type: SET_UNREGISTERED_PRODUCTS, payload: response.data });
    } catch(e) {
        console.log(e);
    }
}

