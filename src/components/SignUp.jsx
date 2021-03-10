import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { Form, FormGroup, Input, Label, FormFeedback, FormText, Button } from "reactstrap";


function SignUp(props) {
  const [show, setShow] = useState(false);
  const [email, setEmailState] = useState(false);
  const [password, setPasswordState] = useState(false);

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

  const validatePassword = (e) => {
    const passRegEx = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    let passwordState = "";

    if (!e.target.value.length) {
      setPasswordState(false);
      return;
    }

    passRegEx.test(e.target.value) ? passwordState = "has-success" : passwordState = "has-danger";

    setPasswordState(passwordState);
  }


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
            <FormGroup>
              <Label for="email">Email</Label>
              <Input onChange={validateEmail}
                valid={email === 'has-success'}
                invalid={email === 'has-danger'}
                type="email" name="email" id="email" placeholder="email" />
              <FormText>We'll never share your email with anyone else.</FormText>
              <FormFeedback valid>Sweet! That email is valid.</FormFeedback>
              <FormFeedback invalid="true">Please enter a valid email.</FormFeedback>
            </FormGroup>
            <FormGroup>
              <Label for="password">Password</Label>
              <Input onChange={validatePassword}
                valid={password === 'has-success'}
                invalid={password === 'has-danger'}
                type="password" name="password" id="password" placeholder="password" />
              <FormFeedback valid>Nice! Your password is strong!</FormFeedback>
              <FormFeedback invalid="true">Your password is not strong enough.</FormFeedback>
              <FormText>Password must be at least 8 characters, and include at least 1 letter and 1 number.</FormText>
            </FormGroup>
            <FormGroup tag="fieldset">
              <h6>Sign me up as:</h6>
              <FormGroup check>
                <Input id="musician" type="radio" name="type" value="musician" />
                <Label check for="musician">Musician</Label>
              </FormGroup>
              <FormGroup check>
                <Input id="owner" type="radio" name="type" value="owner" />
                <Label check for="owner">Owner</Label>
              </FormGroup>
            </FormGroup>

            <Button variant="dark">Sign Up!</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default SignUp;
