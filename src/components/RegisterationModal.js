import React from 'react';
import List from './List';
import { connect } from 'react-redux';
import { getEmployees } from '../actions/userActions';
import { Modal, Button } from 'react-bootstrap';

class RegisterationModal extends React.Component {
	 constructor(props) {
        super(props);
        this.state = {
            chosenEmployee: null
        }
        this.setChosenEmployee = this.setChosenEmployee.bind(this);
    } 
    setChosenEmployee(id) {
        //List will pass id of the chosen employee, then set it to state.
        this.setState({ chosenEmployee: id });
    }
	componentDidMount() {
		this.props.getEmployees();
	}
	render() {
		const { isOpen, onClose, employees, onSubmitClicked } = this.props;
		return (
			
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
                        <Button bsStyle="success" onClick={() => onSubmitClicked(this.state.chosenEmployee)}>Zimmetle</Button>
						<Button onClick={() => onClose()}>Kapat</Button>
					</Modal.Footer>
				</Modal>

		);
	}
}


const mapStateToProps = state => ({
	employees: state.userReducer.employees,
});
const mapDispatchToProps = {
	getEmployees,
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(RegisterationModal);

