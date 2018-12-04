import React from 'react';
import { connect } from 'react-redux';
import DetailModal from '../components/DetailModal';

const unregisteredProduct = WrappedComponent => {
	class UnregisteredProduct extends React.Component {
		constructor(props) {
			super(props);
			this.state = {
				detailModalOpen: false,
				registerationModalOpen: false,
				chosenForDetail: null,
			};
			this.handleDetailModal = this.handleDetailModal.bind(this);
			this.handleRegisterationModal = this.handleRegisterationModal.bind(this);
		}
		filterChosenProduct(id) {
			return this.props.unregisteredProductsData.find(product => product.bilesenID === id);
		}
		handleRegisterationModal() {
			this.setState(state => ({ registerationModalOpen: !state.registerationModalOpen }));
		}
		handleDetailModal(id) {
			if (id) {
				this.setState({ chosenForDetail: this.filterChosenProduct(id) });
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
			return (
				<div>
					<WrappedComponent buttons={buttons} {...this.props} />
					<DetailModal
						product={this.state.chosenForDetail}
						isOpen={this.state.detailModalOpen}
						onClose={this.handleDetailModal}
					/>
				</div>
			);
		}
	}
	const mapStateToProps = state => ({
		unregisteredProductsData: state.productReducer.unregisteredProducts,
	});
	return connect(mapStateToProps)(UnregisteredProduct);
};
export default unregisteredProduct;
