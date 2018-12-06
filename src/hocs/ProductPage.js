import React from 'react';
import { connect } from 'react-redux';
import { getUnregisteredProducts, getRegisteredProducts } from '../actions/productActions';
import { getEmployees } from '../actions/userActions';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';

export default WrappedComponent => {
	class ProductPage extends React.Component {
		constructor(props) {
			super(props);
			this.state = {
				searchKey: ''
			}
			this.handleChange = this.handleChange.bind(this);
		}
		handleChange({ target }) {
			this.setState({ [target.name]: target.value });
		}
		giveAppropriateProducts() {
			const { productType } = this.props;
			if (productType === 'unregisteredProduct') {
				return this.filterProductsWithKey(this.props.unregisteredProducts);
			} else if (productType === 'registeredProduct') {
				return this.props.registeredProducts;
			} else {
				//return this.props.brokenProducts
			}
		}
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
					let searchKeyNew = this.state.searchKey;
					searchKeyNew = searchKeyNew.replace(/ +/, "");
					return itemInfo.toLowerCase().trim().includes(searchKeyNew.toLowerCase().trim());
					
				});
			} else {
				return products;
			}
			return filteredProducts;
			
		}
		giveTextsToSearchBar() {
			const { productType } = this.props;
			 if (productType === 'registeredProduct') {
				return ['Lütfen personele ait anahtar giriniz', 'ID / İsim / Departman'];
			} else {
				return ['Lütfen ürüne ait anahtar giriniz', 'ID / Model / Kategori' ];
			}
		}
		componentDidMount() {
			
			const { getUnregisteredProducts, token, getEmployees, productType, getRegisteredProducts } = this.props;
			if (productType === 'unregisteredProduct') {
				getUnregisteredProducts(token);
				getEmployees();
			} else if (productType === 'registeredProduct') {
				getRegisteredProducts(token);
			} else {
				//getBrokenProducts
			}
		}
		render() {
			console.log(this.props.productType);
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
		token: state.userReducer.token,
	});
	const mapDispatchToProps = {
		getUnregisteredProducts,
		getEmployees,
		getRegisteredProducts
	};
	return connect(
		mapStateToProps,
		mapDispatchToProps
	)(ProductPage);
};
