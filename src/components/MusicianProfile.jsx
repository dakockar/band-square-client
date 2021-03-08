import React from "react";
import { Button, Card, ListGroup, ListGroupItem } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import LandingPage from "./LandingPage";

function MusicianProfile(props) {
  // console.log('props------', props)
  // if (!props.user) return null;

  return (
    <div className="profile-page">
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src={props.user.imgUrl} />
        <Card.ImgOverlay as={Link} to="/upload-image">+</Card.ImgOverlay>
        <Card.Body>
          <Card.Title>
            {props.user.firstName} {props.user.lastName}
          </Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {props.user.location}
          </Card.Subtitle>
          <Card.Text>{props.user.aboutMe}</Card.Text>
          <Card.Text>{props.user.genre}</Card.Text>
          <Card.Text>{props.user.instrument}</Card.Text>
          <Card.Text>{props.user.bandName}</Card.Text>
          <Card.Link className="edit-btn" as={Link} to="/musician-profile/edit">
            Edit Profile
          </Card.Link>
        </Card.Body>
      </Card>
      {/* <img className="profilePic" src={props.user.imgUrl} />
      <span>
        {props.user.firstName} {props.user.lastName}
      </span>
      <h5>Genre: </h5>
      <span>{props.user.genre}</span>
      <h5>Instrument: </h5>
      <span>{props.user.instrument}</span>
      <h5>Location: </h5>
      <span>{props.user.location}</span>
      <h5>Band: </h5>
      <span>{props.user.bandName}</span>
      <h5>About Me: </h5>
      <span>{props.user.aboutMe}</span>
      <Button className="button" as={Link} to={`/musician-profile/edit`}>
        Edit Profile
      </Button> */}
    </div>
  );
}

export default MusicianProfile;
