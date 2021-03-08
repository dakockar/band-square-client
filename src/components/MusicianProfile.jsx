import React from "react";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

function MusicianProfile(props) {
  // console.log('props------', props)
  // if (!props.user) return null;

  return (
    <div className="profile-page">
      <Card className='card-style' >
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
          <Card.Link className="button" as={Link} to="/musician-profile/edit">
            Edit Profile
          </Card.Link>
        </Card.Body>
      </Card>
    </div>
  );
}

export default MusicianProfile;
