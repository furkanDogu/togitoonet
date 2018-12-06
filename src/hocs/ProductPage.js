import React from 'react';
import { connect } from 'react-redux';
import { getUnregisteredProducts } from '../actions/productActions';
import { getEmployees } from '../actions/userActions';

export default (WrappedComponent) => {
    class ProductPage extends React.Component {

        componentDidMount() {
            const { getUnregisteredProducts, token, getEmployees, productType } = this.props;
            if(productType === 'unregisteredProduct') {
                getUnregisteredProducts(token);
                getEmployees();
            } else if (productType === 'registeredProduct') {
                //getRegisteredProducts
            } else {
                //getBrokenProducts
            }
            
        }
        render() {
            const { hoc } = this.props;
            return <WrappedComponent products={this.props.unregisteredProducts} hoc={hoc} />
        }

    }
    const mapStateToProps = (state) => ({
        unregisteredProducts: state.productReducer.unregisteredProducts,
        token: state.userReducer.token,
    });
    const mapDispatchToProps = {
        getUnregisteredProducts,
        getEmployees
    }
    return connect(mapStateToProps, mapDispatchToProps)(ProductPage);
}
