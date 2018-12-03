import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { checkIfAuthenticated } from '../actions/userActions';

export class PublicRoute extends React.Component {
    componentWillMount() {
      this.props.checkIfAuthenticated();
    }
    render() {
      const { isAuthenticated, component: Component,  ...rest} = this.props;
      return (
        <Route {...rest} render={(props) => {
        
          if (!isAuthenticated) {
            return <Component {...props} />
          }
          else { 
            return <Redirect to="/dashboard" /> 
          }
      }} />
      );
    }
  
  }
const mapDispatchToProps = {
  checkIfAuthenticated
};

const mapStateToProps = state => {
 return { isAuthenticated: !!state.userReducer.token }
};

export default connect(mapStateToProps, mapDispatchToProps)(PublicRoute);
