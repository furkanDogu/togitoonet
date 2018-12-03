import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

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