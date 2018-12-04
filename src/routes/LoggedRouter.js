import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import Dashboard from '../components/Dashboard';


export const history = createHistory();

const LoggedRouter = () => {
        return (
            <BrowserRouter>
                <Dashboard>
                    <Switch>
                        <Route path="/a" render={() => (<h1 style={{ marginTop: 100 }}>AAA</h1>)} />     
                    </Switch>
                </Dashboard>
            </BrowserRouter>
        );
}

export default LoggedRouter;
