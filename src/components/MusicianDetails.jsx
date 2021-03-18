import React, { Component } from "react";
import axios from "axios";
import config from "../config";
import { Button, Card } from "react-bootstrap";
import { Route, Link } from "react-router-dom";

class MusicianDetails extends Component {
  state = {
    user: null,
  };

  componentDidMount() {
    const { musicianId } = this.props.match.params;

    axios
      .get(`${config.API_URL}/api/musician/${musicianId}`)
      .then((response) => {
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

    if (!user) return null;

    return (

      <div className="profile-page">
        <Card className='card-style' >
          <div className='pic-and-text'>
            <Card.Img className='profile-picture' variant="top" src={user.imgUrl} />
            <Card.ImgOverlay className="card-img-overlay" as={Link} to="/upload-image">+</Card.ImgOverlay>
            <Card.Body>
              <Card.Title>
                {user.firstName} {user.lastName}
              </Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                {user.location}
              </Card.Subtitle>
            </Card.Body>
          </div>
          <Card.Body>
            <Card.Text>About me: {user.aboutMe}</Card.Text>
            <Card.Text>Genre: {user.genre}</Card.Text>
            <Card.Text>I play: {user.instrument}</Card.Text>
            {
              user.bandName && <Card.Text>Band: {user.bandName}</Card.Text>
            }
            {
              user.lookingFor && <Card.Text>I'm looking for: {user.lookingFor}</Card.Text>
            }
            <div className="edit-btn">
              <Card.Link as={Link} className="edit-btn" to={`/chat/musician/${this.props.match.params.musicianId}`}>
                Send a message
              </Card.Link>
            </div>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default MusicianDetails;
