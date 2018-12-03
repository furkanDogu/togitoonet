import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';
import LoginForm from '../components/LoginForm';
/* import Dashboard from '../components/Dashboard'; */
import LoggedRouter from './LoggedRouter';


export const history = createHistory();

const AppRouter = () => {
        return (
            <BrowserRouter>
                <div>
                    <PublicRoute path="/" component={LoginForm} />
                    <PrivateRoute path="/dashboard" component={LoggedRouter} />
                </div>
            </BrowserRouter>
            );
}
export default AppRouter;