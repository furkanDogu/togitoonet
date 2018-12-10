import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Dashboard from '../components/Dashboard';
import unregisteredProduct from '../hocs/UnregisteredProduct';
import registeredProduct from '../hocs/RegisteredProduct';
import brokenProduct from '../hocs/BrokenProduct';
import ProductContainer from '../components/ProductContainer';
import ProductPage from '../hocs/ProductPage';
import NewComponent from '../components/NewComponent';


const UnregisteredProduct = ProductPage(ProductContainer);
const RegisteredProduct = ProductPage(ProductContainer);
const BrokenProduct = ProductPage(ProductContainer);


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
					<Route
						path="/brokenProducts"
						render={() => <BrokenProduct hoc={brokenProduct} productType={'brokenProduct'} />}
					/>
					<Route
						path="/newComponent"
						render={() => <NewComponent />}
					/>
				</Switch>
			</Dashboard>
		</BrowserRouter>
	);
};

export default LoggedRouter;
