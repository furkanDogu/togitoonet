import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import DetailModal from '../components/DetailModal';
import ErrorModal from '../components/ErrorModal';
import { removeRegisteration, addBrokenProduct } from '../actions/productActions';
import BrokenModal from '../components/BrokenModal';

const registeredProduct = WrappedComponent => {
    
    class RegisteredProduct extends React.Component {
        
        constructor(props) {
            super(props);
            this.state= {
                chosen: null, // if user clicks any product card's 'detail' button, then this will be set 
                detailModalOpen: false,
                registeredPerson: null, // if user clicks any product card's 'remove reg.' button, then this will be set 
                productID: null,  // if user clicks any product card's 'remove reg.' button, then this will be set 
                errorModalOpen: false,
                registerationID: null,
                brokenModalOpen: false,

            }
            // binding methods to this classes context, then we don't have this reference error while using methods in callbacks.
            this.handleDetailModal = this.handleDetailModal.bind(this);
            this.hideLoginErrorModal = this.hideLoginErrorModal.bind(this);
            this.handleErrorModal = this.handleErrorModal.bind(this);
            this.handleRemovingRegisteration = this.handleRemovingRegisteration.bind(this);
            this.handleBrokenModal = this.handleBrokenModal.bind(this);
            this.onBrokenClicked = this.onBrokenClicked.bind(this);
        }
        // if registeration id is not sent , that means it's just a component and we can directly add the chosen to broken parts
        // but if registerationID is sent, that means it's an all in one pc component so we just need to remove specific part of all in one pc
        onBrokenClicked(desc, registerationID) {
            let id = null;
            let type = null;
            if (registerationID) {
                id = registerationID;
                type = 'allOne';
            } else {
                id = this.state.chosen.zimmetID
                type = 'component';
            }
            
            this.props.addBrokenProduct({
                desc,
                registerationID: id,
                type
            });
                
        }
        handleBrokenModal(id, registerationID) {
            if (registerationID) {
                const ID = this.splitID(id);
                this.setState({ chosen: this.filterChosenProduct(parseInt(registerationID))}, () => {
                    if (this.state.chosen.Tip === 'Hazır PC') {
                        this.setState({ pcComponents: this.filterChosenPcComponents(registerationID) });
                    }
                });
            }            
            this.setState(state => ({ brokenModalOpen: !state.brokenModalOpen }));
        }
        // searches for the product with given ID and type 
        filterChosenProduct(id) {
			return this.props.registeredProductsData.find(product => product.zimmetID === id);
        }
        // finds components of all in one pc. It is needed because we need to show components of all in one pc in detail modal
        filterChosenPcComponents(id) {
			return this.props.registeredPcComponents.filter(product => product.zimmetliPcID === id);
        }
        // since id is coming in array, this function splits the id array 
        // ['1', 'b'] => at 0 index we have the id number, and at 1st index we have the type of  product either all in one pc or component 
        splitID (id) { 
			let splittedID = id.split('-');
			return [parseInt(splittedID[1]), splittedID[0]];
        }
         // will take id as parameter and detect which product's details will be shown in detail modal then make detail modal visible
        handleDetailModal(id, registerationID) {
			if (id ,registerationID) {
                const ID = this.splitID(id);
				this.setState({ chosen: this.filterChosenProduct(parseInt(registerationID))}, () => {
                    if (this.state.chosen.Tip === 'Hazır PC') {
                        this.setState({ pcComponents: this.filterChosenPcComponents(registerationID) });
                    }
				});
				
			} 
			this.setState(state => ({ detailModalOpen: !state.detailModalOpen }));
        }
        // will just make invisible the error modal for removing registeration
        hideLoginErrorModal() { 
            this.setState({ errorModalOpen: false });
        }
        // before opening error modal this function sets required fields to remove registeration
        //then opens the registeration modal
        handleErrorModal(productID, registerationID, registeredPerson) {
            this.setState({ registerationID, productID, registeredPerson }, () => {
                this.setState({ errorModalOpen: true });
            });
        }
        handleRemovingRegisteration() {
            this.props.removeRegisteration({ 
                productID: this.state.productID,
                registerationID: this.state.registerationID
            });
        }
        render() {
            const buttons = [
                // Since product card can be used for multiple types of products, we give the buttons and click events dynamically to the product card. 
                {
                    onClick: this.handleErrorModal,
                    text: 'Zimmet Kaldır',
                    bsStyle: 'warning'
                },
                {
                    onClick: this.handleBrokenModal,
                    text: 'Arızalıya Çıkar',
                    bsStyle: 'danger'
                },
                {
                    onClick: this.handleDetailModal,
                    text: "Detay Gör",
                    bsStyle: 'primary'
                }
        
            ]
            return (
                <div>
                    <WrappedComponent buttons={buttons} {...this.props}/>
                    <DetailModal
                        product={this.state.chosen}
                        isOpen={this.state.detailModalOpen}
                        onClose={this.handleDetailModal}
                        pcComponents={this.state.pcComponents}
                    />
                    <ErrorModal 
                        text={this.state.productID +" numaralı ürünün zimmetini " + this.state.registeredPerson + " kişisi üzerinden kaldırmak üzeresiniz"}
                        isOpen={this.state.errorModalOpen}
                        onClose={this.hideLoginErrorModal}
                        header={"Zimmet Kaldırma"}
                        renderOkayButton={true}
                        onOkay={this.handleRemovingRegisteration}
                    />
                    <BrokenModal
                        onClose={this.handleBrokenModal}
                        isOpen={this.state.brokenModalOpen}
                        product={this.state.chosen}
                        pcComponents={this.state.pcComponents}
                        onBroken={this.onBrokenClicked}
                    />
                </div>
                
            );
        }


    }
    const mapStateToProps = state => ({
        registeredProductsData: state.productReducer.registeredProducts,
        registeredPcComponents: state.productReducer.registeredPcComponents
    });
    const mapDispatchToProps = {
        removeRegisteration,
        addBrokenProduct
    };
    return withRouter(connect(mapStateToProps, mapDispatchToProps)(RegisteredProduct));
}

export default registeredProduct;