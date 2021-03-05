import axios from "axios";
import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import config from "../config";

class MusicianProfileEdit extends Component {
  //   state = {
  //     user: {},
  //   };

  //   componentDidMount() {
  //     let userId = this.props.user._id;
  //     axios
  //       .get(`${config.API_URL}/api/musician-profile/${userId}`)
  //       .then((response) => {
  //         this.setState({
  //           user: response.data,
  //         });
  //       })
  //       .catch(() => {
  //         console.log("editform failed----");
  //       });
  //   }

  //   // console.log(this.props);
  //   // console.log(this.props.user._id);


  render() {
    const { user } = this.props

    if (!user) return null;

    return (
      <div>
        <h1>Edit Musician Profile</h1>

        <Form onSubmit={this.props.onEdit}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>First Name</Form.Label>
            <Form.Control name='firstName' type="text" placeholder="Enter Name" defaultValue={this.props.user.firstName} />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Last Name</Form.Label>
            <Form.Control name="lastName" type="text" placeholder="Last Name" defaultValue={this.props.user.lastName} />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Genre</Form.Label>
            <Form.Control name="genre" type="text" placeholder="genre" defaultValue={this.props.user.genre} />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Instrument</Form.Label>
            <Form.Control name="instrument" type="text" placeholder="Instrument" defaultValue={this.props.user.instrument} />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>location</Form.Label>
            <Form.Control name="location" type="text" placeholder="Location" defaultValue={this.props.user.location} />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Band</Form.Label>
            <Form.Control name="bandName" type="text" placeholder="Band" defaultValue={this.props.user.bandName} />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>About Me</Form.Label>
            <Form.Control name="aboutMe" type="text" placeholder="About me" defaultValue={this.props.user.aboutMe} />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
        </Button>
        </Form>
      </div>
    );
  }
}

export default MusicianProfileEdit;
