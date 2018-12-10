import React from 'react';
import { Button, Modal, Row, Col, FormGroup, FormControl, HelpBlock } from 'react-bootstrap';
import { getCities, getTowns } from '../actions/productActions';
import { isNewPropNameValid, isTelNoValid, isSelectValid } from '../util/validations';
import { connect } from 'react-redux';

class NewSupplierModal extends React.Component {
    constructor(props) {
		super(props);
		this.state = {
            supplierName: '',
            telNo: '',
            il: '',
            ilce: '',
            isSupplierNameValid: 'error',
            isTelNoValid: 'error',
            isIlValid: 'error',
            isIlceValid: 'error',
		};
        this.handleChange = this.handleChange.bind(this);
        this.handleOnOkay = this.handleOnOkay.bind(this);
    }
    checkIfAnyError() {
        const { isSupplierNameValid, isTelNoValid, isIlValid, isIlceValid } = this.state;
        if (isSupplierNameValid === 'error' || isTelNoValid === 'error' || isIlValid === 'error' || isIlceValid === 'error') {
            return true;
        } 
        return false;
    }
    handleOnOkay() {
        if (!this.checkIfAnyError()) {
            const { supplierName, il, ilce, telNo } = this.state;
            this.props.onOkay({
                supplierName,
                ilID: il,
                ilceID: ilce,
                telNo
            });
            this.setState({
                supplierName: '',
                telNo: '',
                il: '',
                ilce: '',
                isSupplierNameValid: 'error',
                isTelNoValid: 'error',
                isIlValid: 'error',
                isIlceValid: 'error'
            });
        }
        console.log('buraya geliyor');
        console.log(this.state);
    }
    componentDidMount() {
        this.props.getCities();
    }
	getValidationState() {
		return ;
	}
    handleChange({ target }) {
        if (target.name === 'supplierName') {
            this.setState({ isSupplierNameValid: isNewPropNameValid(target.value)});
        } 
        if (target.name === 'telNo') {
            this.setState({ isTelNoValid: isTelNoValid(target.value)});
        }
        if (target.name === 'il') {
            if (target.value) {
                this.props.getTowns(target.value);
                this.setState({ ilce: '', isIlceValid: 'error'});
            }
            this.setState({ isIlValid: isSelectValid(target.value)});
        }
        if (target.name === 'ilce') {
            this.setState({ isIlceValid: isSelectValid(target.value)});
        }
        this.setState({ [target.name]: target.value });
    }
    renderCities() {
        return (
            <React.Fragment>
				<option value="" />
				{this.props.cities.map((city, index) => (
					<option key={index} value={city.ilID}>
						{city.ilAdi}
					</option>
				))}
			</React.Fragment>
        );
    }
    renderTowns() {
        return (
            <React.Fragment>
				<option value="" />
				{this.props.towns.map((town, index) => (
					<option key={index} value={town.ilceID}>
						{town.ilceAdi}
					</option>
				))}
			</React.Fragment>
        );
    }
	render() {
        const { isOpen, onClose, onOkay } = this.props;
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
						<Modal.Title style={{ color: '#2196f3', fontSize: 20 }} id="contained-modal-title">
                            Yeni Tedarikçi
						</Modal.Title>
					</Modal.Header>
					<Modal.Body>
                            <Row style={rowStyle}>
                                <Col xs={3}><span style={fontStyle}>Tedarikçi Adı:</span> </Col>
                                <Col xs={9}>
                                    <FormGroup validationState={this.state.isSupplierNameValid}>
                                        <FormControl 
                                            type="text" 
                                            name="supplierName"
                                            onChange={this.handleChange}
                                            value={this.state.supplierName}
                                            maxLength="40"
                                        />
                                        <FormControl.Feedback style={{ marginRight: 6 }} />
                                        <HelpBlock>
											Maksimum 40 minimum 5 karakterli Türkçe karakter içermeyen tanımlamalar yapılabilir
											<br />
										</HelpBlock>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row style={rowStyle}>
                                <Col xs={3}><span style={fontStyle}>Tel No:</span> </Col>
                                <Col xs={9}>
                                    <FormGroup validationState={this.state.isTelNoValid}>
                                        <FormControl 
                                            type="tel"
                                            name="telNo"
                                            maxlength="11"
                                            onChange={this.handleChange}
                                            value={this.state.telNo}
                                        />
                                        <FormControl.Feedback style={{ marginRight: 6 }} />
                                        <HelpBlock>
											Başında 0 olacak şekilde 11 karakterli telefon numarasını giriniz
											<br />
										</HelpBlock>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row style={rowStyle}>
                                <Col xs={3}><span style={fontStyle}>İl:</span> </Col>
                                <Col xs={9}>
                                    <FormGroup validationState={this.state.isIlValid}>
                                        <FormControl 
                                            componentClass="select" 
                                            onChange={this.handleChange}
                                            value={this.state.il}
                                            name="il"
                                        >
                                            {this.renderCities()}
                                        </FormControl>
                                        <FormControl.Feedback style={{ marginRight: 10 }} />
                                        <HelpBlock>
											Lütfen bir il seçiniz
											<br />
										</HelpBlock>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row style={rowStyle}>
                                <Col xs={3}><span style={fontStyle}>İlçe:</span> </Col>
                                <Col xs={9}>
                                    <FormGroup validationState={this.state.isIlceValid}>
                                        <FormControl 
                                            componentClass="select"
                                            onChange={this.handleChange}
                                            value={this.state.ilce}
                                            name="ilce"
                                        >
                                            {this.renderTowns()}
                                        </FormControl>
                                        <FormControl.Feedback style={{ marginRight: 10 }} />
                                        <HelpBlock>
											Lütfen bir ilçe seçiniz
											<br />
										</HelpBlock>
                                    </FormGroup>
                                </Col>
                            </Row>
					</Modal.Body>
					<Modal.Footer>
						<Button 
                            bsStyle="success"
                            onClick={this.handleOnOkay}
                        >
							Ekle
						</Button>
						<Button onClick={() => onClose()}>Kapat</Button>
					</Modal.Footer>
				</Modal>
            </div>
        )
    }
}

const styles = {
    fontStyle: {
        fontSize: 15,
        fontWeight: '500',
		color: '#2196f3',
    },
    rowStyle: {
        marginBottom: 10
    }
};
const mapStateToProps = state => ({
    cities: state.productReducer.cities,
    towns: state.productReducer.towns
});
const mapDispatchToProps = {
    getCities,
    getTowns
}
export default connect(mapStateToProps, mapDispatchToProps)(NewSupplierModal);
