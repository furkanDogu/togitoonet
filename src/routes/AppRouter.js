import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';
import LoginForm from '../components/LoginForm';
import LoggedRouter from './LoggedRouter';
export const history = createHistory();

// this is the main router component holds dashboard and login page in it.
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
