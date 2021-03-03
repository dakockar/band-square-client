import React, { useState } from "react";
import { Modal, Form, Button, Row, Col } from "react-bootstrap";

function SignUp(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div>
      <Button variant="primary" onClick={handleShow}>
        Sign Up
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={props.onSignUp}>
            <Form.Group controlId="formBasicEmail">
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

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                name="password"
                type="password"
                placeholder="Password"
              />
            </Form.Group>
              <Form.Group as={Row}>
                <Form.Label as="legend" column sm={2}>
                  I'm a 
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
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default SignUp;
