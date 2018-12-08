import { 
    SET_UNREGISTERED_PRODUCTS, 
    SET_UNREGISTERED_PC_COMPONENTS,
    SET_REGISTERED_PRODUCTS,
    SET_REGISTERED_PC_COMPONENTS
} from '../actions/types';

const INITIAL_STATE = {
    unregisteredProducts: [],
    registeredProducts: [],
    brokenProducts: [],
    unregisteredPcComponents: [],
    registeredPcComponents: []
};


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
        default: return state;
    }
}