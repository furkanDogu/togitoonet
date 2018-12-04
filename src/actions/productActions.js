import { GET_UNREGISTERED_PRODUCTS } from './types';

export const getUnregisteredProducts = (token) => ({
	type: GET_UNREGISTERED_PRODUCTS,
	payload: token,
});