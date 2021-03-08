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
        console.log("get musician failed", err);
      });
  }

  render() {
    const { user } = this.state;
    // console.log(this.props);

    if (!user) return null;

    return (
      <div className="profile-page">
        {/* <img className='profilePic' src={user.imgUrl} />

        <span>
          {user.firstName} {user.lastName}
        </span>
        <h5>Genres: </h5>
        <span>{user.genre}</span>
        <h5>Instrument: </h5>
        <span>{user.instrument}</span>
        <h5>Location: </h5>
        <span>{user.location}</span>
        <h5>Band: </h5>
        <span>{user.bandName}</span>
        <h5>About Me: </h5>
        <span>{user.aboutMe}</span> */}
        <Card className='card-style' style={{ width: "18rem" }}>
        <Card.Img variant="top" src={user.imgUrl} />
        <Card.Body>
          <Card.Title>
            {user.firstName} {user.lastName}
          </Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {user.location}
          </Card.Subtitle>
          <Card.Text>
            <p>{user.aboutMe}</p>
            <p>{user.genre}</p>
            <p>{user.instrument}</p>
            <p>{user.bandName}</p>
          </Card.Text>
          <Card.Link className="edit-btn" href="/Chat">
            Send a message
          </Card.Link>
        </Card.Body>
      </Card>
      </div>
    );
  }
}

export default MusicianDetails;
