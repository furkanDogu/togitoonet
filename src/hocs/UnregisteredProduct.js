import React from 'react';
import { connect } from 'react-redux';

const unregisteredProduct = WrappedComponent => {
    class UnregisteredProduct extends React.Component {
        constructor(props) {
            super(props);
        }
        render() {
            const buttons = [
                {
                    onClick: () => console.log("clicked to zimmetle button"),
                    text: 'Zimmetle',
                    bsStyle: 'success'
                },
                {
                    onClick: () => console.log("clicked to info button"),
                    text: 'Detay Gör',
                    bsStyle: 'primary'
                }

            ]
            return (
                <WrappedComponent buttons={buttons} {...this.props} />
            );
        }


    }
    return UnregisteredProduct;
    
}
export default unregisteredProduct;