import React, { Component } from "react";
import axios from "axios";
import config from "../config";
import { Button } from "react-bootstrap";
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
      .get(`${config.API_URL}/api/search/musician/${musicianId}`)
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
        <img className='profilePic' src={user.imgUrl} />

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
        <span>{user.aboutMe}</span>
        <a href='/chat' className="message-btn">Send a message</a>
      </div>
    );
  }
}

export default MusicianDetails;
