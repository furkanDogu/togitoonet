import {
    ON_LOGIN_SUCCESS,
    ON_LOGIN_FAIL,
    SET_UNREGISTERED_PRODUCTS,
    SET_UNREGISTERED_PC_COMPONENTS,
    SET_EMPLOYEES
} from '../actions/types';
import axios from 'axios';
import { put } from 'redux-saga/effects';

function getTokenFromStorage() {
    let config = {
        headers: {
            'web-token': sessionStorage.getItem('jwtToken')
        }
    }
    return config;
}


const URL = 'http://localhost:3001';
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
        const endPoint = URL+'/user/check'
        const response = yield axios.post(endPoint, { token })
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
          'web-token': action.payload
        }
    }
    try {   
        const endPoint = URL+'/product/unregistered';
        const response = yield axios.get(endPoint, config);
        yield put({ type: SET_UNREGISTERED_PRODUCTS, payload: response.data });
        yield put({ type: SET_UNREGISTERED_PC_COMPONENTS, payload: response.data });
    } catch(e) {
        console.log(e);
    }

}


export function* getEmployeesAsync(action) {
    
    try {
        const endPoint = URL+'/user';
        const response = yield axios.get(endPoint, getTokenFromStorage());
        yield put({ type: SET_EMPLOYEES, payload: response.data });
    } catch(e) {
        console.log(e);
    }
}
export function* registerProductsAsync(action) {
    
    const { product, employeeID, token } = action.payload;
    let type = null;
    let id = null;
    let endPoint = null;
    

    if (product.Tip === 'Bileşen') { // if product is only a component then we need to read bilesenID property
        type = 'component';
        id = product['bilesenID'];
    } else { // if product is all in one pc then we need to read pcID property of it
        type ='allOne';
        id = product['pcID'];
    }
        try {
            const action = {
                payload: token
            };
            endPoint = `${URL}/product/register/${type}/${id}`;
            yield axios.post(endPoint, {
                personelID: employeeID
            },getTokenFromStorage());
            
            yield getUnregisteredProductsAsync(action);
        } catch(e) {
            console.log(e);
        }
    

}

