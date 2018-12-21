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

// an action to get unregistered products from store
export const getUnregisteredProducts = () => ({
	type: GET_UNREGISTERED_PRODUCTS
});

// an action to register a product
// parameters: product: object , employeeID: int
export const registerProduct = ({ product, employeeID }) => ({
	type: REGISTER_PRODUCT,
	payload: { product, employeeID }

});

// an action to get all registered products from store
export const getRegisteredProducts = () => ({
	type: GET_REGISTERED_PRODUCTS
});

// an action to remove registeration from a product
// parameters: productID: int, registerationID: int
export const removeRegisteration = ({ productID, registerationID }) => ({
	type: REMOVE_REGISTERATION,
	payload: { productID, registerationID }
});

// an action to add broken product to the broken product list
// parameters: desc: string, registerationID: int, type: string
export const addBrokenProduct = ({ desc, registerationID, type }) => ({
	type: ADD_BROKEN_PRODUCT,
	payload: { desc, registerationID, type }
});

// an action to get broken produts from store
export const getBrokenProducts = () => ({
	type: GET_BROKEN_PRODUCTS
});

// an action to get all brands from store
export const getBrands = () => ({
	type: GET_BRANDS
});

// an action to get all categories from store
export const getCategories = () => ({
	type: GET_CATEGORIES
});

// an action to get all suppliers from store
export const getSuppliers = () => ({
	type: GET_SUPPLIERS
});

// an action to add new brand
// parameters: brandName: string
export const addBrand = (brandName) => ({
	type: ADD_BRAND,
	payload: brandName
});

// an action to add new category
// parameters: categoryName: string
export const addCategory = (categoryName) => ({
	type: ADD_CATEGORY,
	payload: categoryName
});

// an action to get all cities
export const getCities = () => ({
	type: GET_CITIES
});

// an action to get towns that owned by a spesific city
// parameters: cityID: int
export const getTowns = (cityID) => ({
	type: GET_TOWNS,
	payload: cityID
});

// an action to add new supplier
// parameters: props: object
export const addSupplier = (props) => ({
	type: ADD_SUPPLIER,
	payload: props
});

// an action to add new component 
// parameters: component: object
export const addNewComponent = (component) => ({
	type: ADD_NEW_COMPONENT,
	payload: component
});

// an action to add new all in one pc
// parameters: allOne: object
export const addNewAllOne = (allOne) => ({
	type: ADD_NEW_ALL_ONE,
	payload: allOne
})

