import { SET_UNREGISTERED_PRODUCTS } from '../actions/types';

const INITIAL_STATE = {
    unregisteredProducts: [],
    registeredProducts: [],
    brokenProducts: []
};


export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case  SET_UNREGISTERED_PRODUCTS:
            return {...state, unregisteredProducts: action.payload};
        default: return state;
    }
}