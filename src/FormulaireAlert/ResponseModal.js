import React from 'react'
import {Modal, Button} from "react-bootstrap";

const ResponseModal = ({show, handleClose, finalResponse}) => (
  <div>
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{finalResponse}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  </div>
);

export default ResponseModal


