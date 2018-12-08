import { 
	GET_UNREGISTERED_PRODUCTS,
	REGISTER_PRODUCT,
	GET_REGISTERED_PRODUCTS,
	REMOVE_REGISTERATION
} from './types';

export const getUnregisteredProducts = (token) => ({
	type: GET_UNREGISTERED_PRODUCTS,
	payload: token
});

export const registerProduct = ({ product, employeeID, token }) => ({
	type: REGISTER_PRODUCT,
	payload: { product, employeeID, token },

});

export const getRegisteredProducts = (token) => ({
	type: GET_REGISTERED_PRODUCTS,
	payload: token
});

export const removeRegisteration = ({ productID, registerationID }) => ({
	type: REMOVE_REGISTERATION,
	payload: { productID, registerationID }
});