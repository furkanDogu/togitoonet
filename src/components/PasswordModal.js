import React from 'react';
import { Button, Modal, Col, Row, FormControl, HelpBlock, FormGroup } from 'react-bootstrap';
import { isPasswordValid } from '../util/validations';


class PasswordModal extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			value: '',
			isPasswordValid: 'error'
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleOkayClick = this.handleOkayClick.bind(this);
	}
	handleOkayClick() {
		if (this.state.isPasswordValid !== 'error') {
			this.props.onOkay(this.state.value);
			this.setState({ value: '', isPasswordValid: 'error'});
			this.props.onClose();
		} 
	}
	handleChange({ target }) {
		this.setState({ isPasswordValid: isPasswordValid(target.value)});
		this.setState({ [target.name]: target.value });
		
	}
	render() {
		const { isOpen, onClose, onOkay } = this.props;
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
							Kullanıcı Şifresi
						</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Row>
							<Col xs={3}>Kullanıcı Şifresi</Col>
							<Col xs={7}>
								<FormGroup validationState={this.state.isPasswordValid}>
									<FormControl
										style={{ height: 40 }}
										type="password"
										onChange={this.handleChange}
										value={this.state.value}
										name="value"
									/>
									<FormControl.Feedback style={{ marginRight: 6 }} />
									<HelpBlock>
										Maksimum 40 minimum 5 karakterli şifre tanımlamaları yapılabilir
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
};

export default PasswordModal;
