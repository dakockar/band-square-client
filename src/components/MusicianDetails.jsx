import React, { Component } from "react";
import axios from "axios";
import config from "../config";
import { Button, Card } from "react-bootstrap";
import { Route, Link } from "react-router-dom";
import EditVenueForm from "./EditVenueForm";

class MusicianDetails extends Component {
  state = {
    user: null,
  };

  componentDidMount() {
    console.log("musician prop-------", this.props);
    const musicianId = this.props.match.params.musicianId;
    console.log(musicianId);

    axios
      .get(`${config.API_URL}/api/musician/${musicianId}`)
      .then((response) => {
        console.log("musician id-----", response.data);
        this.setState({
          user: response.data,
        });
      })
      .catch((err) => {
        console.log("Get musician failed", err);
      });
  }

  render() {
    const { user } = this.state;
    // console.log(this.props);

    if (!user) return null;

    return (
      <div className="profile-page">
        <Card className='card-style'>
          <Card.Img variant="top" src={user.imgUrl} />
          <Card.Body>
            <Card.Title>
              {user.firstName} {user.lastName}
            </Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              {user.location}
            </Card.Subtitle>
            <Card.Text>{user.aboutMe}</Card.Text>
            <Card.Text>{user.genre}</Card.Text>
            <Card.Text>{user.instrument}</Card.Text>
            <Card.Text>{user.bandName}</Card.Text>
            <Card.Link as={Link} className="edit-btn" to={`/chat/musician/${this.props.match.params.musicianId}`}>
              Send a message
          </Card.Link>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default MusicianDetails;
