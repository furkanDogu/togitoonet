import React from 'react';
import { connect } from 'react-redux';
import { getUnregisteredProducts, getRegisteredProducts, getBrokenProducts } from '../actions/productActions';
import { getEmployees } from '../actions/userActions';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';

// This hoc is responsible for holding product container.
// ProductPage will give business logic to the product container
export default WrappedComponent => {
	class ProductPage extends React.Component {
		constructor(props) {
			super(props);
			this.state = {
				searchKey: ''
			}
			this.handleChange = this.handleChange.bind(this);
		}
		//handles input coming from search bar
		handleChange({ target }) {
			this.setState({ [target.name]: target.value });
		}
		
		//renders appropriate products according to product type
		giveAppropriateProducts() {
			const { productType } = this.props;
			if (productType === 'unregisteredProduct') {
				return this.filterProductsWithKey(this.props.unregisteredProducts);
			} else if (productType === 'registeredProduct') {
				return this.filterProductsWithKey(this.props.registeredProducts);
			} else {
				return this.filterProductsWithKey(this.props.brokenProducts);
			}
		}
		// filters products according to the search bar text
		filterProductsWithKey(products) {
			const { productType } = this.props;
			let filteredProducts = null;
			if (productType !== 'registeredProduct') { // we will search given key in registered products
				filteredProducts = products.filter((item) => {
					let itemInfo = null;
					itemInfo = item.kategoriAdi;
					if (item.Tip === 'Bileşen') { // if current product's tip = bileşen we need to change the way we look for id and name.
						itemInfo = itemInfo.concat(item.bilesenAdi, 'B-', item.bilesenID);
					} else {
						itemInfo = itemInfo.concat(item.pcAdi, ' ', 'P-' +item.pcID);
					}
					itemInfo = itemInfo.replace(/ +/g, "");
					let searchKeyNew = this.state.searchKey.replace(/ +/, "");
					return itemInfo.toLowerCase().trim().includes(searchKeyNew.toLowerCase().trim());
					
				});
			} else {
				// id isim departman
				filteredProducts = products.filter((item) => {
					let itemInfo = null;
					itemInfo = item.kategoriAdi;
					if (item.Tip === 'Bileşen') { // if current product's tip = bileşen we need to change the way we look for id and name.
						itemInfo = itemInfo.concat(item.bilesenAdi, 'B-', item.bilesenID);
					} else {
						itemInfo = itemInfo.concat(item.pcAdi, 'P-' + item.pcID);
					}
					itemInfo = itemInfo.concat(item.personelAdi);
					itemInfo = itemInfo.concat(item.departmanAdi);
					itemInfo = itemInfo.replace(/ +/g, "");
					let searchKeyNew = this.state.searchKey.replace(/ +/g, "");
					return itemInfo.toLowerCase().trim().includes(searchKeyNew.toLowerCase().trim());
					
				});
			}
			return filteredProducts;
			
		}
		//renders helper text of search bar according to the product type
		giveTextsToSearchBar() {
			const { productType } = this.props;
			 if (productType === 'registeredProduct') {
				return ['Lütfen personele ya da ürüne ait anahtar giriniz', 'ID / İsim / Departman'];
			} else {
				return ['Lütfen ürüne ait anahtar giriniz', 'ID / Model / Kategori' ];
			}
		}
		// this function is called when the component created on screen. This func. gets products according to the product type
		componentDidMount() {
			const { getUnregisteredProducts, getEmployees, productType, getRegisteredProducts, getBrokenProducts } = this.props;
			if (productType === 'unregisteredProduct') {
				getUnregisteredProducts();
				getEmployees();
			} else if (productType === 'registeredProduct') {
				getRegisteredProducts();
			} else {
				getBrokenProducts();
			}
		}
		render() {
			const { hoc } = this.props;
			return (
				<div>
					<div style={{ flexGrow: 1, marginLeft: 25, marginTop: 80 }}>
						<h5>{this.giveTextsToSearchBar()[0]}</h5>
						<Grid container>
							<Grid item xs={2}>
								<Paper>
									<InputBase
									style={{ padding: 12, textTransform: 'lowercase'}}
									fullWidth
									value={this.state.searchKey} 
                                	onChange={this.handleChange}
									name="searchKey"
									placeholder={this.giveTextsToSearchBar()[1]}
									/>
								</Paper>
							</Grid>
						</Grid>
					</div>
					<WrappedComponent products={this.giveAppropriateProducts()} hoc={hoc} />
				</div>
			);
		}
	}
	const mapStateToProps = state => ({
		unregisteredProducts: state.productReducer.unregisteredProducts,
		registeredProducts: state.productReducer.registeredProducts,
		brokenProducts: state.productReducer.brokenProducts,
	});
	const mapDispatchToProps = {
		getUnregisteredProducts,
		getRegisteredProducts,
		getBrokenProducts,
		getEmployees
	};
	return connect(
		mapStateToProps,
		mapDispatchToProps
	)(ProductPage);
};
