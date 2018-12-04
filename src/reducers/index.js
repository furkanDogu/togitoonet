import { combineReducers } from 'redux';
import userReducer from './userReducer';
import productReducer from './productReducer';
export default combineReducers({
        userReducer,
        productReducer
});