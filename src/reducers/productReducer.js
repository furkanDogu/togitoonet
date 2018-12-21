import { 
    SET_UNREGISTERED_PRODUCTS, 
    SET_UNREGISTERED_PC_COMPONENTS,
    SET_REGISTERED_PRODUCTS,
    SET_REGISTERED_PC_COMPONENTS,
    SET_BROKEN_PRODUCTS,
    SET_BRANDS,
    SET_CATEGORIES,
    SET_SUPPLIERS,
    SET_CITIES,
    SET_TOWNS
} from '../actions/types';

const INITIAL_STATE = {
    unregisteredProducts: [],
    registeredProducts: [],
    brokenProducts: [],
    unregisteredPcComponents: [],
    registeredPcComponents: [],
    brands: [],
    categories: [],
    suppliers: [],
    cities: [],
    towns: []
};

// this reducer is responsible for saving data that is about to products
export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case  SET_UNREGISTERED_PRODUCTS:
            return {...state, unregisteredProducts: [...action.payload.result]};
        case SET_UNREGISTERED_PC_COMPONENTS:
            return {...state, unregisteredPcComponents: [...action.payload.parcalar]};
        case SET_REGISTERED_PRODUCTS:
            return {...state, registeredProducts: [...action.payload.result]};
        case SET_REGISTERED_PC_COMPONENTS:
            return {...state, registeredPcComponents: [...action.payload.parcalar]};
        case SET_BROKEN_PRODUCTS:
            return {...state, brokenProducts: [...action.payload.result]};
        case SET_BRANDS:
            return {...state, brands: [...action.payload.result]};
        case SET_CATEGORIES: 
            return {...state, categories: [...action.payload.result]};
        case SET_SUPPLIERS:
            return {...state, suppliers: [...action.payload.result]};
        case SET_CITIES:
            return {...state, cities: [...action.payload.result]};
        case SET_TOWNS:
            return {...state, towns: [...action.payload.result]};
        default: return state;
    }
}