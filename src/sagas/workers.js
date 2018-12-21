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
    SET_CANDIDATES_AND_USERS,
    SET_REGISTERED_BY_USER,
    SET_EMPLOYEES_INC_PASSIVE,
    SET_DEPARTMENTS,
    SET_REGISTERED_BY_DEPARTMENT,
    OPEN_SUCCESS_MODAL,
    OPEN_FAIL_MODAL
} from '../actions/types';
import axios from 'axios';
import { put } from 'redux-saga/effects';

// setting token to a config object. It will be used while making requests.
function getTokenFromStorage() {
    let config = {
        headers: {
            'web-token': sessionStorage.getItem('jwtToken')
        }
    }
    return config;
}

// This URL saves the address where our webserver is currently working.
const URL = 'http://localhost:3001'; 

//sends user information (email, password) to the webserver
// if login is successful then fires an action with type of ON_LOGIN_SUCCESS
export function* fetchUserInfoAsync(action) {
    const endPoint = URL + '/user/login';
    try {
        const response = yield axios.post(endPoint, action.payload)
        .then(response => response)
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
// checks if stored token is still valid 
// if token is valid then fires an action with type of ON_LOGIN_SUCCESS
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
// wants unregistered products from web server. 
// If there is no error occured, first sets the unregistered products then sets unregistered pc components
// If there is an error occured, shows fail modal.
export function* getUnregisteredProductsAsync() {
    try {   
        const endPoint = URL+'/product/unregistered';
        const response = yield axios.get(endPoint, getTokenFromStorage());
        yield put({ type: SET_UNREGISTERED_PRODUCTS, payload: response.data });
        yield put({ type: SET_UNREGISTERED_PC_COMPONENTS, payload: response.data });
    } catch(e) {
        yield put({ type: OPEN_FAIL_MODAL });
    }

}
// wants employees from web server then sets them to reducer by creating an action with type SET_EMPLOYEES
export function* getEmployeesAsync() {
    try {
        const endPoint = URL+'/user';
        const response = yield axios.get(endPoint, getTokenFromStorage());
        yield put({ type: SET_EMPLOYEES, payload: response.data });
    } catch(e) {
        yield put({ type: OPEN_FAIL_MODAL });
    }
}
// registers a product to a employee.
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
            // after registering a product, it calls getUnregisteredProductsAsync to update stock of products
            yield getUnregisteredProductsAsync();
            yield put({ type: OPEN_SUCCESS_MODAL });
        } catch(e) {
            yield put({ type: OPEN_FAIL_MODAL });
        }
}
// wants all registered products from web server
// first sets products then sets pc components in order.
export function* getRegisteredProductsAsync() {
    try {   
        const endPoint = URL+'/product/registered';
        const response = yield axios.get(endPoint, getTokenFromStorage());
        yield put({ type: SET_REGISTERED_PRODUCTS, payload: response.data });
        yield put({ type: SET_REGISTERED_PC_COMPONENTS, payload: response.data });

    } catch(e) {
        yield put({ type: OPEN_FAIL_MODAL });
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
        yield axios.post(endPoint, { }, getTokenFromStorage());
        // after removing registeration it calls getRegisteredProductsAsync to update data kept in reducer
        yield getRegisteredProductsAsync();
        yield put({ type: OPEN_SUCCESS_MODAL });

    } catch(e) {
        yield put({ type: OPEN_FAIL_MODAL });
    }
} 

// this async function will call make a request to API and send product information to be added as broken.
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
        yield put({ type: OPEN_SUCCESS_MODAL });
    } catch(e) {
        yield put({ type: OPEN_FAIL_MODAL });
    }
}

// wants all broken products from API and sets them to reducer by creating an action with SET_BROKEN_PRODUCTS type
export function* getBrokenProductsAsync() {
    let endPoint = URL + '/product/broken';
    try {
        const result = yield axios.get(endPoint, getTokenFromStorage());
        yield put({ type: SET_BROKEN_PRODUCTS, payload: result.data });

    } catch(e) {
        yield put({ type: OPEN_FAIL_MODAL });
    }
}

// wants all brands from API and sets them to reducer by creating an action with SET_BRANDS type
export function* getBrandsAsync() {
    let endPoint = URL + '/brand';
    try {
        const result = yield axios.get(endPoint, getTokenFromStorage());
        yield put({ type: SET_BRANDS, payload: result.data });
    } catch(e) {
        yield put({ type: OPEN_FAIL_MODAL });
    }
}

// wants all categories from API and sets them to reducer by creating an action with SET_CATEGORIES type
export function* getCategoriesAsync() {
    let endPoint = URL + '/category';
    try {
        const result = yield axios.get(endPoint, getTokenFromStorage());
        yield put({ type: SET_CATEGORIES, payload: result.data });
    } catch(e) {
        yield put({ type: OPEN_FAIL_MODAL });
    }
}

// wants all suppliers from API and sets them to reducer by creating an action with SET_SUPPLIERS type 
export function* getSuppliersAsync() {
    let endPoint = URL + '/supplier';
    try {
        const result = yield axios.get(endPoint, getTokenFromStorage());
        yield put({ type: SET_SUPPLIERS, payload: result.data });
    } catch(e) {
        yield put({ type: OPEN_FAIL_MODAL });
    }
}

