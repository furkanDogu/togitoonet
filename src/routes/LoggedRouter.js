import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import Dashboard from '../components/Dashboard';
import unregisteredProduct from '../hocs/UnregisteredProduct';
import registeredProduct from '../hocs/RegisteredProduct';
import ProductCard from '../components/ProductCard';
import ProductContainer from '../components/ProductContainer';


export const history = createHistory();

const LoggedRouter = () => {
        return (
            <BrowserRouter>
                <Dashboard>
                    <Switch>
                        <Route path="/a" render={() => (<ProductContainer products={["KAKA","BOK","GÖT","MEME","POPO","PİSLİK"  ]} hoc={registeredProduct}/>)} />     
                    </Switch>
                </Dashboard>
            </BrowserRouter>
        );
}

export default LoggedRouter;
