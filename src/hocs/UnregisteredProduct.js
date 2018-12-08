import React from 'react';
import { connect } from 'react-redux';
import { registerProduct } from '../actions/productActions';
import DetailModal from '../components/DetailModal';
import RegisterationModal from '../components/RegisterationModal';
import { withRouter } from 'react-router-dom';

const unregisteredProduct = WrappedComponent => {
	class UnregisteredProduct extends React.Component {
		constructor(props) {
			super(props);
			this.state = {
				detailModalOpen: false,
				registerationModalOpen: false,
				chosenForDetail: null,
				pcComponents: null,
				chosenForRegisteration: null
			};
			this.handleDetailModal = this.handleDetailModal.bind(this);
			this.handleRegisterationModal = this.handleRegisterationModal.bind(this);
			this.onSubmitClicked = this.onSubmitClicked.bind(this);
		}
		onSubmitClicked(employeeID) {
			// chosenForRegisteration içinde seçilen product var 
			//zimmetleneceği personelin id'side parametre olarak registeration modelden geliyor.
			console.log(this.state.chosenForRegisteration);
			this.props.registerProduct({ 
				employeeID,
				product: this.state.chosenForRegisteration,
				token: this.props.token,
			});
		}
		filterChosenProduct(id, IDtype) {
			// searches for the product with given ID and type 
			const type = IDtype === 'B' ? 'bilesenID' : 'pcID';
			return this.props.unregisteredProductsData.find(product => product[type] === id);
		}
		filterChosenPcComponents(id) {
			return this.props.unregisteredPcComponents.filter(product => product.pcID === id);
		}
		handleRegisterationModal(id) {
			if (id) {
				const ID = this.splitID(id);
				this.setState({ chosenForRegisteration: this.filterChosenProduct(ID[0], ID[1]) });
			} 
			this.setState(state => ({ registerationModalOpen: !state.registerationModalOpen }));
		}
		splitID (id) {
			let splittedID = id.split('-');
			return [parseInt(splittedID[1]), splittedID[0]];
		}
		handleDetailModal(id) {
			if (id) {
				const ID = this.splitID(id);
				this.setState({ chosenForDetail: this.filterChosenProduct(ID[0], ID[1]) }, () => {
					this.setState({ pcComponents: this.filterChosenPcComponents(ID[0]) });
				});
				
			} 
			this.setState(state => ({ detailModalOpen: !state.detailModalOpen }));
		}
		render() {
			const buttons = [
				{
					onClick: this.handleRegisterationModal,
					text: 'Zimmetle',
					bsStyle: 'success',
				},
				{
					onClick: this.handleDetailModal,
					text: 'Detay Gör',
					bsStyle: 'primary',
				},
			];
			// wrapped component = given product container
			return (
				<div>
					<WrappedComponent buttons={buttons} {...this.props} /> 
					<DetailModal
						product={this.state.chosenForDetail}
						isOpen={this.state.detailModalOpen}
						onClose={this.handleDetailModal}
						pcComponents={this.state.pcComponents}
					/>
					<RegisterationModal
						isOpen={this.state.registerationModalOpen}
						onClose={this.handleRegisterationModal}
						onSubmitClicked={this.onSubmitClicked}
						product={this.state.chosenForRegisteration}
					/>
				</div>
			);
		}
	}
	const mapStateToProps = state => ({
		unregisteredProductsData: state.productReducer.unregisteredProducts,
		unregisteredPcComponents: state.productReducer.unregisteredPcComponents,
		token: state.userReducer.token,
		employees: state.userReducer.employees

	});
	const mapDispatchToProps = {
		registerProduct,
	};
	return withRouter(connect(mapStateToProps, mapDispatchToProps)(UnregisteredProduct));
};
export default unregisteredProduct;
