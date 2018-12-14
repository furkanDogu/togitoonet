import {
    ON_LOGIN_SUCCESS,
    ON_LOGIN_FAIL,
    SET_UNREGISTERED_PRODUCTS,
    SET_UNREGISTERED_PC_COMPONENTS,
    SET_EMPLOYEES,
    SET_REGISTERED_PRODUCTS,
    SET_REGISTERED_PC_COMPONENTS,
    SET_BROKEN_PRODUCTS,
    SET_BRANDS,
    SET_CATEGORIES,
    SET_SUPPLIERS,
    SET_CITIES,
    SET_TOWNS,
    GET_SUPPLIERS
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

// CATCH BLOKLARININ İÇİNE HERHANGİ BİR HATA DURUMUNDA AÇILACAK OLAN HER DRAWER'A KONULMUŞ BİR MODAL İÇİN GÖRÜNÜRLÜĞÜ TRUE YAPAN BİR ACTİON KOY.
// BAŞARILI GERÇEKLEŞEN İŞLEMLERİN SONUNA DA BAŞARI BELİRTECEK BİR MODAL YAP VE ONUN GÖRÜNÜRLÜĞÜNÜ TRUE
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

export function* getUnregisteredProductsAsync() {

    try {   
        const endPoint = URL+'/product/unregistered';
        const response = yield axios.get(endPoint, getTokenFromStorage());
        yield put({ type: SET_UNREGISTERED_PRODUCTS, payload: response.data });
        yield put({ type: SET_UNREGISTERED_PC_COMPONENTS, payload: response.data });
    } catch(e) {
        console.log(e);
    }

}

export function* getEmployeesAsync() {
    
    try {
        const endPoint = URL+'/user';
        const response = yield axios.get(endPoint, getTokenFromStorage());
        yield put({ type: SET_EMPLOYEES, payload: response.data });
    } catch(e) {
        console.log(e);
    }
}
export function* registerProductsAsync(action) {
    const { product, employeeID } = action.payload;
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
            endPoint = `${URL}/product/register/${type}/${id}`;
            yield axios.post(endPoint, {
                personelID: employeeID
            },getTokenFromStorage());
            
            yield getUnregisteredProductsAsync();
        } catch(e) {
            console.log(e);
        }
}

export function* getRegisteredProductsAsync() {
    
    try {   
        const endPoint = URL+'/product/registered';
        const response = yield axios.get(endPoint, getTokenFromStorage());
        yield put({ type: SET_REGISTERED_PRODUCTS, payload: response.data });
        yield put({ type: SET_REGISTERED_PC_COMPONENTS, payload: response.data });

    } catch(e) {
        console.log(e);
    }
}
// this async function will call the api and remove the registeration for any given product id.
export function* removeRegisterationAsync(action) {
    const { productID, registerationID } = action.payload;
    let splittedID = productID.split('-');
    let endPoint = null;
    let productType = null;
    if (splittedID[0] === 'B') {
         // if we are removing component registeration from a person
        productType = "component";
    } else {
        // if we are removing all in one pc's registeration 
        productType = "allOne";
    }
    try {
        endPoint = `${URL}/product/removereg/${productType}/${parseInt(registerationID)}`;
        yield axios.post(endPoint, { }, getTokenFromStorage())
        yield getRegisteredProductsAsync();

    } catch(e) {
        console.log(e);
    }
} 

export function* addBrokenProductAsync(action) {
    const { desc, registerationID, type } = action.payload;
    let endPoint = null;
    try {
        if (type === 'component') {
            endPoint = `${URL}/product/broken/component/${parseInt(registerationID)}`;
            yield axios.post(endPoint, { desc }, getTokenFromStorage());
            
        } else {
            endPoint = `${URL}/product/broken/allOne/${parseInt(registerationID)}`;
            yield axios.post(endPoint, { desc }, getTokenFromStorage());
        }
        yield getRegisteredProductsAsync();
    } catch(e) {
        console.log(e);
    }
}

export function* getBrokenProductsAsync() {
    let endPoint = URL + '/product/broken';
    try {
        const result = yield axios.get(endPoint, getTokenFromStorage());
        yield put({ type: SET_BROKEN_PRODUCTS, payload: result.data });

    } catch(e) {
        console.log(e);
    }
}

export function* getBrandsAsync() {
    let endPoint = URL + '/brand';
    try {
        const result = yield axios.get(endPoint, getTokenFromStorage());
        yield put({ type: SET_BRANDS, payload: result.data });
    } catch(e) {
        console.log(e);
    }
}

export function* getCategoriesAsync() {
    let endPoint = URL + '/category';
    try {
        const result = yield axios.get(endPoint, getTokenFromStorage());
        yield put({ type: SET_CATEGORIES, payload: result.data });
    } catch(e) {
        console.log(e);
    }
}

export function* getSuppliersAsync() {
    let endPoint = URL + '/supplier';
    try {
        const result = yield axios.get(endPoint, getTokenFromStorage());
        yield put({ type: SET_SUPPLIERS, payload: result.data });
    } catch(e) {
        console.log(e);
    }
}

export function* addBrandAsync(action) {
    let endPoint = URL + '/brand';
    try {
        yield axios.post(endPoint, { brandName: action.payload}, getTokenFromStorage());
        yield getBrandsAsync();
    } catch(e) {
        console.log(e);
    }
}

export function* addCategoryAsync(action) {
    let endPoint = URL + '/category';
    try {
        yield axios.post(endPoint, { categoryName: action.payload}, getTokenFromStorage());
        yield getCategoriesAsync();
    } catch(e) {
        console.log(e);
    }
}

export function* getCitiesAsync() {
    let endPoint = URL + '/supplier/cities';
    try {
        const result = yield axios.get(endPoint, getTokenFromStorage());
        yield put({ type: SET_CITIES, payload: result.data });
    } catch(e) {
        console.log(e);
    }
}

export function* getTownsAsync(action) {
    let endPoint = `${URL}/supplier/towns/${action.payload}`;
    try {
        const result = yield axios.get(endPoint, getTokenFromStorage());
        yield put({ type: SET_TOWNS, payload: result.data });
    } catch(e) {
        console.log(e);
    }
}

export function* addSupplierAsync(action) {
    let endPoint = URL + '/supplier';
    try {
        yield axios.post(endPoint, {
            supplierName: action.payload.supplierName,
            ilceID: action.payload.ilceID,
            ilID: action.payload.ilID,
            telNo: action.payload.telNo
        }, getTokenFromStorage());
        yield getSuppliersAsync();
    } catch(e) {
        console.log(e);
    }
}
export function* addNewComponentAsync(action) {
    let endPoint = URL + '/product/add/component';
    try {

        yield axios.post(endPoint, {
            bilesenAdi: action.payload.productName,
            kategoriID: action.payload.category,
            markaID: action.payload.brand,
            tedarikciID: action.payload.supplier,
            satinAlinanAdet: action.payload.amount,
            fiyat: action.payload.cost
        }, getTokenFromStorage());
    } catch(e) {
        console.log(e);
    }
}

export function* addNewAllOneAsync(action) {
    let endPoint = URL + '/product/add/allOne';
    try {
        console.log(action.payload);
        yield axios.post(endPoint, action.payload, getTokenFromStorage());
    } catch(e) {
        console.log(e);
    }
}


