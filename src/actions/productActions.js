import { 
	GET_UNREGISTERED_PRODUCTS,
	REGISTER_PRODUCT,
	GET_REGISTERED_PRODUCTS,
	REMOVE_REGISTERATION,
	ADD_BROKEN_PRODUCT,
	GET_BROKEN_PRODUCTS
} from './types';

export const getUnregisteredProducts = () => ({
	type: GET_UNREGISTERED_PRODUCTS
});

export const registerProduct = ({ product, employeeID }) => ({
	type: REGISTER_PRODUCT,
	payload: { product, employeeID }

});

export const getRegisteredProducts = () => ({
	type: GET_REGISTERED_PRODUCTS
});

export const removeRegisteration = ({ productID, registerationID }) => ({
	type: REMOVE_REGISTERATION,
	payload: { productID, registerationID }
});

export const addBrokenProduct = ({ desc, registerationID, type }) => ({
	type: ADD_BROKEN_PRODUCT,
	payload: { desc, registerationID, type }
});

export const getBrokenProducts = () => ({
	type: GET_BROKEN_PRODUCTS
});