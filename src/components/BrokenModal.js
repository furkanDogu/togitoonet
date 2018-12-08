import React from 'react';
import { Modal, Button } from 'react-bootstrap';



export default ({ isOpen, onClose, pcComponents, product }) => {
	return (
		<div className="modal-container">
			<Modal style={{ marginTop: 70 }} show={isOpen} onHide={() => onClose()} container={this} aria-labelledby="contained-modal-title">
				<Modal.Header closeButton>
					<Modal.Title style={{ color: '#2196f3' }} id="contained-modal-title">
						Arızalı Bileşen
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<h5>bileşenimiz arızalanmış yazık</h5>
				</Modal.Body>
				<Modal.Footer>
					<Button onClick={() => onClose()}>Kapat</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
};