import axios from "axios";
import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import config from "../config";

class MusicianProfileEdit extends Component {
  state = {
    user: {},
  };

  componentDidMount() {
    let userId = this.props.match.params.userId;
    axios
      .get(`${config.API_URL}/api/musician-profile/${userId}`)
      .then((response) => {
        this.setState({
          user: response.data,
        });
      })
      .catch(() => {
        console.log("editform failed----");
      });
  }

//   handleNameChange = (event) => {
//     let text = event.target.value;
//     let clonedUser = JSON.parse(JSON.stringify(this.state.todo));
//     clonedUser.firstName = text;

//     this.setState({
//       user: clonedUser,
//     });
//   };

  render() {
    return (
      <Form onSubmit={this.props.onEdit}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Name</Form.Label>
          <Form.Control name='firstName' type="text" placeholder="Enter Name" />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Instrument</Form.Label>
          <Form.Control name="instrument" type="text" placeholder="Password" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
        {/* <label>Name</label>
        <input name="name" type="text" onChange={this.handleNameChange} />
        <button
          onClick={() => {
            onEdit(this.state.user);
          }}
        >
          Submit
        </button> */}
      </Form>
    );
  }
}

export default MusicianProfileEdit;
