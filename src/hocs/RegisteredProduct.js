import React from 'react';
import { connect } from 'react-redux';

const registeredProduct = WrappedComponent => {
    class RegisteredProduct extends React.Component {
        constructor(props) {
            super(props);
        }
        render() {
            const buttons = [
                {
                    onClick: () => console.log("clicked to zimmet kaldır button"),
                    text: 'Zimmet Kaldır',
                    bsStyle: 'warning'
                },
                {
                    onClick: () => console.log("clicked to arızaliya çıkar button"),
                    text: 'Arızalıya Çıkar',
                    bsStyle: 'danger'
                }

            ]
            return (
                <WrappedComponent buttons={buttons} {...this.props} />
            );
        }


    }
    return RegisteredProduct;
}

export default registeredProduct;