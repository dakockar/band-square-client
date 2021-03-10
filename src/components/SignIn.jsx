import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { Form, FormGroup, Input, Label, FormFeedback, FormText, Button } from "reactstrap";

function SignIn(props) {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <Button className="grey-text" color="link" onClick={handleShow}>
        Sign In
      </Button>

      <Modal show={show} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton>
          <Modal.Title>Sign In</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <Form onSubmit={props.onSignIn}>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input onChange={validateEmail}
                valid={email === 'has-success'}
                invalid={email === 'has-danger'}
                type="email" name="email" id="email" placeholder="email" />
              <FormFeedback valid>Sweet! That email is valid.</FormFeedback>
              <FormFeedback invalid="true">Please enter a valid email.</FormFeedback>
            </FormGroup>
            <FormGroup>
              <Label for="password">Password</Label>
              <Input
                // onChange={validatePassword}
                // valid={password === 'has-success'}
                // invalid={password === 'has-danger'}
                type="password" name="password" id="password" placeholder="password" />
              {/* <FormFeedback valid>strong password!</FormFeedback>
              <FormFeedback invalid="true">Your password is not strong enough</FormFeedback> */}
            </FormGroup>
            <Button variant="dark">Sign In!</Button>
          </Form>




          <Form onSubmit={props.onSignIn}>
            <Form.Group controlId="email">
              <Form.Label>Email address</Form.Label>
              <Form.Control name='email' type="email" placeholder="Enter email" />
            </Form.Group>

            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control name='password' type="password" placeholder="Password" />
            </Form.Group>
            <Button variant="dark" type="submit">
              Sign In!
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default SignIn;
