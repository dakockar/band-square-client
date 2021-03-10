import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";

class MusicianProfileEdit extends Component {

  render() {
    const { user, onEdit } = this.props

    if (!user) return null;

    return (
      <div>
        <h1>Edit Musician Profile</h1>

        <Form onSubmit={onEdit}>
          <Form.Group controlId="firstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control name='firstName' type="text" placeholder="Enter Name" defaultValue={user.firstName} />
          </Form.Group>
          <Form.Group controlId="lastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control name="lastName" type="text" placeholder="Last Name" defaultValue={user.lastName} />
          </Form.Group>
          <Form.Group controlId="genre">
            <Form.Label>Genre</Form.Label>
            <Form.Control name="genre" type="text" placeholder="Genre" defaultValue={user.genre} />
          </Form.Group>
          <Form.Group controlId="instrument">
            <Form.Label>Instrument</Form.Label>
            <Form.Control name="instrument" type="text" placeholder="Instrument" defaultValue={user.instrument} />
          </Form.Group>
          <Form.Group controlId="location">
            <Form.Label>Location</Form.Label>
            <Form.Control name="location" type="text" placeholder="Location" defaultValue={user.location} />
          </Form.Group>
          <Form.Group controlId="bandName">
            <Form.Label>Band</Form.Label>
            <Form.Control name="bandName" type="text" placeholder="Band" defaultValue={user.bandName} />
          </Form.Group>
          <Form.Group controlId="lookingFor">
            <Form.Label>Looking For</Form.Label>
            <Form.Control name="lookingFor" type="text" placeholder="guitar player, singer..." defaultValue={user.lookingFor} />
            <Form.Text className="text-muted">Please leave it empty if you're not looking for a musician.</Form.Text>
          </Form.Group>
          <Form.Group controlId="aboutMe">
            <Form.Label>About Me</Form.Label>
            <Form.Control name="aboutMe" type="text" placeholder="About me" defaultValue={user.aboutMe} />
          </Form.Group>
          <Button className="button" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    );
  }
}

export default MusicianProfileEdit;
