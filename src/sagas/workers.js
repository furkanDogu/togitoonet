import {
    ON_LOGIN_SUCCESS,
    ON_LOGIN_FAIL,
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
        const response = yield axios.post(
            'http://localhost:3001/user/check',
            {
                token
            }
        ).then(response => response)
        .catch(err => {
            if (err) throw err;
        });
        yield put({ type: ON_LOGIN_SUCCESS, payload: response.data });
    } catch(e) {

    }
    

}

