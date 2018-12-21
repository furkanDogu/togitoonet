import React from 'react';
import { Button, Modal, Row, Col, FormGroup, FormControl, HelpBlock  } from 'react-bootstrap';
import { isNewPropNameValid } from '../util/validations';

// This component helps us add new brand or category. It renders a modal in it. After pressing okay button, all data in here will be sent to the parent.
class NewProductPropModal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
            value: '',
		};
        this.handleOkayClick = this.handleOkayClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
	}
	handleOkayClick() {
        if (this.getValidationState() === 'success') {
            this.props.onOkay(this.props.header, this.state.value);
            this.setState({ value: ''});
        }  
    }
	getValidationState() {
		return isNewPropNameValid(this.state.value);
	}
    handleChange({ target }) {
        this.setState({ [target.name]: target.value });
    }
	render() {
		const { text, isOpen, onClose, header } = this.props;
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
							{header}
						</Modal.Title>
					</Modal.Header>
					<Modal.Body>
							<Row>
								<Col xs={3}>{text}</Col>
								<Col xs={7}>
									<FormGroup validationState={this.getValidationState()}>
										<FormControl
											style={{ height: 40 }}
											type="text"
											onChange={this.handleChange}
											value={this.state.value}
											name="value"
											maxLength="40"
										/>
										<FormControl.Feedback style={{ marginRight: 6 }} />
										<HelpBlock>
											Maksimum 40 minimum 3 karakterli Türkçe karakter içermeyen tanımlamalar yapılabilir
											<br />
										</HelpBlock>
									</FormGroup>
								</Col>
							</Row>
					</Modal.Body>
					<Modal.Footer>
						<Button bsStyle="success" onClick={this.handleOkayClick}>
							Ekle
						</Button>
						<Button onClick={() => onClose()}>Kapat</Button>
					</Modal.Footer>
				</Modal>
			</div>
		);
	}
}
export default NewProductPropModal;
