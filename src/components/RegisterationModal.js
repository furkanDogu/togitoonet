import React from 'react';
import List from './List';
import { connect } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import ErrorModal from './ErrorModal';

class RegisterationModal extends React.Component {
	 constructor(props) {
        super(props);
        this.state = {
			chosenEmployee: null,
			warningModalOpen: false
        }
		this.setChosenEmployee = this.setChosenEmployee.bind(this);
		this.handleWarningModal = this.handleWarningModal.bind(this);
	}
	handleWarningModal() {
		this.setState(state => ({ warningModalOpen: !state.warningModalOpen }));
	}
    setChosenEmployee(id) {
        //List will pass id of the chosen employee, then set it to state.
        this.setState({ chosenEmployee: id });
    }
	render() {
		const { isOpen, onClose, employees, onSubmitClicked } = this.props;
		return (
			<div>
				<Modal
                    style={{ marginTop: 70 }}
                    height="200px"
					show={isOpen}
					onHide={() => onClose()}
					container={this}
					aria-labelledby="contained-modal-title"
				>
					<Modal.Header closeButton>
						<Modal.Title  style={{ color: '#2196f3', marginLeft: 5 }} id="contained-modal-title">
							Ürün Zimmetleme
						</Modal.Title>
					</Modal.Header>
					<Modal.Body>
                        <List setChosenEmployee={this.setChosenEmployee} items={employees} />
					</Modal.Body>
					<Modal.Footer>
                        <Button bsStyle="success" onClick={() => {
							if (this.state.chosenEmployee) {
								onSubmitClicked(this.state.chosenEmployee)
							} else {
								this.handleWarningModal();
							}
						}}>Zimmetle</Button>
						<Button onClick={() => onClose()}>Kapat</Button>
					</Modal.Footer>
				</Modal>
				<ErrorModal
                    text="Lütfen ürünün zimmetleneceği personeli seçiniz"
                    isOpen={this.state.warningModalOpen}
                    onClose={this.handleWarningModal} 
                    header="Eksik Personel Seçimi"
                />
			</div>
				

		);
	}
}


const mapStateToProps = state => ({
	employees: state.userReducer.employees,
});

export default connect(
	mapStateToProps,
	null
)(RegisterationModal);

