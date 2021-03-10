import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { Form, FormGroup, Input, Label, FormFeedback, FormText, Button } from "reactstrap";

function SignIn(props) {

  const [show, setShow] = useState(false);
  const [email, setEmailState] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const validateEmail = (e) => {
    // regex for email validation
    const emailRegEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let emailState = ""

    if (!e.target.value.length) {
      setEmailState(false);
      return;
    }

    emailRegEx.test(e.target.value) ? emailState = "has-success" : emailState = "has-danger";

    setEmailState(emailState);
  }

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
                type="password" name="password" id="password" placeholder="password" />
            </FormGroup>
            <Button variant="dark">Sign In!</Button>
          </Form>

        </Modal.Body>
      </Modal>
    </div>
  );
}

export default SignIn;
