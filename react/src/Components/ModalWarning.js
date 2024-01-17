import React from "react";
import { Modal, Button } from "react-bootstrap";

function Warning(props) {
  return (
    <Modal
      show={props.show}
      onHide={props.setShow(false)}
      // backdrop="static"
    >
      <Modal.Header>
        <Modal.Title>props.title</Modal.Title>
      </Modal.Header>
      <Modal.Body>props.body</Modal.Body>
      <Modal.Footer>
        <Button
          variant="none"
          className="wrongInfoBtn"
          onClick={props.handleClose}
        >
          확인
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Warning;
