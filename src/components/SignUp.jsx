import React, { useState } from "react";
import { Modal, Form, Button, Row, Col } from "react-bootstrap";

function SignUp(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <Button className="grey-text" variant="link" onClick={handleShow}>
        Sign Up
      </Button>

      <Modal className="modal-box" show={show} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton>
          <Modal.Title>Sign Up</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={props.onSignUp}>
            <Form.Group controlId="email">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                name="email"
                type="email"
                placeholder="Enter email"
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                name="password"
                type="password"
                placeholder="Password"
              />
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label as="legend" column sm={2}>
                <span>Sign me up as:</span>
              </Form.Label>
              <Col sm={10}>
                <Form.Check
                  type="radio"
                  label="Musician"
                  name="type"
                  id="formHorizontalRadios1"
                  value='musician'
                />
                <Form.Check
                  type="radio"
                  label="Owner"
                  name="type"
                  id="formHorizontalRadios2"
                  value='owner'
                />
              </Col>
            </Form.Group>
            <Button variant="dark" type="submit">
              Sign Up!
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default SignUp;
