import React from 'react';
import PropTypes from 'prop-types';
import { Button, Modal } from 'react-bootstrap';

const ErrorModal = ({ text, isOpen, onClose }) =>  {
    return (
      <div className="modal-container" style={{ height: 200 }}>
        <Modal
          show={isOpen}
          onHide={() => onClose()}
          container={this}
          aria-labelledby="contained-modal-title"
        >
          <Modal.Header closeButton>
            <Modal.Title style={{ color: '#2196f3' }} id="contained-modal-title">
              Hatalı Giriş
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h5>{text}</h5>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => onClose()}>Kapat</Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
}
ErrorModal.propTypes = {
  text: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};
export default ErrorModal;
