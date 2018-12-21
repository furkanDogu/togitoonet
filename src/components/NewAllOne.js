import React from 'react';
import { Grid, Row, Col, FormControl, Button, FormGroup, HelpBlock } from 'react-bootstrap';
import { connect } from 'react-redux';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Paper from '@material-ui/core/Paper';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import MatGrid from '@material-ui/core/Grid';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MemoryIcon from '@material-ui/icons/Memory';
import NewPcComponentModal from './NewPcComponentModal';
import {
	getBrands,
	getCategories,
	getSuppliers,
	addBrand,
	addCategory,
	addSupplier,
    addNewAllOne
} from '../actions/productActions';
import { verifyProductName, isSelectValid, isAmountValid, isCostValid, isNewPropNameValid } from '../util/validations';
import NewProductPropModal from './NewProductPropModal';
import NewSupplierModal from './NewSupplierModal';
import { giveSupplierIconColor } from '../util/colors';

class NewAllOne extends React.Component {
	constructor(prop) {
		super(prop);
		this.state = {
			selectedSupplierIndex: -1,
			searchKey: '',
			productName: '',
			brand: '',
			category: '',
			amount: '',
			cost: '',
			supplier: null,
			pcComponents: [],
			pcColor: '',
			selecttedIndex: -1,
			isProdutNameValid: 'error',
			isCategoryValid: 'error',
			isBrandValid: 'error',
			isAmountValid: 'error',
			isCostValid: 'error',
            isSupplierValid: 'error',
            isPcColorValid: 'error',
			isBrandModalOpen: false,
			isCategoryModalOpen: false,
			isSupplierModalOpen: false,
			isPcComponentModalOpen: false
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleBrandModal = this.handleBrandModal.bind(this);
		this.handleCategoryModal = this.handleCategoryModal.bind(this);
		this.handleSupplierModal = this.handleSupplierModal.bind(this);
		this.handlePcComponentModal = this.handlePcComponentModal.bind(this);
		this.addNewProp = this.addNewProp.bind(this);
		this.addNewSupplier = this.addNewSupplier.bind(this);
		this.handleFormSubmit = this.handleFormSubmit.bind(this);
		this.handleNewPcComponent = this.handleNewPcComponent.bind(this);
	}
	handlePcComponentModal() {
		this.setState(state => ({ isPcComponentModalOpen: !state.isPcComponentModalOpen}));
    }
    mapPcComponents() {
        let pcComponents = this.state.pcComponents.map((comp) => {
            return [comp.pcComponentName, comp.pcComponentCategoryID, comp.pcComponentBrandID];
        });
        return pcComponents;
    }
	checkIfAnyError() {
		const {
			isProdutNameValid,
			isCategoryValid,
			isBrandValid,
			isAmountValid,
			isCostValid,
			isSupplierValid,
		} = this.state;
		if (
			isProdutNameValid === 'error' ||
			isCategoryValid === 'error' ||
			isBrandValid === 'error' ||
			isAmountValid === 'error' ||
			isCostValid === 'error' ||
			isSupplierValid === 'error'
		) {
			return true;
		}
		return false;
	}
	cleanAreas() {
		this.setState({
			selectedSupplierIndex: -1,
			searchKey: '',
			productName: '',
			brand: '',
			category: '',
			amount: '',
			cost: '',
			supplier: null,
			pcComponents: [],
			pcColor: '',
			selecttedIndex: -1,
			isProdutNameValid: 'error',
			isCategoryValid: 'error',
			isBrandValid: 'error',
			isAmountValid: 'error',
			isCostValid: 'error',
			isSupplierValid: 'error',
			isPcColorValid: 'error',
			isBrandModalOpen: false,
			isCategoryModalOpen: false,
			isSupplierModalOpen: false,
		});
	}
	handleNewPcComponent(pcComponent) {
		this.setState({ pcComponents: [...this.state.pcComponents, pcComponent]}, () => {
			this.handlePcComponentModal();
		});
	}
	renderPcComponents() {
		if (this.state.pcComponents) {
			const pcComponents = this.state.pcComponents;
			return pcComponents.map((comp, index) => (
				<ListItem
					key={index}	
				>
					<MatGrid container direction={'row'} alignItems={'center'} justify={'center'}>
						<MatGrid item xs={1}>
							<ListItemIcon>
								<MemoryIcon />
							</ListItemIcon>
						</MatGrid>
						<MatGrid item xs={4}>
							<ListItemText primary={comp.pcComponentName} />
						</MatGrid>
						<MatGrid item xs={3}>
							<ListItemText primary={comp.pcComponentBrand} />
						</MatGrid>
						<MatGrid item xs={2}>
							<ListItemText primary={comp.pcComponentCategory} />
						</MatGrid>
					</MatGrid>
				</ListItem>
			));
		}
		
	}
	handleFormSubmit(e) {
		e.preventDefault();
		if (!this.checkIfAnyError() && this.state.pcComponents.length !== 0) {
            const allOne = {
                pcMarkaID: this.state.brand,
                pcRenk: this.state.pcColor,
                pcFiyat: this.state.cost,
                pcAdi: this.state.productName,
                pcSatinAlinanAdet: this.state.amount,
                pcTedarikciID: this.state.supplier,
                bilesenler: this.mapPcComponents(this.state.pcComponents)
            }
            this.props.addNewAllOne(allOne);
            this.cleanAreas();
		}
	}
	addNewSupplier(props) {
		this.props.addSupplier(props);
		this.handleSupplierModal();
	}
	addNewProp(type, value) {
		if (type === 'Yeni Marka') {
			this.props.addBrand(value);
			this.handleBrandModal();
		} else {
			this.props.addCategory(value);
			this.handleCategoryModal();
		}
	}
	handleSupplierModal() {
		this.setState(state => ({
			isSupplierModalOpen: !state.isSupplierModalOpen,
		}));
	}
	handleCategoryModal() {
		this.setState(state => ({
			isCategoryModalOpen: !state.isCategoryModalOpen,
		}));
	}
	handleBrandModal() {
		this.setState(state => ({
			isBrandModalOpen: !state.isBrandModalOpen,
		}));
	}
	// when user changes an input area, this function will be called
	// checks the given value if its valid then sets the value
	handleChange({ target }) {
		let selectValidation = null;
		if (target.name === 'productName') {
			const result = verifyProductName(target.value);
			this.setState({ isProdutNameValid: result });
		} else if (target.name === 'category' || target.name === 'brand') {
			selectValidation = isSelectValid(target.value);
		}
        if (target.name === 'brand') {
			this.setState({ isBrandValid: selectValidation });
		}
		if (target.name === 'amount') {
			this.setState({ isAmountValid: isAmountValid(target.value) });
		}
		if (target.name === 'cost') {
			this.setState({ isCostValid: isCostValid(target.value) });
		}
		if (target.name === 'pcColor') {
			this.setState({ isPcColorValid: isNewPropNameValid(target.value)});
		}
		this.setState({ [target.name]: target.value });
	}

	renderBrandOptions() {
		return (
			<React.Fragment>
				<option value="" />;
				{this.props.brands.map((brand, index) => (
					<option key={index} value={brand.markaID}>
						{brand.markaAdi}
					</option>
				))}
			</React.Fragment>
		);
	}
	renderCategoryOptions() {
		return (
			<React.Fragment>
				<option value="" />
				{this.props.categories.map((category, index) => {
					if (category.kategoriAdi !== 'Hazır PC') {
						return (
							<option key={index} value={category.kategoriID}>
								{category.kategoriAdi}
							</option>
						);
					}
				})}
			</React.Fragment>
		);
	}
	// first set the clicked supplier
	// then specify the chosen index to show with visual effects
	// finally let the user know about succesfull choice
	handleListItemClick(event, index, supplierID) {
		this.setState({ supplier: supplierID }, () => {
			this.setState({ selectedSupplierIndex: index }, () => {
				this.setState({ isSupplierValid: 'success' });
			});
		});
	}
	//clean the white spaces in search key and supplier name then only return the ones who is substansial suppliers.
	filterSupplierWithKey(key, suppliers) {
		key = key.replace(/ +/g, '');
		let filteredSuppliers = suppliers.filter(supplier => {
			let supplierInfo = supplier.tedarikciAdi + supplier.ilAdi + supplier.ilceAdi + supplier.telNo;
			supplierInfo = supplierInfo.replace(/ +/g, '');
			return supplierInfo.toLowerCase().includes(key.toLowerCase());
		});
		return filteredSuppliers;
	}
	// bring all the information when the component mounts ( from store about adding new product)
	componentDidMount() {
		this.props.getBrands();
		this.props.getCategories();
		this.props.getSuppliers();
		this.setState({ category: 'Hazır PC', isCategoryValid: 'success'});	
	}
	//search bar
	renderSearchBar() {
		return (
			<Grid style={{ marginBottom: 20 }}>
				<Row>
					<Col xs={9} style={{ padding: 0 }}>
						<FormGroup validationState={this.state.isSupplierValid}>
							<FormControl
								style={{ height: 40 }}
								type="text"
								placeholder="Lütfen tedarikçi aramak için herhangi bir anahtar giriniz"
								value={this.state.searchKey}
								onChange={this.handleChange}
								name="searchKey"
							/>
							<FormControl.Feedback style={{ marginRight: 6 }} />
							<HelpBlock>
								Lütfen tedarikçi firmayı bulduktan sonra üstüne tıklayarak seçim yapınız
							</HelpBlock>
						</FormGroup>
					</Col>

					<Col xs={3} style={{ paddingLeft: '1%', paddingRight: 0 }}>
						<Button
							onClick={this.handleSupplierModal}
							bsStyle="success"
							style={{ width: '100%', height: 40 }}
						>
							Yeni Ekle
						</Button>
					</Col>
				</Row>
			</Grid>
		);
	}
	renderSuppliers(items) {
		return items.map((item, index) => (
			<ListItem
				key={index}
				button
				selected={this.state.selectedSupplierIndex === index + 1}
				onClick={event => this.handleListItemClick(event, index + 1, item.tedarikciID)}
			>
				<MatGrid container direction={'row'} alignItems={'center'} justify={'center'}>
					<MatGrid item xs={1}>
						<ListItemIcon>
							<LocalShippingIcon
								style={giveSupplierIconColor(this.state.selectedSupplierIndex, index + 1)}
							/>
						</ListItemIcon>
					</MatGrid>
					<MatGrid item xs={4}>
						<ListItemText primary={item.tedarikciAdi} />
					</MatGrid>
					<MatGrid item xs={3}>
						<ListItemText primary={item.ilAdi} />
					</MatGrid>
					<MatGrid item xs={2}>
						<ListItemText primary={item.ilceAdi} />
					</MatGrid>
					<MatGrid item xs={2}>
						<ListItemText primary={item.telNo} />
					</MatGrid>
				</MatGrid>
			</ListItem>
		));
	}
	render() {
		const { fontStyle, rowStyle } = styles;
		return (
			<Grid>
				<form style={{ marginTop: 100 }} onSubmit={this.handleFormSubmit}>
					<Row style={rowStyle}>
						<Col>
							<span style={fontStyle}>Ürün Modeli: </span>
						</Col>
					</Row>
					<Row style={rowStyle}>
						<Col>
							<FormGroup controlId="formBasicText" validationState={this.state.isProdutNameValid}>
								<FormControl
									style={{ height: 40 }}
									type="text"
									onChange={this.handleChange}
									name="productName"
									value={this.state.productName}
									maxLength="60"
								/>
								<FormControl.Feedback />
								<HelpBlock>
									Lütfen Türkçe karakter kullanımı ve 60 karakterden uzun model tanımı yapmayınız
									<br />
									Model tanımı en az 5 karakterden oluşmalıdır
								</HelpBlock>
							</FormGroup>
						</Col>
					</Row>
					<Row style={rowStyle}>
						<Col>
							<span style={fontStyle}>Marka: </span>
						</Col>
					</Row>
					<Row style={rowStyle}>
						<Col xs={9} style={{ padding: 0 }}>
							<FormGroup validationState={this.state.isBrandValid}>
								<FormControl
									style={{ height: 40 }}
									componentClass="select"
									onChange={this.handleChange}
									name="brand"
									value={this.state.brand}
								>
									{this.renderBrandOptions()}
								</FormControl>
								<FormControl.Feedback style={{ marginRight: 6 }} />
								<HelpBlock>
									Lütfen varolan ya da yeni ekleyeceğiniz markalardan birini seçiniz
								</HelpBlock>
							</FormGroup>
						</Col>
						<Col xs={3} style={{ paddingLeft: '1%', paddingRight: 0 }}>
							<Button
								onClick={this.handleBrandModal}
								bsStyle="success"
								style={{ width: '100%', height: 40 }}
							>
								Yeni Ekle
							</Button>
						</Col>
					</Row>
						<React.Fragment>
							<Row style={rowStyle}>
							<Col>
								<span style={fontStyle}>Renk: </span>
							</Col>
						</Row>
						<Row style={rowStyle}>
							<Col>
								<FormGroup controlId="formBasicText" validationState={this.state.isPcColorValid}>
									<FormControl
										style={{ height: 40 }}
										type="text"
										onChange={this.handleChange}
										name="pcColor"
										value={this.state.pcColor}
										maxLength="40"
									/>
									<FormControl.Feedback />
									<HelpBlock>
										Lütfen Türkçe karakter kullanımı ve 40 karakterden uzun model tanımı yapmayınız
										<br />
										Renk tanımı en az 3 karakterden oluşmalıdır
									</HelpBlock>
								</FormGroup>
							</Col>
						</Row>
					</React.Fragment>
					<Row style={rowStyle}>
						<Col>
							<span style={fontStyle}>Satın Alınan Adet: </span>
						</Col>
					</Row>
					<Row style={rowStyle}>
						<Col>
							<FormGroup validationState={this.state.isAmountValid}>
								<FormControl
									style={{ height: 40 }}
									type="number"
									onChange={this.handleChange}
									value={this.state.amount}
									name="amount"
									max="100"
									min="1"
								/>
								<FormControl.Feedback style={{ marginRight: 6 }} />
								<HelpBlock>
									Lütfen ürün adetini giriniz
									<br />
									Her kalemde maksimum 100 minimum 1 ürün olabilir
								</HelpBlock>
							</FormGroup>
						</Col>
					</Row>
					<Row style={rowStyle}>
						<Col>
							<span style={fontStyle}>Birim Fiyatı: </span>
						</Col>
					</Row>
					<Row style={rowStyle}>
						<Col>
							<FormGroup validationState={this.state.isCostValid}>
								<FormControl
									style={{ height: 40 }}
									type="number"
									min="1"
									step="0.01"
									onChange={this.handleChange}
									value={this.state.cost}
									name="cost"
									maxLength="12"
								/>
								<FormControl.Feedback style={{ marginRight: 6 }} />
								<HelpBlock>
									Maksimum 10 minimum 1 basamaklı tutarlar girilebilir
									<br />
								</HelpBlock>
							</FormGroup>
						</Col>
					</Row>
						<React.Fragment>
							<Row style={rowStyle}>
								<Col xs={3} style={{ marginLeft: 0, paddingLeft: 0 }}>
									<span style={fontStyle}>Bileşenler: </span>
									{	this.state.pcComponents.length === 0 ? (<span style={{ display: 'block', color: '#a94442'}}>En az 1 bileşen eklemelisiniz</span>): null}
								</Col>
								<Col xs={3} style={{ paddingLeft: '1%', paddingRight: 0 }}>
									<Button
										onClick={this.handleCategoryModal}
										bsStyle="success"
										style={{ width: '99%', height: 40 }}
									>
										Bileşen için yeni kategori
									</Button>
								</Col>
								<Col xs={3} style={{ paddingLeft: '1%', paddingRight: 0 }}>
									<Button
										onClick={this.handleBrandModal}
										bsStyle="success"
										style={{ width: '99%', height: 40 }}
									>
										Bileşen için yeni marka
									</Button>
								</Col>
								<Col xs={3} style={{ paddingLeft: '1%', paddingRight: 0 }}>
									<Button
										onClick={this.handlePcComponentModal}
										bsStyle="success"
										style={{ width: '99%', height: 40 }}
									>
										Bileşen Ekle
									</Button>
								</Col>
							</Row>
							<Row style={rowStyle}>
								<Col>
									<Paper style={{ height: 350, overflow: 'auto' }}>
										<List>
											{this.renderPcComponents()}
										</List>
									</Paper>
								</Col>
							</Row>
						</React.Fragment>
					<Row style={rowStyle}>
						<Col style={{ marginBottom: 20 }}>
							<span style={fontStyle}>Tedarikçi: </span>
						</Col>
						<Col>
							{this.renderSearchBar()}
							<Paper style={{ height: 350, overflow: 'auto' }}>
								<List>
									{this.renderSuppliers(
										this.filterSupplierWithKey(this.state.searchKey, this.props.suppliers)
									)}
								</List>
							</Paper>
						</Col>
					</Row>
					<Row>
						<Col style={{ marginLeft: 0, paddingLeft: 0 }} sm={10}>
							<Button style={{ width: 200, height: 40 }} bsStyle="primary" type="submit">
								Ürünü Ekle
							</Button>
						</Col>
					</Row>
				</form>
				<NewProductPropModal
					isOpen={this.state.isBrandModalOpen}
					header={'Yeni Marka'}
					text={'Marka Adı:'}
					onClose={this.handleBrandModal}
					onOkay={this.addNewProp}
				/>
				<NewProductPropModal
					isOpen={this.state.isCategoryModalOpen}
					header={'Yeni Kategori'}
					text={'Kategori Adı:'}
					onClose={this.handleCategoryModal}
					onOkay={this.addNewProp}
				/>
				<NewSupplierModal
					isOpen={this.state.isSupplierModalOpen}
					onClose={this.handleSupplierModal}
					onOkay={this.addNewSupplier}
				/>
				<NewPcComponentModal
					isOpen={this.state.isPcComponentModalOpen}
					onClose={this.handlePcComponentModal}
					categories={this.props.categories}
					brands={this.props.brands}
					onOkay={this.handleNewPcComponent}
				/>
			</Grid>
		);
	}
}
const styles = {
	fontStyle: {
		fontSize: 23,
		color: '#2196f3',
	},
	rowStyle: {
		marginBottom: 20,
	},
};
const mapStateToProps = state => ({
	brands: state.productReducer.brands,
	categories: state.productReducer.categories,
	suppliers: state.productReducer.suppliers,
});
const mapDispatchToProps = {
	getBrands,
	getCategories,
	getSuppliers,
	addBrand,
	addCategory,
	addSupplier,
    addNewAllOne
};
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(NewAllOne);
