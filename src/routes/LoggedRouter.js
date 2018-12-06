import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Dashboard from '../components/Dashboard';
import unregisteredProduct from '../hocs/UnregisteredProduct';
import registeredProduct from '../hocs/RegisteredProduct';
import ProductContainer from '../components/ProductContainer';
import ProductPage from '../hocs/ProductPage';

const UnregisteredProduct = ProductPage(ProductContainer);
const RegisteredProduct = ProductPage(ProductContainer);

const LoggedRouter = () => {
	return (
		<BrowserRouter>
			<Dashboard>
				<Switch>
					<Route
						path="/unregisteredProducts"
						render={() => <UnregisteredProduct hoc={unregisteredProduct} productType={'unregisteredProduct'}/>}
					/>
					<Route
						path="/registeredProducts"
						render={() => <RegisteredProduct hoc={registeredProduct} productType={'registeredProduct'} />}
					/>
				</Switch>
			</Dashboard>
		</BrowserRouter>
	);
};

export default LoggedRouter;
