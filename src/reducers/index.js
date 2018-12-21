import { combineReducers } from 'redux';
import userReducer from './userReducer';
import productReducer from './productReducer';

//combining multipler reducers into one reducer.
export default combineReducers({
        userReducer,
        productReducer
});