import React from 'react';
import { connect } from 'react-redux';

const brokenProduct = WrappedComponent => {
    class BrokenProduct extends React.Component {
        constructor(props) {
            super(props);
        }
        render() {
            const buttons = [
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
    return BrokenProduct;
    
}
export default brokenProduct;