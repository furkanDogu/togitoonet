import React from 'react';
import { Button, Modal, Row, Col, FormControl, FormGroup, HelpBlock } from 'react-bootstrap';
import { verifyProductName, isSelectValid } from '../util/validations';
//{ isOpen, onClose, onOkay, categories, brands}
export default class NewPcComponentModal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
            pcComponentName: '',
            pcComponentCategory: '',
            pcComponentBrand: '',
            isNameValid: 'error',
            isCategoryValid: 'error',
            isBrandValid: 'error'
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleOkayButton = this.handleOkayButton.bind(this);
    }
    clearAreas() {
        this.setState({
            pcComponentName: '',
            pcComponentCategory: '',
            pcComponentBrand: '',
            isNameValid: 'error',
            isCategoryValid: 'error',
            isBrandValid: 'error'
        });
    }
    handleOkayButton() {
        const splittedBrand = this.state.pcComponentBrand.split('.');
        const splittedCategory = this.state.pcComponentCategory.split('.');
        const pcComponent = {
            pcComponentName: this.state.pcComponentName,
            pcComponentBrand: splittedBrand[1],
            pcComponentCategory: splittedCategory[1],
            pcComponentBrandID: splittedBrand[0],
            pcComponentCategoryID: splittedCategory[0]
        }
        this.props.onOkay(pcComponent);
        this.clearAreas();
    }
	renderBrands() {
        return (
            <React.Fragment>
				<option value="" />
				{this.props.brands.map((brand, index) => (
					<option key={index} value={brand.markaID+'.'+brand.markaAdi}>
						{brand.markaAdi}
					</option>
				))}
			</React.Fragment>
        );
    }
    renderCategories() {
        return (
            <React.Fragment>
				<option value="" />
				{this.props.categories.map((category, index) => {
					if (category.kategoriAdi !== 'Hazır PC') {
						return (
							<option key={index} value={category.kategoriID+'.'+category.kategoriAdi}>
								{category.kategoriAdi}
							</option>
						);
					}
				})}
			</React.Fragment>
        );
    }
    handleChange({ target }) {
        
        if (target.name === 'pcComponentName') {
            const result = verifyProductName(target.value);
			this.setState({ isNameValid: result });
        }
        if (target.name === 'pcComponentCategory') {
            this.setState({ isCategoryValid: isSelectValid(target.value)});
        }
        if (target.name === 'pcComponentBrand') {
            this.setState({ isBrandValid: isSelectValid(target.value)});
        }
        this.setState({ [target.name]: target.value});
    }
    render() {
		const { isOpen, onClose } = this.props;
		const { fontStyle, rowStyle } = styles;
		return (
			<div className="modal-container">
				<Modal
					style={{ marginTop: 70 }}
					show={isOpen}
					onHide={() => onClose()}
					container={this}
					aria-labelledby="contained-modal-title"
				>
					<Modal.Header closeButton>
						<Modal.Title style={{ color: '#2196f3' }} id="contained-modal-title">
							<span>Hazır PC Bileşeni</span>
						</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Row style={rowStyle}>
							<Col xs={3}>
								<span style={fontStyle}>Bileşen Modeli:</span>
							</Col>
							<Col xs={9}>
								<FormGroup validationState={this.state.isNameValid}>
									<FormControl
										type="text"
										name="pcComponentName"
										onChange={this.handleChange}
										value={this.state.pcComponentName}
										maxLength="60"
									/>
									<FormControl.Feedback style={{ marginRight: 6 }} />
									<HelpBlock>
										Maksimum 60 minimum 5 karakterli Türkçe karakter içermeyen tanımlamalar
										yapılabilir
										<br />
									</HelpBlock>
								</FormGroup>
							</Col>
						</Row>
                        <Row style={rowStyle}>
							<Col xs={3}>
								<span style={fontStyle}>Bileşen Markası:</span>
							</Col>
							<Col xs={9}>
								<FormGroup validationState={this.state.isBrandValid}>
									<FormControl
										componentClass="select" 
										name="pcComponentBrand"
										onChange={this.handleChange}
										value={this.state.pcComponentBrand}
									>
                                        {this.renderBrands()}
                                    </FormControl>
									<FormControl.Feedback style={{ marginRight: 6 }} />
									<HelpBlock>
										Bir marka seçin
										<br />
									</HelpBlock>
								</FormGroup>
							</Col>
						</Row>
                        <Row style={rowStyle}>
							<Col xs={3}>
								<span style={fontStyle}>Bileşen Kategorisi:</span>
							</Col>
							<Col xs={9}>
								<FormGroup validationState={this.state.isCategoryValid}>
									<FormControl
										componentClass="select" 
										name="pcComponentCategory"
										onChange={this.handleChange}
										value={this.state.pcComponentCategory}
									>
                                        {this.renderCategories()}
                                    </FormControl>
									<FormControl.Feedback style={{ marginRight: 6 }} />
									<HelpBlock>
										Bir kategori seçin
										<br />
									</HelpBlock>
								</FormGroup>
							</Col>
						</Row>
					</Modal.Body>
					<Modal.Footer>
						<Button bsStyle="success" onClick={this.handleOkayButton}>
							Ekle
						</Button>
						<Button onClick={() => onClose()}>Kapat</Button>
					</Modal.Footer>
				</Modal>
			</div>
		);
	}
}
const styles = {
	fontStyle: {
		fontSize: 15,
		fontWeight: '500',
		color: '#2196f3',
	},
	rowStyle: {
		marginBottom: 10,
	},
};
