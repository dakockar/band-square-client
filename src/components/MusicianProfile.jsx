import React from "react";
import { Button, Card } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";

function MusicianProfile(props) {
  console.log('props------', props)
  // if (!props.user) return null;
  const { user } = props;
  // if(!user) {
  //   return <Redirect to={'/signin'} />
  // }
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
            <Card.Link className="button" as={Link} to="/musician-profile/edit">
              Edit Profile
          </Card.Link>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

export default MusicianProfile;
