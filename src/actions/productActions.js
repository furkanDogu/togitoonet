import { 
	GET_UNREGISTERED_PRODUCTS,
	REGISTER_PRODUCT
} from './types';

export const getUnregisteredProducts = (token) => ({
	type: GET_UNREGISTERED_PRODUCTS,
	payload: token,
});

export const registerProduct = ({ product, employeeID, token }) => ({
	type: REGISTER_PRODUCT,
	payload: { product, employeeID, token },

});