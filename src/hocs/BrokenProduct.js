import React from 'react';
import { connect } from 'react-redux';
import BrokenPartDetail from '../components/BrokenPartDetail';

// this hoc is responsible for rendering ProductCard component with suitable buttons in it.
// It also creates detail modal for broken part
const brokenProduct = WrappedComponent => {
    class BrokenProduct extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                chosen: null,
                detailModalOpen: false,
            };
            this.handleDetailModal = this.handleDetailModal.bind(this);
        }
        filterChosenProduct(id) {
			return this.props.brokenProducts.find(product => product.arizaID  === id);
        }
        handleDetailModal(id, registerationID, registeredPerson, errorID) {
            if (errorID) {
                this.setState({ chosen: this.filterChosenProduct(errorID) });
            } 
            this.setState(state => ({ detailModalOpen: !state.detailModalOpen }));
        }
        render() {
            const buttons = [
                {
                    onClick: this.handleDetailModal,
                    text: 'Detay Gör',
                    bsStyle: 'primary'
                }
            ]
            return (
                <div>
                    <WrappedComponent buttons={buttons} {...this.props} />
                    <BrokenPartDetail
                        product={this.state.chosen}
                        isOpen={this.state.detailModalOpen}
                        onClose={this.handleDetailModal}
                    />
                </div>
            );
        }


    }
    const mapStateToProps = state => ({
        brokenProducts: state.productReducer.brokenProducts
    });
    return connect(mapStateToProps)(BrokenProduct);
    
}
export default brokenProduct;