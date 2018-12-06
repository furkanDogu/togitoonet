import { 
    SET_UNREGISTERED_PRODUCTS, 
    SET_UNREGISTERED_PC_COMPONENTS,
    SET_REGISTERED_PRODUCTS 
} from '../actions/types';

const INITIAL_STATE = {
    unregisteredProducts: [],
    registeredProducts: [],
    brokenProducts: [],
    unregisteredPcComponents: []
};


export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case  SET_UNREGISTERED_PRODUCTS:
            return {...state, unregisteredProducts: [...action.payload.result]};
        case SET_UNREGISTERED_PC_COMPONENTS:
            return {...state, unregisteredPcComponents: [...action.payload.parcalar]};
        case SET_REGISTERED_PRODUCTS:
            return {...state, registeredProducts: [...action.payload.result]};

        default: return state;
    }
}