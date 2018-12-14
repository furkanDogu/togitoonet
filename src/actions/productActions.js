import { 
	GET_UNREGISTERED_PRODUCTS,
	REGISTER_PRODUCT,
	GET_REGISTERED_PRODUCTS,
	REMOVE_REGISTERATION,
	ADD_BROKEN_PRODUCT,
	GET_BROKEN_PRODUCTS,
	GET_BRANDS,
	GET_CATEGORIES,
	GET_SUPPLIERS,
	ADD_BRAND,
	ADD_CATEGORY,
	GET_CITIES,
	GET_TOWNS,
	ADD_SUPPLIER,
	ADD_NEW_COMPONENT,
	ADD_NEW_ALL_ONE
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

export const getBrands = () => ({
	type: GET_BRANDS
});

export const getCategories = () => ({
	type: GET_CATEGORIES
});

export const getSuppliers = () => ({
	type: GET_SUPPLIERS
});

export const addBrand = (brandName) => ({
	type: ADD_BRAND,
	payload: brandName
});

export const addCategory = (categoryName) => ({
	type: ADD_CATEGORY,
	payload: categoryName
});

export const getCities = () => ({
	type: GET_CITIES
});

export const getTowns = (cityID) => ({
	type: GET_TOWNS,
	payload: cityID
});

export const addSupplier = (props) => ({
	type: ADD_SUPPLIER,
	payload: props
});
export const addNewComponent = (component) => ({
	type: ADD_NEW_COMPONENT,
	payload: component
});

export const addNewAllOne = (allOne) => ({
	type: ADD_NEW_ALL_ONE,
	payload: allOne
})