// this async function makes a request to add a new brand to the system.
// sending brandName in body of request. If process goes well, it calls getBrandsAsync to get updated brands.
export function* addBrandAsync(action) {
    let endPoint = URL + '/brand';
    try {
        yield axios.post(endPoint, { brandName: action.payload}, getTokenFromStorage());
        yield getBrandsAsync();
        yield put({ type: OPEN_SUCCESS_MODAL });
    } catch(e) {
        yield put({ type: OPEN_FAIL_MODAL });
    }
}

// this async function makes a request to add a new category to the system.
// sending categoryName in body of request. If process goes well, it calls getCategoriesAsync to get updated brands.
export function* addCategoryAsync(action) {
    let endPoint = URL + '/category';
    try {
        yield axios.post(endPoint, { categoryName: action.payload}, getTokenFromStorage());
        yield getCategoriesAsync();
        yield put({ type: OPEN_SUCCESS_MODAL });
    } catch(e) {
        yield put({ type: OPEN_FAIL_MODAL });
    }
}

// wants all cities from API and sets them to reducer by creating an action with SET_CITIES type 
export function* getCitiesAsync() {
    let endPoint = URL + '/supplier/cities';
    try {
        const result = yield axios.get(endPoint, getTokenFromStorage());
        yield put({ type: SET_CITIES, payload: result.data });
    } catch(e) {
        yield put({ type: OPEN_FAIL_MODAL });
    }
}

// wants all towns in a specific city which is sent in URL and sets towns to reducer by creating action with SET_TOWNS type
export function* getTownsAsync(action) {
    let endPoint = `${URL}/supplier/towns/${action.payload}`;
    try {
        const result = yield axios.get(endPoint, getTokenFromStorage());
        yield put({ type: SET_TOWNS, payload: result.data });
    } catch(e) {
        yield put({ type: OPEN_FAIL_MODAL });
    }
}

// this async function adds new supplier and after adding supplier calls getSuppliersAsync to update supplier data in store
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
        yield put({ type: OPEN_SUCCESS_MODAL });
    } catch(e) {
        yield put({ type: OPEN_FAIL_MODAL });
    }
}

// this async function adds new component.
// makes a post request with action's payload
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
        yield put({ type: OPEN_SUCCESS_MODAL });
    } catch(e) {
        yield put({ type: OPEN_FAIL_MODAL });
    }
}

// this async function adds new all in one pc.
// makes a post request with action's payload
export function* addNewAllOneAsync(action) {
    let endPoint = URL + '/product/add/allOne';
    try {
        yield axios.post(endPoint, action.payload, getTokenFromStorage());
        yield put({ type: OPEN_SUCCESS_MODAL });
    } catch(e) {
        yield put({ type: OPEN_FAIL_MODAL });
    }
}

// wants all user candidates and users  from API and sets them by creating an action with SET_CANDIDATES_AND_USERS type
export function* getCandidatesAndUsersAsync() {
    let endPoint = URL + '/user/candidates';
    try {
        const result = yield axios.get(endPoint, getTokenFromStorage());
        yield put({ type: SET_CANDIDATES_AND_USERS, payload: result.data });
    } catch(e) {
        console.log(e);
    }
}

// this async function adds new user to the system.
// makes a post request with password in request's body
export function* addNewUserAsync(action) {
    let endPoint = `${URL}/user/register/${action.payload.employeeID}`;
    try {
        yield axios.post(endPoint, { password: action.payload.password}, getTokenFromStorage());
        yield getCandidatesAndUsersAsync();
        yield put({ type: OPEN_SUCCESS_MODAL });
    } catch(e) {
        yield put({ type: OPEN_FAIL_MODAL });
    }
}

// wants registered products based on employeeID, after getting data, sets it to store by creating an action with SET_REGISTERED_BY_USER type
export function* getRegisteredByUserAsync(action) {
    let endPoint = `${URL}/product/registered/users/${action.payload}`;
    try {
        const result = yield axios.get(endPoint, getTokenFromStorage());
        yield put({ type: SET_REGISTERED_BY_USER, payload: result.data });
    } catch(e) {
        yield put({ type: OPEN_FAIL_MODAL });
    }
}

// wants all employees saved in database, after getting data, sets it to store by creating an action with SET_EMPLOYEES_INC_PASSIVE type
export function* getEmployeesIncPassiveAsync() {
    let endPoint = URL + '/user/all';
    try {
        const result = yield axios.get(endPoint, getTokenFromStorage());
        yield put({ type: SET_EMPLOYEES_INC_PASSIVE, payload: result.data });
    } catch(e) {
        yield put({ type: OPEN_FAIL_MODAL });
    }
}

// wants all departments saved in database with a basic get request then sets the data to store by creating an action with SET_DEPARTMENTS type
export function* getDepartmentsAsync() {
    let endPoint = URL + '/user/departments';
    try {
        const result = yield axios.get(endPoint, getTokenFromStorage());
        yield put({ type: SET_DEPARTMENTS, payload: result.data });
    } catch(e) {
        yield put({ type: OPEN_FAIL_MODAL });
    }
}


// wants registered products based on departmentID, after getting data, sets it to store by creating an action with SET_REGISTERED_BY_DEPARTMENT type
export function* getRegisteredByDepartment(action) {
    let endPoint = `${URL}/product/registered/departments/${action.payload}`;
    try {
        const result = yield axios.get(endPoint, getTokenFromStorage());
        yield put({ type: SET_REGISTERED_BY_DEPARTMENT, payload: result.data });
    } catch(e) {
        yield put({ type: OPEN_FAIL_MODAL });
    }
}

