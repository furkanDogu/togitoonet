import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';


// This component is a hoc which checks if user is logged. If it's logged then it lets user see the wrapped component
// if user is not logged, it redirects to the login screen.
export const PrivateRoute = ({ 
    isAuthenticated, 
    component: Component,
    ...rest  
}) => (
    <Route {...rest} render={(props) => {
        if (isAuthenticated) {
            return <Component {...props} />
        }
        else {
            return <Redirect to="/" />
        }
    }} />
);

const mapStateToProps = state => {
    return {
        isAuthenticated: !!state.userReducer.token
    }
};

export default connect(mapStateToProps)(PrivateRoute);