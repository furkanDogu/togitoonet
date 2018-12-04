import React from 'react';
import { connect } from 'react-redux';
import { getUnregisteredProducts } from '../actions/productActions';

export default (WrappedComponent) => {
    class ProductPage extends React.Component {

        componentDidMount() {
            const { getUnregisteredProducts, token, unregisteredProducts } = this.props;
            getUnregisteredProducts(token);
        }
        render() {
            const { hoc } = this.props;
            return <WrappedComponent products={this.props.unregisteredProducts} hoc={hoc} />
        }

    }
    const mapStateToProps = (state) => ({
        unregisteredProducts: state.productReducer.unregisteredProducts,
        token: state.userReducer.token
    });
    const mapDispatchToProps = {
        getUnregisteredProducts
    }
    return connect(mapStateToProps, mapDispatchToProps)(ProductPage);
}
